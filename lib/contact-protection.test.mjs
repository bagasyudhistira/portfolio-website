import assert from "node:assert/strict";
import test from "node:test";
import { getContactIp, getProtectionConfig, logContactFailure, protectContact, validateContact } from "./contact-protection.ts";

const config = {
  secret: "test-secret",
  redisUrl: "https://redis.example",
  redisToken: "test-token",
  hashSecret: "test-hash-secret",
  hostnames: ["portfolio.example"],
};
const verified = { success: true, action: "contact", hostname: "portfolio.example" };
function mockRequest(results) {
  const calls = [];
  const request = async (url, options) => {
    calls.push({ url, options });
    if (!results.length) throw new Error("Unexpected request");
    const result = results.shift();
    if (result instanceof Error) throw result;
    return Response.json(result);
  };
  return { request, calls };
}

test("rejects invalid email, whitespace messages, oversized input, and absent tokens", () => {
  const form = new FormData();
  form.set("senderEmail", "visitor@example.com");
  form.set("message", "Hello");
  form.set("cf-turnstile-response", "token");
  assert.deepEqual(validateContact(form), {
    senderEmail: "visitor@example.com", message: "Hello", token: "token",
  });
  for (const [field, value] of [
    ["senderEmail", "invalid"], ["senderEmail", "a@example.com\r\nBcc: x@example.com"],
    ["message", "  "], ["message", "x".repeat(5001)],
    ["cf-turnstile-response", ""], ["cf-turnstile-response", "x".repeat(2049)],
  ]) {
    const changed = new FormData();
    for (const [key, entry] of form) changed.set(key, entry);
    changed.set(field, value);
    assert.equal(validateContact(changed), null);
  }
});

test("IP limit blocks before verification and reserves no daily budget", async () => {
  const { request, calls } = mockRequest([{ result: 0 }]);
  assert.equal(await protectContact("token", "203.0.113.1", config, request), false);
  assert.equal(calls.length, 1);
});

test("failed, wrong-host, wrong-action, and replayed tokens cannot reserve email budget", async () => {
  for (const verification of [
    { success: false, "error-codes": ["timeout-or-duplicate"] },
    { ...verified, hostname: "attacker.example" },
    { ...verified, action: "other" },
  ]) {
    const { request, calls } = mockRequest([{ result: 1 }, verification]);
    assert.equal(await protectContact("token", "203.0.113.1", config, request), false);
    assert.equal(calls.length, 2);
  }
});

test("valid challenge reserves atomic daily budget with UTC expiry and hashed IP", async () => {
  const { request, calls } = mockRequest([{ result: 1 }, verified, { result: 1 }]);
  assert.equal(await protectContact("token", "203.0.113.1", config, request,
    new Date("2026-11-15T23:59:00Z")), true);
  const ipCommand = JSON.parse(calls[0].options.body);
  assert.equal(ipCommand[0], "EVAL");
  assert.match(ipCommand[3], /^contact:ip:[a-f0-9]{64}$/);
  assert.equal(ipCommand[2], "2");
  assert.match(ipCommand[4], /^contact:token:[a-f0-9]{64}$/);
  assert.equal(ipCommand[5], "3");
  assert.equal(ipCommand[6], "900");
  const daily = JSON.parse(calls[2].options.body);
  assert.deepEqual(daily.slice(3), ["contact:daily:2026-11-15", "50", "60"]);
});

test("daily budget exhaustion prevents send authorization", async () => {
  const { request } = mockRequest([{ result: 1 }, verified, { result: 0 }]);
  assert.equal(await protectContact("token", "203.0.113.1", config, request), false);
});

test("Redis failures never authorize sending", async () => {
  for (const result of [{ error: "unavailable" }, {}, new Error("timeout")]) {
    const { request } = mockRequest([result]);
    await assert.rejects(protectContact("token", "203.0.113.1", config, request));
  }
});

test("diagnostics identify protection failures without exposing request or provider data", async () => {
  const cases = [
    { results: [{ result: 0 }], stage: "ip_limit_or_replay" },
    { results: [{ error: "private provider response" }], stage: "ip_limiter_service", throws: true },
    { results: [{ result: 1 }, new Error("private network details")], stage: "turnstile_service" },
    { results: [{ result: 1 }, { success: false, "error-codes": ["private value"] }], stage: "turnstile_rejected" },
    { results: [{ result: 1 }, { ...verified, action: "private action" }], stage: "turnstile_action" },
    { results: [{ result: 1 }, { ...verified, hostname: "private.example" }], stage: "turnstile_hostname" },
    { results: [{ result: 1 }, verified, { result: 0 }], stage: "daily_limit" },
    { results: [{ result: 1 }, verified, new Error("private Redis details")], stage: "daily_limiter_service", throws: true },
  ];
  for (const entry of cases) {
    const { request } = mockRequest(entry.results);
    const stages = [];
    const result = protectContact("private-token", "203.0.113.1", config, request,
      new Date("2026-11-15T12:00:00Z"), (stage) => stages.push(stage));
    if (entry.throws) await assert.rejects(result);
    else assert.equal(await result, false);
    assert.deepEqual(stages, [entry.stage]);
  }
});

test("logger emits only the fixed failure stage", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  logContactFailure("configuration");
  assert.deepEqual(warn.mock.calls[0].arguments, [
    "[contact] submission rejected", { stage: "configuration" },
  ]);
});

test("production trusts only a valid Vercel-overwritten IP header", () => {
  const previousVercel = process.env.VERCEL;
  const previousMode = process.env.NODE_ENV;
  try {
    process.env.NODE_ENV = "production";
    process.env.VERCEL = "1";
    assert.equal(getContactIp(new Headers({ "x-forwarded-for": "203.0.113.1" })), null);
    assert.equal(getContactIp(new Headers({
      "x-vercel-forwarded-for": "203.0.113.1, 203.0.113.2",
    })), null);
    assert.equal(getContactIp(new Headers({
      "x-vercel-forwarded-for": "203.0.113.1",
    })), "203.0.113.1");
    delete process.env.VERCEL;
    assert.equal(getContactIp(new Headers()), null);
    process.env.NODE_ENV = "development";
    assert.equal(getContactIp(new Headers()), "127.0.0.1");
  } finally {
    if (previousVercel === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = previousVercel;
    if (previousMode === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousMode;
  }
});

test("missing configuration, insecure Redis URLs, and short hash secrets fail closed", () => {
  const values = {
    TURNSTILE_SECRET_KEY: "test-secret",
    UPSTASH_REDIS_REST_URL: "https://redis.example",
    UPSTASH_REDIS_REST_TOKEN: "test-token",
    CONTACT_RATE_LIMIT_SECRET: "x".repeat(32),
    TURNSTILE_ALLOWED_HOSTNAMES: "portfolio.example",
  };
  const previous = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  try {
    Object.assign(process.env, values);
    assert.ok(getProtectionConfig());
    for (const key of Object.keys(values)) {
      delete process.env[key];
      assert.equal(getProtectionConfig(), null);
      process.env[key] = values[key];
    }
    process.env.UPSTASH_REDIS_REST_URL = "http://redis.example";
    assert.equal(getProtectionConfig(), null);
    process.env.UPSTASH_REDIS_REST_URL = values.UPSTASH_REDIS_REST_URL;
    process.env.CONTACT_RATE_LIMIT_SECRET = "short";
    assert.equal(getProtectionConfig(), null);
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

import assert from "node:assert/strict";
import test from "node:test";
import { getMailjetConfig, sendMailjetEmail } from "./mailjet.ts";
import { contactEmailHtml, contactEmailText } from "./email-template.ts";

const config = { apiKey: "test-key", secretKey: "test-secret", senderEmail: "owner@example.com" };
const input = { senderEmail: "visitor@example.com", message: "Hello <script>&" };
const payload = { senderEmail: input.senderEmail, html: contactEmailHtml(input), text: contactEmailText(input) };

test("sends one message to the owner with visitor reply-to and escaped HTML", async () => {
  const calls = [];
  const result = await sendMailjetEmail(payload, config, async (url, options) => {
    calls.push({ url, options });
    return Response.json({ Messages: [{ Status: "success", To: [{ MessageUUID: "test-id" }] }] });
  });
  assert.deepEqual(result, { id: "test-id" });
  assert.equal(calls.length, 1);
  const { url, options } = calls[0];
  assert.equal(url, "https://api.mailjet.com/v3.1/send");
  assert.equal(options.method, "POST");
  assert.equal(options.cache, "no-store");
  assert.ok(options.signal instanceof AbortSignal);
  assert.equal(options.headers.Authorization,
    `Basic ${Buffer.from("test-key:test-secret").toString("base64")}`);
  const { Messages } = JSON.parse(options.body);
  assert.equal(Messages.length, 1);
  assert.deepEqual(Messages[0].From, { Email: "owner@example.com", Name: "Bagas Yudhistira | Portfolio" });
  assert.deepEqual(Messages[0].To, [{ Email: "bagasyudhistirafauzi@gmail.com" }]);
  assert.deepEqual(Messages[0].ReplyTo, { Email: payload.senderEmail });
  assert.ok(Messages[0].TextPart.includes(input.message));
  assert.ok(Messages[0].HTMLPart.includes("Hello &lt;script&gt;&amp;"));
  assert.ok(!Messages[0].HTMLPart.includes("<script>"));
});

test("renders readable inquiries while escaping visitor content and preserving line breaks", () => {
  const visitor = {
    senderEmail: 'a"&lt;@example.com',
    message: 'First <script>alert("x")</script>\r\nSecond & \'quoted\'\n\nLast\rEnd',
  };
  const html = contactEmailHtml(visitor);
  const text = contactEmailText(visitor);
  assert.ok(html.includes("a&quot;&amp;lt;@example.com"));
  assert.ok(html.includes("First &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;<br />Second &amp; &#39;quoted&#39;<br /><br />Last<br />End"));
  assert.ok(!html.includes("<script>"));
  assert.ok(text.includes(`Visitor email: ${visitor.senderEmail}`));
  assert.ok(text.includes(`MESSAGE\n${visitor.message}\n\n---`));
  assert.ok(html.includes("Use Reply to respond directly to the visitor"));
  assert.ok(text.includes("Use Reply to respond directly to the visitor"));
});

test("rejects HTTP failures, per-message errors, and malformed responses without retrying or logging", async (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  const responses = [
    new Response("private provider details", { status: 401 }),
    Response.json({ Messages: [{ Status: "error", Errors: ["private details"] }] }),
    Response.json({ Messages: [{ Status: "success", To: [] }] }),
    Response.json({ Messages: [{ Status: "success", To: [{ MessageUUID: "" }] }] }),
    Response.json(null),
    Response.json({}),
    new Response("not JSON", { status: 200 }),
  ];
  for (const response of responses) {
    let calls = 0;
    await assert.rejects(sendMailjetEmail(payload, config, async () => {
      calls++;
      return response;
    }));
    assert.equal(calls, 1);
  }
  await assert.rejects(sendMailjetEmail(payload, config, async () => {
    throw new Error("network unavailable");
  }));
  assert.equal(warn.mock.calls.length, 0);
});

test("requires both credentials and a valid configured sender", () => {
  const values = {
    MAILJET_API_KEY: "test-key",
    MAILJET_SECRET_KEY: "test-secret",
    MAILJET_FROM_EMAIL: "owner@example.com",
  };
  const previous = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  try {
    Object.assign(process.env, values);
    assert.deepEqual(getMailjetConfig(), config);
    for (const key of Object.keys(values)) {
      delete process.env[key];
      assert.equal(getMailjetConfig(), null);
      process.env[key] = " ";
      assert.equal(getMailjetConfig(), null);
      process.env[key] = values[key];
    }
    for (const email of ["invalid", "a@example.com\r\nBcc: b@example.com", "a".repeat(255)]) {
      process.env.MAILJET_FROM_EMAIL = email;
      assert.equal(getMailjetConfig(), null);
    }
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

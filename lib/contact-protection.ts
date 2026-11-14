import { createHmac } from "node:crypto";
import { isIP } from "node:net";

type ContactFailureStage =
  | "input" | "configuration" | "client_ip" | "request_headers"
  | "ip_limit_or_replay" | "ip_limiter_service"
  | "turnstile_service" | "turnstile_rejected" | "turnstile_hostname" | "turnstile_action"
  | "daily_limit" | "daily_limiter_service" | "protection" | "mailjet";

export function logContactFailure(stage: ContactFailureStage) {
  console.warn("[contact] submission rejected", { stage });
}

type ProtectionConfig = {
  secret: string;
  redisUrl: string;
  redisToken: string;
  hashSecret: string;
  hostnames: string[];
};

export function getProtectionConfig(): ProtectionConfig | null {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const hashSecret = process.env.CONTACT_RATE_LIMIT_SECRET;
  const hostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
    .split(",").map((value) => value.trim()).filter(Boolean);
  if (!secret || !redisUrl || !redisToken || !hashSecret || hashSecret.length < 32 ||
      !hostnames.length) return null;
  try {
    if (new URL(redisUrl).protocol !== "https:") return null;
  } catch {
    return null;
  }
  return { secret, redisUrl, redisToken, hashSecret, hostnames };
}

export function validateContact(formData: FormData) {
  const email = formData.get("senderEmail");
  const message = formData.get("message");
  const token = formData.get("cf-turnstile-response");
  if (typeof email !== "string" || email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof message !== "string" || !message.trim() || message.length > 5000 ||
      typeof token !== "string" || !token || token.length > 2048) return null;
  return { senderEmail: email, message: message.trim(), token };
}

export function getContactIp(headers: Headers): string | null {
  // Only Vercel's overwritten proxy header is trusted, never visitor-supplied X-Forwarded-For.
  if (process.env.VERCEL !== "1") {
    return process.env.NODE_ENV !== "production" ? "127.0.0.1" : null;
  }
  const ip = headers.get("x-vercel-forwarded-for")?.trim();
  return ip && isIP(ip) ? ip : null;
}

const LIMIT_SCRIPT = `
local count = redis.call('INCR', KEYS[1])
if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[2]) end
if count > tonumber(ARGV[1]) then return 0 end
if KEYS[2] and not redis.call('SET', KEYS[2], '1', 'NX', 'EX', 600) then return 0 end
return 1
`;

async function reserveLimit(
  config: ProtectionConfig, key: string, limit: number, ttl: number,
  request: typeof fetch, tokenKey?: string,
) {
  const response = await request(config.redisUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      "EVAL", LIMIT_SCRIPT, tokenKey ? "2" : "1", key,
      ...(tokenKey ? [tokenKey] : []), String(limit), String(ttl),
    ]),
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Rate limiter unavailable");
  const result = await response.json();
  if (result.error || (result.result !== 0 && result.result !== 1)) {
    throw new Error("Invalid rate limiter response");
  }
  return result.result === 1;
}

export async function protectContact(
  token: string, ip: string, config: ProtectionConfig,
  request: typeof fetch = fetch, now = new Date(),
  report: typeof logContactFailure = logContactFailure,
): Promise<boolean> {
  const ipHash = createHmac("sha256", config.hashSecret).update(ip).digest("hex");
  const tokenHash = createHmac("sha256", config.hashSecret).update(token).digest("hex");
  // Count attempts and reject replayed tokens atomically before bot verification.
  try {
    if (!await reserveLimit(config, `contact:ip:${ipHash}`, 3, 900, request,
      `contact:token:${tokenHash}`)) {
      report("ip_limit_or_replay");
      return false;
    }
  } catch {
    report("ip_limiter_service");
    throw new Error("Contact IP limiter unavailable");
  }
  let verification;
  try {
    const response = await request("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: config.secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Verification unavailable");
    verification = await response.json();
    if (!verification || typeof verification !== "object") {
      throw new Error("Invalid verification response");
    }
  } catch {
    report("turnstile_service");
    return false;
  }
  if (verification.success !== true) {
    report("turnstile_rejected");
    return false;
  }
  if (verification.action !== "contact") {
    report("turnstile_action");
    return false;
  }
  if (!config.hostnames.includes(verification.hostname)) {
    report("turnstile_hostname");
    return false;
  }
  const day = now.toISOString().slice(0, 10);
  const nextDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  const ttl = Math.max(1, Math.ceil((nextDay - now.getTime()) / 1000));
  // Reserve before sending; provider failures also consume budget to fail safely.
  try {
    const allowed = await reserveLimit(config, `contact:daily:${day}`, 50, ttl, request);
    if (!allowed) report("daily_limit");
    return allowed;
  } catch {
    report("daily_limiter_service");
    throw new Error("Contact daily limiter unavailable");
  }
}

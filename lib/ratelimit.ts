/**
 * Abuse / spam protection for the intake endpoint.
 *
 * Layer 1 — in-memory, always on: dual fixed windows (short burst + hourly) per IP.
 *   Instant and free, but per-serverless-instance and resets on cold start.
 * Layer 2 — durable, opt-in: if UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *   are set, a shared counter in Upstash Redis catches abuse spread across instances.
 *   Called over plain fetch — no SDK dependency. Fails open if the store is unreachable
 *   so real visitors are never blocked by limiter-infra problems.
 */

const BURST = { windowMs: 60_000, max: 4 };       // ≤4 submissions / minute / IP
const HOURLY = { windowMs: 3_600_000, max: 30 };  // ≤30 submissions / hour / IP

type Window = { count: number; start: number };

function hit(map: Map<string, Window>, ip: string, windowMs: number, max: number): boolean {
  const now = Date.now();
  const entry = map.get(ip);
  if (!entry || now - entry.start > windowMs) {
    // Prune stale entries to keep the map bounded under many unique IPs.
    for (const [key, val] of map) {
      if (now - val.start > windowMs) map.delete(key);
    }
    map.set(ip, { count: 1, start: now });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

const burstMap = new Map<string, Window>();
const hourMap = new Map<string, Window>();

function inMemoryOk(ip: string): boolean {
  const okBurst = hit(burstMap, ip, BURST.windowMs, BURST.max);
  const okHour = hit(hourMap, ip, HOURLY.windowMs, HOURLY.max);
  return okBurst && okHour;
}

const U_URL = process.env.UPSTASH_REDIS_REST_URL;
const U_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const U_WINDOW_SEC = 60;
const U_MAX = 5;

async function upstashOk(ip: string): Promise<boolean> {
  try {
    const bucket = Math.floor(Date.now() / (U_WINDOW_SEC * 1000));
    const key = `rl:${ip}:${bucket}`;
    const res = await fetch(`${U_URL}/incr/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${U_TOKEN}` },
    });
    if (!res.ok) return true; // fail open
    const data = (await res.json()) as { result?: number };
    const count = data.result ?? 0;
    if (count === 1) {
      // First hit in this window — set TTL so the key self-expires.
      await fetch(`${U_URL}/expire/${encodeURIComponent(key)}/${U_WINDOW_SEC}`, {
        headers: { Authorization: `Bearer ${U_TOKEN}` },
      }).catch(() => undefined);
    }
    return count <= U_MAX;
  } catch {
    return true; // never block real users if the limiter store is down
  }
}

/** Returns true if the request is allowed, false if rate-limited. */
export async function checkRateLimit(ip: string): Promise<boolean> {
  if (!inMemoryOk(ip)) return false;
  if (U_URL && U_TOKEN) return upstashOk(ip);
  return true;
}

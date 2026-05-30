import { z } from 'zod';

const bodySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  enquiry: z.string().min(10).max(2000),
  honeypot: z.string().max(0).optional(),
});

type ValidBody = { name: string; email: string; enquiry: string };

export function validateBody(
  body: unknown
): { success: true; data: ValidBody } | { success: false; error: string } {
  const result = bodySchema.safeParse(body);
  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? 'Invalid input' };
  }
  if (result.data.honeypot) {
    return { success: false, error: 'Invalid submission' };
  }
  return { success: true, data: result.data };
}

// In-memory rate limiter — resets on cold start, sufficient for a low-traffic form endpoint.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const ipWindows = new Map<string, { count: number; windowStart: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipWindows.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    ipWindows.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count++;
  return true;
}

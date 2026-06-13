import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateBody } from '../lib/validate.js';
import { checkRateLimit } from '../lib/ratelimit.js';
import { callGemini } from '../lib/gemini.js';

function applyCors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = (req.headers.origin as string) ?? '';
  const allowed = process.env.ALLOWED_ORIGIN?.trim();

  let ok: boolean;
  if (allowed) {
    // Strict allow-list when ALLOWED_ORIGIN is configured.
    ok = origin === allowed;
  } else {
    // Fallback: same-origin only. The form always calls the API on its own
    // domain, so accept requests with no Origin (non-CORS) or whose Origin host
    // matches the deployment host; reject other websites' browsers.
    const host = req.headers.host ?? '';
    if (!origin) ok = true;
    else {
      try { ok = new URL(origin).host === host; } catch { ok = false; }
    }
  }

  if (!ok) return false;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const corsOk = applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return corsOk ? res.status(204).end() : res.status(403).end();
  }

  if (!corsOk) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
    req.socket?.remoteAddress ??
    'unknown';
  if (!(await checkRateLimit(ip))) {
    return res.status(429).json({ error: 'Too many requests — please try again shortly.' });
  }

  const validation = validateBody(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const result = await callGemini(validation.data);
    return res.status(200).json({ acknowledgement: result.acknowledgement });
  } catch (err) {
    console.error('Gemini call failed:', err);
    return res.status(502).json({ error: 'Service temporarily unavailable' });
  }
}

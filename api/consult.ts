import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateBody, checkRateLimit } from '../lib/validate.js';
import { callGemini } from '../lib/gemini.js';

function applyCors(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin ?? '';
  const allowed = process.env.ALLOWED_ORIGIN ?? '';
  if (allowed && origin !== allowed) return false;
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
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
  if (!checkRateLimit(ip)) {
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

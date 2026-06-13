import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { buildPrompt } from './prompt.js';

// Lazily create the client so a missing key produces a clean, catchable error at
// request time instead of throwing at module load (which crashes the whole
// serverless function — CORS, validation, rate limit and all — on every request).
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (aiClient) return aiClient;
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not set');
  }
  aiClient = new GoogleGenAI({ apiKey });
  return aiClient;
}

// Industry-agnostic intake categories — work for any service business.
const CATEGORY = ['new_business', 'booking', 'quote', 'support', 'complaint', 'other'] as const;

const routingSummarySchema = z.object({
  category: z.enum(CATEGORY),
  urgency: z.enum(['high', 'medium', 'low']),
  suggestedService: z.string().min(1),
  internalNotes: z.string().min(1),
});

// The model also returns `onTopic`; acknowledgement may be empty for off-topic input.
const modelResponseSchema = z.object({
  onTopic: z.boolean(),
  acknowledgement: z.string(),
  routingSummary: routingSummarySchema,
});

export interface ConsultResult {
  acknowledgement: string;
  routingSummary: z.infer<typeof routingSummarySchema>;
}

const MAX_ACK = 600;

// Strip anything that could carry weaponised model output (code fences, markdown,
// runaway length) and flatten to a short plain-text line.
function sanitizeAck(s: string): string {
  return s
    .replace(/```[\s\S]*?```/g, '') // fenced code blocks
    .replace(/`+/g, '')             // stray backticks
    .replace(/\s+/g, ' ')           // collapse newlines/whitespace
    .trim()
    .slice(0, MAX_ACK);
}

export async function callGemini(input: {
  name: string;
  company?: string;
  email: string;
  enquiry: string;
  brand?: string;
  industry?: string;
}): Promise<ConsultResult> {
  const result = await getAI().models.generateContent({
    model: 'gemini-1.5-flash',
    contents: buildPrompt({
      name: input.name,
      enquiry: input.enquiry,
      company: input.company,
      brand: input.brand,
      industry: input.industry,
    }),
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        properties: {
          onTopic: { type: 'boolean' },
          acknowledgement: { type: 'string' },
          routingSummary: {
            type: 'object',
            properties: {
              category: { type: 'string', enum: [...CATEGORY] },
              urgency: { type: 'string', enum: ['high', 'medium', 'low'] },
              suggestedService: { type: 'string' },
              internalNotes: { type: 'string' },
            },
            required: ['category', 'urgency', 'suggestedService', 'internalNotes'],
          },
        },
        required: ['onTopic', 'acknowledgement', 'routingSummary'],
      },
    },
  });

  const rawText = result.text;
  if (!rawText) {
    throw new Error('Empty response from Gemini');
  }

  const parsed = modelResponseSchema.parse(JSON.parse(rawText));
  const brand = input.brand?.trim() || 'our team';

  // Off-topic / misuse / injection attempt: never echo model free-text back.
  if (!parsed.onTopic) {
    return {
      acknowledgement: `Thanks for getting in touch. This assistant only helps with enquiries and bookings for ${brand}, so I've passed your message to the team — if it was a genuine enquiry, someone will be in touch. For anything else, please email us directly.`,
      routingSummary: {
        category: 'other',
        urgency: 'low',
        suggestedService: 'General enquiry',
        internalNotes: 'Auto-screened: off-topic or non-enquiry message (possible misuse, spam, or injection attempt).',
      },
    };
  }

  let ack = sanitizeAck(parsed.acknowledgement);
  if (!ack) ack = `Thanks for reaching out to ${brand} — a member of the team will follow up with you shortly.`;

  return { acknowledgement: ack, routingSummary: parsed.routingSummary };
}

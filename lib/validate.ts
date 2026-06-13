import { z } from 'zod';

const bodySchema = z.object({
  name: z.string().min(1).max(100),
  company: z.string().max(120).optional(),
  email: z.string().email(),
  // Capped tighter than a document — this is an enquiry box, not a content generator.
  enquiry: z.string().min(10).max(1500),
  // White-label context — supplied by the front end, treated as data only.
  brand: z.string().max(80).optional(),
  industry: z.string().max(80).optional(),
  honeypot: z.string().max(0).optional(),
});

type ValidBody = {
  name: string;
  company?: string;
  email: string;
  enquiry: string;
  brand?: string;
  industry?: string;
};

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
  const { honeypot: _hp, ...rest } = result.data;
  return { success: true, data: rest };
}

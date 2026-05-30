import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { buildPrompt } from './prompt.js';

const client = new Anthropic();

const consultResponseSchema = z.object({
  acknowledgement: z.string().min(1),
  routingSummary: z.object({
    category: z.enum(['strategy', 'operations', 'finance', 'legal', 'technology', 'other']),
    urgency: z.enum(['high', 'medium', 'low']),
    suggestedService: z.string().min(1),
    internalNotes: z.string().min(1),
  }),
});

export type ConsultResponse = z.infer<typeof consultResponseSchema>;

export async function callClaude(input: {
  name: string;
  email: string;
  enquiry: string;
}): Promise<ConsultResponse> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: buildPrompt(input.name, input.enquiry),
      },
    ],
  });

  const block = message.content[0];
  if (block.type !== 'text') throw new Error('Unexpected response type from Claude');

  return consultResponseSchema.parse(JSON.parse(block.text));
}

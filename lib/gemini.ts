import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';
import { buildPrompt } from './prompt.js';

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
    throw new Error('GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set');
}

const ai = new GoogleGenAI({ apiKey });

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

export async function callGemini(input: {
    name: string;
    company?: string;
    email: string;
    enquiry: string;
}): Promise<ConsultResponse> {
    const result = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents: buildPrompt(input.name, input.enquiry, input.company),
          config: {
                  responseMimeType: 'application/json',
                  responseSchema: {
                            type: 'object',
                            properties: {
                                        acknowledgement: { type: 'string' },
                                        routingSummary: {
                                                      type: 'object',
                                                      properties: {
                                                                      category: {
                                                                                        type: 'string',
                                                                                        enum: ['strategy', 'operations', 'finance', 'legal', 'technology', 'other'],
                                                                      },
                                                                      urgency: { type: 'string', enum: ['high', 'medium', 'low'] },
                                                                      suggestedService: { type: 'string' },
                                                                      internalNotes: { type: 'string' },
                                                      },
                                                      required: ['category', 'urgency', 'suggestedService', 'internalNotes'],
                                        },
                            },
                            required: ['acknowledgement', 'routingSummary'],
                  },
          },
    });

  const rawText = result.text;
    if (!rawText) {
          throw new Error('Empty response from Gemini');
    }

  return consultResponseSchema.parse(JSON.parse(rawText));
}

export function buildPrompt(name: string, enquiry: string): string {
  return `You are the intake assistant for Meridian, a professional services consultancy.

A new consultation request has arrived. Your job:
1. Write a warm, tailored acknowledgement for the client (2-3 sentences, professional tone).
2. Produce a concise internal routing summary for the team.

Client name: ${name}
Enquiry: ${enquiry}`;
}

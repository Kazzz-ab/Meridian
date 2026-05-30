# CLAUDE.md — Meridian (AI consultation form service)

Project memory for Claude Code. **Scope: the serverless function only.** The website itself is built in Webflow (no code, not in this repo).

## What this is
A single Vercel serverless function that backs the Webflow consultation form: validates a lead, calls the Claude API, and returns a visitor-facing acknowledgement plus an internal routing summary. Stateless, one-shot. **Not a chatbot.**

## Commands
```bash
pnpm dev          # vercel dev — local function
pnpm typecheck
pnpm lint
pnpm build
```

## Conventions
- TypeScript strict. Validate the request body with a schema (zod) before doing anything.
- `ANTHROPIC_API_KEY` is server-side only (Vercel env var). Never in client/Webflow code.
- The Claude call returns **structured** output: `{ acknowledgement: string, routing: { category, urgency, suggestedService } }`. Parse and validate it; never pass raw model text straight through unchecked.
- CORS: allow only the Webflow site origin.

## Hard rules
1. This stays a **single stateless endpoint**. Do not add sessions, history, or multi-turn chat. If that's requested, it's a different project.
2. Rate-limit and include a honeypot check — public form endpoints get abused.
3. Never echo the API key or internal routing summary back to the public visitor response beyond the intended acknowledgement.
4. Keep it to ~one day of work. The website is the deliverable; this is a smart accent.

## Where things live
- `api/consult.ts` — the function
- `lib/prompt.ts` — the Claude prompt + output schema
- `lib/validate.ts` — request validation + rate limit + honeypot

## Webflow side (reference, not in this repo)
- CMS Collections: Services, Case Studies (ROI fields), Testimonials, Team.
- Form posts to this function's deployed URL.
- Booking = Calendly embed; CRM = Zapier/Make. Client portal + live calendar are deferred.

# Meridian - Architecture

> A professional-services website template (built in Webflow) with one custom touch: an **AI-powered consultation request form** backed by a small serverless function that calls Gemini. Designed as a reusable template that reskins across industries (consulting, legal, financial advisory, agencies).

## "Done" spec (v1 scope)

A polished, responsive Webflow site with: a multi-service layout, trust signals, a case-study showcase (CMS-driven, with ROI metrics), and a lead form. The form differentiator: on submit, a serverless function sends the enquiry to Gemini, which returns a tailored acknowledgement + an internal routing summary. Appointment booking and CRM are **embedded third-party tools**, not built. Deployed: Webflow hosting for the site, Vercel for the function.

## Two parts, two natures

| Part | Built in | Notes |
|------|----------|-------|
| The website | **Webflow** (no-code) | Design, layout, CMS, responsiveness - done in the Designer, not in a repo |
| The AI form | **Vercel serverless function** (TypeScript) | The only code in this project; lives in the repo described below |

Be honest in the case study: this is a **Webflow** piece. The engineering signal is the clean AI integration, not a hand-coded frontend.

## The AI consultation form (the one build)

1. Webflow form posts to the Vercel function (`/api/consult`).
2. Function validates input (name, email, enquiry), rate-limits, and calls Gemini with a structured prompt.
3. Gemini returns: a warm, tailored acknowledgement shown to the visitor, and a concise internal **routing summary** (category, urgency, suggested service) for the business.
4. Optional: pipe the lead + summary to a CRM/Sheet via Zapier/Make.

Scope guard: this is a **one-day** build. The serverless function is small. Resist turning it into a chatbot.

## Webflow structure

- **CMS Collections:** Services, Case Studies (with ROI metric fields), Testimonials, Team.
- **Pages:** Home, Services (+ dynamic service template), Case Studies (+ dynamic template), About, Contact.
- **Reusability:** symbols/components + CMS mean reskinning to a new industry is content + brand tokens, not a rebuild.

## What is embedded, not built

- **Appointment booking** - Calendly embed.
- **CRM integration** - Zapier/Make -> HubSpot free tier or Google Sheet.
- **Real-time availability calendar / client portal** - explicitly **deferred** (out of scope for v1).

## Tech decisions & rationale

| Decision | Choice | Why |
|----------|--------|-----|
| Site | Webflow | Fast, polished, CMS-driven, no-code - the right tool for a marketing site |
| AI form backend | Vercel serverless + TS | Smallest possible footprint for the one custom feature; keys server-side |
| LLM | Gemini API | Tailored acknowledgement + structured routing summary |
| Booking/CRM | Calendly + Zapier | Embed proven tools; do not rebuild commodity functionality |

## Risks & mitigations

- **Scope creep on the AI form** - it is a stateless one-shot, not a chatbot. One day, then stop.
- **Form spam** - rate-limit + honeypot field on the function.
- **Confusing the portfolio story** - present clearly as a Webflow template with a smart AI integration, not as custom-coded.

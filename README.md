# meridian-consult-service

Serverless function that powers the AI consultation form on the Meridian Webflow site.

## What it does

Accepts a POST from the Webflow contact form, validates the payload, calls Claude, and returns:
- `acknowledgement` — a warm, tailored reply shown to the visitor
- `routingSummary` — internal category/urgency/service notes for the team

## Setup

```bash
npm install
cp .env.example .env.local
# fill in ANTHROPIC_API_KEY and ALLOWED_ORIGIN
```

## Run locally

```bash
npm run dev
# Vercel dev server starts at http://localhost:3000
```

## Deploy

```bash
vercel --prod
```

Set `ANTHROPIC_API_KEY` and `ALLOWED_ORIGIN` in the Vercel project environment variables dashboard.

## Wiring to Webflow

In the Webflow `ConsultationForm` symbol, set the form action to your deployed function URL:
```
https://your-project.vercel.app/api/consult
```

Fields required: `name`, `email`, `enquiry`. Add a hidden `honeypot` field (left blank by real users).

## Environment variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `ALLOWED_ORIGIN` | Your Webflow site URL (CORS guard) |

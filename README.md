# meridian-consult-service

**Live:** [meridian-consult-service.vercel.app](https://meridian-consult-service.vercel.app)

Serverless function + static site for Meridian — a professional services consultancy. The AI consultation form validates leads, calls Gemini, and returns a tailored acknowledgement plus an internal routing summary.

## What it does

Accepts a POST from the contact form, validates the payload, calls Gemini, and returns:

- `acknowledgement` — a warm, tailored reply shown to the visitor
- `routingSummary` — internal category/urgency/service notes for the team

## Setup

```bash
npm install
cp .env.example .env.local
# fill in GOOGLE_GENERATIVE_AI_API_KEY and ALLOWED_ORIGIN
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

Set `GOOGLE_GENERATIVE_AI_API_KEY` and `ALLOWED_ORIGIN` in the Vercel project environment variables dashboard.

## Wiring to Webflow

In the Webflow `ConsultationForm` symbol, set the form action to your deployed function URL:

```text
https://your-project.vercel.app/api/consult
```

Fields required: `name`, `email`, `enquiry`. Add a hidden `honeypot` field (left blank by real users).

## Environment variables

| Variable | Description |
| --- | --- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Free key from [aistudio.google.com](https://aistudio.google.com) |
| `ALLOWED_ORIGIN` | Your site URL (CORS guard) |

# Meridian — the white-label landing page for service businesses

**Live demo:** [meridian-consult-service.vercel.app](https://meridian-consult-service.vercel.app)

A high-converting, conversion-first landing page that any service business can run — and any agency can resell. One config file reskins the entire site (brand, colours, copy, pricing, FAQ) for a new industry. The differentiator isn't the design; it's that **every enquiry gets a tailored reply in seconds**, instead of a "we'll be in touch."

Five industry skins ship out of the box: **consultancy, law firm, dental clinic, home services, fitness studio.** Flip between them live with the on-page white-label switcher.

---

## Why it's built this way (the market research)

The whole product is shaped around one finding: in service businesses, **speed of response beats almost everything else.**

- Leads contacted within **5 minutes are 21× more likely** to convert than those contacted after 30. ([leadangel](https://www.leadangel.com/blog/operations/speed-to-lead-statistics/))
- **78% of customers buy from the company that responds first.** ([verse.ai](https://verse.ai/blog/speed-to-lead-statistics))
- Yet **~74% of businesses miss the 5-minute window entirely.** ([apten](https://www.apten.ai/blog/speed-to-lead-benchmarks-2026))
- Removing nav clutter, single clear CTA, social proof high on the page, and a short form are the conversion fundamentals. ([cxl](https://cxl.com/blog/how-to-build-a-high-converting-landing-page/), [leadfeeder](https://www.leadfeeder.com/blog/conversion-optimization/landing-pages-convert/))
- For agencies reselling sites, the wins are **one-file reskins, branded everything, instant lead alerts, and real online booking.** ([siteswan](https://www.siteswan.com/white-label-website-builder))

So the hero literally *demonstrates* the instant-reply intake, and the copy sells "reply first, win the client." The design uses 2026 conventions — aurora gradients, glassmorphism, a bento services grid — to read as premium. ([line25](https://line25.com/articles/web-design-trends-2026/))

---

## What it does

- **Instant AI intake** — the contact form posts to a serverless function that calls Gemini and returns a tailored, on-brand acknowledgement to the visitor **plus** a structured routing summary (category, urgency, suggested service, internal notes) for the business.
- **Conversion-first page** — rating bar, animated live-intake demo, social-proof marquee, count-up stats, bento services, measured results, transparent pricing, a risk-reversal guarantee, and an FAQ accordion.
- **White-label by config** — `public/config.js` holds every word and colour for each industry. No HTML/CSS edits to launch a new client.
- **Booking-ready** — a dedicated booking card on the contact page is wired as a drop-in slot for Calendly / Cal.com / any scheduler.
- **Sticky mobile CTA + responsive** — built mobile-first (where ~83% of landing traffic lives).

---

## Reskin it for a new client (the white-label workflow)

1. Open [`public/config.js`](public/config.js).
2. Copy an existing entry under `industries` (or edit one in place). Each entry holds: `brand`, `theme` (3 colours), `hero`, `demo`, `marquee`, `stats`, `services`, `results`, `process`, `testimonials`, `pricing`, `guarantee`, `faq`, `cta`.
3. Set `defaultIndustry` to your new key, and set `showIndustrySwitcher: false` for a single-client production build (this hides the demo switcher and locks the skin).
4. Deploy. Done — no markup changes.

The three theme colours drive everything via CSS variables (`--accent`, `--accent-2`, `--accent-ink`): gradients, buttons, glows, chips, charts.

---

## Architecture (two parts)

| Part | Built with | Notes |
|------|-----------|-------|
| The site | Static HTML/CSS + a small vanilla-JS render engine | `public/render.js` paints every section from `config.js`. Zero framework, instant load. |
| The intake | Vercel serverless function (TypeScript) | `api/consult.ts` → validate → rate-limit → Gemini → `{ acknowledgement, routingSummary }`. |

```
public/
  index.html     # structure + data-* slots (no hard-coded copy)
  contact.html   # enquiry form + booking card (config-aware)
  config.js      # ← the product: all brands, colours, copy
  render.js      # render engine: theme, demo animation, count-up, FAQ, switcher
  style.css      # aurora / glass / bento design system
api/consult.ts   # serverless intake endpoint
lib/             # prompt.ts · validate.ts · gemini.ts · ratelimit.ts
```

---

## Guardrails & abuse protection

The intake AI is deliberately **not** a general chatbot — it's locked to one job so it can't be turned into free LLM compute.

- **Scope lock (prompt + server gate).** The model only handles service enquiries and booking requests; anything else (code generation, essays, homework, "scrum"/planning, translation, general Q&A, role-play) is classified off-topic. The structured response carries an `onTopic` flag — when it's `false` the server **discards the model's text** and returns a fixed, on-brand refusal, so model output can never be weaponised.
- **Injection resistance.** Visitor input is wrapped in XML tags and framed as untrusted data; "ignore previous instructions", developer impersonation, or output-format hijacks are treated as off-topic.
- **Output sanitising.** Acknowledgements are stripped of code fences/markdown and hard-capped at 600 characters.
- **Rate limiting (anti-spam).** A dual-window in-memory limiter (≤4/min and ≤30/hour per IP) is always on. Set the optional `UPSTASH_REDIS_REST_*` vars to add a durable, cross-instance limiter (plain REST, no SDK) — it fails open so real visitors are never blocked by limiter outages.
- **Plus** a CORS allow-list, a honeypot field, and tight input length caps.

At scale, also enable Vercel's WAF / platform rate-limiting in the dashboard.

---

## Setup

```bash
npm install
cp .env.example .env.local
# set GOOGLE_GENERATIVE_AI_API_KEY and ALLOWED_ORIGIN
```

## Run locally

```bash
npm run dev          # Vercel dev — full site + /api/consult
```

The static site also runs without the API for design work — the form just won't return a live reply.

## Deploy

```bash
vercel --prod
```

Set `GOOGLE_GENERATIVE_AI_API_KEY` and `ALLOWED_ORIGIN` in the Vercel project env vars.

## Environment variables

| Variable | Description |
| --- | --- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | **Required.** Free key from [aistudio.google.com](https://aistudio.google.com) |
| `ALLOWED_ORIGIN` | **Required.** Your deployed site URL (CORS guard) |
| `UPSTASH_REDIS_REST_URL` | Optional. Enables durable, cross-instance rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Optional. REST token paired with the URL above |

---

## Routing summary shape

```jsonc
{
  "acknowledgement": "Thanks Daniel — rising CAC at your stage usually traces to ICP drift…",
  "routingSummary": {
    "category": "new_business",      // new_business | booking | quote | support | complaint | other
    "urgency": "high",               // high | medium | low
    "suggestedService": "Strategy & Growth",
    "internalNotes": "B2B SaaS, ~40 staff, board deadline Q3."
  }
}
```

Pipe `routingSummary` to a CRM, Slack, or Google Sheet via a webhook to close the speed-to-lead loop.

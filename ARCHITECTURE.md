# Meridian — Architecture

> A **white-label, conversion-first landing page** for service businesses, with an **instant AI intake** as the core feature. The entire site reskins from one config file, so a single codebase resells to any service industry (consultancy, legal, dental, home services, fitness, …).

## "Done" spec

A premium, responsive landing page whose copy and design are driven entirely by `public/config.js`. The page leads with a *live demonstration* of the product (an animated AI-intake card), backs claims with social proof and measured results, and drives to one action: enquire / book. The one piece of real backend is a serverless function that turns a form submission into (a) a tailored, on-brand acknowledgement for the visitor and (b) a structured routing summary for the business.

## Why the rebuild

The earlier version was a generic consultancy site (Webflow template framing, three.js hero, consulting-only copy). Market research reframed it:

- **Speed-to-lead is the product.** 21× conversion lift inside 5 minutes; 78% buy from whoever replies first; most businesses miss the window. So the hero *shows* an enquiry being answered in seconds.
- **White-label resale is the business model.** Agencies want one-file reskins, branded everything, lead alerts, and booking. So all content moved into `config.js` and the theme into three CSS variables.
- **2026 design conventions signal premium.** Aurora gradients, glassmorphism, bento grid, large display serif.

## Two parts, two natures

| Part | Built with | Notes |
|------|-----------|-------|
| The site | Static HTML + vanilla-JS render engine + CSS | No framework, no build step. `render.js` reads `config.js` and paints every section; switching industry re-themes and re-renders in place. |
| The intake | Vercel serverless function (TypeScript) | The only server code. Validates, rate-limits, calls Gemini, returns acknowledgement + routing summary. |

## The white-label mechanism

- **`config.js`** is the product surface. `MERIDIAN_CONFIG.industries[key]` holds a complete skin: brand, 3 theme colours, and copy for every section.
- **Theme** = three CSS custom properties (`--accent`, `--accent-2`, `--accent-ink`). Every gradient, glow, button, and chip derives from them via `color-mix()`.
- **Persistence**: chosen skin is stored in `localStorage` and honoured by both `index.html` and `contact.html`, and can be forced with `?industry=<key>`.
- **Production lock**: set `showIndustrySwitcher: false` and `defaultIndustry` to ship a single client build with the demo switcher removed.

## The AI intake (the one build)

1. `contact.html` posts `{ name, email, enquiry, company?, brand, industry, honeypot }` to `/api/consult`.
2. The function applies CORS allow-list, in-memory rate limiting (5/min/IP), and a honeypot check.
3. `validate.ts` (zod) enforces field shapes and caps lengths; `brand`/`industry` are accepted as data only.
4. `prompt.ts` templates a brand/industry-aware intake prompt, wrapping visitor input in XML tags framed as data (prompt-injection mitigation).
5. `gemini.ts` calls `gemini-1.5-flash` with a strict JSON `responseSchema`; categories are industry-agnostic (`new_business | booking | quote | support | complaint | other`).
6. Returns `acknowledgement` to the visitor; `routingSummary` is available to pipe to a CRM/Slack/Sheet via webhook (not persisted in the demo).

Scope guard: stateless one-shot, not a chatbot. One input, one deterministic output shape.

## File map

```
public/
  index.html     structure + data-* slots only
  contact.html   form + booking card, self-contained config-aware script
  config.js      all skins (brand, theme, copy)
  render.js      theme + section rendering + demo animation + count-up + FAQ + switcher
  style.css      aurora / glass / bento design system, fully responsive + reduced-motion
api/consult.ts   intake endpoint (CORS, rate limit, honeypot, Gemini)
lib/
  prompt.ts      brand/industry-aware prompt builder
  validate.ts    zod schema + rate limiter
  gemini.ts      Gemini call + response schema (industry-agnostic categories)
vercel.json      security headers + function maxDuration
```

## Tech decisions & rationale

| Decision | Choice | Why |
|----------|--------|-----|
| Frontend | Static HTML/CSS + tiny vanilla render engine | Instant load (speed = conversion), no build step, trivially hostable; the "fancy" is in CSS, not a framework. |
| White-label | Single `config.js` + CSS variables | One file reskins the whole site — the exact thing agencies resell. |
| Backend | Vercel serverless + TS | Smallest footprint for the one real feature; API key stays server-side. |
| LLM | Gemini 1.5 Flash | Fast, cheap per call, strong structured JSON output for the routing summary. |
| Booking | Drop-in scheduler slot | Embed Calendly/Cal.com; don't rebuild commodity scheduling. |

## Risks & mitigations

- **Prompt injection via the enquiry field** — input wrapped in XML tags, explicitly framed as data; lengths capped in zod. Production with compliance needs would add content filtering before the model.
- **Form spam** — honeypot + per-IP rate limit.
- **Config drift / typos** — `render.js` escapes all injected strings and tolerates missing optional fields; keep the zod schema and Gemini `responseSchema` in sync when changing categories.
- **Rate limiter is in-memory** — resets on cold start; fine for a low-traffic form, swap for a durable store (Upstash/KV) at scale.

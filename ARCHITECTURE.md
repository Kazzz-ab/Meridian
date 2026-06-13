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
2. The function applies a CORS allow-list, a honeypot check, and rate limiting via `ratelimit.ts` (dual-window in-memory: ≤4/min + ≤30/hour per IP; optional durable Upstash REST layer when env vars are set).
3. `validate.ts` (zod) enforces field shapes and caps lengths (enquiry ≤1500 chars); `brand`/`industry` are accepted as data only.
4. `prompt.ts` templates a brand/industry-aware intake prompt that **locks the model to enquiries + bookings only**, wrapping visitor input in XML tags framed as untrusted data (prompt-injection / jailbreak mitigation).
5. `gemini.ts` calls `gemini-1.5-flash` with a strict JSON `responseSchema` that includes an `onTopic` flag; categories are industry-agnostic (`new_business | booking | quote | support | complaint | other`).
6. **Server-side scope gate:** if `onTopic` is false, the model's text is discarded and a fixed on-brand refusal is returned; otherwise the acknowledgement is sanitised (code fences/markdown stripped) and hard-capped at 600 chars. `routingSummary` is available to pipe to a CRM/Slack/Sheet via webhook (not persisted in the demo).

Scope guard: stateless one-shot, not a chatbot, and not a general assistant — one input, one bounded, deterministic output shape.

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
  prompt.ts      brand/industry-aware, scope-locked prompt builder
  validate.ts    zod schema + input length caps
  gemini.ts      Gemini call + response schema + onTopic gate + output sanitiser
  ratelimit.ts   dual-window in-memory limiter + optional Upstash REST layer
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

- **Misuse as a free general assistant** (code gen, essays, planning, etc.) — the prompt locks scope to enquiries + bookings and the model returns an `onTopic` flag; off-topic input gets a server-supplied canned refusal, never the model's own text.
- **Prompt injection / jailbreak via the enquiry field** — input wrapped in XML tags, framed as untrusted data; instruction-override and impersonation attempts are treated as off-topic. Output is sanitised (no code fences/markdown) and length-capped.
- **Form spam / flooding** — honeypot + dual-window per-IP rate limit (in-memory always on; optional durable Upstash REST layer for cross-instance protection, fails open). At scale, enable Vercel WAF.
- **Config drift / typos** — `render.js` escapes all injected strings and tolerates missing optional fields; keep the zod schema and Gemini `responseSchema` in sync when changing categories.

# Meridian — Folder & File Structure

A hand-coded, **white-label landing system** for service businesses: a static front end whose every word and colour comes from one config file, plus a single serverless function for the AI intake. No Webflow, no framework, no build step for the site.

```
meridian-consult-service/
├── README.md               # product story, market-research receipts, reskin guide
├── ARCHITECTURE.md         # the two parts + white-label mechanism
├── STRUCTURE(meridian).md  # this file
├── SECURITY.md
├── .env.example            # required keys + optional UPSTASH_REDIS_REST_* (durable rate limit)
├── package.json
├── tsconfig.json
├── vercel.json             # security headers + function maxDuration
│
├── public/                 # the static site (served as-is)
│   ├── index.html          # structure + data-* slots only — zero hard-coded copy
│   ├── contact.html        # enquiry form + booking card (config-aware, self-contained JS)
│   ├── config.js           # ★ THE PRODUCT: every skin (brand, theme, copy) for all industries
│   ├── render.js           # render engine: theme + sections + demo animation + count-up + FAQ + switcher
│   └── style.css           # aurora / glass / bento design system, responsive + reduced-motion
│
├── api/
│   └── consult.ts          # serverless intake: CORS → rate limit → honeypot → validate → Gemini
│
└── lib/
    ├── prompt.ts           # scope-locked, brand/industry-aware prompt (injection-guarded)
    ├── validate.ts         # zod body validation (+ brand/industry) + honeypot + length caps
    ├── gemini.ts           # Gemini call + onTopic scope gate + output sanitiser
    └── ratelimit.ts        # dual-window in-memory limiter + optional Upstash REST layer
```

## The white-label mechanism

- **`public/config.js`** holds `MERIDIAN_CONFIG.industries[key]` — a complete skin per industry: `brand`, `theme` (3 colours), `hero`, `demo`, `marquee`, `stats`, `services`, `results`, `process`, `testimonials`, `pricing`, `guarantee`, `faq`, `cta`.
- **`render.js`** reads it, sets three CSS variables (`--accent`, `--accent-2`, `--accent-ink`), and paints every section. Switching industry re-themes and re-renders in place.
- Five skins ship: **consulting, law, dental, homeservices, fitness**. The on-page switcher (set `showIndustrySwitcher: false` to hide for a single-client build) and `?industry=<key>` / `localStorage` let you preview any of them.

## Reskin for a new client

1. Copy/edit an entry under `industries` in `public/config.js`.
2. Set `defaultIndustry`; set `showIndustrySwitcher: false` for production.
3. Deploy. No HTML/CSS/markup changes.

## Notes

- The **only server code** is `api/` + `lib/`. The site is plain static files.
- The contact form posts `{ name, email, enquiry, company?, brand, industry, honeypot }` to `/api/consult`; the function returns a tailored `acknowledgement` (shown to the visitor) and a `routingSummary` (for the business).
- Booking is a drop-in slot on `contact.html` — embed Calendly / Cal.com; commodity scheduling is not rebuilt.
- Routing categories are industry-agnostic: `new_business | booking | quote | support | complaint | other`. Keep the zod schema (`lib/validate.ts`) and Gemini `responseSchema` (`lib/gemini.ts`) in sync if you change them.

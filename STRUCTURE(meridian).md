# Meridian — Folder & File Structure

Two parts: the **Webflow project** (no repo — mapped here for reference) and the **AI form service** (the only actual repo).

## Webflow project (built in the Designer — structure map)

```
Meridian (Webflow)
├── Pages
│   ├── Home
│   ├── Services            (+ Service — CMS template page)
│   ├── Case Studies        (+ Case Study — CMS template page)
│   ├── About
│   └── Contact             (consultation form lives here)
├── CMS Collections
│   ├── Services            { name, summary, icon, details }
│   ├── Case Studies        { client, challenge, solution, roiMetric, roiValue }
│   ├── Testimonials        { quote, author, role, company }
│   └── Team                { name, role, photo, bio }
├── Symbols / Components
│   ├── Navbar
│   ├── Footer
│   ├── ServiceCard
│   ├── CaseStudyCard
│   └── ConsultationForm    (posts to the AI form service)
├── Variables (brand tokens)
│   ├── colors
│   ├── typography
│   └── spacing
└── Embeds
    ├── Calendly            (booking)
    └── Zapier/Make hook    (CRM/Sheet)
```

## AI form service (the repo)

```
meridian-consult-service/
├── ARCHITECTURE.md          # (shared with project root or linked)
├── CLAUDE.md
├── README.md                # endpoint URL, env setup, Webflow wiring notes
├── .env.example             # ANTHROPIC_API_KEY, ALLOWED_ORIGIN
├── package.json
├── tsconfig.json            # strict: true
├── vercel.json
│
├── api/
│   └── consult.ts           # the serverless function
│
└── lib/
    ├── prompt.ts            # Claude prompt + structured output schema (routing categories)
    ├── validate.ts          # zod body validation + rate limit + honeypot
    └── claude.ts            # Anthropic client + parse/validate response
```

## Notes
- The **only code** is `meridian-consult-service/`. Everything visual is Webflow.
- The Webflow `ConsultationForm` symbol posts to the deployed function URL (one config value).
- Reskinning to a new industry touches Webflow variables + CMS content + `lib/prompt.ts` routing categories — see `SKILL.md` (`reskin-services-template`).
- Client portal and real-time availability calendar are **deferred** — not represented here because they're out of scope for v1.
```

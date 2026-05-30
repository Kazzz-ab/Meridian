---
name: reskin-services-template
description: Reskin the Meridian professional-services template for a new industry or client (consulting, legal, financial advisory, agency, etc.) by swapping brand tokens, CMS content, and the AI form's routing categories — without rebuilding structure. Use this skill whenever you need to spin up a new vertical from the template, repurpose the site for a client, or adapt the consultation form's AI routing to a different service mix. Trigger it for requests like "make a version for a law firm", "reskin for financial advisors", or "adapt this template for client X".
---

# Reskin Services Template

Meridian is a reusable template. A new industry = content + brand tokens + form routing, never a structural rebuild. This skill is the checklist for doing that cleanly.

## What changes per reskin
1. **Brand tokens (Webflow):** colour variables, typography, logo. Defined as Webflow variables so they update site-wide from one place.
2. **CMS content:** repopulate `Services`, `Case Studies` (with industry-appropriate ROI metrics), `Testimonials`, `Team`.
3. **Copy:** hero, value props, trust signals adapted to the vertical's buyer.
4. **AI form routing (code):** update the routing categories and `suggestedService` options in `lib/prompt.ts` to match the new service mix.

## What does NOT change
- Page structure, layout, components/symbols.
- The serverless function's shape — only its prompt's category list.
- Booking/CRM embeds (Calendly/Zapier) — reconfigure accounts, not code.

## Steps
1. Duplicate the Webflow project.
2. Update brand variables + logo.
3. Clear and repopulate CMS collections with the new vertical's content.
4. Adjust hero/section copy for the vertical.
5. In the form service, edit `lib/prompt.ts` routing categories + suggested services; redeploy the function; point the new form at the new URL.
6. Reconnect Calendly + Zapier for the new client.

## Quality checks
- Every CMS collection is populated (no placeholder/lorem content).
- The AI form returns routing categories that match the new service mix.
- Mobile layout intact after content swap (long titles/copy don't break it).

## Do not
- Do not fork the page structure to "customise" — that defeats the template. Structure stays; content and tokens flex.
- Do not hardcode the form endpoint in multiple places — it's one env/config value.

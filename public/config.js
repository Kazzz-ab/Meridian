/* ═══════════════════════════════════════════════════════════════════════════
   MERIDIAN — White-label configuration
   ─────────────────────────────────────────────────────────────────────────────
   This file IS the product. Reskinning the entire site for a new client is:
     1. Duplicate a preset below (or edit one in place)
     2. Change brand, theme colours, and copy
     3. Deploy
   No HTML or CSS edits required. Every section of the page renders from here.
   ═══════════════════════════════════════════════════════════════════════════ */

window.MERIDIAN_CONFIG = {

  defaultIndustry: 'consulting',

  /* Shown on the floating demo switcher. Set to false when shipping a single
     client build — the switcher disappears and the site locks to defaultIndustry. */
  showIndustrySwitcher: true,

  industries: {

    /* ── 1 · CONSULTANCY (default skin) ─────────────────────────────────── */
    consulting: {
      label: 'Consultancy',
      brand: {
        name: 'Meridian',
        suffix: 'Advisory',
        email: 'hello@meridian-advisory.com',
        legal: 'Meridian Advisory Ltd.',
      },
      theme: { accent: '#f5c430', accent2: '#4ecdc4', accentInk: '#161003' },
      hero: {
        ratingScore: '4.9',
        ratingNote: 'across 120+ engagements',
        h1: 'Your next stage of growth,',
        h1Accent: 'mapped in 30 days.',
        sub: 'Meridian puts senior operators — not junior analysts — inside your hardest problems. Strategy, operations, and finance advice you can execute the Monday after.',
        ctaPrimary: 'Book a free discovery call',
        ctaSecondary: 'See how it works',
        trust: ['Replies in under 60 seconds', 'Free 45-minute first call', 'Fixed-fee proposals'],
      },
      demo: {
        heading: 'Every enquiry, answered in seconds',
        formName: 'Daniel Reyes',
        enquiry: 'We’re a 40-person SaaS company. CAC has doubled in 12 months and the board wants a plan by Q3. Can you help?',
        reply: 'Thanks Daniel — rising CAC at your stage usually traces to ICP drift, not channel fatigue. We’ve run this exact turnaround for three B2B SaaS teams. A senior partner will send relevant case notes over today.',
        chips: { category: 'New business', urgency: 'High', service: 'Strategy & Growth' },
        alert: 'Lead alert sent to partners',
        latency: '4.2s',
      },
      marquee: ['NorthBridge Capital', 'Halcyon Health', 'Vector Logistics', 'Atlas & Moor', 'Beacon Studios', 'Fairlight Group', 'Osprey Systems', 'Calder & Finch'],
      stats: [
        { value: 94, suffix: '%', label: 'Client satisfaction' },
        { value: 3.2, suffix: '×', decimals: 1, label: 'Average first-year ROI' },
        { value: 60, prefix: '<', suffix: 's', label: 'Enquiry response time' },
        { value: 38, prefix: '£', suffix: 'M', label: 'Client value unlocked' },
      ],
      services: {
        kicker: 'What we do',
        heading: 'Built around the problems that actually move your P&L',
        featured: {
          icon: 'zap',
          title: 'We reply before your competitors open the email.',
          text: '78% of buyers choose the firm that responds first — and most firms take a day. Enquire at midnight and get a considered, relevant answer in under a minute, with a senior partner following up the same day.',
          stat: '21×',
          statNote: 'more likely to convert when a lead is answered inside 5 minutes',
        },
        items: [
          { icon: 'trending-up', title: 'Strategy & Growth', text: 'A prioritised opportunity map, a 90-day execution plan, and a decision framework your team can run without us.' },
          { icon: 'settings-2', title: 'Operational Excellence', text: 'We surface the friction costing you time and margin, then build the SOPs and tooling that make the fix stick.' },
          { icon: 'landmark', title: 'Financial Advisory', text: 'Model builds, runway analysis, investor narrative, and pre-raise readiness that survives due diligence.' },
          { icon: 'cpu', title: 'Technology & AI', text: 'The two or three AI integrations that actually move your metrics — practical, commercial, maintainable.' },
        ],
        wide: [
          { icon: 'calendar-check', title: 'Book straight into a partner’s diary', text: 'No email ping-pong. Pick a slot online — evenings included — and it lands in a senior partner’s calendar, not a triage queue.' },
          { icon: 'list-checks', title: 'Every lead arrives pre-qualified', text: 'Our intake reads each enquiry and tags category, urgency, and the right service before the first call — so the first call counts.' },
        ],
      },
      results: {
        kicker: 'Proof, not promises',
        heading: 'Recent engagements, measured outcomes',
        items: [
          { tag: 'Strategy & Growth', metric: '40%', metricNote: 'shorter sales cycle', title: 'Repositioned ICP, rebuilt outbound', text: 'CAC was 3× benchmark and deals took 90 days. We repositioned the ICP, rebuilt outbound around a pain-first narrative, and added a product-led trial path.', client: 'Series A B2B SaaS' },
          { tag: 'Financial Advisory', metric: '£4.2M', metricNote: 'raised at target valuation', title: 'A model that survived the data room', text: 'Strong product, shaky numbers. We rebuilt the 5-year model from first principles and ran three rounds of mock investor Q&A before roadshow.', client: 'B2B FinTech startup' },
          { tag: 'Technology & AI', metric: '6 hrs', metricNote: 'saved per fee-earner, weekly', title: 'AI drafting pilot that stuck', text: 'Fee-earners lost 8 billable hours a week to document admin. A 6-week assisted-drafting pilot — with training and quality controls — won the sceptics over.', client: 'Mid-size law firm' },
        ],
      },
      process: {
        kicker: 'How it works',
        heading: 'Three steps. No mystery.',
        steps: [
          { title: 'Discovery call', text: '45 minutes with a senior partner — no junior handoff. We listen, ask hard questions, and tell you honestly whether we can help.' },
          { title: 'Fixed-fee proposal in 48h', text: 'Clear objectives, defined deliverables, a timeline, and a fixed fee. No sliding scope, no surprise invoices.' },
          { title: 'Embedded engagement', text: 'We work alongside your team, not around them. Every engagement ends with a 90-day plan your people run independently.' },
        ],
      },
      testimonials: {
        kicker: 'Client voices',
        heading: 'What it’s like to work with us',
        items: [
          { quote: 'Meridian gave us the strategic clarity we’d been missing for 18 months — in six weeks. The output was something we actually used.', name: 'Sarah K.', role: 'CEO, B2B SaaS startup' },
          { quote: 'Their financial modelling saved us from a round that would have diluted us badly. It changed how every investor responded to our unit economics.', name: 'Marcus T.', role: 'Founder, FinTech scale-up' },
          { quote: 'No fluff, no 200-slide deck. They found the three things that mattered, helped us fix them, and we’ve seen it in the P&L.', name: 'James R.', role: 'COO, professional services firm' },
        ],
      },
      pricing: {
        kicker: 'Transparent pricing',
        heading: 'Fixed fees, agreed up front',
        note: 'Every engagement starts with a free discovery call. The fee we quote is the fee you pay.',
        tiers: [
          { name: 'Diagnostic Sprint', price: '£4,800', period: 'fixed · 2 weeks', blurb: 'A senior pair of eyes on one defined problem.', features: ['Focused 2-week engagement', 'Written findings & opportunity map', '90-minute board-ready debrief', '30 days of follow-up questions'], cta: 'Start with a sprint' },
          { name: 'Growth Engagement', price: '£9,500', period: 'per month · 3-month min.', blurb: 'A senior operator embedded in your leadership rhythm.', features: ['Weekly working sessions on-site or remote', 'Execution support, not just advice', 'Direct partner access between sessions', '90-day plan handed to your team'], cta: 'Book a discovery call', featured: true },
          { name: 'Embedded Partner', price: 'from £24k', period: 'per quarter', blurb: 'Fractional leadership for a function in flight.', features: ['2 days per week alongside your team', 'Owns a metric, not a slide deck', 'Hiring & vendor support included', 'Quarterly board reporting'], cta: 'Discuss a partnership' },
        ],
      },
      guarantee: {
        icon: 'shield-check',
        title: 'The first-session promise',
        text: 'If you don’t leave the discovery call with at least one insight you can act on that week, we’ll tell you we’re not the right fit — and point you to whoever is. No charge, no chase-up emails.',
      },
      faq: {
        kicker: 'Questions, answered',
        heading: 'Before you ask',
        items: [
          { q: 'Who actually does the work?', a: 'The partner you meet on the discovery call. We don’t sell senior and staff junior — there are no juniors here. Every engagement is delivered by an operator with 10+ years running the function they’re advising on.' },
          { q: 'How do fixed fees work?', a: 'After the discovery call you get a written proposal: objectives, deliverables, timeline, and one number. If scope genuinely changes mid-engagement, we re-quote and you decide before any extra work starts.' },
          { q: 'What if you can’t help us?', a: 'We say so on the first call — about a third of enquiries end with us recommending someone else or nothing at all. A referral costs us nothing; a bad-fit engagement costs us a reputation.' },
          { q: 'Which industries do you cover?', a: 'B2B SaaS, financial services, professional services, logistics, and healthcare are the deepest benches. If your problem is growth, operations, or numbers, the playbook transfers; if it doesn’t, see the previous answer.' },
          { q: 'How is our information handled?', a: 'NDA before any materials change hands, your data stays in your systems wherever possible, and nothing — including the fact you spoke to us — is shared or used in marketing without written permission.' },
        ],
      },
      cta: {
        h: 'The next 12 months start with 45 minutes.',
        p: 'A free discovery call with a senior partner. Worst case: you leave with a sharper view of the problem and a reading list.',
        btn: 'Book your free call',
      },
    },

    /* ── 2 · LAW FIRM ───────────────────────────────────────────────────── */
    law: {
      label: 'Law firm',
      brand: {
        name: 'Hartwell & Grey',
        suffix: 'Commercial Law',
        email: 'enquiries@hartwellgrey.law',
        legal: 'Hartwell & Grey LLP.',
      },
      theme: { accent: '#2dd4a7', accent2: '#e6c79c', accentInk: '#04130e' },
      hero: {
        ratingScore: '4.9',
        ratingNote: 'from 200+ client reviews',
        h1: 'Legal certainty,',
        h1Accent: 'without the hourly anxiety.',
        sub: 'Fixed-fee commercial law for founders and growing companies. Senior solicitors, plain English, and answers the same day you ask — not billed by the six-minute unit.',
        ctaPrimary: 'Book a free case review',
        ctaSecondary: 'See how it works',
        trust: ['Replies in under 60 seconds', 'Fixed fees on every matter', 'Partner-led, always'],
      },
      demo: {
        heading: 'Every enquiry, answered in seconds',
        formName: 'Amara Osei',
        enquiry: 'We’re signing a distribution agreement next Friday and clause 14 (exclusivity) worries me. Can someone review it before then?',
        reply: 'Thanks Amara — pre-signature reviews are exactly what we’re for, and a week is plenty. A commercial contracts partner will confirm scope and a fixed fee within the hour.',
        chips: { category: 'Quote request', urgency: 'High', service: 'Contract review' },
        alert: 'Lead alert sent to partners',
        latency: '3.8s',
      },
      marquee: ['Brightline Ventures', 'Copperfield Foods', 'Mistral Robotics', 'The Foundry CoWork', 'Ashgrove Care Group', 'Pelican Press', 'Roam Mobility', 'Saltmarsh Hotels'],
      stats: [
        { value: 1200, suffix: '+', label: 'Contracts reviewed' },
        { value: 98, suffix: '%', label: 'Same-day response rate' },
        { value: 4.9, suffix: '★', decimals: 1, label: 'Average client rating' },
        { value: 0, prefix: '£', label: 'Surprise invoices, ever' },
      ],
      services: {
        kicker: 'What we do',
        heading: 'Commercial law that keeps pace with your roadmap',
        featured: {
          icon: 'zap',
          title: 'Most firms reply in three days. We reply before you close the tab.',
          text: '78% of clients instruct the first firm that responds properly. Send your question at midnight and get a relevant, reviewed answer in under a minute — with a named partner following up same-day.',
          stat: '21×',
          statNote: 'more likely to instruct when answered within 5 minutes',
        },
        items: [
          { icon: 'scroll-text', title: 'Commercial Contracts', text: 'Drafting, review, and negotiation — supplier, distribution, SaaS, and partnership agreements that hold up under pressure.' },
          { icon: 'users', title: 'Employment & HR', text: 'Contracts, policies, exits, and disputes. Protect the company without poisoning the culture.' },
          { icon: 'shield-check', title: 'Data & Privacy', text: 'GDPR programmes, DPAs, and breach response. Compliance that satisfies regulators and enterprise procurement alike.' },
          { icon: 'scale', title: 'Disputes & Resolution', text: 'Commercial disputes handled with a settlement-first mindset — court is a tool, not a destination.' },
        ],
        wide: [
          { icon: 'calendar-check', title: 'Book a partner, not a callback', text: 'Pick a slot online and it lands directly in a partner’s diary. Evening consultations available for founders who run on founder time.' },
          { icon: 'list-checks', title: 'Your matter, triaged before we speak', text: 'Our intake reads each enquiry and tags matter type, urgency, and the right specialist before the first call — so the clock never runs on admin.' },
        ],
      },
      results: {
        kicker: 'Proof, not promises',
        heading: 'Recent matters, real outcomes',
        items: [
          { tag: 'Commercial Contracts', metric: '£180k', metricNote: 'liability exposure removed', title: 'The clause 14 that almost slipped through', text: 'A distribution agreement carried uncapped indemnities and a silent auto-renewal. Re-negotiated pre-signature in four working days.', client: 'Consumer goods scale-up' },
          { tag: 'Employment', metric: '0', metricNote: 'tribunal claims in 3 years', title: 'A clean-up that prevented the lawsuits', text: 'Inherited contracts contradicted the handbook in 14 places. One restructuring later, three years and counting without a single claim.', client: 'Hospitality group, 200 staff' },
          { tag: 'Data & Privacy', metric: '6 wks', metricNote: 'to enterprise-ready compliance', title: 'GDPR programme that closed the deal', text: 'An enterprise prospect’s security questionnaire stalled a six-figure contract. We built the privacy programme that unblocked it.', client: 'B2B SaaS, Series A' },
        ],
      },
      process: {
        kicker: 'How it works',
        heading: 'Three steps. No six-minute units.',
        steps: [
          { title: 'Free case review', text: '30 minutes with a partner who has handled your type of matter before. Plain-English assessment, honest odds, no obligation.' },
          { title: 'Fixed fee in writing', text: 'Scope, timeline, and one number — before any work starts. If the matter grows, we re-quote and you decide.' },
          { title: 'Partner-led delivery', text: 'The partner you met does the work. Weekly progress notes in plain English, and your documents in a shared folder you control.' },
        ],
      },
      testimonials: {
        kicker: 'Client voices',
        heading: 'What clients say',
        items: [
          { quote: 'Every other firm quoted a range and billed the top of it. Hartwell & Grey quoted one number and that was the invoice. Revolutionary, apparently.', name: 'Tom B.', role: 'Founder, logistics startup' },
          { quote: 'They reviewed our investment docs in five days, flagged two clauses our previous firm had waved through, and explained both over one call.', name: 'Lena M.', role: 'CEO, robotics company' },
          { quote: 'It’s the response time. You send a worried email at 11pm and something useful comes back before you’ve made tea. That’s worth the retainer alone.', name: 'Priya S.', role: 'COO, care group' },
        ],
      },
      pricing: {
        kicker: 'Transparent pricing',
        heading: 'One number, in writing, before we start',
        note: 'Every matter starts with a free case review. Fixed means fixed — see our guarantee below.',
        tiers: [
          { name: 'Contract Review', price: 'from £450', period: 'fixed per document', blurb: 'A partner’s eyes on it before you sign.', features: ['48-hour standard turnaround', 'Plain-English risk summary', 'Negotiation points ranked by leverage', 'One follow-up call included'], cta: 'Get a fixed quote' },
          { name: 'Counsel Subscription', price: '£1,200', period: 'per month · cancel anytime', blurb: 'A law firm on tap, without the meter.', features: ['Unlimited 30-minute consultations', '48-hour document turnaround', 'Annual contract & policy health check', 'Priority access for urgent matters'], cta: 'Book a case review', featured: true },
          { name: 'Deal & Project Support', price: 'from £5,000', period: 'fixed per project', blurb: 'Raises, acquisitions, restructures — scoped end to end.', features: ['Dedicated partner team', 'Data-room build & management', 'All documents drafted & negotiated', 'Weekly plain-English progress notes'], cta: 'Discuss your deal' },
        ],
      },
      guarantee: {
        icon: 'shield-check',
        title: 'Fixed means fixed',
        text: 'The fee we quote is the fee you pay. If a matter genuinely grows beyond the agreed scope, we stop, re-quote, and you decide — work never continues on an open meter. In eleven years, no client has ever received an invoice they hadn’t already approved.',
      },
      faq: {
        kicker: 'Questions, answered',
        heading: 'Before you ask',
        items: [
          { q: 'Are you regulated?', a: 'Yes — Hartwell & Grey LLP is authorised and regulated by the Solicitors Regulation Authority. Every matter is supervised by a qualified partner and covered by full professional indemnity insurance.' },
          { q: 'How can fees be fixed when matters are unpredictable?', a: 'Eleven years of scoping data. We price from hundreds of comparable matters, build in a sensible buffer, and absorb the variance ourselves. When something truly out-of-scope appears, we pause and re-quote before continuing.' },
          { q: 'What happens with genuinely urgent matters?', a: 'Tell the intake form it’s urgent — it routes ahead of the queue and a partner calls you back the same working day. Out of hours, subscription clients have a direct partner line.' },
          { q: 'Will I actually deal with a partner?', a: 'Yes. The partner on your free case review runs your matter. We keep leverage low on purpose — it’s why responses are fast and advice is consistent.' },
          { q: 'How is our information handled?', a: 'Everything you send is privileged and confidential from the first message — before any engagement letter. Documents live in an encrypted client folder that you control access to.' },
        ],
      },
      cta: {
        h: 'Stop drafting that worried email to nobody.',
        p: 'Send it to us instead. Free 30-minute case review with a partner, and an answer that starts in plain English.',
        btn: 'Book your free case review',
      },
    },

    /* ── 3 · DENTAL CLINIC ──────────────────────────────────────────────── */
    dental: {
      label: 'Dental clinic',
      brand: {
        name: 'Brightway',
        suffix: 'Dental Studio',
        email: 'smile@brightwaydental.co.uk',
        legal: 'Brightway Dental Studio Ltd.',
      },
      theme: { accent: '#38bdf8', accent2: '#5eead4', accentInk: '#03121c' },
      hero: {
        ratingScore: '4.9',
        ratingNote: 'from 340+ Google reviews',
        h1: 'The dentist your family',
        h1Accent: 'actually looks forward to.',
        sub: 'Modern, gentle dentistry with same-week appointments, prices on the wall, and a team that explains everything before anything happens. Nervous patients are our speciality.',
        ctaPrimary: 'Book an appointment',
        ctaSecondary: 'See how it works',
        trust: ['Same-week appointments', 'Prices published up front', '0% interest payment plans'],
      },
      demo: {
        heading: 'Every enquiry, answered in seconds',
        formName: 'Sofia Marsh',
        enquiry: 'My crown came off this morning and I have a wedding on Saturday — can you fit me in this week?',
        reply: 'Oh no — don’t worry Sofia, a debonded crown is usually a quick, painless fix. We hold same-day emergency slots every morning; the next is tomorrow at 9:20. Bring the crown if you still have it!',
        chips: { category: 'Booking', urgency: 'Urgent', service: 'Emergency repair' },
        alert: 'Booking alert sent to reception',
        latency: '3.5s',
      },
      marquee: ['4.9★ on Google — 340 reviews', 'CQC Registered', 'Invisalign Provider', 'Denplan Accepted', 'Nervous Patients Welcome', '0% Finance Available', 'Same-day Emergencies', 'Family Plans'],
      stats: [
        { value: 12, suffix: ',000+', label: 'Patients cared for' },
        { value: 4.9, suffix: '★', decimals: 1, label: 'Google rating' },
        { value: 24, prefix: '<', suffix: 'h', label: 'Emergency slot wait' },
        { value: 15, suffix: ' yrs', label: 'Serving the community' },
      ],
      services: {
        kicker: 'What we do',
        heading: 'Every smile, every stage, one studio',
        featured: {
          icon: 'zap',
          title: 'Toothache at midnight? You’ll have an answer by 12:01.',
          text: 'Dental worries don’t keep office hours. Message us any time and get a real, reassuring answer in seconds — including whether it can wait, and the first available slot if it can’t.',
          stat: '78%',
          statNote: 'of patients choose the practice that responds first',
        },
        items: [
          { icon: 'heart-pulse', title: 'General & Family', text: 'Exams, hygiene, fillings, and check-ups for all ages — gentle with kids, patient with the nervous.' },
          { icon: 'sparkles', title: 'Cosmetic & Whitening', text: 'Professional whitening, bonding, and veneers. Natural results, never the piano-key look.' },
          { icon: 'smile', title: 'Invisalign & Ortho', text: 'Discreet aligners with 3D before-and-after previews — see your result before you commit.' },
          { icon: 'layers', title: 'Implants & Restorative', text: 'Crowns, bridges, and implants that look, feel, and bite like the real thing.' },
        ],
        wide: [
          { icon: 'calendar-check', title: 'Book online, even at 2am', text: 'Real-time diary, real appointments — evenings and Saturdays included. No phone queue, no callback roulette.' },
          { icon: 'list-checks', title: 'Reception knows before you arrive', text: 'Your enquiry is tagged by need and urgency the moment you send it, so emergencies jump the queue and check-ups land with the right clinician.' },
        ],
      },
      results: {
        kicker: 'Proof, not promises',
        heading: 'Real patients, real outcomes',
        items: [
          { tag: 'Nervous patients', metric: '9 yrs', metricNote: 'since her last visit — now a regular', title: 'From phobia to six-month check-ups', text: 'A patient who hadn’t seen a dentist in nine years finished a full treatment plan in four judgement-free visits — and has kept every check-up since.', client: 'Patient story · shared with permission' },
          { tag: 'Invisalign', metric: '14 mo', metricNote: 'to a wedding-day smile', title: 'Aligned in time for the aisle', text: 'Crowded front teeth, a wedding deadline, and a 3D preview that sealed the decision. Finished two months ahead of schedule.', client: 'Patient story · shared with permission' },
          { tag: 'Emergency care', metric: '94%', metricNote: 'of emergencies seen same day', title: 'The same-day promise, kept', text: 'Morning emergency slots are held back every single day — because a cracked tooth shouldn’t wait until a cancellation shows up.', client: 'Practice data, last 12 months' },
        ],
      },
      process: {
        kicker: 'How it works',
        heading: 'Three steps to a healthier smile',
        steps: [
          { title: 'Book online in 60 seconds', text: 'Pick a time that suits you — evenings and Saturdays included. Tell us if you’re nervous; we’ll plan around it.' },
          { title: 'An exam that explains', text: 'Photos, plain-English findings, and a written plan with prices. You’ll understand everything before deciding anything.' },
          { title: 'Treatment at your pace', text: 'No pressure, no upselling. Spread costs with 0% finance and book follow-ups around your life.' },
        ],
      },
      testimonials: {
        kicker: 'Patient voices',
        heading: 'What patients say',
        items: [
          { quote: 'I hadn’t been to a dentist in years and was braced for a lecture. Instead: “glad you’re here, let’s make a plan.” I nearly cried with relief.', name: 'Hannah W.', role: 'Patient since 2024' },
          { quote: 'Booked online at midnight for my son’s toothache, had a reply in seconds and a chair by 9am. The school run still happened. Witchcraft.', name: 'Dev P.', role: 'Dad of two' },
          { quote: 'They showed me my Invisalign end result in 3D before I paid a penny. Fourteen months later my teeth match the preview. Exactly.', name: 'Chloe R.', role: 'Invisalign patient' },
        ],
      },
      pricing: {
        kicker: 'Transparent pricing',
        heading: 'Prices on the wall, not in the small print',
        note: 'Every plan is written down with costs before treatment starts. 0% interest plans available on treatments over £500.',
        tiers: [
          { name: 'New Patient Exam', price: '£75', period: 'one-off · 40 minutes', blurb: 'The honest once-over, with photos and a plan.', features: ['Full exam with digital X-rays', 'Photos of anything we find', 'Written plan with exact prices', 'No-lecture guarantee'], cta: 'Book your exam' },
          { name: 'Brightway Membership', price: '£16.50', period: 'per month', blurb: 'Routine care covered, year-round.', features: ['2 exams + 2 hygiene visits a year', '10% off all treatment', 'Free emergency assessments', 'Family discounts from 2+ members'], cta: 'Join the plan', featured: true },
          { name: 'Whitening', price: 'from £295', period: 'fixed package', blurb: 'Professional results, sensitivity managed.', features: ['Custom-made trays', 'Professional-grade gel', 'Shade check at 2 weeks', 'Top-up syringes at cost'], cta: 'Brighten up' },
        ],
      },
      guarantee: {
        icon: 'shield-check',
        title: 'The no-lecture guarantee',
        text: 'Tell us it’s been five years. Tell us it’s been fifteen. You will not get a telling-off at Brightway — you’ll get a “glad you’re here”, a gentle exam, and a plan that goes exactly at your pace. Judgement-free is a policy here, not a poster.',
      },
      faq: {
        kicker: 'Questions, answered',
        heading: 'Before you ask',
        items: [
          { q: 'I’m really nervous. Honestly, how do you handle that?', a: 'You tell us once and it’s on your file forever: longer appointments, everything explained before it happens, an agreed stop signal, and the same clinician every visit. Many of our favourite regulars arrived terrified.' },
          { q: 'How fast can I be seen in an emergency?', a: 'We hold same-day emergency slots every morning. Message any time — the intake assistant replies instantly with the next slot, and 94% of emergencies are seen the same day.' },
          { q: 'How do the payment plans work?', a: '0% interest over up to 12 months on any treatment over £500, arranged at the practice in five minutes. The membership plan also takes 10% off everything.' },
          { q: 'Do you take NHS patients?', a: 'We’re a private practice, which is how we keep appointment times long and waits short. Our membership plan keeps routine care close to NHS pricing — most patients are pleasantly surprised.' },
          { q: 'Can I really book online — properly book?', a: 'Yes — the calendar shows the real diary in real time. The slot you pick is the slot you get, confirmed instantly, with reminders by text so life doesn’t get in the way.' },
        ],
      },
      cta: {
        h: 'Your future self has great teeth.',
        p: 'Book a judgement-free exam in 60 seconds — evenings and Saturdays included.',
        btn: 'Book an appointment',
      },
    },

    /* ── 4 · HOME SERVICES ──────────────────────────────────────────────── */
    homeservices: {
      label: 'Home services',
      brand: {
        name: 'Summit',
        suffix: 'Home Services',
        email: 'help@summithome.co.uk',
        legal: 'Summit Home Services Ltd.',
      },
      theme: { accent: '#fb923c', accent2: '#fbbf24', accentInk: '#1a0d02' },
      hero: {
        ratingScore: '4.9',
        ratingNote: 'from 600+ local reviews',
        h1: 'Fixed right today —',
        h1Accent: 'or the callout’s on us.',
        sub: 'Gas Safe heating, plumbing, and electrical for local homes. Real arrival windows, upfront pricing, and engineers who put dust sheets down and tidy up after themselves.',
        ctaPrimary: 'Get a fast quote',
        ctaSecondary: 'See how it works',
        trust: ['Replies in under 60 seconds', '92% fixed on the first visit', '12-month workmanship guarantee'],
      },
      demo: {
        heading: 'Every enquiry, answered in seconds',
        formName: 'Mark Ellison',
        enquiry: 'Our boiler’s showing error E119 and the house is freezing — how soon can someone come out?',
        reply: 'Sorry to hear that, Mark — E119 is usually low water pressure and often a 30-minute fix. We’ve got an engineer in your area tomorrow 8–10am. We’ll text when he’s 20 minutes out.',
        chips: { category: 'Quote request', urgency: 'Urgent', service: 'Boiler repair' },
        alert: 'Job alert sent to dispatch',
        latency: '4.1s',
      },
      marquee: ['Gas Safe Registered', 'NICEIC Approved', 'Which? Trusted Trader', 'Checkatrade 9.8/10', '12-Month Guarantee', '4.9★ — 600+ reviews', 'Fixed-Price Quotes', 'Local for 20 Years'],
      stats: [
        { value: 92, suffix: '%', label: 'First-visit fix rate' },
        { value: 45, suffix: 'min', label: 'Avg. emergency response' },
        { value: 4.9, suffix: '★', decimals: 1, label: 'Across 600+ reviews' },
        { value: 12, suffix: 'mo', label: 'Guarantee on all work' },
      ],
      services: {
        kicker: 'What we do',
        heading: 'One number for everything your house throws at you',
        featured: {
          icon: 'zap',
          title: 'A burst pipe doesn’t wait for opening hours. Neither do we.',
          text: 'Message us at 3am about water through the ceiling and get an instant answer: what to switch off right now, whether it’s an emergency, and the first engineer slot — before the kettle’s boiled.',
          stat: '78%',
          statNote: 'of homeowners hire whoever responds first',
        },
        items: [
          { icon: 'flame', title: 'Boilers & Heating', text: 'Repairs, servicing, and full installs. All major brands, Gas Safe registered, and honest advice on repair vs replace.' },
          { icon: 'droplets', title: 'Plumbing & Bathrooms', text: 'From dripping taps to full bathroom refits — leak-free, on schedule, and signed off with photos.' },
          { icon: 'plug-zap', title: 'Electrical & EV', text: 'Rewires, fuse boards, fault-finding, and EV charger installs. NICEIC approved, certificates included.' },
          { icon: 'siren', title: 'Emergency Callouts', text: 'No heat, no water, no power — priority response with a 45-minute average arrival across our patch.' },
        ],
        wide: [
          { icon: 'calendar-check', title: 'Pick a real arrival window online', text: 'Two-hour windows you choose yourself, confirmed instantly, with a text when your engineer is 20 minutes away. No “sometime between 8 and 6”.' },
          { icon: 'list-checks', title: 'The right van, first time', text: 'Your enquiry is read and tagged instantly — job type, urgency, likely parts — so the engineer who arrives has the right kit on board to fix it on visit one.' },
        ],
      },
      results: {
        kicker: 'Proof, not promises',
        heading: 'Last month, by the numbers',
        items: [
          { tag: 'Emergency response', metric: '38min', metricNote: 'fastest no-heat callout', title: 'Freezing house to warm by lunch', text: 'E119 error reported at 8:04am, engineer on the drive by 8:42, system re-pressurised and radiators hot before midday. Customer’s words: “witchcraft.”', client: 'Boiler repair · last month' },
          { tag: 'First-visit fix', metric: '92%', metricNote: 'of jobs done in one visit', title: 'Because the van is stocked for your job', text: 'Pre-tagged enquiries mean the engineer arrives with the likely parts already on board. Fewer return visits, smaller bills, faster fixes.', client: 'Rolling 12-month average' },
          { tag: 'Bathroom refit', metric: '9 days', metricNote: 'quote to finished bathroom', title: 'A refit that finished early', text: 'Full bathroom strip-out and refit, quoted fixed, finished a day ahead of schedule — with photos at every stage in the shared job log.', client: 'Family home · 3-bed semi' },
        ],
      },
      process: {
        kicker: 'How it works',
        heading: 'Three steps to sorted',
        steps: [
          { title: 'Tell us what’s wrong', text: 'Message, photo, or 60-second form — any time. You’ll get an instant answer on urgency and the next available window.' },
          { title: 'Fixed price before we start', text: 'The price is agreed before tools come out. Parts itemised, no day rates, no “while we’re here” extras.' },
          { title: 'Fixed, photographed, guaranteed', text: 'Work photographed before and after, area left tidy, and everything covered by a 12-month workmanship guarantee.' },
        ],
      },
      testimonials: {
        kicker: 'Local voices',
        heading: 'What your neighbours say',
        items: [
          { quote: 'Boiler died Sunday night. Sent a message at 11pm expecting nothing — instant reply telling me which valve to check, engineer here Monday 8am. Sorted by 9.', name: 'Gemma L.', role: 'Homeowner, Oakfield Road' },
          { quote: 'The quote was the bill. To the penny. After thirty years of “it ended up being a bit more, mate”, I nearly framed the invoice.', name: 'Ray D.', role: 'Landlord, 4 properties' },
          { quote: 'Overshoes on at the door, dust sheets everywhere, swept up after. My mum now asks for “the tidy one” by name.', name: 'Sandra K.', role: 'Booked for her mum' },
        ],
      },
      pricing: {
        kicker: 'Transparent pricing',
        heading: 'Prices you can check before you call',
        note: 'Every job gets a fixed price in writing before work starts. No day rates, no hourly creep.',
        tiers: [
          { name: 'Standard Callout', price: '£75', period: 'includes first 30 min', blurb: 'Diagnosis and small fixes, often in one visit.', features: ['2-hour arrival window you choose', 'Diagnosis + fixed quote on the spot', 'Waived if you proceed with the work', 'Evenings & weekends available'], cta: 'Book a callout' },
          { name: 'HomeCare Plan', price: '£24', period: 'per month', blurb: 'Your home’s boiler, pipes & wiring — covered.', features: ['Annual boiler service included', 'No callout fees, ever', 'Priority emergency response', '15% off all parts & labour'], cta: 'Cover my home', featured: true },
          { name: 'Boiler Service', price: '£95', period: 'fixed · 60 minutes', blurb: 'The annual once-over that prevents the 3am failure.', features: ['Full Gas Safe inspection & flue check', 'Efficiency tune-up', 'Digital certificate same day', 'Reminder next year — automatic'], cta: 'Book a service' },
        ],
      },
      guarantee: {
        icon: 'shield-check',
        title: 'The tidy-boots guarantee',
        text: 'Overshoes on at the door, dust sheets down before tools come out, photos of the work before and after, and the area swept when we leave. If anything we fixed fails within 12 months, we come back and make it right — free, no quibble, no small print.',
      },
      faq: {
        kicker: 'Questions, answered',
        heading: 'Before you ask',
        items: [
          { q: 'How fast can you get here in an emergency?', a: 'Across our coverage area we average 45 minutes for genuine emergencies — no heat, no water, no power, or anything leaking fast. The instant reply tells you what to switch off while the van’s on its way.' },
          { q: 'Is the price really fixed?', a: 'Yes. You approve a written fixed price before work starts. If we open something up and find a bigger job, we stop, show you photos, and re-quote — you decide before anything continues.' },
          { q: 'Are you certified?', a: 'Gas Safe registered for all gas work, NICEIC approved for electrical, and fully insured. Certificate numbers are on every quote and every invoice — check them, we encourage it.' },
          { q: 'What does the guarantee cover?', a: 'All workmanship for 12 months. If something we repaired or installed fails in normal use, we return and fix it free. Parts carry the manufacturer’s warranty on top.' },
          { q: 'Which areas do you cover?', a: 'Roughly a 15-mile radius of town — the postcode checker on the booking form confirms instantly. Outside the patch we’ll say so straight away and suggest someone good.' },
        ],
      },
      cta: {
        h: 'That noise isn’t going to fix itself.',
        p: 'Tell us what’s wrong — get an instant answer and a real arrival window in under a minute.',
        btn: 'Get a fast quote',
      },
    },

    /* ── 5 · FITNESS STUDIO ─────────────────────────────────────────────── */
    fitness: {
      label: 'Fitness studio',
      brand: {
        name: 'Forma',
        suffix: 'Strength Studio',
        email: 'coach@formastudio.fit',
        legal: 'Forma Studio Ltd.',
      },
      theme: { accent: '#a78bfa', accent2: '#f472b6', accentInk: '#120a24' },
      hero: {
        ratingScore: '4.9',
        ratingNote: 'from 280+ member reviews',
        h1: 'Visibly stronger in 12 weeks —',
        h1Accent: 'or your money back.',
        sub: 'Small-group strength coaching, capped at six people per session. Programmes built around your body and your week — and coaches who know your name by the warm-up.',
        ctaPrimary: 'Claim a free first session',
        ctaSecondary: 'See how it works',
        trust: ['Free 1-on-1 first session', 'Max 6 people per class', 'Cancel anytime — no contracts'],
      },
      demo: {
        heading: 'Every enquiry, answered in seconds',
        formName: 'Jess Tran',
        enquiry: 'I haven’t trained since before my second kid and honestly the gym intimidates me. Is this for beginners?',
        reply: 'Hi Jess — most of our members started exactly where you are. Your first session is a free 1-on-1 with a coach: no class, no audience, no judgement. We build from whatever today’s level is.',
        chips: { category: 'New member', urgency: 'Warm lead', service: 'Foundations programme' },
        alert: 'Lead alert sent to coaching team',
        latency: '3.6s',
      },
      marquee: ['Max 6 Per Session', 'Level 4 Certified Coaches', '4.9★ — 280 reviews', '12-Week Money-Back Promise', 'Free First Session', 'Open 6am–9pm', 'No Contracts', 'Beginners Welcome'],
      stats: [
        { value: 280, suffix: '+', label: 'Members coached' },
        { value: 92, suffix: '%', label: 'Still training at 6 months' },
        { value: 6, prefix: 'max ', label: 'People per session' },
        { value: 12, suffix: 'wk', label: 'Money-back promise' },
      ],
      services: {
        kicker: 'What we do',
        heading: 'Coaching, not crowd control',
        featured: {
          icon: 'zap',
          title: 'The hardest rep is the first message. We make it easy.',
          text: 'Ask us anything — “is this for beginners?”, “what about my dodgy knee?” — at any hour, and get a real, kind answer in seconds. Then a coach follows up personally the same day.',
          stat: '78%',
          statNote: 'of people join the studio that replies first',
        },
        items: [
          { icon: 'dumbbell', title: 'Small-Group Strength', text: 'Six people, one coach, your own programme on the board. Group energy, personal attention.' },
          { icon: 'user-check', title: '1-on-1 Coaching', text: 'Fully personal programming for specific goals, rehab journeys, or nerves that need a quieter room.' },
          { icon: 'apple', title: 'Nutrition Coaching', text: 'No meal-prep cults. Habit-based nutrition that survives birthdays, holidays, and toddlers.' },
          { icon: 'activity', title: 'Mobility & Recovery', text: 'Move better, ache less. Weekly mobility sessions and recovery programming built into every plan.' },
        ],
        wide: [
          { icon: 'calendar-check', title: 'Book sessions like cinema seats', text: 'See the week’s timetable, see the spaces left, tap to book. Life happens — swap sessions up to two hours before, free.' },
          { icon: 'list-checks', title: 'Your coach knows before you walk in', text: 'Goals, injuries, and how your week’s gone — logged from your first message, so every session starts where the last one ended.' },
        ],
      },
      results: {
        kicker: 'Proof, not promises',
        heading: 'Member results, measured',
        items: [
          { tag: 'Strength', metric: '+42kg', metricNote: 'average deadlift gain in 6 months', title: 'Strength that shows up everywhere', text: 'Tracked across all members completing the first two Foundations blocks. The carry-the-shopping-in-one-trip effect is undefeated.', client: 'Member cohort data, 2025' },
          { tag: 'Consistency', metric: '92%', metricNote: 'of members still training at 6 months', title: 'The retention stat gyms hide', text: 'Industry average is under 50%. Caps of six per session mean someone notices when you’re missing — and texts you.', client: 'Studio data, rolling 12 months' },
          { tag: 'Comeback story', metric: '12 wks', metricNote: 'from “terrified” to first pull-up', title: 'Jess’s first pull-up', text: 'The same Jess from the message above. Free 1-on-1 first session, Foundations block, and a first strict pull-up on week 12. There was applause.', client: 'Shared with permission (she insisted)' },
        ],
      },
      process: {
        kicker: 'How it works',
        heading: 'Three steps to stronger',
        steps: [
          { title: 'Free 1-on-1 first session', text: 'No class, no audience. A coach, a chat about goals and history, and a gentle first workout matched to today’s you.' },
          { title: 'Your programme, your timetable', text: 'A personal programme on the board every session, booked around your week. Max six people means the coach actually coaches.' },
          { title: 'Progress you can see', text: 'Strength numbers, photos if you want them, and a 12-week review. Not stronger by then? Money back — genuinely.' },
        ],
      },
      testimonials: {
        kicker: 'Member voices',
        heading: 'What members say',
        items: [
          { quote: 'I typed “is this for unfit people” at midnight, cringing. The reply was so kind I booked on the spot. Eight months in, I deadlift my bodyweight.', name: 'Jess T.', role: 'Member since 2025' },
          { quote: 'Six people max is the whole magic. The coach saw my knee cave on rep one and fixed it on rep two. At my old gym I’d have been injured by March.', name: 'Owen H.', role: 'Ex-big-box-gym convert' },
          { quote: 'They text you when you miss a week. Not a marketing text — your actual coach asking if you’re alright. That’s why I’m still here.', name: 'Marta V.', role: 'Member since 2024' },
        ],
      },
      pricing: {
        kicker: 'Transparent pricing',
        heading: 'Simple prices, no contracts',
        note: 'Everything starts with a free 1-on-1 session. No joining fees, no notice periods, cancel from your phone.',
        tiers: [
          { name: 'Foundations', price: '£120', period: '4-week starter block', blurb: 'The on-ramp for returners and beginners.', features: ['2 coached sessions per week', 'Personal programme from day one', 'Mobility plan included', 'Graduates into any membership'], cta: 'Start Foundations' },
          { name: 'Unlimited', price: '£89', period: 'per month · cancel anytime', blurb: 'All sessions, all programming, all in.', features: ['Unlimited small-group sessions', 'Quarterly 1-on-1 programme review', 'Nutrition habits programme', 'Free session swaps & holds'], cta: 'Claim free session', featured: true },
          { name: '1-on-1 Coaching', price: 'from £45', period: 'per session', blurb: 'Private coaching for specific goals.', features: ['Fully personal programming', 'Flexible scheduling 6am–9pm', 'Rehab-friendly & post-natal certified', 'Pairs discount available'], cta: 'Book a coach' },
        ],
      },
      guarantee: {
        icon: 'shield-check',
        title: 'The 12-week promise',
        text: 'Train with us consistently for 12 weeks — that’s two sessions a week — and if you’re not measurably stronger and genuinely glad you started, we refund your membership in full. We can make this promise because in three years, two people have asked. Both came back.',
      },
      faq: {
        kicker: 'Questions, answered',
        heading: 'Before you ask',
        items: [
          { q: 'I’m a complete beginner. Will I be the odd one out?', a: 'You’ll be the majority. Most members arrived having not trained in years — it’s why the first session is 1-on-1 and why programmes are individual. Nobody is keeping up with anybody.' },
          { q: 'What does “max 6 per session” actually mean?', a: 'Exactly six bookable spaces per timetable slot, enforced by the booking system. Your coach watches every working set — that’s the point, and it’s why members stay.' },
          { q: 'Can I really cancel anytime?', a: 'Yes — from your phone, effective at the end of the billing month, no notice period, no exit interview. You can also freeze for up to two months a year for life events.' },
          { q: 'I have an old injury. Can you work around it?', a: 'Almost always — our coaches hold Level 4 qualifications including lower-back and pre/post-natal specialisms. Mention it in your first message and your coach plans around it from session one.' },
          { q: 'What should I bring to the free session?', a: 'Trainers, water, and clothes you can move in. We’ll handle everything else, including the nerves. Showers and lockers on site.' },
        ],
      },
      cta: {
        h: 'Twelve weeks from now, you’ll wish you’d started today.',
        p: 'Free 1-on-1 first session. No class, no audience, no contract — just a coach and a plan.',
        btn: 'Claim your free session',
      },
    },
  },
};

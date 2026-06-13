/* ═══════════════════════════════════════════════════════════════════════════
   MERIDIAN — render engine
   Reads window.MERIDIAN_CONFIG and paints every section. Switching industry
   re-themes (CSS vars) and re-renders in place. State is shared with the
   contact page via localStorage so a chosen skin persists across the site.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  const CFG = window.MERIDIAN_CONFIG;
  const STORE_KEY = 'meridian-industry';
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* which skin to show: URL ?industry= → localStorage → default */
  function pickIndustry() {
    const url = new URLSearchParams(location.search).get('industry');
    const saved = localStorage.getItem(STORE_KEY);
    const want = url || saved || CFG.defaultIndustry;
    return CFG.industries[want] ? want : CFG.defaultIndustry;
  }

  /* ── THEME ──────────────────────────────────────────────────────────────── */
  function applyTheme(d) {
    const r = document.documentElement.style;
    r.setProperty('--accent', d.theme.accent);
    r.setProperty('--accent-2', d.theme.accent2);
    r.setProperty('--accent-ink', d.theme.accentInk);
  }

  /* ── small helpers ──────────────────────────────────────────────────────── */
  function fill(attr, obj) {
    $$(`[data-${attr}]`).forEach(el => {
      const key = el.getAttribute(`data-${attr}`);
      if (obj[key] != null && typeof obj[key] === 'string') el.textContent = obj[key];
    });
  }
  function icon(name) { return `<i data-lucide="${esc(name)}"></i>`; }

  /* ── BRAND ──────────────────────────────────────────────────────────────── */
  function renderBrand(b) {
    $$('[data-brand="name"]').forEach(el => el.textContent = b.name);
    $$('[data-brand="suffix"]').forEach(el => el.textContent = b.suffix);
    $$('[data-brand="email"]').forEach(el => el.textContent = b.email);
    $$('[data-brand="legal"]').forEach(el => el.textContent = b.legal);
    $$('[data-brand="emailLink"]').forEach(el => el.setAttribute('href', 'mailto:' + b.email));
    document.title = `${b.name} — Turn enquiries into booked clients`;
  }

  /* ── HERO ───────────────────────────────────────────────────────────────── */
  function renderHero(h) {
    fill('hero', h);
    const trust = $('[data-hero="trust"]');
    if (trust) trust.innerHTML = h.trust.map(t =>
      `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>${esc(t)}</li>`
    ).join('');
  }

  /* ── DEMO (animated AI intake) ──────────────────────────────────────────── */
  let demoTimers = [];
  function renderDemo(d) {
    fill('demo', d);
    $('#demoLatency').textContent = d.latency;
    runDemo(d);
  }
  function runDemo(d) {
    demoTimers.forEach(clearTimeout); demoTimers = [];
    const chat = $('#demoChat');
    const foot = $('#demoFoot');
    chat.innerHTML = ''; foot.classList.remove('show');

    const userBubble = document.createElement('div');
    userBubble.className = 'bubble user';
    userBubble.innerHTML = `<div class="who">${esc(d.formName)}</div>${esc(d.enquiry)}`;
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    const botBubble = document.createElement('div');
    botBubble.className = 'bubble bot';
    botBubble.innerHTML = `<div class="who">${esc(CFG.industries[current].brand.name)} · auto-reply</div>${esc(d.reply)}`;
    const chips = document.createElement('div');
    chips.className = 'demo-chips';
    chips.innerHTML =
      `<span class="lbl">Tagged</span>` +
      `<span class="chip">${esc(d.chips.category)}</span>` +
      `<span class="chip">${esc(d.chips.urgency)}</span>` +
      `<span class="chip alert">${esc(d.chips.service)}</span>`;

    const t = (fn, ms) => demoTimers.push(setTimeout(fn, ms));
    t(() => { chat.appendChild(userBubble); requestAnimationFrame(() => userBubble.classList.add('show')); }, 350);
    t(() => chat.appendChild(typing), 1300);
    t(() => { typing.remove(); chat.appendChild(botBubble); requestAnimationFrame(() => botBubble.classList.add('show')); }, 2700);
    t(() => { chat.appendChild(chips); requestAnimationFrame(() => chips.classList.add('show')); }, 3500);
    t(() => foot.classList.add('show'), 4100);
  }

  /* ── MARQUEE ────────────────────────────────────────────────────────────── */
  function renderMarquee(list) {
    const track = $('#marqueeTrack');
    const one = list.map(x => `<span>${esc(x)}</span>`).join('');
    track.innerHTML = one + one; /* doubled for seamless loop */
  }

  /* ── STATS (with count-up) ──────────────────────────────────────────────── */
  let countedOnce = false;
  function renderStats(list) {
    const grid = $('#statsGrid');
    grid.innerHTML = list.map(s => `
      <div class="stat">
        <div class="stat-value" data-val="${s.value}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix || ''}" data-dec="${s.decimals || 0}">${esc(s.prefix || '')}0${esc(s.suffix || '')}</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`).join('');
    countedOnce = false;
    if (statsInView()) countUp();
  }
  function statsInView() {
    const g = $('#statsGrid'); if (!g) return false;
    const r = g.getBoundingClientRect();
    return r.top < innerHeight && r.bottom > 0;
  }
  function countUp() {
    if (countedOnce) return; countedOnce = true;
    $$('#statsGrid .stat-value').forEach(el => {
      const target = parseFloat(el.dataset.val);
      const dec = parseInt(el.dataset.dec, 10);
      const pre = el.dataset.prefix, suf = el.dataset.suffix;
      const dur = 1400, start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + (target * eased).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = pre + target.toFixed(dec) + suf;
      }
      requestAnimationFrame(step);
    });
  }

  /* ── SERVICES BENTO ─────────────────────────────────────────────────────── */
  function renderServices(s) {
    fill('services', s);
    const f = s.featured;
    const html = [
      `<article class="card bento-featured">
        <div class="card-icon">${icon(f.icon)}</div>
        <h3>${esc(f.title)}</h3>
        <p>${esc(f.text)}</p>
        <div class="big-stat"><b>${esc(f.stat)}</b><span>${esc(f.statNote)}</span></div>
      </article>`,
      ...s.items.map(it => `
        <article class="card bento-item">
          <div class="card-icon">${icon(it.icon)}</div>
          <h3>${esc(it.title)}</h3>
          <p>${esc(it.text)}</p>
        </article>`),
      ...s.wide.map(w => `
        <article class="card bento-wide">
          <div class="card-icon">${icon(w.icon)}</div>
          <div><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></div>
        </article>`),
    ].join('');
    $('#bentoGrid').innerHTML = html;
  }

  /* ── RESULTS ────────────────────────────────────────────────────────────── */
  function renderResults(r) {
    fill('results', r);
    $('#resultsGrid').innerHTML = r.items.map(it => `
      <article class="result-card">
        <div class="result-tag">${esc(it.tag)}</div>
        <div class="result-metric"><b>${esc(it.metric)}</b><span>${esc(it.metricNote)}</span></div>
        <h3>${esc(it.title)}</h3>
        <p>${esc(it.text)}</p>
        <div class="result-client">${esc(it.client)}</div>
      </article>`).join('');
  }

  /* ── PROCESS ────────────────────────────────────────────────────────────── */
  function renderProcess(p) {
    fill('process', p);
    $('#processGrid').innerHTML = p.steps.map(st => `
      <div class="process-step"><h3>${esc(st.title)}</h3><p>${esc(st.text)}</p></div>`).join('');
  }

  /* ── TESTIMONIALS ───────────────────────────────────────────────────────── */
  function renderTestimonials(t) {
    fill('tst', t);
    $('#tstGrid').innerHTML = t.items.map(it => {
      const initials = it.name.split(' ').map(w => w[0]).slice(0, 2).join('');
      return `<article class="tst-card">
        <div class="tst-stars">★★★★★</div>
        <blockquote>“${esc(it.quote)}”</blockquote>
        <div class="tst-author">
          <div class="tst-avatar">${esc(initials)}</div>
          <div><strong>${esc(it.name)}</strong><span>${esc(it.role)}</span></div>
        </div>
      </article>`;
    }).join('');
  }

  /* ── PRICING ────────────────────────────────────────────────────────────── */
  function renderPricing(p) {
    fill('pricing', p);
    const check = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
    $('#pricingGrid').innerHTML = p.tiers.map(tier => `
      <article class="price-card${tier.featured ? ' featured' : ''}">
        ${tier.featured ? '<span class="price-badge">Most popular</span>' : ''}
        <div class="price-name">${esc(tier.name)}</div>
        <div class="price-amount">${esc(tier.price)}</div>
        <div class="price-period">${esc(tier.period)}</div>
        <p class="price-blurb">${esc(tier.blurb)}</p>
        <ul class="price-features">${tier.features.map(ft => `<li>${check}${esc(ft)}</li>`).join('')}</ul>
        <a href="contact.html" class="btn ${tier.featured ? 'btn-primary' : 'btn-ghost'} btn-block">${esc(tier.cta)}</a>
      </article>`).join('');
  }

  /* ── GUARANTEE ──────────────────────────────────────────────────────────── */
  function renderGuarantee(g) {
    fill('guarantee', g);
    $('#guaranteeIcon').innerHTML = icon(g.icon);
  }

  /* ── FAQ ────────────────────────────────────────────────────────────────── */
  function renderFaq(f) {
    fill('faq', f);
    $('#faqWrap').innerHTML = f.items.map((it, i) => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false" data-faq-idx="${i}">${esc(it.q)}<span class="icon">+</span></button>
        <div class="faq-a"><div class="faq-a-inner">${esc(it.a)}</div></div>
      </div>`).join('');
    $$('#faqWrap .faq-q').forEach(btn => btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const ans = item.querySelector('.faq-a');
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
    }));
  }

  /* ── CTA + mobile bar ───────────────────────────────────────────────────── */
  function renderCta(d) {
    fill('cta-block', d.cta);
    const mc = { title: d.hero.ctaPrimary, sub: d.hero.trust[0] };
    $$('[data-mc]').forEach(el => { const k = el.getAttribute('data-mc'); if (mc[k]) el.textContent = mc[k]; });
    $$('[data-cta="primary"]').forEach(el => el.textContent = d.hero.ctaPrimary);
  }

  /* ── SWITCHER ───────────────────────────────────────────────────────────── */
  function buildSwitcher() {
    const wrap = $('#switcher');
    if (!CFG.showIndustrySwitcher) { wrap.remove(); return; }
    wrap.hidden = false;
    const panel = $('#switcherPanel');
    Object.entries(CFG.industries).forEach(([key, d]) => {
      const b = document.createElement('button');
      b.dataset.key = key;
      b.innerHTML = `<span class="sw-dot" style="color:${d.theme.accent}"></span>${esc(d.label)}`;
      b.addEventListener('click', () => { switchTo(key); closePanel(); });
      panel.appendChild(b);
    });
    $('#switcherToggle').addEventListener('click', e => {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    document.addEventListener('click', closePanel);
    panel.addEventListener('click', e => e.stopPropagation());
  }
  function closePanel() { $('#switcherPanel')?.classList.remove('open'); }
  function markActive() {
    $$('#switcherPanel button').forEach(b => b.classList.toggle('active', b.dataset.key === current));
    const cur = CFG.industries[current];
    const lbl = $('#switcherCurrent'); if (lbl) lbl.textContent = cur.label;
  }

  /* ── SCROLL REVEAL ──────────────────────────────────────────────────────── */
  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          if (e.target.id === 'statsGrid' || e.target.contains($('#statsGrid'))) countUp();
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(el => io.observe(el));
  }

  /* ── MASTER RENDER ──────────────────────────────────────────────────────── */
  let current;
  function switchTo(key) {
    current = key;
    const d = CFG.industries[key];
    localStorage.setItem(STORE_KEY, key);
    applyTheme(d);
    renderBrand(d.brand);
    renderHero(d.hero);
    renderDemo(d.demo);
    renderMarquee(d.marquee);
    renderStats(d.stats);
    renderServices(d.services);
    renderResults(d.results);
    renderProcess(d.process);
    renderTestimonials(d.testimonials);
    renderPricing(d.pricing);
    renderGuarantee(d.guarantee);
    renderFaq(d.faq);
    renderCta(d);
    markActive();
    if (window.lucide) lucide.createIcons();
  }

  /* ── NAV + MISC ─────────────────────────────────────────────────────────── */
  function initNav() {
    const toggle = $('#navToggle'), menu = $('#mobileMenu');
    toggle?.addEventListener('click', () => { toggle.classList.toggle('open'); menu.classList.toggle('open'); });
    menu && $$('a', menu).forEach(a => a.addEventListener('click', () => { toggle.classList.remove('open'); menu.classList.remove('open'); }));
    const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
  }

  /* ── BOOT ───────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    buildSwitcher();
    switchTo(pickIndustry());
    initReveal();
    $('#demoReplay')?.addEventListener('click', () => runDemo(CFG.industries[current].demo));
  });
})();

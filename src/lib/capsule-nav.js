// Frosted capsule nav (vividsites vs-capsule-nav), packaged as a module.
    const reduce = { get matches() { return typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches; } };
  /* one shared ticker: runs only while a spring is moving */
  const live = new Set(); let raf = 0, last = 0;
  const tick = now => {
    const dt = Math.min(.064, (now - last) / 1000 || .016); last = now;
    for (const t of live) if (!t.update(dt)) live.delete(t);
    raf = live.size ? requestAnimationFrame(tick) : 0;
  };
  const wake = t => { live.add(t); if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  /* semi-implicit Euler spring, 120 Hz substeps; e = settle epsilon in the spring's own units */
  const sp = (x, k, c, e = .05) => ({ x, v: 0, g: x, k, c, e });
  const run = (s, dt) => {
    if (reduce.matches) { s.x = s.g; s.v = 0; return false; }
    const n = Math.max(1, Math.ceil(dt * 120)), h = dt / n;
    for (let i = 0; i < n; i++) { s.v += (-s.k * (s.x - s.g) - s.c * s.v) * h; s.x += s.v * h; }
    if (Math.abs(s.v) < s.e && Math.abs(s.x - s.g) < s.e) { s.x = s.g; s.v = 0; return false; }
    return true;
  };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  /* aim a pair of edge springs: the edge in the direction of travel leads (stiffer), the other trails */
  const aim = (L, R, l, r, lead, trail) => {
    const dir = (l + r) - (L.g + R.g);
    const [a, b] = dir >= 0 ? [R, L] : [L, R];
    a.k = lead[0]; a.c = lead[1]; b.k = trail[0]; b.c = trail[1];
    L.g = l; R.g = r;
  };
  const PILL = [[560, 36], [240, 27]], GHOST = [[440, 36], [230, 29]];

  export function mountCapsuleNav(nav) {
    if (nav.__vsCn) return nav.__vsCn;
    const ul = nav.querySelector('.vs-capsule-nav-list'); if (!ul) return null;
    const mk = (c, t = 'div') => { const e = document.createElement(t); e.className = c; return e; };
    const bar = mk('vs-capsule-nav-bar'), track = mk('vs-capsule-nav-track');
    const ghost = mk('vs-capsule-nav-ghost', 'span'), shade = mk('vs-capsule-nav-shade', 'span'), pill = mk('vs-capsule-nav-pill', 'span');
    [ghost, shade, pill].forEach(e => e.setAttribute('aria-hidden', 'true'));
    ul.before(bar); bar.append(track); track.append(ghost, shade, ul, pill);
    // the labels again, in the pill's ink, clipped by the pill: crisp inversion while it slides
    const ink = ul.cloneNode(true); ink.removeAttribute('id');
    ink.querySelectorAll('a').forEach(a => { a.removeAttribute('href'); a.removeAttribute('id'); a.removeAttribute('aria-current'); a.tabIndex = -1; });
    pill.append(ink); pill.inert = true;
    const links = [...ul.querySelectorAll('.vs-capsule-nav-link')];
    const off = a => a.getAttribute('aria-disabled') === 'true';

    let G = [], W = 0, H = 0, D = 80;
    const measure = () => {
      W = track.offsetWidth; H = track.offsetHeight;
      G = links.map(a => ({ l: a.offsetLeft, r: a.offsetLeft + a.offsetWidth }));
      D = (nav.getBoundingClientRect().top || 0) + bar.offsetHeight + 28;
    };
    measure();
    let active = Math.max(0, links.findIndex(a => a.getAttribute('aria-current') === 'page'));
    const S = {
      L: sp(G[active].l, 560, 36), R: sp(G[active].r, 560, 36),
      gl: sp(G[active].l, 440, 36), gr: sp(G[active].r, 440, 36), go: sp(0, 320, 30, .002),
      press: sp(0, 700, 40, .002), hy: sp(0, 300, 32, .1), cp: sp(0, 170, 26, .002),
    };
    let hot = -1, pressed = -1, hidden = false;

    const api = {
      update(dt) {
        let moving = false;
        for (const k in S) if (run(S[k], dt)) moving = true;
        const { L, R, gl, gr, go, press, hy, cp } = S;
        // pill: velocity squash (px/s -> px), press pinch
        const v = (L.v + R.v) / 2, pp = pressed === active ? press.x : 0;
        const sq = Math.min(H * .1, Math.abs(v) * .0011) + pp * 1.6;
        const l = L.x + pp * 2, r = R.x - pp * 2;
        pill.style.clipPath = `inset(${sq.toFixed(2)}px ${(W - r).toFixed(2)}px ${sq.toFixed(2)}px ${l.toFixed(2)}px round 999px)`;
        shade.style.transform = `translate3d(${l.toFixed(2)}px,0,0) scale(${((r - l) / 100).toFixed(4)},${(1 - 2 * sq / H).toFixed(4)})`;
        const gp = pressed >= 0 && pressed !== active ? press.x * 1.5 : 0;
        ghost.style.clipPath = `inset(${gp.toFixed(2)}px ${(W - gr.x + gp).toFixed(2)}px ${gp.toFixed(2)}px ${(gl.x + gp).toFixed(2)}px round 999px)`;
        ghost.style.opacity = go.x.toFixed(3);
        const hp = clamp(hy.x / D, -.2, 1);
        bar.style.transform = `translate3d(0,${(-hy.x).toFixed(2)}px,0) scale(${(1 - .07 * cp.x - .05 * Math.max(0, hp)).toFixed(4)})`;
        bar.style.opacity = (1 - .45 * Math.max(0, hp)).toFixed(3);
        nav.style.setProperty('--c', cp.x.toFixed(3));
        return moving;
      },
      select(i, user = false) {
        if (i < 0 || i >= links.length || off(links[i])) return;
        const changed = i !== active; active = i;
        links.forEach((a, j) => j === i ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
        aim(S.L, S.R, G[i].l, G[i].r, ...PILL);
        wake(api);
        if (changed && user) nav.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: { index: i, link: links[i] } }));
      },
      show: () => setHidden(false, 0), hide: () => setHidden(true, 0),
      get hidden() { return hidden; },
    };

    function hover(i) {
      if (i === hot) return; hot = i;
      links.forEach((a, j) => a.classList.toggle('is-hot', j === i));
      if (i < 0) { S.go.g = 0; wake(api); return; }
      if (S.go.x < .06) { S.gl.x = S.gl.g = G[i].l; S.gr.x = S.gr.g = G[i].r; S.gl.v = S.gr.v = 0; } // snap in, never sweep from far
      else aim(S.gl, S.gr, G[i].l, G[i].r, ...GHOST);
      S.go.g = 1; wake(api);
    }
    const idx = e => { const a = e.target.closest && e.target.closest('.vs-capsule-nav-link'); return a ? links.indexOf(a) : -1; };
    track.addEventListener('pointerover', e => { const i = idx(e); if (i >= 0 && !off(links[i])) hover(i); });
    track.addEventListener('pointerleave', () => { if (!track.contains(document.activeElement) || !track.querySelector(':focus-visible')) hover(-1); });
    track.addEventListener('pointerdown', e => { const i = idx(e); if (i < 0 || off(links[i]) || e.button > 0) return; pressed = i; S.press.g = 1; wake(api); });
    const release = () => { S.press.g = 0; wake(api); setTimeout(() => { if (S.press.g === 0) pressed = -1; }, 400); };
    addEventListener('pointerup', release); addEventListener('pointercancel', release);
    ul.addEventListener('click', e => {
      const i = idx(e); if (i < 0) return;
      if (off(links[i])) { e.preventDefault(); return; }
      api.select(i, true);
    });
    ul.addEventListener('focusin', e => { const i = idx(e); if (i >= 0 && e.target.matches(':focus-visible')) hover(i); setHidden(false, 0); });
    ul.addEventListener('focusout', () => setTimeout(() => { if (!ul.contains(document.activeElement)) hover(-1); }));
    ul.addEventListener('keydown', e => {
      const i = links.indexOf(document.activeElement); if (i < 0) return;
      const pick = { ArrowRight: 1, ArrowLeft: -1, Home: -99, End: 99 }[e.key]; if (!pick) return;
      e.preventDefault();
      let j = pick === -99 ? 0 : pick === 99 ? links.length - 1 : i + pick, n = links.length;
      while (j >= 0 && j < n && off(links[j])) j += Math.sign(pick);
      if (j >= 0 && j < n) links[j].focus();
    });

    /* hide on scroll: direction with a small dead zone; the scroll velocity is handed to the spring */
    const scroller = nav.dataset.scroll ? document.querySelector(nav.dataset.scroll) : null;
    const getY = () => scroller ? scroller.scrollTop : (window.scrollY || document.documentElement.scrollTop);
    let lastY = getY(), lastT = performance.now(), vel = 0, acc = 0;
    function setHidden(h, v) {
      if (h === hidden) return; hidden = h;
      S.hy.g = h ? D : 0;
      S.hy.k = h ? 300 : 360; S.hy.c = h ? 32 : 27;              // returning lands with a hint of overshoot
      S.hy.v += clamp(v * .7, -2600, 2600);
      wake(api);
      nav.dispatchEvent(new CustomEvent('capsulevisibility', { bubbles: true, detail: { hidden: h } }));
    }
    const onScroll = () => {
      const y = getY(), now = performance.now(), dy = y - lastY, dtm = Math.max(8, now - lastT);
      vel = vel * .5 + (dy / dtm * 1000) * .5; lastY = y; lastT = now;
      const at = parseFloat(nav.dataset.compactAt ?? 96);
      S.cp.g = y > at ? 1 : 0;
      if (nav.dataset.hide === 'off' || y <= Math.max(8, at * .5)) { acc = 0; setHidden(false, 0); }
      else if (dy) {
        if (Math.sign(dy) !== Math.sign(acc)) acc = 0;
        acc += dy;
        if (acc > 14) setHidden(true, vel);
        else if (acc < -6) setHidden(false, vel);
      }
      wake(api);
    };
    (scroller || window).addEventListener('scroll', onScroll, { passive: true });
    addEventListener('pointermove', e => { if (hidden && e.pointerType === 'mouse' && e.clientY < 28) { acc = 0; setHidden(false, 0); } }, { passive: true });
    new MutationObserver(() => { if (nav.dataset.hide === 'off') setHidden(false, 0); }).observe(nav, { attributes: true, attributeFilter: ['data-hide'] });
    new ResizeObserver(() => {
      measure();
      const a = G[active]; S.L.g = a.l; S.R.g = a.r;
      if (!live.has(api)) { S.L.x = a.l; S.R.x = a.r; }
      if (hot >= 0) { S.gl.g = G[hot].l; S.gr.g = G[hot].r; }
      if (hidden) S.hy.g = D;
      wake(api);
    }).observe(ul);

    nav.__vsCn = api; api.update(0); onScroll();
    return api;
  }

/* eslint-disable */
// Announcement bar behaviour (from the vividsites.app component the client chose).
// Unchanged apart from being wrapped as a module: call mountAnnouncementBar(element).
export function mountAnnouncementBar(el) {

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const store = { get: k => { try { return localStorage.getItem(k); } catch (_) { return null; } }, set: (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (_) {} } };
  // spring(from, to, {k, c}, frame, done) — semi-implicit Euler at 240 Hz
  const spring = (from, to, o, frame, done) => {
    let x = from, v = o.v || 0, last = performance.now(), id;
    const run = now => { const dt = Math.min(.04, (now - last) / 1000); last = now; const n = Math.max(1, Math.round(dt * 240)), h = dt / n;
      for (let i = 0; i < n; i++) { v += (-o.k * (x - to) - o.c * v) * h; x += v * h; }
      frame(x); if (Math.abs(v) < .01 && Math.abs(x - to) < .01) { frame(to); done && done(); } else id = requestAnimationFrame(run); };
    id = requestAnimationFrame(run); return () => cancelAnimationFrame(id);
  };
  const icon = d => `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function mount(bar) {
    if (!bar) return null;
    if (bar.vsAnnouncement) return bar.vsAnnouncement;
    const key = bar.dataset.key; if (key && store.get('vs-announcement-bar:' + key)) bar.hidden = true;
    const inner = bar.querySelector('.vs-announcement-bar-inner'), vp = bar.querySelector('.vs-announcement-bar-viewport'), list = vp.querySelector('ul');
    const mode = bar.dataset.mode === 'rotate' ? 'rotate' : 'marquee';
    let hover = false, focus = false, visible = true, raf = 0, last = 0, stopH = null;
    const paused = () => hover || focus || !visible || bar.hidden;
    bar.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && fine.matches) { hover = true; wake(); } });
    bar.addEventListener('pointerleave', () => { hover = false; wake(); });
    bar.addEventListener('focusin', () => { focus = true; wake(); });
    bar.addEventListener('focusout', e => { if (!bar.contains(e.relatedTarget)) { focus = false; wake(); } });
    new IntersectionObserver(e => { visible = e[0].isIntersecting; wake(); }).observe(bar);

    let tick;
    if (mode === 'marquee') {
      const originals = [...list.children]; let x = 0, set = 0, v = 0, speed = 56;
      const fill = () => {
        list.querySelectorAll('[data-vs-clone]').forEach(n => n.remove()); set = list.scrollWidth;
        if (!set) return; const need = Math.ceil(vp.clientWidth * 2 / set) + 1;
        for (let i = 1; i < need; i++) originals.forEach(li => { const c = li.cloneNode(true); c.dataset.vsClone = ''; c.setAttribute('aria-hidden', 'true'); c.querySelectorAll('a,button').forEach(a => a.tabIndex = -1); list.appendChild(c); });
      };
      const read = () => { const s = parseFloat(getComputedStyle(bar).getPropertyValue('--vs-announcement-bar-speed')); speed = isNaN(s) ? 56 : s; };
      tick = dt => {
        const target = paused() || reduce.matches ? 0 : speed;
        v += (target - v) * (1 - Math.exp(-dt * (target ? 2.4 : 6)));
        if (set) { x = (x - v * dt) % set; list.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`; }
        return Math.abs(v - target) > .05 || target !== 0;
      };
      new ResizeObserver(() => { fill(); wake(); }).observe(vp);
      new MutationObserver(() => { read(); fill(); wake(); }).observe(bar, { attributes: true, attributeFilter: ['style'] });
      read(); (document.fonts ? document.fonts.ready : Promise.resolve()).then(fill);
    } else {
      const items = [...list.children]; let i = 0, t = 0, stopRoll = [];
      const interval = () => +bar.dataset.interval || 4200;
      const prog = document.createElement('div'); prog.className = 'vs-announcement-bar-progress'; prog.innerHTML = '<i></i>'; prog.setAttribute('aria-hidden', 'true'); inner.appendChild(prog);
      const nav = document.createElement('div'); nav.className = 'vs-announcement-bar-nav';
      nav.innerHTML = `<button type="button" aria-label="Previous message">${icon('M10 3.5 5.5 8l4.5 4.5')}</button><button type="button" aria-label="Next message">${icon('M6 3.5 10.5 8 6 12.5')}</button>`;
      vp.before(nav);
      items.forEach((li, k) => { li.classList.toggle('is-on', k === 0); li.setAttribute('aria-hidden', k === 0 ? 'false' : 'true'); li.querySelectorAll('a,button').forEach(a => a.tabIndex = k === 0 ? 0 : -1); });
      const go = dir => {
        const from = items[i]; i = (i + dir + items.length) % items.length; const to = items[i]; t = 0;
        stopRoll.forEach(s => s()); stopRoll = [];
        items.forEach(li => { if (li !== from && li !== to) { li.classList.remove('is-on'); li.style.cssText = ''; } });
        to.classList.add('is-on'); to.setAttribute('aria-hidden', 'false'); from.setAttribute('aria-hidden', 'true');
        from.querySelectorAll('a,button').forEach(a => a.tabIndex = -1); to.querySelectorAll('a,button').forEach(a => a.tabIndex = 0);
        if (focus && from.contains(document.activeElement)) to.querySelector('a,button')?.focus({ preventScroll: true });
        if (reduce.matches) {
          from.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' }).onfinish = () => from.classList.remove('is-on');
          to.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 }); return;
        }
        // the old line rolls away, the new one rises into place — both ride one spring
        const h = inner.offsetHeight * .9 * dir;
        stopRoll.push(spring(0, 1, { k: 260, c: 25 }, p => {
          from.style.transform = `translateY(${(-h * p).toFixed(2)}px)`; from.style.opacity = Math.max(0, 1 - p * 1.6).toFixed(3); from.style.filter = `blur(${(p * 4).toFixed(2)}px)`;
          to.style.transform = `translateY(${(h * (1 - p)).toFixed(2)}px)`; to.style.opacity = Math.min(1, p * 1.4).toFixed(3); to.style.filter = `blur(${(Math.max(0, 1 - p) * 4).toFixed(2)}px)`;
        }, () => { from.classList.remove('is-on'); from.style.cssText = ''; to.style.cssText = ''; }));
      };
      const [prev, next] = nav.querySelectorAll('button');
      prev.onclick = () => { go(-1); wake(); }; next.onclick = () => { go(1); wake(); };
      bar.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { go(1); e.preventDefault(); } if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); } });
      const bartx = prog.firstChild;
      tick = dt => {
        if (!paused() && items.length > 1) { t += dt * 1000; if (t >= interval()) go(1); }
        bartx.style.transform = `scaleX(${Math.min(1, t / interval()).toFixed(4)})`;
        return !paused();
      };
    }
    const loop = now => { const dt = Math.min(.05, (now - last) / 1000 || .016); last = now; raf = tick(dt) && visible ? requestAnimationFrame(loop) : 0; };
    const wake = () => { if (!raf && visible && !bar.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); } };

    const api = {
      dismiss() {
        if (bar.hidden || bar.classList.contains('is-leaving')) return;
        bar.classList.add('is-leaving');
        const h = bar.offsetHeight, done = () => { bar.hidden = true; bar.classList.remove('is-leaving'); bar.style.height = bar.style.overflow = ''; inner.style.cssText = ''; };
        if (key) store.set('vs-announcement-bar:' + key, '1');
        bar.dispatchEvent(new CustomEvent('vs-announcement-bar:dismiss', { bubbles: true }));
        if (reduce.matches) return done();
        inner.animate([{ opacity: 1, transform: 'none', filter: 'blur(0)' }, { opacity: 0, transform: 'translateY(-35%)', filter: 'blur(3px)' }], { duration: 260, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' });
        stopH && stopH();
        stopH = spring(h, 0, { k: 300, c: 30 }, y => { bar.style.height = Math.max(0, y).toFixed(2) + 'px'; }, done);
      },
      restore() {
        stopH && stopH(); if (key) store.set('vs-announcement-bar:' + key, null);
        inner.getAnimations().forEach(a => a.cancel());
        bar.hidden = false; bar.style.height = '0px'; const h = inner.offsetHeight;
        inner.animate([{ opacity: 0, transform: 'translateY(-35%)', filter: 'blur(3px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 480, delay: 60, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
        stopH = spring(0, h, { k: 260, c: 22 }, y => { bar.style.height = Math.max(0, y).toFixed(2) + 'px'; }, () => { bar.style.height = ''; });
        wake();
      },
    };
    bar.querySelector('.vs-announcement-bar-close')?.addEventListener('click', () => api.dismiss());
    bar.addEventListener('keydown', e => { if (e.key === 'Escape') api.dismiss(); });
    bar.vsAnnouncement = api; wake(); return api;
  }
  return mount(el);
}

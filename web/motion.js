/* Dreww web motion. Plain script: load it after the page markup
   (<script src="motion.js" defer>) or import it from a bundler for its side effects.
   Everything is opt-in through data attributes, and everything respects
   prefers-reduced-motion. Exposes window.DrewwMotion.init(root) for content
   added later. */
(function () {
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Card ink spread: the burgundy fill grows from where the pointer enters. */
  function inkSpread(root) {
    root.querySelectorAll('.dw-card-svc, .dw-faq').forEach((c) => {
      if (c.dataset.dwInk) return; c.dataset.dwInk = '1';
      const at = (e) => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); };
      c.addEventListener('pointerenter', at); c.addEventListener('pointerleave', at);
    });
  }

  /* FAQ: one answer open at a time. <ul class="dw-faq-list" data-dw-faq> */
  function faq(root) {
    root.querySelectorAll('[data-dw-faq]').forEach((list) => {
      if (list.dataset.dwOn) return; list.dataset.dwOn = '1';
      list.querySelectorAll('.dw-faq > button').forEach((b) => b.addEventListener('click', () => {
        const item = b.parentElement, open = !item.classList.contains('is-open');
        list.querySelectorAll('.dw-faq').forEach((x) => { x.classList.remove('is-open'); x.querySelector('button').setAttribute('aria-expanded', 'false'); });
        if (open) { item.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); }
      }));
    });
  }

  /* Marquee: drifts left, pauses on hover and focus, grab and drag on desktop,
     swipe on touch, arrow keys step. <div class="dw-marquee" data-dw-marquee="40">
     Put the items in .dw-marquee__track twice so the loop is seamless. */
  function marquee(root) {
    root.querySelectorAll('[data-dw-marquee]').forEach((view) => {
      if (view.dataset.dwOn) return; view.dataset.dwOn = '1';
      const tr = view.querySelector('.dw-marquee__track'); if (!tr) return;
      const speed = parseFloat(view.dataset.dwMarquee) || 40;
      const gap = parseFloat(getComputedStyle(tr).columnGap) || 0;
      let x = 0, half = 1, last = performance.now(), hover = false, drag = null, moved = 0;
      const measure = () => { half = (tr.scrollWidth + gap) / 2; };
      measure(); addEventListener('resize', measure); addEventListener('load', measure);
      if (!view.hasAttribute('tabindex')) view.tabIndex = 0;
      const tick = (now) => {
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        if (!drag && !hover && !still() && !view.classList.contains('is-paused') && !view.matches(':focus-within')) x -= speed * dt;
        while (x <= -half) x += half; while (x > 0) x -= half;
        tr.style.transform = `translateX(${x}px)`; requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      view.addEventListener('mouseenter', () => { hover = true; });
      view.addEventListener('mouseleave', () => { hover = false; });
      view.addEventListener('pointerdown', (e) => { if (e.button !== 0) return; drag = { sx: e.clientX, x0: x }; moved = 0; view.setPointerCapture(e.pointerId); view.classList.add('is-drag'); });
      view.addEventListener('pointermove', (e) => { if (!drag) return; const d = e.clientX - drag.sx; moved = Math.max(moved, Math.abs(d)); x = drag.x0 + d; });
      const end = (e) => { if (!drag) return; drag = null; view.classList.remove('is-drag'); try { view.releasePointerCapture(e.pointerId); } catch (_) {} };
      view.addEventListener('pointerup', end); view.addEventListener('pointercancel', end);
      view.addEventListener('click', (e) => { if (moved > 4) e.preventDefault(); }, true);
      view.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') x += 200; if (e.key === 'ArrowRight') x -= 200; });
      // Optional pause button anywhere: <button data-dw-marquee-pause="#id">
      document.querySelectorAll(`[data-dw-marquee-pause="#${view.id}"]`).forEach((b) => b.addEventListener('click', () => {
        const p = view.classList.toggle('is-paused'); b.setAttribute('aria-pressed', String(p));
      }));
    });
  }

  /* Final CTA: words rise in as it scrolls into view, then the coral phrase cycles.
     <section class="dw-cta" data-dw-cta> … <span class="dw-rot"><span class="dw-rot__list"><span>revenue</span>…
     Add data-dw-cta-hold to keep the first phrase (service pages). */
  function cta(root) {
    root.querySelectorAll('[data-dw-cta]').forEach((cta) => {
      if (cta.dataset.dwOn) return; cta.dataset.dwOn = '1';
      const h = cta.querySelector('.dw-display'); let k = 0;
      if (h) {
        let n = 0;
        const wrap = (node) => {
          [...node.childNodes].forEach((c) => {
            if (c.nodeType === 3 && c.textContent.trim()) {
              const frag = document.createDocumentFragment();
              c.textContent.split(/(\s+)/).forEach((t) => {
                if (!t.trim()) { frag.appendChild(document.createTextNode(t)); return; }
                const w = document.createElement('span'); w.className = 'dw-w';
                const i = document.createElement('span'); i.style.setProperty('--d', (n++ * 0.06).toFixed(2) + 's'); i.textContent = t;
                w.appendChild(i); frag.appendChild(w);
              });
              c.replaceWith(frag);
            } else if (c.nodeType === 1 && c.classList.contains('dw-rot')) {
              const w = document.createElement('span'); w.className = 'dw-w';
              const i = document.createElement('span'); i.style.setProperty('--d', (n++ * 0.06).toFixed(2) + 's');
              c.replaceWith(w); i.appendChild(c); w.appendChild(i);
            } else if (c.nodeType === 1) wrap(c);
          });
        };
        wrap(h);
      }
      const rot = cta.querySelector('.dw-rot'), list = rot && rot.querySelector('.dw-rot__list');
      if (rot && list) {
        const items = [...list.children];
        const size = () => { rot.style.width = items[k].getBoundingClientRect().width + 'px'; };
        requestAnimationFrame(size); addEventListener('resize', size);
        if (!cta.hasAttribute('data-dw-cta-hold') && !still() && items.length > 1) setInterval(() => {
          k = (k + 1) % items.length; list.style.transform = `translateY(-${k * 1.04}em)`; size();
        }, 2400);
      }
      if (still() || !('IntersectionObserver' in window)) { cta.classList.add('is-in'); return; }
      new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { o.disconnect(); cta.classList.add('is-in'); } }), { threshold: 0.4 }).observe(cta);
    });
  }

  function init(root) { root = root || document; inkSpread(root); faq(root); marquee(root); cta(root); }
  window.DrewwMotion = { init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init()); else init();
})();

/* Proarc v2A — Immersive layer (GSAP). Subtle, architectural motion only.
   Works under the theme's niceScroll by reading #wrapper scrollTop and using
   IntersectionObserver to drive GSAP tweens (reliable regardless of scroller). */
(function () {
  function init() {
    if (typeof gsap === 'undefined') return;
    var mqDesktop = window.matchMedia('(min-width: 768px)');
    var wrapper = document.getElementById('wrapper');
    function scrollTop() {
      return (wrapper && wrapper.scrollTop) || window.pageYOffset ||
             document.documentElement.scrollTop || 0;
    }

    // 1. Page-load staggered fade-up of primary blocks
    var loadEls = document.querySelectorAll(
      '.cs-hero-inner, .cs-overview, .cs-intent, .ab-statement, .ab-numbers, ' +
      '.jr-hero-inner, .jr-listing-head, .services-holder, .dec-text, .full-height-wrap');
    if (loadEls.length) gsap.from(loadEls, { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out', stagger: 0.15 });

    // 2. Scroll reveals (label translateX, content translateY) via IO + GSAP
    var labelSel = '.cs-label, .ab-story .cs-label';
    var fadeSel = '.cs-desc, .cs-meta-row, .cs-gallery-item, .cs-intent p, .cs-related-card, ' +
                  '.ab-number, .ab-sector, .ab-milestone, .ab-principle, .jr-body p, .jr-quote, .jr-card';
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          gsap.to(e.target, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' });
          io.unobserve(e.target);
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(labelSel).forEach(function (el) { gsap.set(el, { opacity: 0, x: -20 }); io.observe(el); });
      document.querySelectorAll(fadeSel).forEach(function (el) { gsap.set(el, { opacity: 0, y: 16 }); io.observe(el); });
    }

    // 3. About number count-up
    document.querySelectorAll('.ab-num').forEach(function (el) {
      var m = el.textContent.trim().match(/^(\d+)(\D*)$/);
      if (!m) return;
      var end = +m[1], suffix = m[2], obj = { v: 0 }, fired = false;
      new IntersectionObserver(function (entries, ob) {
        entries.forEach(function (e) {
          if (e.isIntersecting && !fired) {
            fired = true;
            gsap.to(obj, { v: end, duration: 1.5, ease: 'power1.out',
              onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; } });
            ob.disconnect();
          }
        });
      }, { threshold: 0.5 }).observe(el);
    });

    // 4. Journal reading-progress bar
    var bar = document.getElementById('jr-progress');
    var jrBody = document.querySelector('.jr-body');
    function progress() {
      if (!bar || !jrBody) return;
      var p = (scrollTop() - jrBody.offsetTop + window.innerHeight * 0.5) / jrBody.offsetHeight;
      bar.style.width = Math.max(0, Math.min(1, p)) * 100 + '%';
    }

    // 5. Hero parallax (desktop only — matchMedia guard)
    var hero = document.querySelector('.cs-hero, .jr-hero');
    if (hero) hero.style.willChange = 'background-position';
    function parallax() {
      if (!mqDesktop.matches || !hero) return;
      hero.style.backgroundPositionY = (scrollTop() * 0.3) + 'px';
    }

    function onScroll() { progress(); parallax(); }
    (wrapper || window).addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

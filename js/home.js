/**
 * Homepage-only choreography: hero image settle + animated stat counters.
 * Builds on the shared smooth-scroll/reveals init — does not create its
 * own Lenis instance.
 */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && typeof gsap !== "undefined") {
    var heroImg = document.querySelector(".hero-media img");
    if (heroImg) {
      gsap.to(heroImg, { scale: 1, duration: 2.2, ease: "power2.out", delay: 0.15 });
    }
  }

  var counters = document.querySelectorAll("[data-count-to]");
  if (!counters.length) return;

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    var suffix = el.getAttribute("data-count-suffix") || "";

    if (reduceMotion || typeof gsap === "undefined") {
      el.textContent = target + suffix;
      return;
    }

    var obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.6,
      ease: "power1.out",
      onUpdate: function () { el.textContent = Math.round(obj.val) + suffix; },
    });
  }

  if (typeof ScrollTrigger !== "undefined" && !reduceMotion) {
    counters.forEach(function (el) {
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: function () { animateCount(el); } });
    });
  } else {
    counters.forEach(animateCount);
  }
})();

/**
 * Hero project slideshow — crossfades through a handful of real projects
 * every 4s and keeps the name/meta label + dots in sync. Auto-advance is
 * skipped under prefers-reduced-motion (an auto-rotating carousel with no
 * pause control is a real accessibility smell); dots stay clickable either way.
 */
(function () {
  var slideshow = document.getElementById("hero-slideshow");
  if (!slideshow) return;

  var slides = Array.prototype.slice.call(slideshow.querySelectorAll(".hero-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll("#hero-slide-dots button"));
  var infoLink = document.getElementById("hero-slide-info");
  if (!slides.length || !infoLink) return;

  var titleEl = infoLink.querySelector(".hero-slide-title");
  var subEl = infoLink.querySelector(".hero-slide-sub");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var index = 0;
  var timer = null;
  var INTERVAL = 4000;

  function goTo(i) {
    slides[index].classList.remove("is-active");
    if (dots[index]) dots[index].classList.remove("is-active");
    index = i;
    slides[index].classList.add("is-active");
    if (dots[index]) dots[index].classList.add("is-active");

    var s = slides[index];
    titleEl.textContent = s.getAttribute("data-title");
    subEl.textContent = s.getAttribute("data-meta");
    infoLink.setAttribute("href", s.getAttribute("data-href"));
  }

  function next() { goTo((index + 1) % slides.length); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() {
    if (reduceMotion || slides.length < 2) return;
    stop();
    timer = setInterval(next, INTERVAL);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { goTo(i); start(); });
  });

  var metaWrap = document.querySelector(".hero-slide-meta");
  if (metaWrap) {
    metaWrap.addEventListener("mouseenter", stop);
    metaWrap.addEventListener("mouseleave", start);
  }

  start();
})();

/**
 * Featured Projects — full-height horizontal slider.
 *
 * Desktop (900px+, motion allowed, GSAP present): a pinned scroll-jack.
 * Scrolling the page while this section is in view PINS it in place —
 * no vertical movement — and that scroll input instead drives the
 * horizontal slide transition (smoothly, via ScrollTrigger's scrub,
 * riding on the same Lenis loop as the rest of the site). Once the
 * last slide is reached the pin releases and the page continues
 * scrolling normally to the next section — and back again scrolling up.
 * Arrow buttons move the real page scroll position so they stay in
 * sync with the pin instead of fighting it.
 *
 * Mobile / reduced-motion / no GSAP: plain swipeable horizontal
 * scroller instead — native touch scroll + drag + 4s auto-advance.
 * Pinning the whole viewport to a horizontal swipe doesn't translate
 * well to touch, so this is a deliberately different, simpler mode.
 */
(function () {
  var section = document.querySelector(".featured-full");
  var scrollEl = document.getElementById("featured-scroll");
  var track = document.getElementById("featured-scroll-track");
  var progressBar = document.getElementById("featured-progress-bar");
  var prevBtn = document.getElementById("featured-prev");
  var nextBtn = document.getElementById("featured-next");
  if (!section || !scrollEl || !track) return;

  var items = Array.prototype.slice.call(track.querySelectorAll(".featured-item"));
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var usePin = !reduceMotion && window.innerWidth >= 900 && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";
  var index = 0;

  function maxScroll() { return track.scrollWidth - scrollEl.clientWidth; }

  function paintProgress(ratio) {
    var containerWidth = progressBar.parentElement.clientWidth;
    var visibleRatio = Math.max(Math.min(scrollEl.clientWidth / track.scrollWidth, 1), 0.08);
    var barWidthPx = containerWidth * visibleRatio;
    var travelPx = containerWidth - barWidthPx;
    progressBar.style.width = barWidthPx + "px";
    progressBar.style.transform = "translateX(" + ratio * travelPx + "px)";
    if (prevBtn) prevBtn.disabled = ratio <= 0.01;
    if (nextBtn) nextBtn.disabled = ratio >= 0.99;
  }

  if (usePin) {
    var st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: function () { return "+=" + Math.round((items.length - 1) * window.innerHeight * 0.9); },
      pin: true,
      scrub: true,
      anticipatePin: 1,
      onUpdate: function (self) {
        scrollEl.scrollLeft = self.progress * maxScroll();
        index = Math.round(self.progress * (items.length - 1));
        paintProgress(self.progress);
      },
      onRefresh: function (self) {
        scrollEl.scrollLeft = self.progress * maxScroll();
      },
    });

    function goToProgress(p) {
      p = Math.max(0, Math.min(1, p));
      var y = st.start + p * (st.end - st.start);
      if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goToProgress((index - 1) / (items.length - 1)); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goToProgress((index + 1) / (items.length - 1)); });

    paintProgress(0);
    window.addEventListener("resize", function () { ScrollTrigger.refresh(); });
    return;
  }

  // ---- fallback (mobile / reduced-motion / no GSAP): swipeable + autoplay ----
  var INTERVAL = 4000;
  var timer = null;

  function updateProgress() {
    var max = maxScroll();
    paintProgress(max > 0 ? scrollEl.scrollLeft / max : 0);
  }

  function goTo(i) {
    index = ((i % items.length) + items.length) % items.length;
    scrollEl.scrollTo({ left: items[index].offsetLeft, behavior: "smooth" });
  }

  function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }
  function startAuto() {
    if (reduceMotion || items.length < 2) return;
    stopAuto();
    timer = setInterval(function () { goTo(index + 1); }, INTERVAL);
  }

  var syncTimer;
  scrollEl.addEventListener("scroll", function () {
    updateProgress();
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () {
      var closest = 0, closestDist = Infinity;
      items.forEach(function (el, i) {
        var d = Math.abs(el.offsetLeft - scrollEl.scrollLeft);
        if (d < closestDist) { closestDist = d; closest = i; }
      });
      index = closest;
    }, 150);
  }, { passive: true });

  window.addEventListener("resize", updateProgress);
  updateProgress();

  if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1); startAuto(); });

  var wheelCooldown = false;
  scrollEl.addEventListener("wheel", function (e) {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    var max = maxScroll();
    if (max <= 0) return;
    var atEnd = scrollEl.scrollLeft >= max - 2;
    var atStart = scrollEl.scrollLeft <= 2;
    if (e.deltaY > 0 && atEnd) return;
    if (e.deltaY < 0 && atStart) return;
    e.preventDefault();
    stopAuto();
    if (wheelCooldown) return;
    wheelCooldown = true;
    goTo(index + (e.deltaY > 0 ? 1 : -1));
    setTimeout(function () { wheelCooldown = false; }, 650);
  }, { passive: false });

  var dragState = null;
  scrollEl.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch") return;
    dragState = { startX: e.pageX, startScroll: scrollEl.scrollLeft, moved: 0 };
    scrollEl.classList.add("is-dragging");
    stopAuto();
  });
  window.addEventListener("pointermove", function (e) {
    if (!dragState) return;
    var dx = e.pageX - dragState.startX;
    dragState.moved = Math.max(dragState.moved, Math.abs(dx));
    scrollEl.scrollLeft = dragState.startScroll - dx;
  });
  window.addEventListener("pointerup", function () {
    if (!dragState) return;
    var wasDrag = dragState.moved > 6;
    scrollEl.classList.remove("is-dragging");
    if (wasDrag) {
      var suppressClick = function (ev) { ev.preventDefault(); ev.stopPropagation(); scrollEl.removeEventListener("click", suppressClick, true); };
      scrollEl.addEventListener("click", suppressClick, true);
    }
    dragState = null;
    startAuto();
  });

  scrollEl.addEventListener("mouseenter", stopAuto);
  scrollEl.addEventListener("mouseleave", startAuto);

  startAuto();
})();

/**
 * Header scroll state, nav toggle, and the Projects mega-menu. No
 * animation-library dependency so the nav still works if GSAP/Lenis fail
 * to load.
 */
(function () {
  var header = document.querySelector("[data-nav]");
  var toggle = document.getElementById("nav-toggle");
  var toggleLabel = document.getElementById("nav-toggle-label");
  var overlay = document.getElementById("nav-overlay");
  var megaWrap = document.querySelector(".nav-mega");
  var megaTrigger = document.getElementById("nav-mega-trigger");

  // Hides the header on scroll-down, brings it back on scroll-up (never
  // hides while still near the top, or while the nav overlay is open).
  var lastScroll = 0;
  function onScroll() {
    if (!header) return;
    var current = window.__lenis ? window.__lenis.scroll : window.scrollY;
    header.classList.toggle("is-scrolled", current > 40);

    if (!document.body.classList.contains("nav-open")) {
      var scrollingDown = current > lastScroll;
      if (scrollingDown && current > 140) {
        header.classList.add("header-hidden");
      } else if (!scrollingDown) {
        header.classList.remove("header-hidden");
      }
    }
    lastScroll = current;
  }

  if (window.__lenis) {
    window.__lenis.on("scroll", onScroll);
  } else {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  onScroll();

  function closeMega() {
    if (megaWrap) megaWrap.classList.remove("is-open");
    if (megaTrigger) megaTrigger.setAttribute("aria-expanded", "false");
  }

  function setOpen(isOpen) {
    var wasOpen = document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", isOpen);
    if (toggle) toggle.setAttribute("aria-expanded", String(isOpen));
    if (toggleLabel) toggleLabel.textContent = isOpen ? "Close" : "Menu";
    if (isOpen && header) header.classList.remove("header-hidden");
    if (window.__lenis) {
      if (isOpen) window.__lenis.stop(); else window.__lenis.start();
    }
    if (!isOpen) {
      closeMega();
      // Escape and the toggle button itself both close the overlay this
      // way — clicking a nav link also routes through here, but the
      // page navigation that follows makes the focus move moot there.
      if (wasOpen && toggle) toggle.focus();
    }
  }

  // Focus trap while the overlay is open (guideline §4.7): Escape closes
  // it, and Tab/Shift+Tab cycle within the overlay's own focusable
  // elements instead of escaping into the page behind it.
  function getOverlayFocusable() {
    if (!overlay) return [];
    return Array.prototype.slice
      .call(overlay.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ))
      .filter(function (el) { return el.offsetParent !== null; });
  }

  document.addEventListener("keydown", function (e) {
    if (!document.body.classList.contains("nav-open")) return;
    if (e.key === "Escape" || e.key === "Esc") {
      setOpen(false);
      return;
    }
    if (e.key !== "Tab") return;
    var focusable = getOverlayFocusable();
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  if (toggle) {
    toggle.addEventListener("click", function () {
      setOpen(!document.body.classList.contains("nav-open"));
    });

    // Real links inside the overlay (Home/About/Services/Contact, plus the
    // mega panel's project thumbnails and "View All") navigate away, so
    // close the overlay first for a clean transition.
    document.querySelectorAll("#nav-links a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
  }

  // The Projects mega-trigger is a <button>, not a link — it expands the
  // panel in place rather than navigating, so it's wired separately.
  //
  // On desktop the panel is position:absolute, anchored (for `left`) to
  // the trigger itself via CSS. But .nav-links-col vertically CENTERS its
  // links as a flex column, so the list's own box-top is not where "Home"
  // visually renders — there's no reliable pure-CSS way to say "start
  // level with Home". Instead, measure Home's and the trigger's actual
  // on-screen positions and set an explicit inline `top` on the panel.
  var megaPanel = document.getElementById("nav-mega-panel");

  function positionMegaPanel() {
    if (!megaPanel || !megaTrigger) return;
    if (window.innerWidth < 900) {
      megaPanel.style.top = "";
      megaPanel.style.width = "";
      megaPanel.style.maxHeight = "";
      return;
    }
    var homeLink = document.getElementById("nav-home-link");
    if (!homeLink) return;
    var homeTop = homeLink.getBoundingClientRect().top;
    var triggerTop = megaTrigger.getBoundingClientRect().top;
    megaPanel.style.top = (homeTop - triggerTop) + "px";

    // Width/height are stretched to land exactly on the divider in
    // front of the contact panel (.nav-overlay-side's left border) —
    // neither is expressible in pure CSS since the panel's containing
    // block (.nav-mega) knows nothing about that sibling's position.
    var overlaySide = document.querySelector(".nav-overlay-side");
    if (overlaySide) {
      var sideRect = overlaySide.getBoundingClientRect();
      var panelRect = megaPanel.getBoundingClientRect();
      var width = sideRect.left - panelRect.left - 8;
      if (width > 280) megaPanel.style.width = width + "px";

      // Taller than the divider itself, not an exact match — three full
      // rows of thumbnails plus the "View All" row below need more room
      // than the contact panel's own (shorter) content does. Grow to
      // fit the panel's actual full content (scrollHeight) whenever
      // that's taller than the divider-based minimum, but never past
      // the bottom of the viewport (leaving a small margin) — on a
      // short viewport it falls back to internal scroll instead.
      var minHeight = sideRect.bottom - panelRect.top + 40;
      var neededHeight = megaPanel.scrollHeight;
      var viewportCap = window.innerHeight - panelRect.top - 24;
      var height = Math.min(Math.max(minHeight, neededHeight), viewportCap);
      if (height > 200) megaPanel.style.maxHeight = height + "px";
    }
  }

  if (megaTrigger && megaWrap) {
    megaTrigger.addEventListener("click", function () {
      var isOpen = megaWrap.classList.toggle("is-open");
      megaTrigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) positionMegaPanel();
    });
    window.addEventListener("resize", function () {
      if (megaWrap.classList.contains("is-open")) positionMegaPanel();
    });
  }
})();

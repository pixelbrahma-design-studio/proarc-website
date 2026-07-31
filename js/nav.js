/**
 * Header scroll state and the nav toggle. No animation-library
 * dependency so the nav still works if GSAP/Lenis fail to load.
 */
(function () {
  var header = document.querySelector("[data-nav]");
  var toggle = document.getElementById("nav-toggle");
  var overlay = document.getElementById("nav-overlay");

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

  function setOpen(isOpen) {
    var wasOpen = document.body.classList.contains("nav-open");
    document.body.classList.toggle("nav-open", isOpen);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    }
    if (isOpen && header) header.classList.remove("header-hidden");
    if (window.__lenis) {
      if (isOpen) window.__lenis.stop(); else window.__lenis.start();
    }
    if (!isOpen) {
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

    // Every link inside the overlay navigates away, so close the
    // overlay first for a clean transition.
    document.querySelectorAll("#nav-links a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
  }
})();

/**
 * Testimonials slider — same crossfade/dots/autoplay pattern as the
 * homepage hero slideshow (4s interval, pause on hover, dots + arrows),
 * just driven by class toggles instead of absolute-positioned layers
 * since these slides don't need to overlap a background image.
 */
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".testimonial-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".testimonial-dots button"));
  var prevBtn = document.getElementById("testimonial-prev");
  var nextBtn = document.getElementById("testimonial-next");
  var wrap = document.querySelector(".testimonial-slider");
  if (!slides.length || !wrap) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var index = 0;
  var timer = null;
  var INTERVAL = 4000;

  function goTo(i) {
    slides[index].classList.remove("is-active");
    if (dots[index]) dots[index].classList.remove("is-active");
    index = (i + slides.length) % slides.length;
    slides[index].classList.add("is-active");
    if (dots[index]) dots[index].classList.add("is-active");
  }

  function next() { goTo(index + 1); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() {
    if (reduceMotion || slides.length < 2) return;
    stop();
    timer = setInterval(next, INTERVAL);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { goTo(i); start(); });
  });
  if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1); start(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1); start(); });

  wrap.addEventListener("mouseenter", stop);
  wrap.addEventListener("mouseleave", start);

  start();
})();

/**
 * Category filter + location filter + live search for projects.html.
 * Reads the project dataset from the <script type="application/json">
 * island inlined at build time (see build/inject-partials.js) — no
 * runtime fetch, so this works from file:// with no CORS issues.
 */
(function () {
  var dataEl = document.getElementById("projects-data");
  var grid = document.getElementById("projects-grid");
  var meta = document.getElementById("results-meta");
  var noResults = document.getElementById("no-results");
  var searchInput = document.getElementById("project-search");
  if (!dataEl || !grid) return;

  var PROJECTS = JSON.parse(dataEl.textContent);
  var state = { category: "All", location: "All", query: "" };
  var PAGE_SIZE = 12;
  var visibleCount = PAGE_SIZE;

  var loadMoreBtn = document.createElement("div");
  loadMoreBtn.className = "load-more-wrap";
  loadMoreBtn.innerHTML = '<button type="button" class="btn" id="load-more-btn">Load More <span class="btn-arrow">↓</span></button>';
  grid.insertAdjacentElement("afterend", loadMoreBtn);

  function cardHtml(p) {
    return (
      '<a href="projects/' + p.slug + '.html" class="card project-card">' +
      '<div class="card-media aspect-card">' +
      '<img class="img-cover" src="' + p.thumb + '" alt="' + p.title + '" loading="lazy">' +
      "</div>" +
      '<div class="card-body"><h4>' + p.title + "</h4>" +
      '<span class="card-tag">' + p.category + " — " + p.location + "</span></div>" +
      "</a>"
    );
  }

  function matches(p) {
    var categoryOk = state.category === "All" || p.category === state.category;
    var locationOk = state.location === "All" || p.locationFilter === state.location;
    var queryOk = !state.query || p.title.toLowerCase().indexOf(state.query) !== -1;
    return categoryOk && locationOk && queryOk;
  }

  function animateIn(cards) {
    if (typeof gsap !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(cards, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power2.out" });
    }
  }

  function getResults() {
    return PROJECTS.filter(matches);
  }

  function renderFresh() {
    visibleCount = PAGE_SIZE;
    var results = getResults();
    var slice = results.slice(0, visibleCount);
    grid.innerHTML = slice.map(cardHtml).join("");
    meta.textContent = results.length + (results.length === 1 ? " project" : " projects");
    noResults.hidden = results.length !== 0;
    loadMoreBtn.hidden = results.length <= visibleCount;
    animateIn(grid.querySelectorAll(".project-card"));
  }

  function loadMore() {
    var results = getResults();
    var prevCount = visibleCount;
    visibleCount = Math.min(visibleCount + PAGE_SIZE, results.length);
    var nextSlice = results.slice(prevCount, visibleCount);
    grid.insertAdjacentHTML("beforeend", nextSlice.map(cardHtml).join(""));
    loadMoreBtn.hidden = results.length <= visibleCount;
    animateIn(Array.prototype.slice.call(grid.querySelectorAll(".project-card")).slice(prevCount));
  }

  function wireFilterGroup(selector, stateKey) {
    var opts = document.querySelectorAll(selector);
    opts.forEach(function (opt) {
      opt.addEventListener("click", function () {
        opts.forEach(function (o) { o.classList.remove("is-active"); });
        opt.classList.add("is-active");
        state[stateKey] = opt.getAttribute("data-value");
        renderFresh();
      });
    });
  }

  wireFilterGroup("[data-category-opt]", "category");
  wireFilterGroup("[data-location-opt]", "location");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      state.query = searchInput.value.trim().toLowerCase();
      renderFresh();
    });
  }

  loadMoreBtn.querySelector("#load-more-btn").addEventListener("click", loadMore);

  renderFresh();
})();

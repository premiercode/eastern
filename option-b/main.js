/* Option B — Blueprint / spec sheet
   Loaded in <head> (not deferred) so the .js class lands before first paint.
   Everything is visible without JS; this only enables reveal motion. */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealAll(nodes) {
    for (var i = 0; i < nodes.length; i++) nodes[i].classList.add("is-in");
  }

  document.addEventListener("DOMContentLoaded", function () {
    // The preview bar lives inside the sticky header; offset the header by the bar's
    // height so only the nav row stays pinned while scrolling.
    var bar = document.querySelector(".preview-bar");
    function setBarHeight() {
      if (bar) root.style.setProperty("--pv-h", bar.offsetHeight + "px");
    }
    setBarHeight();
    window.addEventListener("resize", setBarHeight);

    var nodes = document.querySelectorAll(".reveal");

    if (reduce || !("IntersectionObserver" in window)) {
      revealAll(nodes);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    for (var i = 0; i < nodes.length; i++) io.observe(nodes[i]);

    // Safety net: never leave content hidden (e.g. print, odd viewports).
    window.addEventListener("beforeprint", function () { revealAll(nodes); });
  });
})();

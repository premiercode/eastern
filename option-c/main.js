/* Option C — gentle scroll reveals and header state. Content is fully visible without JS. */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showAll() {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-visible');
  }

  if (reduced || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.01 });

  for (var i = 0; i < items.length; i++) io.observe(items[i]);
})();

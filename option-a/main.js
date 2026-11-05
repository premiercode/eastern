/* Option A: small progressive enhancements. All content is visible without this file. */
(function () {
  'use strict';

  var doc = document.documentElement;
  /* The "js" flag lives here, so if this file fails to load nothing is ever hidden. */
  doc.classList.add('js');

  function revealAll(nodes) {
    for (var i = 0; i < nodes.length; i++) nodes[i].classList.add('is-visible');
  }

  function init() {
    var header = document.querySelector('.site-header');
    var previewBar = header && header.querySelector('.preview-bar');

    /* Only the white bar stays pinned: offset the sticky header by the preview bar height */
    if (header && previewBar) {
      var setPreviewH = function () {
        header.style.setProperty('--preview-h', previewBar.offsetHeight + 'px');
      };
      setPreviewH();
      window.addEventListener('resize', setPreviewH);
    }

    /* Mobile navigation toggle */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (toggle && nav) {
      var isOpen = function () { return toggle.getAttribute('aria-expanded') === 'true'; };
      var setOpen = function (open) {
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        nav.classList.toggle('is-open', open);
      };
      toggle.addEventListener('click', function () { setOpen(!isOpen()); });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) {
          setOpen(false);
          toggle.focus();
        }
      });
      /* Close when focus leaves the header so the open menu never hides focused content */
      if (header) {
        header.addEventListener('focusout', function (e) {
          if (isOpen() && e.relatedTarget && !header.contains(e.relatedTarget)) setOpen(false);
        });
      }
      /* Close when the page scrolls (but not when the menu itself scrolls) */
      var lastY = window.scrollY;
      window.addEventListener('scroll', function () {
        if (isOpen() && Math.abs(window.scrollY - lastY) > 24) setOpen(false);
        if (!isOpen()) lastY = window.scrollY;
      }, { passive: true });
      toggle.addEventListener('click', function () { lastY = window.scrollY; });
    }

    /* Header shadow once the page scrolls */
    if (header) {
      var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* Subtle fade-in on scroll */
    var items = document.querySelectorAll('.reveal');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      revealAll(items);
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      items.forEach(function (el) { io.observe(el); });
    }

    /* Highlight the nav link for the section in the middle band; clear it for the hero and other sections */
    var links = document.querySelectorAll('.primary-nav a[href^="#"]:not(.btn)');
    var sections = document.querySelectorAll('main > section');
    if ('IntersectionObserver' in window && links.length && sections.length) {
      var map = {};
      links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
      var inBand = new Set();
      var update = function () {
        var current = null;
        sections.forEach(function (sec) { if (inBand.has(sec)) current = sec; });
        var link = current && current.id ? map[current.id] : null;
        links.forEach(function (l) {
          var on = l === link;
          l.classList.toggle('is-current', on);
          if (on) l.setAttribute('aria-current', 'location');
          else l.removeAttribute('aria-current');
        });
      };
      var navIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) inBand.add(entry.target);
          else inBand.delete(entry.target);
        });
        update();
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (sec) { navIO.observe(sec); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

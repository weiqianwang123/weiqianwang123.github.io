'use strict';

// The section buttons show the items of their section.
(() => {
  const buttons = [...document.querySelectorAll('#filters .button')];
  const items = [...document.querySelectorAll('.grid .list-item')];
  const show = (filter) => {
    buttons.forEach((button) => {
      const on = button.dataset.filter === filter;
      button.classList.toggle('is-checked', on);
      button.setAttribute('aria-selected', String(on));
    });
    items.forEach((item) => {
      const categories = (item.dataset.category || '').split(' ');
      item.classList.toggle('is-hidden', !categories.includes(filter));
    });
    playVisible();
  };
  buttons.forEach((button) =>
    button.addEventListener('click', () => show(button.dataset.filter)));

  // Videos load after the page (so they do not delay the portrait), play
  // while shown, and not at all when the reader asks for less motion.
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const videos = [...document.querySelectorAll('.grid video')];
  function playVisible() {
    videos.forEach((video) => {
      const shown = !video.closest('.list-item').classList.contains('is-hidden');
      if (shown && !reduced.matches && video.dataset.loaded) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }
  window.addEventListener('load', () => {
    if (reduced.matches) return;
    videos.forEach((video) => {
      const source = video.querySelector('source[data-src]');
      if (!source) return;
      source.src = source.dataset.src;
      video.load();
      video.dataset.loaded = '1';
    });
    playVisible();
  });

  // A link may open a section: #publications or #beyond.
  const fromHash = { '#publications': 'publication', '#beyond': 'beyond' };
  show(fromHash[location.hash] || 'research');
  window.addEventListener('hashchange', () => {
    if (fromHash[location.hash]) show(fromHash[location.hash]);
  });
})();

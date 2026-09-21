'use strict';
// Preview motion is optional; native controls remain available without JavaScript.
(() => {
  const video = document.querySelector('#unipred-preview');
  if (!video || !('IntersectionObserver' in window)) return;
  const toggle = document.querySelector('#preview-toggle');
  video.controls = false;
  toggle.hidden = false;
  const updateControl = () => {
    toggle.setAttribute('aria-label', video.paused ? 'Play UniPred preview' : 'Pause UniPred preview');
    toggle.firstElementChild.textContent = video.paused ? '▶' : 'Ⅱ';
  };
  toggle.addEventListener('click', () => {
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let manuallyPaused = false;
  let automaticPause = false;
  const pauseAutomatically = () => {
    if (!video.paused) {
      automaticPause = true;
      video.pause();
    }
  };
  const update = () => {
    if (document.hidden || !visible || reduced.matches) {
      pauseAutomatically();
    } else if (!manuallyPaused) {
      video.play().catch(() => { /* Native play remains available. */ });
    }
  };
  video.addEventListener('pause', () => {
    if (!automaticPause && visible && !document.hidden) manuallyPaused = true;
    automaticPause = false;
    updateControl();
  });
  video.addEventListener('play', () => { manuallyPaused = false; updateControl(); });
  updateControl();
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
    update();
  }, { threshold: [0, 0.35] }).observe(video);
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
})();

// Keep every paper readable without JavaScript; enhance with a selected/all filter.
(() => {
  const filter = document.querySelector('.publication-filter');
  const papers = [...document.querySelectorAll('#publication-list > .publication')];
  if (!filter || !papers.length) return;
  const buttons = [...filter.querySelectorAll('button')];
  const heading = document.querySelector('#publications-title');
  const status = document.querySelector('#publication-status');
  const show = (mode) => {
    papers.forEach(paper => { paper.hidden = mode === 'selected' && paper.dataset.selected !== 'true'; });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.publicationFilter === mode)));
    heading.textContent = mode === 'selected' ? 'Selected publications' : 'All publications';
    const count = papers.filter(paper => !paper.hidden).length;
    status.textContent = `${count} ${count === 1 ? 'publication' : 'publications'} shown`;
  };
  buttons.forEach(button => button.addEventListener('click', () => show(button.dataset.publicationFilter)));
  show('selected');
  filter.hidden = false;
})();

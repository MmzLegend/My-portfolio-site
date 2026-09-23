'use strict';
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.querySelector('.motion-control');
  let paused = reduced.matches;
  try { paused = paused || sessionStorage.getItem('portfolio-motion') === 'paused'; } catch (_) {}
  function applyMotion() {
    document.documentElement.classList.toggle('motion-paused', paused || reduced.matches);
    if (toggle) {
      toggle.hidden = false;
      toggle.setAttribute('aria-pressed', String(paused || reduced.matches));
      toggle.textContent = reduced.matches ? 'Reduced motion enabled' : paused ? 'Resume motion' : 'Pause motion';
      toggle.disabled = reduced.matches;
    }
  }
  toggle?.addEventListener('click', () => {
    paused = !paused;
    try { sessionStorage.setItem('portfolio-motion', paused ? 'paused' : 'running'); } catch (_) {}
    applyMotion();
  });
  reduced.addEventListener('change', applyMotion);
  applyMotion();

  const scenes = {
    rope: { image: '../images/optimized/rope.webp', title: 'The rope bridge', description: 'The first of three height-based virtual environments.' },
    building: { image: '../images/optimized/small-building-snapshot.webp', title: 'The small building', description: 'A building and log walkway introduce another spatial challenge.' },
    skyline: { image: '../images/optimized/tall-building-snapshot.webp', title: 'The skyscraper', description: 'The final environment explores height at the scale of a city.' }
  };
  const sceneImage = document.querySelector('.vr-scene');
  const sceneControls = document.querySelector('.scene-controls');
  if (sceneImage && sceneControls) {
    sceneControls.hidden = false;
    const name = document.getElementById('scene-name');
    const description = document.getElementById('scene-description');
    name.setAttribute('aria-live', 'polite');
    sceneControls.addEventListener('click', event => {
      const button = event.target.closest('[data-scene]');
      if (!button || !scenes[button.dataset.scene]) return;
      const scene = scenes[button.dataset.scene];
      sceneImage.src = scene.image;
      sceneImage.alt = `${scene.title} — VR research prototype environment`;
      name.textContent = scene.title;
      description.textContent = scene.description;
      sceneControls.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
  }
  const views = { exterior: ['Aptech-aptech.webp', 'Aptech exterior architectural render'], entrance: ['Aptech-Aptech-entrance.webp', 'Aptech entrance architectural render'], stairs: ['Aptech-Aptech-stairs.webp', 'Aptech staircase architectural render'] };
  const viewControls = document.querySelector('.view-controls');
  if (viewControls) viewControls.hidden = false;
  if (viewControls) viewControls.addEventListener('click', event => {
    const button = event.target.closest('[data-view]');
    if (!button || !views[button.dataset.view]) return;
    const [src, alt] = views[button.dataset.view];
    const image = document.querySelector('.architecture-image');
    image.src = '../images/optimized/' + src;
    image.alt = alt;
    viewControls.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });

  const timeline = document.querySelector('.journey-timeline');
  if (timeline) {
    const milestones = [...timeline.querySelectorAll('.milestone')];
    let queued = false;
    function updateJourney() {
      queued = false;
      const rect = timeline.getBoundingClientRect();
      const line = innerHeight * .55;
      const progress = Math.max(0, Math.min(1, (line - rect.top) / Math.max(1, rect.height - 70)));
      timeline.style.setProperty('--journey-progress', progress.toFixed(4));
      let nearest = 0, distance = Infinity;
      milestones.forEach((item, index) => {
        const d = Math.abs(item.getBoundingClientRect().top + 30 - line);
        if (d < distance) { nearest = index; distance = d; }
      });
      milestones.forEach((item, index) => item.classList.toggle('is-current', index === nearest));
    }
    function queue() { if (!queued) { queued = true; requestAnimationFrame(updateJourney); } }
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    updateJourney();
  }

  const dialog = document.querySelector('.image-viewer');
  if (dialog && typeof dialog.showModal === 'function') {
    let previous;
    document.querySelectorAll('.project-gallery a[href]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const thumbnail = link.querySelector('img');
        if (!thumbnail) return;
        event.preventDefault();
        previous = link;
        dialog.querySelector('img').src = link.href;
        dialog.querySelector('img').alt = thumbnail.alt;
        dialog.querySelector('p').textContent = thumbnail.alt;
        dialog.showModal();
      });
    });
    dialog.querySelector('.close-viewer').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => previous?.focus());
  }
})();

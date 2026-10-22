// Native scrolling remains available when JavaScript is disabled.
function initializeGallery(root) {
  const track = root.querySelector('[data-gallery-track]');
  const slides = [...root.querySelectorAll('[data-gallery-slide]')];
  if (slides.length < 2) return;
  const thumbnails = [...root.querySelectorAll('[data-gallery-select]')];
  const counter = root.querySelector('[data-gallery-counter]');
  const play = root.querySelector('[data-gallery-play]');
  const dialog = root.querySelector('[data-gallery-dialog]');
  const dialogImage = root.querySelector('[data-gallery-dialog-image]');
  const dialogCaption = root.querySelector('[data-gallery-dialog-caption]');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let dialogIndex = 0;
  let playing = !preference.matches;
  let visible = false;
  let hovering = false;
  let focused = false;
  let timer = 0;
  let scrollFrame = 0;

  function synchronize() {
    clearTimeout(timer);
    play.textContent = playing ? 'Pause' : 'Play';
    play.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
    if (playing && visible && !hovering && (!focused || document.activeElement === play) && !document.hidden && !dialog.open) {
      timer = setTimeout(() => { goTo(index + 1); synchronize(); }, 6500);
    }
  }
  function updateIndex(value) {
    index = value;
    counter.textContent = `${index + 1} / ${slides.length}`;
    thumbnails.forEach((button, i) => i === index
      ? button.setAttribute('aria-current', 'true') : button.removeAttribute('aria-current'));
  }
  function goTo(value, instant = false) {
    const next = (value + slides.length) % slides.length;
    updateIndex(next);
    // Track-relative positions work even when a page has a sidebar or a dialog is open.
    const left = track.scrollLeft + slides[next].getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({left, behavior: preference.matches || instant ? 'instant' : 'smooth'});
  }
  function manualGo(value) {
    playing = false;
    goTo(value);
    synchronize();
  }
  root.querySelector('[data-gallery-prev]').addEventListener('click', () => manualGo(index - 1));
  root.querySelector('[data-gallery-next]').addEventListener('click', () => manualGo(index + 1));
  thumbnails.forEach((button, i) => button.addEventListener('click', () => manualGo(i)));
  play.addEventListener('click', () => { playing = !playing; synchronize(); });
  track.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    manualGo(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1
      : index + (event.key === 'ArrowRight' ? 1 : -1));
    if (event.target.matches('[data-gallery-open]')) slides[index].querySelector('[data-gallery-open]').focus({preventScroll: true});
  });
  ['pointerdown', 'wheel'].forEach(type => track.addEventListener(type, () => {
    playing = false;
    synchronize();
  }, {passive: true}));
  track.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const x = track.getBoundingClientRect().left;
      const distances = slides.map(slide => Math.abs(slide.getBoundingClientRect().left - x));
      updateIndex(distances.indexOf(Math.min(...distances)));
    });
  }, {passive: true});
  track.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') {hovering = true; synchronize();} });
  track.addEventListener('pointerleave', () => { hovering = false; synchronize(); });
  root.addEventListener('focusin', () => { focused = true; synchronize(); });
  root.addEventListener('focusout', event => {
    focused = root.contains(event.relatedTarget);
    synchronize();
  });

  function showImage(value) {
    dialogIndex = (value + slides.length) % slides.length;
    const img = slides[dialogIndex].querySelector('img');
    dialogImage.src = img.src;
    dialogImage.alt = img.alt;
    dialogCaption.textContent = `${dialogIndex + 1} / ${slides.length} · ${slides[dialogIndex].querySelector('figcaption').textContent}`;
  }
  slides.forEach((slide, i) => slide.querySelector('[data-gallery-open]').addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    playing = false;
    showImage(i);
    dialog.showModal();
    document.body.classList.add('lab-gallery-modal-open');
    synchronize();
  }));
  root.querySelector('[data-gallery-close]').addEventListener('click', () => dialog.close());
  root.querySelector('[data-gallery-dialog-prev]').addEventListener('click', () => showImage(dialogIndex - 1));
  root.querySelector('[data-gallery-dialog-next]').addEventListener('click', () => showImage(dialogIndex + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(dialogIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('lab-gallery-modal-open');
    goTo(dialogIndex, true);
    slides[dialogIndex].querySelector('[data-gallery-open]').focus({preventScroll: true});
    synchronize();
  });
  preference.addEventListener('change', () => {
    if (preference.matches) playing = false;
    synchronize();
  });
  document.addEventListener('visibilitychange', synchronize);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    synchronize();
  }, {threshold: 0.2}).observe(root);
  new ResizeObserver(() => goTo(index, true)).observe(track);
  root.querySelector('[data-gallery-controls]').hidden = false;
  root.querySelector('[data-gallery-thumbnails]').hidden = false;
  synchronize();
}

document.querySelectorAll('[data-group-gallery]').forEach(initializeGallery);

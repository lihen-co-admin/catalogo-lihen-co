/*
  Creo y controlo un carrusel reutilizable.
  Recibo el contenedor, los elementos y la función que construye cada tarjeta.
*/
const carouselControllers = new WeakMap();

function findOne(selector, container) {
  if (!container || typeof container.querySelector !== 'function') {
    return null;
  }

  return container.querySelector(selector);
}

function findAll(selector, container) {
  if (!container || typeof container.querySelectorAll !== 'function') {
    return [];
  }

  return [...container.querySelectorAll(selector)];
}

export function initCarousel(root, items, renderItem) {
  if (!root || typeof renderItem !== 'function') {
    return null;
  }

  const existingController = carouselControllers.get(root);

  if (existingController) {
    existingController.update(items);
    return existingController;
  }

  const viewport = findOne('.carousel-viewport', root);
  const track = findOne('[data-track]', root);
  const dots = findOne('[data-dots]', root);
  const previousButton = findOne('.carousel-arrow.prev', root);
  const nextButton = findOne('.carousel-arrow.next', root);

  if (!viewport || !track) {
    return null;
  }

  let currentItems = [];
  let index = 0;
  let timer = null;
  let resizeTimer = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let scrollFrame = null;
  let destroyed = false;

  function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function cards() {
    return findAll('.product-card', track);
  }

  function step() {
    const firstCard = cards()[0];

    if (!firstCard) {
      return 0;
    }

    const styles = getComputedStyle(track);
    return firstCard.getBoundingClientRect().width + (parseFloat(styles.columnGap || styles.gap) || 18);
  }

  function maxIndex() {
    const amount = step();
    return amount > 0
      ? Math.max(0, Math.ceil((viewport.scrollWidth - viewport.clientWidth - 1) / amount))
      : 0;
  }

  function clamp(value) {
    return Math.max(0, Math.min(Number(value) || 0, maxIndex()));
  }

  function paint() {
    index = clamp(index);
    const total = maxIndex() + 1;

    if (dots) {
      dots.innerHTML = currentItems.length
        ? Array.from({ length: total }, function (_, dotIndex) {
            return `<button type="button" class="${dotIndex === index ? 'active' : ''}" data-index="${dotIndex}" aria-label="Ver posición ${dotIndex + 1} de ${total}" aria-current="${dotIndex === index ? 'true' : 'false'}"></button>`;
          }).join('')
        : '';
    }

    const disabled = maxIndex() === 0;

    if (previousButton) {
      previousButton.disabled = disabled;
    }

    if (nextButton) {
      nextButton.disabled = disabled;
    }
  }

  function go(value, behavior = reducedMotion() ? 'auto' : 'smooth') {
    index = clamp(value);
    viewport.scrollTo({ left: index * step(), behavior: behavior });
    paint();
  }

  function next() {
    go(index >= maxIndex() ? 0 : index + 1);
  }

  function previous() {
    go(index <= 0 ? maxIndex() : index - 1);
  }

  function stop() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();

    if (destroyed || document.hidden || maxIndex() === 0) {
      return;
    }

    timer = setInterval(next, 3000);
  }

  function onPrevious(event) {
    event.preventDefault();
    previous();
    start();
  }

  function onNext(event) {
    event.preventDefault();
    next();
    start();
  }

  function onDots(event) {
    const dot = event.target.closest('[data-index]');

    if (dot) {
      go(Number(dot.dataset.index));
      start();
    }
  }

  function onFocusIn() {
    stop();
  }

  function onFocusOut(event) {
    if (!root.contains(event.relatedTarget)) {
      start();
    }
  }

  function onTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    stop();
  }

  function onTouchEnd(event) {
    const differenceX = event.changedTouches[0].clientX - touchStartX;
    const differenceY = event.changedTouches[0].clientY - touchStartY;

    if (Math.abs(differenceX) > 45 && Math.abs(differenceX) > Math.abs(differenceY)) {
      if (differenceX < 0) {
        next();
      } else {
        previous();
      }
    }

    start();
  }

  function onScroll() {
    if (scrollFrame !== null) {
      cancelAnimationFrame(scrollFrame);
    }

    scrollFrame = requestAnimationFrame(function () {
      const amount = step();

      if (amount > 0) {
        const nextIndex = clamp(Math.round(viewport.scrollLeft / amount));

        if (nextIndex !== index) {
          index = nextIndex;
          paint();
        }
      }
    });
  }

  function recalculate() {
    index = clamp(index);
    go(index, 'auto');
    start();
  }

  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(recalculate, 150);
  }

  function onVisibility() {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  }

  previousButton?.addEventListener('click', onPrevious);
  nextButton?.addEventListener('click', onNext);
  dots?.addEventListener('click', onDots);
  root.addEventListener('focusin', onFocusIn);
  root.addEventListener('focusout', onFocusOut);
  viewport.addEventListener('touchstart', onTouchStart, { passive: true });
  viewport.addEventListener('touchend', onTouchEnd, { passive: true });
  viewport.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);

  const controller = {
    update: function (nextItems = []) {
      currentItems = [...nextItems];
      track.innerHTML = currentItems.map(renderItem).join('');
      root.classList.toggle('is-empty', currentItems.length === 0);
      index = 0;

      requestAnimationFrame(function () {
        go(0, 'auto');
        start();
      });
    },
    destroy: function () {
      destroyed = true;
      stop();
      clearTimeout(resizeTimer);

      if (scrollFrame !== null) {
        cancelAnimationFrame(scrollFrame);
      }

      previousButton?.removeEventListener('click', onPrevious);
      nextButton?.removeEventListener('click', onNext);
      dots?.removeEventListener('click', onDots);
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchend', onTouchEnd);
      viewport.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      carouselControllers.delete(root);
    }
  };

  carouselControllers.set(root, controller);
  controller.update(items);
  return controller;
}

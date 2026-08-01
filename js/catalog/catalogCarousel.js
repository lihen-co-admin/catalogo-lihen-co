export function updateCatalogCarouselProgress(track, lineName) {
  const bar = document.querySelector(`[data-carousel-progress="${lineName}"]`);
  if (!bar) return;

  const ratio =
    track.scrollWidth <= track.clientWidth
      ? 1
      : (track.scrollLeft + track.clientWidth) / track.scrollWidth;

  bar.style.width = `${Math.max(12, ratio * 100)}%`;
}

export function setupCatalogCarousel(track, lineName) {
  if (!track || track.dataset.autoReady) return;
  track.dataset.autoReady = "1";

  let paused = false;
  const step = () => Math.max(260, track.clientWidth * 0.78);

  const tick = () => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step(), behavior: "smooth" });
    }
  };

  const interval = setInterval(tick, 5200);
  track.addEventListener("mouseenter", () => { paused = true; });
  track.addEventListener("mouseleave", () => { paused = false; });
  track.addEventListener("touchstart", () => { paused = true; }, { passive: true });
  track.addEventListener("touchend", () => {
    setTimeout(() => { paused = false; }, 2500);
  }, { passive: true });
  track.addEventListener("scroll", () => updateCatalogCarouselProgress(track, lineName), {
    passive: true,
  });

  document.querySelector(`[data-carousel-prev="${lineName}"]`)?.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  document.querySelector(`[data-carousel-next="${lineName}"]`)?.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });

  window.addEventListener("beforeunload", () => clearInterval(interval), { once: true });
}

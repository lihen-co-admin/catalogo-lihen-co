export function setupHeroCarousel() {
  const root = document.querySelector("[data-hero-carousel]");
  if (!root || root.dataset.autoplayReady === "true") return;

  root.dataset.autoplayReady = "true";
  const slides = [...root.querySelectorAll("[data-hero-slide]")];
  const dots = root.querySelector("[data-hero-dots]");
  if (slides.length < 2) return;

  let index = 0;
  let timer = null;
  let touchStart = 0;

  const renderDots = () => {
    if (!dots) return;
    dots.innerHTML = slides
      .map((_, position) =>
        `<button type="button" class="${position === index ? "active" : ""}" data-hero-index="${position}" aria-label="Ver imagen ${position + 1}" aria-current="${position === index ? "true" : "false"}"></button>`,
      )
      .join("");
  };

  const show = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      const active = position === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });
    renderDots();
  };

  const clearTimer = () => {
    if (timer === null) return;
    window.clearTimeout(timer);
    timer = null;
  };

  const schedule = () => {
    clearTimer();
    if (document.hidden) return;
    timer = window.setTimeout(() => {
      show(index + 1);
      schedule();
    }, 5000);
  };

  const move = (nextIndex) => {
    show(nextIndex);
    schedule();
  };

  root.querySelector("[data-hero-next]")?.addEventListener("click", (event) => {
    event.preventDefault();
    move(index + 1);
  });
  root.querySelector("[data-hero-prev]")?.addEventListener("click", (event) => {
    event.preventDefault();
    move(index - 1);
  });
  dots?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-hero-index]");
    if (!button) return;
    event.preventDefault();
    move(Number(button.dataset.heroIndex));
  });
  root.addEventListener("touchstart", (event) => {
    touchStart = event.touches[0].clientX;
    clearTimer();
  }, { passive: true });
  root.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 45) show(index + (delta < 0 ? 1 : -1));
    schedule();
  }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearTimer();
    else schedule();
  });

  show(0);
  schedule();
}

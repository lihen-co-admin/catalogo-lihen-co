export function setupPageEnhancements() {
  const progress = document.querySelector("[data-scroll-progress]");
  const updateProgress = () => {
    if (!progress) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = total > 0 ? (window.scrollY / total) * 100 : 0;
    progress.style.width = `${Math.min(100, percentage)}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  document.querySelectorAll("[data-count-to]").forEach((counter) => {
    const target = Number(counter.dataset.countTo || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));
    const timer = window.setInterval(() => {
      current = Math.min(target, current + step);
      counter.textContent = String(current);
      if (current >= target) window.clearInterval(timer);
    }, 35);
  });

  document.querySelectorAll("[data-set-line]").forEach((link) => {
    link.addEventListener("click", () => {
      const value = link.dataset.setLine;
      window.setTimeout(() => document.querySelector(`[data-line-filter="${value}"]`)?.click(), 80);
    });
  });
}

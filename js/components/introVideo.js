const INTRO_KEY = "lihen_intro_seen";

export function setupIntroVideo() {
  const intro = document.querySelector("[data-intro]");
  const video = document.querySelector("[data-intro-video]");
  const skipButton = document.querySelector("[data-intro-skip]");
  if (!intro || !video || !skipButton) return;

  const closeIntro = () => {
    intro.classList.add("is-closing");
    window.setTimeout(() => {
      intro.hidden = true;
      document.body.classList.remove("intro-open");
    }, 450);
    sessionStorage.setItem(INTRO_KEY, "true");
  };

  if (sessionStorage.getItem(INTRO_KEY) === "true" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  intro.hidden = false;
  document.body.classList.add("intro-open");
  video.play().catch(() => closeIntro());
  video.addEventListener("ended", closeIntro, { once: true });
  video.addEventListener("error", closeIntro, { once: true });
  skipButton.addEventListener("click", closeIntro);
}

const CONFETTI_COLORS = [
  "#e8bf6a",
  "#edc7cf",
  "#d9afca",
  "#f7e7c8",
  "#c9afe7",
  "#f2d6a2",
  "#f7bfcf"
];

const CHORD_SETS = [
  [261.63, 329.63, 392.00],
  [220.00, 277.18, 329.63],
  [246.94, 311.13, 369.99],
  [196.00, 246.94, 329.63]
];

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function createInvitationExperience({ view }) {
  let audioContext = null;
  let ambienceTimer = null;
  let chordIndex = 0;

  async function transitionToSeal() {
    const entryScreen = view.screens.entry;
    const sealScreen = view.screens.seal;
    const discoverButton = document.querySelector("[data-discover-button]");

    discoverButton?.setAttribute("aria-busy", "true");
    entryScreen.classList.add("transitioning");
    await wait(1850);
    view.showScreen("seal");
    sealScreen.classList.add("arriving");
    requestAnimationFrame(() => {
      setTimeout(() => sealScreen.classList.remove("arriving"), 1450);
    });
    entryScreen.classList.remove("transitioning");
    discoverButton?.removeAttribute("aria-busy");
  }

  function createCelebration({ secondary = false } = {}) {
    const layer = document.querySelector("[data-celebration-layer]");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!layer || reducedMotion) return;
    if (!secondary) layer.replaceChildren();

    const viewportBase = Math.max(
      180,
      Math.min(window.innerWidth, window.innerHeight) * 0.34
    );
    const total = secondary ? 30 : 48;

    for (let index = 0; index < total; index += 1) {
      const piece = document.createElement("span");
      const angle =
        (Math.PI * 2 * index) / total + (Math.random() - 0.5) * 0.34;
      const distance =
        viewportBase * (secondary ? 0.72 : 1) +
        Math.random() * viewportBase * (secondary ? 0.38 : 0.52);

      piece.className = index % 3 === 0 ? "spark-piece" : "confetti-piece";
      piece.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
      piece.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
      piece.style.setProperty(
        "--rot",
        `${Math.round(Math.random() * 1080 - 540)}deg`
      );
      piece.style.setProperty(
        "--delay",
        `${(Math.random() * (secondary ? 0.3 : 0.2)).toFixed(2)}s`
      );
      piece.style.setProperty(
        "--piece-color",
        CONFETTI_COLORS[index % CONFETTI_COLORS.length]
      );
      piece.style.setProperty("--piece-width", `${8 + Math.random() * 6}px`);
      piece.style.setProperty("--piece-height", `${14 + Math.random() * 14}px`);
      layer.append(piece);
    }

    setTimeout(() => layer.replaceChildren(), 2600);
  }

  function playPad(context, master) {
    if (!audioContext || context.state === "closed") return;

    const now = context.currentTime;
    const chord = CHORD_SETS[chordIndex++ % CHORD_SETS.length];

    chord.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const filter = context.createBiquadFilter();

      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency / 2;
      oscillator.detune.value = (index - 1) * 4;
      filter.type = "lowpass";
      filter.frequency.value = 900;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.22 : 0.13, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.8);
      oscillator.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      oscillator.start(now);
      oscillator.stop(now + 6);
    });

    const bell = context.createOscillator();
    const bellGain = context.createGain();
    bell.type = "sine";
    bell.frequency.value = 523.25 * (chordIndex % 2 ? 1 : 1.5);
    bellGain.gain.setValueAtTime(0.0001, now + 0.4);
    bellGain.gain.exponentialRampToValueAtTime(0.11, now + 0.48);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
    bell.connect(bellGain);
    bellGain.connect(master);
    bell.start(now + 0.4);
    bell.stop(now + 3);
  }

  async function startAmbience() {
    if (audioContext) {
      if (audioContext.state === "suspended") await audioContext.resume();
      view.updateSoundButtons(true);
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    audioContext = new AudioContextClass();
    if (audioContext.state === "suspended") await audioContext.resume();

    const master = audioContext.createGain();
    master.gain.setValueAtTime(0.085, audioContext.currentTime);
    master.connect(audioContext.destination);

    const play = () => playPad(audioContext, master);
    play();
    ambienceTimer = setInterval(play, 5200);
    view.updateSoundButtons(true);
  }

  async function stopAmbience() {
    if (ambienceTimer) clearInterval(ambienceTimer);
    ambienceTimer = null;

    if (audioContext && audioContext.state !== "closed") {
      await audioContext.close();
    }

    audioContext = null;
    chordIndex = 0;
    view.updateSoundButtons(false);
  }

  async function toggleAmbience() {
    if (audioContext) await stopAmbience();
    else await startAmbience();
  }

  async function revealInvitation(button) {
    if (button.classList.contains("opening")) return;

    const sealScreen = view.screens.seal;
    button.classList.add("opening");
    sealScreen.classList.add("revealing");
    createCelebration();
    setTimeout(() => createCelebration({ secondary: true }), 950);
    await startAmbience();
    await wait(2600);
    view.showScreen("invitation");
    sealScreen.classList.remove("revealing");
    button.classList.remove("opening");
  }

  function bindSoundControls() {
    document.querySelectorAll("[data-sound-toggle]").forEach((button) => {
      button.addEventListener("click", toggleAmbience);
    });
  }

  return {
    transitionToSeal,
    revealInvitation,
    startAmbience,
    stopAmbience,
    toggleAmbience,
    bindSoundControls
  };
}

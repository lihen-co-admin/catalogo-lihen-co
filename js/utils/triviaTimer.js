export function getTriviaSecondsLeft(round, now = Date.now()) {
  if (!round || round.status !== "open" || !round.closes_at) return 0;
  return Math.max(0, Math.ceil((new Date(round.closes_at).getTime() - now) / 1000));
}

export function formatTriviaTime(seconds) {
  return `00:${String(Math.max(0, seconds)).padStart(2, "0")}`;
}

export function createTriviaTicker(getRound, onTick, onExpired = () => {}) {
  let expiredRoundId = null;
  const tick = () => {
    const round = getRound();
    const seconds = getTriviaSecondsLeft(round);
    onTick(seconds, round);
    if (round?.status === "open" && seconds === 0 && expiredRoundId !== round.id) {
      expiredRoundId = round.id;
      onExpired(round);
    }
  };
  tick();
  const timer = window.setInterval(tick, 250);
  return () => window.clearInterval(timer);
}

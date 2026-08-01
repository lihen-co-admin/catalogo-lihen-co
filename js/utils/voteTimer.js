import { calculateTriviaSeconds, formatTriviaTime } from "./triviaTimer.js";
export const calculateVoteSeconds = calculateTriviaSeconds;
export const formatVoteTime = formatTriviaTime;
export function createVoteTicker(getRound, onTick) {
  const tick = () => onTick(calculateVoteSeconds(getRound()));
  tick();
  const id = window.setInterval(tick, 250);
  return () => window.clearInterval(id);
}

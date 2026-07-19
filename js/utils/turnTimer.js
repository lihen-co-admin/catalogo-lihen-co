export function getTurnSeconds(room, now = Date.now()) {
  if (!room) return 0;
  const remaining = Number(room.turn_remaining_seconds ?? room.turn_duration_seconds ?? 0);
  if (room.turn_status !== "running" || !room.turn_started_at) return Math.max(0, remaining);
  const elapsed = Math.floor((now - new Date(room.turn_started_at).getTime()) / 1000);
  return Math.max(0, remaining - elapsed);
}

export function formatTurnTime(seconds) {
  const safe = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safe / 60).toString().padStart(2, "0");
  const rest = Math.floor(safe % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

export function createTurnTicker(getRoom, onTick) {
  const tick = () => onTick(getTurnSeconds(getRoom()));
  tick();
  const id = window.setInterval(tick, 250);
  return () => window.clearInterval(id);
}

import { getLocalParticipant } from "../../repositories/participantRepository.js";
import { getCurrentTriviaRound, submitTriviaAnswer, subscribeToTriviaRounds } from "../../repositories/triviaRepository.js";
import { createTriviaTicker, formatTriviaTime } from "../../utils/triviaTimer.js";

const $ = selector => document.querySelector(selector);
let currentRound = null;
let currentRoom = null;
let participant = null;
let unsubscribe = () => {};
let stopTicker = () => {};
let answeredRoundId = null;

function isMyTurn() {
  return participant && currentRoom && String(currentRoom.active_participant_public_id || "") === String(participant.id || "");
}

function renderRound(round) {
  currentRound = round;
  const shell = $("#trivia-participant");
  if (!shell) return;
  const waiting = $("#trivia-waiting");
  const question = $("#trivia-question");
  const options = $("#trivia-options");
  const message = $("#trivia-message");
  const canAnswer = round?.status === "open" && isMyTurn() && answeredRoundId !== round.id;
  shell.dataset.status = round?.status || "waiting";
  waiting.hidden = Boolean(round);
  question.textContent = round?.question_text || "La administradora todavía no ha abierto una pregunta.";
  $("#trivia-round-status").textContent = round?.status === "open" ? "Pregunta abierta" : round?.status === "closed" ? "Pregunta cerrada" : "En espera";
  options.innerHTML = "";
  (round?.options || []).forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "trivia-option";
    button.dataset.option = String(index);
    button.disabled = !canAnswer;
    button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span><strong>${option}</strong>`;
    options.append(button);
  });
  if (round?.status === "open" && !isMyTurn()) message.textContent = "Observa la pregunta. Solo la persona con el turno activo puede responder.";
  else if (round?.status === "closed") message.textContent = round.winner_display_name ? `Respuesta registrada. Ganó: ${round.winner_display_name}.` : "La ronda terminó sin respuesta correcta.";
  else if (canAnswer) message.textContent = "Es tu turno: selecciona una respuesta antes de que termine el tiempo.";
}

async function answer(optionIndex, button) {
  if (!currentRound || !isMyTurn() || answeredRoundId === currentRound.id) return;
  const message = $("#trivia-message");
  document.querySelectorAll(".trivia-option").forEach(option => { option.disabled = true; });
  button.dataset.selected = "true";
  message.textContent = "Validando tu respuesta…";
  try {
    const result = await submitTriviaAnswer({ participantId: participant.id, accessCode: participant.accessCode, roundId: currentRound.id, selectedOption: optionIndex });
    answeredRoundId = currentRound.id;
    button.dataset.result = result?.is_correct ? "correct" : "incorrect";
    message.textContent = result?.is_correct ? "¡Respuesta correcta! El resultado quedó sincronizado." : "La respuesta no es correcta. Espera la siguiente indicación.";
  } catch (error) {
    document.querySelectorAll(".trivia-option").forEach(option => { option.disabled = !isMyTurn(); });
    message.textContent = error.message || "No fue posible registrar la respuesta.";
  }
}

export function updateTriviaRoomState(room) {
  currentRoom = room;
  renderRound(currentRound);
}

export async function initParticipantTrivia() {
  participant = getLocalParticipant();
  $("#trivia-options")?.addEventListener("click", event => {
    const button = event.target.closest("[data-option]");
    if (button) answer(Number(button.dataset.option), button);
  });
  try { renderRound(await getCurrentTriviaRound()); } catch (error) { console.warn("No fue posible cargar Trivia LIHEN.", error); }
  unsubscribe = await subscribeToTriviaRounds(async () => {
    try { renderRound(await getCurrentTriviaRound()); } catch (error) { console.warn(error); }
  });
  stopTicker = createTriviaTicker(() => currentRound, seconds => {
    const clock = $("#trivia-clock"); if (clock) clock.textContent = formatTriviaTime(seconds);
  });
  return () => { unsubscribe(); stopTicker(); };
}

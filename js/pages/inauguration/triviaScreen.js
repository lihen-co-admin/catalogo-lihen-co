import { getCurrentTriviaRound, subscribeToTriviaRounds } from "../../repositories/triviaRepository.js";
import { createTriviaTicker, formatTriviaTime } from "../../utils/triviaTimer.js";

const $ = selector => document.querySelector(selector);
let currentRound = null;

function render(round) {
  currentRound = round;
  const shell = $("#screen-trivia");
  if (!shell) return;
  shell.hidden = !round;
  $("#screen-trivia-question").textContent = round?.question_text || "Esperando la primera pregunta";
  $("#screen-trivia-options").innerHTML = (round?.options || []).map((option,index)=>`<li><span>${String.fromCharCode(65+index)}</span>${option}</li>`).join("");
  $("#screen-trivia-state").textContent = round?.status === "open" ? "Pregunta abierta" : round?.status === "closed" ? "Ronda cerrada" : "En espera";
  $("#screen-trivia-result").textContent = round?.status === "closed" ? (round.winner_display_name ? `Ganó ${round.winner_display_name}` : "Sin respuesta correcta") : "";
}

export async function initTriviaScreen() {
  try { render(await getCurrentTriviaRound()); } catch(error) { console.warn(error); }
  await subscribeToTriviaRounds(async()=>{ try { render(await getCurrentTriviaRound()); } catch(error) { console.warn(error); } });
  createTriviaTicker(()=>currentRound,seconds=>{ const el=$("#screen-trivia-clock"); if(el) el.textContent=formatTriviaTime(seconds); });
}

import { TRIVIA_QUESTIONS } from "../data/triviaQuestions.js";
import { getCurrentTriviaRound, subscribeToTriviaRounds } from "../repositories/triviaRepository.js";
import { openTriviaRound, closeTriviaRound, resetTriviaRound, getTriviaResponses } from "../repositories/adminTriviaRepository.js";
import { createTriviaTicker, formatTriviaTime } from "../utils/triviaTimer.js";

const $ = selector => document.querySelector(selector);
let currentRound = null;
let unsubscribe = () => {};
let stopTicker = () => {};

function message(text, type="info") { const el=$("[data-trivia-admin-message]"); el.textContent=text; el.dataset.type=type; el.hidden=false; }
async function render(round) {
  currentRound = round;
  $("#trivia-admin-state").textContent = round?.status || "waiting";
  $("#trivia-admin-question").textContent = round?.question_text || "No hay una pregunta activa";
  $("#trivia-admin-winner").textContent = round?.winner_display_name ? `Ganador: ${round.winner_display_name}` : "Sin ganador registrado";
  const responses = round?.id ? await getTriviaResponses(round.id) : [];
  $("#trivia-admin-responses").innerHTML = responses.length ? responses.map(response => `<li><strong>${response.display_name}</strong><span>Opción ${String.fromCharCode(65+response.selected_option)} · ${response.is_correct ? "Correcta" : "Incorrecta"}</span><small>${new Date(response.answered_at).toLocaleTimeString("es-CO")}</small></li>`).join("") : "<li>Sin respuestas registradas.</li>";
}

export async function initAdminTrivia() {
  const select=$("#trivia-question-select");
  select.innerHTML=TRIVIA_QUESTIONS.map(q=>`<option value="${q.key}">${q.position}. ${q.question}</option>`).join("");
  $("[data-trivia-open]").addEventListener("click",async()=>{ try { await openTriviaRound(select.value,$("#trivia-duration").value); await render(await getCurrentTriviaRound()); message("Pregunta publicada y habilitada para el participante activo.","success"); } catch(error){ message(error.message,"error"); } });
  $("[data-trivia-close]").addEventListener("click",async()=>{ try { await closeTriviaRound(); await render(await getCurrentTriviaRound()); message("Ronda cerrada.","success"); } catch(error){ message(error.message,"error"); } });
  $("[data-trivia-reset]").addEventListener("click",async()=>{ try { await resetTriviaRound(); await render(null); message("Trivia reiniciada.","success"); } catch(error){ message(error.message,"error"); } });
  try { await render(await getCurrentTriviaRound()); } catch(error){ console.warn(error); }
  unsubscribe=await subscribeToTriviaRounds(async()=>{ try { await render(await getCurrentTriviaRound()); } catch(error){ console.warn(error); } });
  stopTicker=createTriviaTicker(()=>currentRound,seconds=>{ $("#trivia-admin-clock").textContent=formatTriviaTime(seconds); });
  return ()=>{unsubscribe();stopTicker();};
}

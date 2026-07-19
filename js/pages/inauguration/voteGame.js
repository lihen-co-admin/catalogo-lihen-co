import { getLocalParticipant } from "../../repositories/participantRepository.js";
import { getCurrentVoteRound, getVoteRanking, submitVote, subscribeToVoteRounds, subscribeToVotes } from "../../repositories/voteRepository.js";
import { createVoteTicker, formatVoteTime } from "../../utils/voteTimer.js";
const $ = selector => document.querySelector(selector);
let participant=null, round=null, votedRoundId=null, unsubscribeRound=()=>{}, unsubscribeVotes=()=>{}, stopTicker=()=>{};
function escapeHtml(value="") { return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char])); }
async function renderRanking() {
  const list = $("#vote-ranking");
  if (!list || !round?.id) return;
  const rows = await getVoteRanking(round.id);
  const max = Math.max(1, ...rows.map(row => Number(row.vote_count || 0)));
  list.innerHTML = rows.length ? rows.map((row,index) => `<li><span class="vote-rank-position">${index+1}</span><div><strong>${escapeHtml(row.option_label)}</strong><span class="vote-bar"><i style="width:${Math.round(Number(row.vote_count||0)/max*100)}%"></i></span></div><b>${row.vote_count}</b></li>`).join("") : "<li class="vote-empty">Aún no hay votos.</li>";
}
function renderOptions() {
  const container = $("#vote-options");
  if (!container) return;
  const open = round?.status === "open";
  const canVote = Boolean(participant && open && votedRoundId !== round.id);
  const options = Array.isArray(round?.options) ? round.options : [];
  container.innerHTML = options.map(option => `<button type="button" class="vote-option" data-vote-option="${escapeHtml(option.key)}" ${canVote?"":"disabled"}><strong>${escapeHtml(option.label)}</strong><span>${escapeHtml(option.description||"")}</span></button>`).join("");
}
async function render(nextRound) {
  round = nextRound;
  const section = $("#votacion"); if (!section) return;
  const card = $("#vote-participant");
  card.hidden = !round;
  $("#vote-round-status").textContent = !round ? "En espera" : round.status === "open" ? "Votación abierta" : "Votación cerrada";
  $("#vote-question").textContent = round?.question_text || "La administradora abrirá una votación.";
  const open = round?.status === "open";
  $("#vote-message").textContent = !round ? "Espera las indicaciones." : votedRoundId === round.id ? "Tu voto quedó registrado. Observa cómo cambia el ranking." : open ? "Selecciona una opción. En este juego todas las personas registradas pueden votar al mismo tiempo." : "La votación terminó. Este es el resultado final.";
  renderOptions();
  await renderRanking();
}
async function handleVote(event) {
  const button = event.target.closest("[data-vote-option]");
  if (!button || !round || votedRoundId === round.id || round.status !== "open") return;
  if (!participant) { $("#vote-message").textContent = "Debes registrarte antes de votar."; return; }
  $("#vote-message").textContent = "Registrando tu voto…";
  document.querySelectorAll("[data-vote-option]").forEach(item => item.disabled=true);
  try {
    await submitVote({ participantId: participant.id, accessCode: participant.accessCode, roundId: round.id, optionKey: button.dataset.voteOption });
    votedRoundId = round.id;
    $("#vote-message").textContent = "Tu voto quedó registrado. Observa cómo cambia el ranking.";
    await renderRanking();
  } catch(error) {
    $("#vote-message").textContent = error.message || "No fue posible registrar el voto.";
    renderOptions();
  }
}
export async function initParticipantVoteGame() {
  participant = getLocalParticipant();
  $("#vote-options")?.addEventListener("click", handleVote);
  try { await render(await getCurrentVoteRound()); } catch(error) { console.warn(error); }
  unsubscribeRound = await subscribeToVoteRounds(async()=>render(await getCurrentVoteRound()));
  unsubscribeVotes = await subscribeToVotes(renderRanking);
  stopTicker = createVoteTicker(()=>round, seconds=>{ const element=$("#vote-clock"); if(element) element.textContent=formatVoteTime(seconds); });
  return ()=>{ unsubscribeRound(); unsubscribeVotes(); stopTicker(); };
}

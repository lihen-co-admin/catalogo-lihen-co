import { initTriviaScreen } from "./triviaScreen.js";
import { initWordScreen } from "./wordScreen.js";
import { initVoteScreen } from "./voteScreen.js";
import { initFlashScreen } from "./flashScreen.js";
import { initRouletteScreen } from "./rouletteScreen.js";
import { initRewardScreen } from "./rewardScreen.js";
import { getEventRoom, subscribeToEventRoom } from "../../repositories/eventRoomRepository.js";
import { joinRoomPresence } from "../../services/roomPresenceService.js";
import { createTurnTicker, formatTurnTime } from "../../utils/turnTimer.js";

const $ = selector => document.querySelector(selector);
let currentRoom = null;
const screenIdentity = { id: `screen-${crypto.randomUUID()}`, displayName: "Pantalla LIHEN", mode: "screen", role: "screen" };

function renderRoom(room) {
  currentRoom = room;
  if (!room) return;
  const labels = { preparing:"Preparando sala", registration:"Registro abierto", waiting:"En espera", live:"Evento en vivo", paused:"Evento en pausa", finished:"Evento finalizado" };
  $("#screen-room-status").textContent = labels[room.event_status] || room.event_status;
  $("#screen-activity").textContent = room.active_activity || "Esperando indicaciones";
  $("#screen-announcement").textContent = room.announcement || "Pronto comenzaremos la experiencia LIHEN.CO.";
  $("#screen-turn-name").textContent = room.active_display_name || "Esperando siguiente participante";
  $("#screen-turn-mode").textContent = room.active_modality || "";
  document.body.dataset.status = room.event_status;
}
function renderPresence(people) {
  const participants = people.filter(person => person.role === "participant");
  $("#screen-total").textContent = participants.length;
  $("#screen-presencial").textContent = participants.filter(p => p.mode === "presencial").length;
  $("#screen-virtual").textContent = participants.filter(p => p.mode === "virtual").length;
  $("#screen-people").innerHTML = participants.slice(0, 14).map(p => `<li><span>${p.displayName.slice(0,1).toUpperCase()}</span>${p.displayName}</li>`).join("");
}
function updateClock(){ $("#screen-clock").textContent = new Intl.DateTimeFormat("es-CO",{hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date()); }

document.addEventListener("DOMContentLoaded", async () => {
  updateClock(); setInterval(updateClock, 1000);
  initTriviaScreen(); initWordScreen(); initVoteScreen(); initFlashScreen(); initRouletteScreen(); initRewardScreen();
  try { renderRoom(await getEventRoom()); } catch(error) { console.warn(error); }
  await subscribeToEventRoom(renderRoom);
  createTurnTicker(() => currentRoom, seconds => { $("#screen-turn-clock").textContent = formatTurnTime(seconds); });
  await joinRoomPresence(screenIdentity, renderPresence, state => { $("#screen-connection").textContent = state === "SUBSCRIBED" ? "Realtime conectado" : state === "local" ? "Simulación local" : "Conectando…"; });
});

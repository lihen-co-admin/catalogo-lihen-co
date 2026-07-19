import { updateTriviaRoomState } from "./trivia.js";
import { updateWordRoomState } from "./wordGame.js";
import { Participant } from "../../models/Participant.js";
import { getLocalParticipant } from "../../repositories/participantRepository.js";
import { getEventRoom, subscribeToEventRoom } from "../../repositories/eventRoomRepository.js";
import { joinRoomPresence } from "../../services/roomPresenceService.js";
import { setParticipantStatus } from "../../services/participantPresenceService.js";
import { createTurnTicker, formatTurnTime } from "../../utils/turnTimer.js";

const $ = selector => document.querySelector(selector);
let presenceSession = null;
let unsubscribeRoom = () => {};
let participant = null;
let currentRoom = null;
let stopTurnTicker = () => {};

function renderPeople(people) {
  const participants = people.filter(person => person.role === "participant");
  const presencial = participants.filter(person => person.mode === "presencial").length;
  const virtual = participants.filter(person => person.mode === "virtual").length;
  $("#connected-total").textContent = participants.length;
  $("#connected-presencial").textContent = presencial;
  $("#connected-virtual").textContent = virtual;
  const list = $("#connected-list");
  list.innerHTML = participants.length ? participants.slice(0, 20).map(person => `<li><span class="mini-orb">${person.displayName.slice(0,1).toUpperCase()}</span><span>${person.displayName}</span><small>${person.mode}</small></li>`).join("") : "<li class='empty-presence'>Aún no hay participantes conectados.</li>";
}

function renderRoom(room) {
  if (!room) return;
  currentRoom = room;
  updateTriviaRoomState(room); updateWordRoomState(room);
  $("#live-room-state").textContent = room.event_status || "preparing";
  $("#live-activity").textContent = room.active_activity || "Esperando indicaciones";
  $("#live-announcement").textContent = room.announcement || "La administradora publicará aquí los avisos del evento.";
  $("#registration-state").textContent = room.registration_open ? "Abierto" : "Cerrado";
  $("#room-status").textContent = room.room_open ? "Sala abierta" : "Sala en preparación";
  $("#participant-turn-name").textContent = room.active_display_name || "Aún no hay un turno activo";
  $("#participant-turn-mode").textContent = room.active_modality ? `Modalidad: ${room.active_modality}` : "La administradora activará el siguiente participante.";
  const isMine = participant && String(room.active_participant_public_id || "") === String(participant.id || "");
  $("#my-turn-alert").hidden = !isMine;
  $("#participant-turn-card").dataset.active = isMine ? "true" : "false";
}

export async function enterSharedRoom(explicitParticipant = null) {
  if (presenceSession) return;
  const raw = explicitParticipant || getLocalParticipant();
  if (!raw) return;
  participant = new Participant(raw);
  $("#room-title").textContent = `Bienvenida/o, ${participant.displayName}`;
  $("#room-copy").textContent = `Estás conectada/o en modalidad ${participant.mode}. Mantén esta página abierta para conservar tu presencia.`;
  $("#orb-initials").textContent = participant.initials;
  $("#leave-room").disabled = false;
  $("#presence-panel").hidden = false;
  await setParticipantStatus(participant, "connected");
  presenceSession = await joinRoomPresence({ id: participant.id, displayName: participant.displayName, mode: participant.mode, role: "participant" }, renderPeople, status => {
    $("#connection-state").textContent = status === "SUBSCRIBED" ? "Realtime conectado" : status === "local" ? "Simulación local" : "Conectando…";
  });
  location.hash = "sala";
}

export async function leaveSharedRoom() {
  if (presenceSession) await presenceSession.leave();
  presenceSession = null;
  if (participant) await setParticipantStatus(participant, "left");
  $("#room-title").textContent = "Has salido de la sala compartida";
  $("#room-copy").textContent = "Tu registro continúa guardado. Puedes volver a entrar cuando quieras.";
  $("#orb-initials").textContent = "LI";
  $("#leave-room").disabled = true;
  $("#presence-panel").hidden = true;
}

export async function initSharedRoom() {
  try { renderRoom(await getEventRoom()); } catch (error) { console.warn("No fue posible leer el estado de la sala.", error); }
  unsubscribeRoom = await subscribeToEventRoom(renderRoom);
  stopTurnTicker = createTurnTicker(() => currentRoom, seconds => { $("#participant-turn-clock").textContent = formatTurnTime(seconds); });
  window.addEventListener("beforeunload", () => { presenceSession?.leave(); stopTurnTicker(); });
  return () => { unsubscribeRoom(); stopTurnTicker(); };
}

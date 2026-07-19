import { initAdminTrivia } from "./adminTrivia.js";
import { initAdminWordGame } from "./adminWordGame.js";
import { initAdminVoteGame } from "./adminVoteGame.js";
import { initAdminFlashChallenge } from "./adminFlashChallenge.js";
import { initAdminRoulette } from "./adminRoulette.js";
import { initAdminRewards } from "./adminRewards.js";
import { initAdminContingency } from "./adminContingency.js";
import { signInAdmin, signOutAdmin, getAuthorizedAdmin } from "../services/adminAuthService.js";
import { getEventRoom, updateEventRoom, subscribeToEventRoom } from "../repositories/eventRoomRepository.js";
import { listEventParticipants, updateParticipantStatus, subscribeToEventParticipants } from "../repositories/adminEventRepository.js";
import { activateNextTurn, pauseTurn, resumeTurn, endTurn } from "../repositories/turnQueueRepository.js";
import { createTurnTicker, formatTurnTime } from "../utils/turnTimer.js";

const $=s=>document.querySelector(s);
let participants=[]; let room=null; let unsubscribeRoom=()=>{}; let unsubscribeParticipants=()=>{}; let stopTicker=()=>{};
function showMessage(el,text,type="info"){el.textContent=text;el.dataset.type=type;el.hidden=false;}
function queueCandidates(){return participants.filter(p=>["registered","connected","waiting"].includes(p.registration_status));}
function fillRoom(nextRoom){room=nextRoom;const f=$("[data-room-form]");f.event_status.value=room.event_status;f.active_activity.value=room.active_activity||"";f.announcement.value=room.announcement||"";f.registration_open.checked=room.registration_open;f.room_open.checked=room.room_open;$("#event-admin-summary").textContent=`Estado: ${room.event_status} · Registro ${room.registration_open?"abierto":"cerrado"}`;renderTurn();}
function renderTurn(){
  if(!room)return;
  $("#turn-active-name").textContent=room.active_display_name||"Sin participante activo";
  $("#turn-active-mode").textContent=room.active_modality?`Modalidad: ${room.active_modality}`:"Selecciona el siguiente turno";
  $("#turn-status").textContent=room.turn_status||"idle";
  $("#turn-duration").value=room.turn_duration_seconds||60;
  const waiting=queueCandidates();
  const p=waiting.filter(x=>x.modality==="presencial").sort((a,b)=>a.registered_order-b.registered_order);
  const v=waiting.filter(x=>x.modality==="virtual").sort((a,b)=>a.registered_order-b.registered_order);
  $("#queue-presencial-count").textContent=p.length;$("#queue-virtual-count").textContent=v.length;
  $("#queue-presencial").innerHTML=p.length?p.slice(0,8).map(x=>`<li><strong>#${x.registered_order}</strong> ${x.display_name}</li>`).join(""):"<li>Sin personas en espera</li>";
  $("#queue-virtual").innerHTML=v.length?v.slice(0,8).map(x=>`<li><strong>#${x.registered_order}</strong> ${x.display_name}</li>`).join(""):"<li>Sin personas en espera</li>";
  $("[data-turn-pause]").disabled=room.turn_status!=="running";
  $("[data-turn-resume]").disabled=room.turn_status!=="paused";
  $("[data-turn-end]").disabled=!room.active_participant_id;
}
function renderParticipants(){const filter=$("#event-participant-filter").value;const list=participants.filter(p=>filter==="all"||p.modality===filter||p.registration_status===filter);$("#event-participant-count").textContent=`${list.length} participantes`;$("#event-participant-list").innerHTML=list.length?list.map(p=>`<article data-id="${p.id}"><div><strong>#${p.registered_order} ${p.display_name}</strong><span>${p.full_name} · ${p.email}</span><small>${p.modality} · ${p.registration_status}</small></div><select data-status aria-label="Estado de ${p.display_name}"><option value="registered">Registrado</option><option value="connected">Conectado</option><option value="waiting">En espera</option><option value="active">Activo</option><option value="winner">Ganador</option><option value="disabled">Deshabilitado</option><option value="left">Salió</option></select></article>`).join(""):"<p>No hay participantes para este filtro.</p>";list.forEach(p=>{const card=$(`[data-id="${p.id}"]`);card.querySelector("select").value=p.registration_status;});renderTurn();}
async function refreshParticipants(){participants=await listEventParticipants();renderParticipants();}
async function load(){fillRoom(await getEventRoom());await refreshParticipants();}
async function executeTurn(action,success){const msg=$("[data-turn-message]");try{const result=await action();fillRoom(result);await refreshParticipants();showMessage(msg,success,"success");}catch(err){showMessage(msg,err.message,"error");}}
async function boot(){const admin=await getAuthorizedAdmin();const authorized=Boolean(admin?.ok);$("[data-event-login]").hidden=authorized;$("[data-event-dashboard]").hidden=!authorized;if(!authorized)return;await load();await initAdminTrivia();await initAdminWordGame();await initAdminVoteGame();await initAdminFlashChallenge();await initAdminRoulette();await initAdminRewards();await initAdminContingency();unsubscribeRoom=await subscribeToEventRoom(fillRoom);unsubscribeParticipants=await subscribeToEventParticipants(refreshParticipants);stopTicker=createTurnTicker(()=>room,seconds=>{$("#turn-clock").textContent=formatTurnTime(seconds);});}
document.addEventListener("DOMContentLoaded",()=>{
 $("[data-event-login-form]").addEventListener("submit",async e=>{e.preventDefault();const d=new FormData(e.currentTarget);const msg=$("[data-event-login-message]");try{const result=await signInAdmin(String(d.get("email")),String(d.get("password")));if(!result.ok) throw new Error(result.message||"No fue posible iniciar sesión.");await boot();}catch(err){showMessage(msg,err.message,"error");}});
 $("[data-room-form]").addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget,msg=$("[data-room-message]");try{const next=await updateEventRoom({event_status:f.event_status.value,active_activity:f.active_activity.value.trim()||null,announcement:f.announcement.value.trim()||null,registration_open:f.registration_open.checked,room_open:f.room_open.checked});fillRoom(next);showMessage(msg,"Cambios publicados en tiempo real.","success");}catch(err){showMessage(msg,err.message,"error");}});
 $("[data-turn-next]").addEventListener("click",()=>executeTurn(()=>activateNextTurn($("#turn-duration").value),"Siguiente participante activado."));
 $("[data-turn-pause]").addEventListener("click",()=>executeTurn(pauseTurn,"Cronómetro pausado."));
 $("[data-turn-resume]").addEventListener("click",()=>executeTurn(resumeTurn,"Cronómetro reanudado."));
 $("[data-turn-end]").addEventListener("click",()=>executeTurn(()=>endTurn($("#turn-end-status").value),"Turno finalizado."));
 $("#event-participant-list").addEventListener("change",async e=>{if(!e.target.matches("[data-status]"))return;const card=e.target.closest("[data-id]");await updateParticipantStatus(card.dataset.id,e.target.value);const p=participants.find(x=>String(x.id)===card.dataset.id);if(p)p.registration_status=e.target.value;renderParticipants();});
 $("#event-participant-filter").addEventListener("change",renderParticipants);$("[data-event-refresh]").addEventListener("click",load);$("[data-event-logout]").addEventListener("click",async()=>{unsubscribeRoom();unsubscribeParticipants();stopTicker();await signOutAdmin();location.reload();});document.addEventListener("lihen:contingency-complete",load);boot();
});

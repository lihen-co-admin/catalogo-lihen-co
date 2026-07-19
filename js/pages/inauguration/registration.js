import { Participant } from "../../models/Participant.js";
import { validateParticipant,generateAccessCode } from "../../utils/participantValidations.js";
import { getLocalParticipant,removeLocalParticipant } from "../../repositories/participantRepository.js";
import { registerParticipant } from "../../services/participantService.js";
import { enterSharedRoom, leaveSharedRoom } from "./room.js";

const $=selector=>document.querySelector(selector);
function formData(){const form=$("#participant-form");const data=new FormData(form);return{name:String(data.get("name")||""),email:String(data.get("email")||""),displayName:String(data.get("displayName")||data.get("name")||"").trim(),mode:String(data.get("mode")||""),acceptedRules:data.get("acceptedRules")==="on"};}
function showErrors(errors){document.querySelectorAll("[data-error-for]").forEach(el=>el.textContent=errors[el.dataset.errorFor]||"");const first=Object.keys(errors)[0];if(first){const field=$(`[name="${first}"]`);field?.focus();}}
function showAccess(participant,mode="local"){$("#access-card").hidden=false;$("#access-name").textContent=`Hola, ${participant.displayName}`;$("#access-mode").textContent=participant.mode;$("#access-code").textContent=participant.accessCode;$("#registration-message").textContent=mode==="remote"?"Registro enviado correctamente a la sala.":"Registro guardado en este navegador. La conexión remota aún no está activa.";$("#connection-state").textContent=mode==="remote"?"Supabase conectado":"Modo local";}
export function initRegistration(){
 let current=getLocalParticipant();if(current) showAccess(current,"local");
 $("#participant-name")?.addEventListener("input",e=>{const display=$("#display-name");if(!display.dataset.edited) display.value=e.target.value.split(/\s+/)[0]||"";});
 $("#display-name")?.addEventListener("input",e=>e.currentTarget.dataset.edited="true");
 $("#participant-form")?.addEventListener("submit",async e=>{e.preventDefault();const raw=formData();const errors=validateParticipant(raw);showErrors(errors);if(Object.keys(errors).length)return;const participant=new Participant({...raw,id:crypto.randomUUID(),accessCode:generateAccessCode()});$("#registration-message").textContent="Preparando tu acceso…";const result=await registerParticipant(participant);current=participant;showAccess(participant,result.mode);});
 $("#enter-room")?.addEventListener("click",()=>current&&enterSharedRoom(current));
 $("#reset-registration")?.addEventListener("click",()=>{removeLocalParticipant();current=null;$("#access-card").hidden=true;$("#participant-form").reset();$("#registration-message").textContent="Registro eliminado de este navegador.";});
 $("#leave-room")?.addEventListener("click",leaveSharedRoom);
}

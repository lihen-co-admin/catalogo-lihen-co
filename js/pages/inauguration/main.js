import { initRulesDialog } from "./rulesDialog.js";
import { initRegistration } from "./registration.js";
import { isSupabaseConfigured } from "../../config/supabase.js";
import { initSharedRoom } from "./room.js";
import { initParticipantTrivia } from "./trivia.js";
import { initParticipantWordGame } from "./wordGame.js";
import { initParticipantVoteGame } from "./voteGame.js";
import { initParticipantFlashChallenge } from "./flashChallenge.js";
import { initParticipantRoulette } from "./roulette.js";
import { initParticipantRewards } from "./rewards.js";

document.addEventListener("DOMContentLoaded",()=>{
 initRulesDialog();initRegistration();initParticipantTrivia();initParticipantWordGame();initParticipantVoteGame();initParticipantFlashChallenge();initParticipantRoulette();initParticipantRewards();initSharedRoom();
 const connected=isSupabaseConfigured();
 document.querySelector("#connection-state").textContent=connected?"Configuración disponible":"Sin Supabase";
 document.querySelector("#room-status").textContent=connected?"Registro remoto preparado":"Registro de práctica abierto";
});

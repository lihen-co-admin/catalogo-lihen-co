import { saveLocalParticipant } from "../repositories/participantRepository.js";
import { createRemoteParticipant } from "../repositories/remoteParticipantRepository.js";
export async function registerParticipant(participant){
  saveLocalParticipant(participant);
  try{const remote=await createRemoteParticipant(participant);return remote.ok?{mode:"remote",participant}:{mode:"local",participant,reason:remote.reason};}
  catch(error){console.error("No fue posible registrar en Supabase:",error);return {mode:"local",participant,reason:"remote-error"};}
}

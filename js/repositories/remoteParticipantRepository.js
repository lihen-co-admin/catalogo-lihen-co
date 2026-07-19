import { getSupabaseClient } from "../services/supabaseClient.js";
export async function createRemoteParticipant(participant){
  const client=await getSupabaseClient();
  if(!client) return {ok:false,reason:"not-configured"};
  const {data,error}=await client.from("event_participants").insert(participant.toRecord()).select("public_id, modality, registration_status").single();
  if(error) throw error;
  return {ok:true,data};
}

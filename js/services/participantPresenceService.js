import { getSupabaseClient } from "./supabaseClient.js";

export async function setParticipantStatus(participant, status) {
  const client = await getSupabaseClient();
  if (!client || !participant?.id || !participant?.accessCode) return false;
  const { data, error } = await client.rpc("set_event_participant_status", {
    p_public_id: participant.id,
    p_access_code: participant.accessCode,
    p_status: status,
  });
  if (error) {
    console.warn("No fue posible actualizar el estado del participante.", error);
    return false;
  }
  return Boolean(data);
}

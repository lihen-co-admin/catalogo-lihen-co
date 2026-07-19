import { getSupabaseClient } from "../services/supabaseClient.js";
async function rpc(name, args={}) {
  const client = await getSupabaseClient();
  if (!client) throw new Error("Supabase no está configurado.");
  const { data, error } = await client.rpc(name, args);
  if (error) throw error;
  return data;
}
export const openVoteRound = (pollKey, durationSeconds=45) => rpc("open_event_vote_round", { p_poll_key: pollKey, p_duration_seconds: Number(durationSeconds) });
export const closeVoteRound = () => rpc("close_event_vote_round");
export const resetVoteRound = () => rpc("reset_event_vote_round");
export async function getVoteParticipants(roundId) {
  const client = await getSupabaseClient();
  if (!client || !roundId) return [];
  const { data, error } = await client.from("event_votes_admin").select("*").eq("round_id", roundId).order("voted_at", { ascending:true });
  if (error) throw error;
  return data || [];
}

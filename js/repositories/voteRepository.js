import { getSupabaseClient } from "../services/supabaseClient.js";
const ROOM_SLUG = "inauguracion-lihen";
export async function getCurrentVoteRound() {
  const client = await getSupabaseClient();
  if (!client) return null;
  const { data, error } = await client.from("event_vote_rounds_public").select("*").eq("room_slug", ROOM_SLUG).order("created_at", { ascending:false }).limit(1).maybeSingle();
  if (error) throw error;
  return data;
}
export async function getVoteRanking(roundId) {
  const client = await getSupabaseClient();
  if (!client || !roundId) return [];
  const { data, error } = await client.from("event_vote_ranking_public").select("*").eq("round_id", roundId).order("vote_count", { ascending:false }).order("option_position", { ascending:true });
  if (error) throw error;
  return data || [];
}
export async function submitVote({ participantId, accessCode, roundId, optionKey }) {
  const client = await getSupabaseClient();
  if (!client) throw new Error("Supabase debe estar configurado para registrar votos.");
  const { data, error } = await client.rpc("submit_event_vote", { p_public_id: participantId, p_access_code: accessCode, p_round_id: roundId, p_option_key: optionKey });
  if (error) throw error;
  return data;
}
export async function subscribeToVoteRounds(onChange) {
  const client = await getSupabaseClient();
  if (!client) return () => {};
  const channel = client.channel("lihen-vote-rounds").on("postgres_changes", { event:"*", schema:"public", table:"event_vote_rounds" }, payload => onChange(payload.new || payload.old)).subscribe();
  return () => client.removeChannel(channel);
}
export async function subscribeToVotes(onChange) {
  const client = await getSupabaseClient();
  if (!client) return () => {};
  const channel = client.channel("lihen-votes").on("postgres_changes", { event:"*", schema:"public", table:"event_votes" }, payload => onChange(payload.new || payload.old)).subscribe();
  return () => client.removeChannel(channel);
}

import { getSupabaseClient } from "../services/supabaseClient.js";

export async function openTriviaRound(questionKey, durationSeconds = 25) {
  const client = await getSupabaseClient();
  if (!client) throw new Error("Supabase no está configurado.");
  const { data, error } = await client.rpc("open_event_trivia_round", {
    p_question_key: questionKey,
    p_duration_seconds: Number(durationSeconds),
  });
  if (error) throw error;
  return data;
}

export async function closeTriviaRound() {
  const client = await getSupabaseClient();
  if (!client) throw new Error("Supabase no está configurado.");
  const { data, error } = await client.rpc("close_event_trivia_round");
  if (error) throw error;
  return data;
}

export async function resetTriviaRound() {
  const client = await getSupabaseClient();
  if (!client) throw new Error("Supabase no está configurado.");
  const { data, error } = await client.rpc("reset_event_trivia_round");
  if (error) throw error;
  return data;
}

export async function getTriviaResponses(roundId) {
  const client = await getSupabaseClient();
  if (!client || !roundId) return [];
  const { data, error } = await client
    .from("event_trivia_responses_admin")
    .select("*")
    .eq("round_id", roundId)
    .order("answered_at", { ascending: true });
  if (error) throw error;
  return data || [];
}

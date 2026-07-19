import { getSupabaseClient } from "../services/supabaseClient.js";

const ROOM_SLUG = "inauguracion-lihen";

export async function getTriviaQuestions() {
  const client = await getSupabaseClient();
  if (!client) return [];
  const { data, error } = await client
    .from("event_trivia_questions_public")
    .select("id,question_key,question_text,options,position")
    .eq("is_active", true)
    .order("position", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getCurrentTriviaRound() {
  const client = await getSupabaseClient();
  if (!client) return null;
  const { data, error } = await client
    .from("event_trivia_rounds_public")
    .select("*")
    .eq("room_slug", ROOM_SLUG)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function submitTriviaAnswer({ participantId, accessCode, roundId, selectedOption }) {
  const client = await getSupabaseClient();
  if (!client) throw new Error("Supabase debe estar configurado para enviar respuestas.");
  const { data, error } = await client.rpc("submit_event_trivia_answer", {
    p_public_id: participantId,
    p_access_code: accessCode,
    p_round_id: roundId,
    p_selected_option: Number(selectedOption),
  });
  if (error) throw error;
  return data;
}

export async function subscribeToTriviaRounds(onChange) {
  const client = await getSupabaseClient();
  if (!client) return () => {};
  const channel = client.channel("lihen-trivia-rounds")
    .on("postgres_changes", { event: "*", schema: "public", table: "event_trivia_rounds" }, payload => onChange(payload.new || payload.old))
    .subscribe();
  return () => client.removeChannel(channel);
}

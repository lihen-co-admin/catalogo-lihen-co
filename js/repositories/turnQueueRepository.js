import { getSupabaseClient } from "../services/supabaseClient.js";

async function call(functionName, args = {}) {
  const client = await getSupabaseClient();
  if (!client) throw new Error("Supabase no está configurado.");
  const { data, error } = await client.rpc(functionName, args);
  if (error) throw error;
  return data;
}

export const activateNextTurn = duration => call("activate_next_event_turn", { p_duration_seconds: Number(duration) });
export const pauseTurn = () => call("pause_event_turn");
export const resumeTurn = () => call("resume_event_turn");
export const endTurn = status => call("end_event_turn", { p_next_status: status });

import { getSupabaseClient } from "../services/supabaseClient.js";

const ROOM_SLUG = "inauguracion-lihen";

export async function getEventRoom() {
  const client = await getSupabaseClient();
  if (!client) return null;
  const { data, error } = await client.from("event_rooms").select("id,slug,title,registration_open,room_open,event_status,active_activity,announcement,registration_closes_at,updated_at,active_participant_id,active_participant_public_id,active_display_name,active_modality,last_turn_modality,turn_status,turn_started_at,turn_duration_seconds,turn_remaining_seconds").eq("slug", ROOM_SLUG).single();
  if (error) throw error;
  return data;
}

export async function updateEventRoom(changes) {
  const client = await getSupabaseClient();
  if (!client) throw new Error("Supabase no está configurado.");
  const payload = { ...changes, updated_at: new Date().toISOString() };
  const { data, error } = await client.from("event_rooms").update(payload).eq("slug", ROOM_SLUG).select().single();
  if (error) throw error;
  return data;
}

export async function subscribeToEventRoom(onChange) {
  const client = await getSupabaseClient();
  if (!client) return () => {};
  const channel = client.channel("lihen-room-state")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "event_rooms", filter: `slug=eq.${ROOM_SLUG}` }, payload => onChange(payload.new))
    .subscribe();
  return () => client.removeChannel(channel);
}

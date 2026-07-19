import { getSupabaseClient } from "../services/supabaseClient.js";
export async function listEventParticipants() {
  const client = await getSupabaseClient();
  if (!client) throw new Error("Supabase no está configurado.");
  const { data, error } = await client.from("event_participants").select("id,public_id,display_name,full_name,email,modality,registration_status,registered_order,created_at,connected_at").order("registered_order",{ascending:true});
  if (error) throw error;
  return data || [];
}
export async function updateParticipantStatus(id,status){
  const client=await getSupabaseClient();
  const {error}=await client.from("event_participants").update({registration_status:status}).eq("id",id);
  if(error) throw error;
}

export async function subscribeToEventParticipants(onChange){
  const client=await getSupabaseClient();
  if(!client) return ()=>{};
  const channel=client.channel("lihen-admin-participants")
    .on("postgres_changes",{event:"*",schema:"public",table:"event_participants"},onChange)
    .subscribe();
  return ()=>client.removeChannel(channel);
}

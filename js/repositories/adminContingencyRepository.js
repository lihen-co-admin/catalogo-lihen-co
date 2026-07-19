import { getSupabaseClient } from "../services/supabaseClient.js";
const ROOM_SLUG="inauguracion-lihen";
async function rpc(name,args={}){const client=await getSupabaseClient();if(!client)throw new Error("Supabase no está configurado.");const{data,error}=await client.rpc(name,{p_room_slug:ROOM_SLUG,...args});if(error)throw error;return data;}
export const getContingencyStatus=()=>rpc("get_event_contingency_status");
export const closeAllRounds=()=>rpc("close_all_event_game_rounds");
export const releaseStuckTurn=(status="waiting")=>rpc("release_stuck_event_turn",{p_participant_status:status});
export const requeueParticipants=()=>rpc("requeue_event_participants");
export const reopenEventAccess=()=>rpc("reopen_event_access");
export const recoverRoomSoft=()=>rpc("recover_event_room_soft");
export const resetOperationalState=()=>rpc("reset_event_operational_state");
export async function listContingencyLogs(limit=20){const client=await getSupabaseClient();if(!client)return[];const{data,error}=await client.from("event_contingency_logs_admin").select("*").eq("room_slug",ROOM_SLUG).order("created_at",{ascending:false}).limit(limit);if(error)throw error;return data||[];}

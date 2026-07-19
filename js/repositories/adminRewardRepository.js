import { getSupabaseClient } from "../services/supabaseClient.js";
export async function listRewards(){const c=await getSupabaseClient();if(!c)return[];const{data,error}=await c.from("event_rewards_admin").select("*").order("created_at",{ascending:false});if(error)throw error;return data||[];}
export async function updateRewardStatus(id,status,notes=""){const c=await getSupabaseClient();const{data,error}=await c.rpc("admin_update_event_reward",{p_reward_id:id,p_status:status,p_notes:notes});if(error)throw error;return data;}

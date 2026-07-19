import { getSupabaseClient } from "../services/supabaseClient.js";
async function rpc(name,args={}){const c=await getSupabaseClient();if(!c)throw new Error("Supabase no está configurado.");const{data,error}=await c.rpc(name,args);if(error)throw error;return data;}
export const openWordRound=(challengeKey,durationSeconds=30)=>rpc("open_event_word_round",{p_challenge_key:challengeKey,p_duration_seconds:Number(durationSeconds)});
export const closeWordRound=()=>rpc("close_event_word_round");
export const resetWordRound=()=>rpc("reset_event_word_round");
export async function getWordAttempts(roundId){const c=await getSupabaseClient();if(!c||!roundId)return[];const{data,error}=await c.from("event_word_attempts_admin").select("*").eq("round_id",roundId).order("answered_at",{ascending:true});if(error)throw error;return data||[];}

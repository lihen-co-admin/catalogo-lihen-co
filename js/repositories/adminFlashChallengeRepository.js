import { getSupabaseClient } from "../services/supabaseClient.js";
async function rpc(name,args={}){const c=await getSupabaseClient();if(!c)throw new Error("Supabase no está configurado.");const{data,error}=await c.rpc(name,args);if(error)throw error;return data;}
export const openFlashRound=(challengeKey,durationSeconds=30)=>rpc("open_event_flash_round",{p_challenge_key:challengeKey,p_duration_seconds:Number(durationSeconds)});
export const closeFlashRound=()=>rpc("close_event_flash_round");
export const resetFlashRound=()=>rpc("reset_event_flash_round");
export const reviewFlashSubmission=(submissionId,decision,note="")=>rpc("review_event_flash_submission",{p_submission_id:Number(submissionId),p_decision:decision,p_note:String(note||"")});
export async function getFlashSubmissions(roundId){const c=await getSupabaseClient();if(!c||!roundId)return[];const{data,error}=await c.from("event_flash_submissions_admin").select("*").eq("round_id",roundId).order("submitted_at",{ascending:true});if(error)throw error;return data||[];}

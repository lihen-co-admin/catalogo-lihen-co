import { getSupabaseClient } from "../services/supabaseClient.js";
const ROOM_SLUG="inauguracion-lihen";
async function rpc(name,args={}){const c=await getSupabaseClient();if(!c)throw new Error("Supabase no está configurado.");const{data,error}=await c.rpc(name,{p_room_slug:ROOM_SLUG,...args});if(error)throw error;return data;}
export const openRouletteRound=()=>rpc("open_event_roulette_round");
export const closeRouletteRound=()=>rpc("close_event_roulette_round");
export const resetRouletteRound=()=>rpc("reset_event_roulette_round");
export const resetRouletteInventory=()=>rpc("reset_event_roulette_inventory");
export async function updateRouletteInventory(prizeKey,stock){const c=await getSupabaseClient();const{data,error}=await c.rpc("update_event_roulette_inventory",{p_room_slug:ROOM_SLUG,p_prize_key:prizeKey,p_stock:stock});if(error)throw error;return data;}
export async function getRouletteSpins(roundId){const c=await getSupabaseClient();if(!c)return[];const{data,error}=await c.from("event_roulette_spins_admin").select("*").eq("round_id",roundId).order("created_at",{ascending:false});if(error)throw error;return data||[];}

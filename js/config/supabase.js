import { ENV } from "./env.js";

function isPlaceholder(value) {
  return !value || value.includes("TU-") || value.includes("TU_");
}

export function getSupabaseConfig() {
  const url = String(ENV.SUPABASE_URL ?? "").trim();
  const anonKey = String(ENV.SUPABASE_ANON_KEY ?? "").trim();

  return {
    url,
    anonKey,
    isConfigured: !isPlaceholder(url) && !isPlaceholder(anonKey),
  };
}

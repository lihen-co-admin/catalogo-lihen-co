import { getSupabaseConfig } from "../config/supabase.js";

let clientPromise = null;

async function createClient() {
  const config = getSupabaseConfig();
  if (!config.isConfigured) return null;

  try {
    const { createClient: createSupabaseClient } = await import(
      "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"
    );

    return createSupabaseClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (error) {
    console.warn("No fue posible cargar el cliente de Supabase.", error);
    return null;
  }
}

export function getSupabaseClient() {
  if (!clientPromise) clientPromise = createClient();
  return clientPromise;
}

export async function getSupabaseConnectionState() {
  const config = getSupabaseConfig();
  if (!config.isConfigured) {
    return { configured: false, available: false, message: "Supabase todavía no está configurado." };
  }

  const client = await getSupabaseClient();
  return client
    ? { configured: true, available: true, message: "Supabase está configurado." }
    : { configured: true, available: false, message: "La configuración existe, pero no fue posible cargar Supabase." };
}

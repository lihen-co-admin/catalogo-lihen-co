const DEFAULT_ENV = {
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",
};

function isPlaceholder(value) {
  return !value || value.includes("TU-") || value.includes("TU_");
}

export function getSupabaseConfig() {
  // Busco una configuración pública opcional sin depender de un archivo local
  // que GitHub Pages no publica.
  const env = globalThis.LIHEN_ENV ?? DEFAULT_ENV;

  const url = String(env.SUPABASE_URL ?? "").trim();
  const anonKey = String(env.SUPABASE_ANON_KEY ?? "").trim();

  return {
    url,
    anonKey,
    isConfigured: !isPlaceholder(url) && !isPlaceholder(anonKey),
  };
}

/**
 * Indica si la configuración pública de Supabase está disponible.
 * Mantiene una única fuente de verdad a través de getSupabaseConfig().
 */
export function isSupabaseConfigured() {
  return getSupabaseConfig().isConfigured;
}

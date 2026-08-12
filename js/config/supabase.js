import { ENV } from './env.js';

const DEFAULT_ENV = {
  SUPABASE_URL: '',
  SUPABASE_PUBLISHABLE_KEY: '',
  // Compatibilidad temporal con despliegues que todavía usan el nombre legacy.
  SUPABASE_ANON_KEY: '',
  CATALOG_SOURCE: 'auto',
  CATALOG_FALLBACK_ON_EMPTY: true,
  CATALOG_FALLBACK_ON_ERROR: true,
};

function isPlaceholder(value) {
  return !value || value.includes('TU-') || value.includes('TU_');
}

function readPublicEnv() {
  return {
    ...DEFAULT_ENV,
    ...ENV,
    ...(globalThis.LIHEN_ENV ?? {}),
  };
}

export function getSupabaseConfig() {
  const env = readPublicEnv();
  const url = String(env.SUPABASE_URL ?? '').trim();
  const publishableKey = String(
    env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY || ''
  ).trim();

  return {
    url,
    publishableKey,
    // Alias temporal para módulos antiguos; no representa una clave secreta.
    anonKey: publishableKey,
    isConfigured: !isPlaceholder(url) && !isPlaceholder(publishableKey),
  };
}

export function getCatalogConfig() {
  const env = readPublicEnv();
  const source = ['auto', 'supabase', 'static'].includes(String(env.CATALOG_SOURCE).toLowerCase())
    ? String(env.CATALOG_SOURCE).toLowerCase()
    : 'auto';

  return {
    source,
    fallbackOnEmpty: env.CATALOG_FALLBACK_ON_EMPTY !== false,
    fallbackOnError: env.CATALOG_FALLBACK_ON_ERROR !== false,
  };
}

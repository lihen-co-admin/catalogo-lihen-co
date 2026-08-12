/**
 * Copia este archivo como env.js y completa SOLO los valores públicos.
 *
 * Recomendado en proyectos Supabase actuales:
 * - Project URL
 * - Publishable key (sb_publishable_...)
 *
 * Nunca colocar aquí:
 * - sb_secret_*
 * - service_role
 * - contraseña PostgreSQL
 * - tokens administrativos
 */
export const ENV = Object.freeze({
  SUPABASE_URL: 'https://TU-PROYECTO.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_TU_CLAVE_PUBLICA',
  CATALOG_SOURCE: 'auto', // auto | supabase | static
  CATALOG_FALLBACK_ON_EMPTY: true,
  CATALOG_FALLBACK_ON_ERROR: true,
});

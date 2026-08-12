// Configuración PÚBLICA de despliegue para GitHub Pages.
// La Publishable Key de Supabase es pública por diseño; la seguridad depende de RLS/grants.
// Nunca colocar aquí claves privadas, contraseñas ni tokens administrativos.
export const ENV = Object.freeze({
  SUPABASE_URL: 'https://admhxolrhhipwcxbtyhl.supabase.co',
  SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_lBc4zpIyG9PE58hXV0iYfA_8NUBKY4Z',
  CATALOG_SOURCE: 'auto',
  CATALOG_FALLBACK_ON_EMPTY: true,
  CATALOG_FALLBACK_ON_ERROR: true,
});

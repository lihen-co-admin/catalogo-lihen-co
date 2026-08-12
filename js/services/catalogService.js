import { products as staticProducts } from '../data/products.js';
import { getCatalogConfig } from '../config/supabase.js';
import { fetchPublicCatalog } from '../repositories/catalogRepository.js';
import { adaptCatalogRows } from '../adapters/catalogAdapter.js';

let catalogPromise = null;
let catalogState = {
  source: 'static',
  fallback: true,
  error: null,
  count: staticProducts.length,
};

function useStaticCatalog(reason = null) {
  catalogState = {
    source: 'static',
    fallback: true,
    error: reason,
    count: staticProducts.length,
  };
  return staticProducts;
}

async function loadCatalogOnce() {
  const config = getCatalogConfig();

  if (config.source === 'static') {
    return useStaticCatalog();
  }

  try {
    const rows = await fetchPublicCatalog();

    if (rows.length === 0 && config.source === 'auto' && config.fallbackOnEmpty) {
      console.warn('catalog_public respondió vacío; se mantiene el catálogo estático durante la transición.');
      return useStaticCatalog('catalog_public_empty');
    }

    const products = adaptCatalogRows(rows, { legacyProducts: staticProducts });
    catalogState = {
      source: 'supabase',
      fallback: false,
      error: null,
      count: products.length,
    };
    return products;
  } catch (error) {
    if (!config.fallbackOnError) {
      catalogState = {
        source: 'supabase',
        fallback: false,
        error: error?.message ?? String(error),
        count: 0,
      };
      throw error;
    }

    const label = config.source === 'supabase'
      ? 'No fue posible cargar el catálogo desde Supabase.'
      : 'No fue posible cargar el catálogo dinámico.';
    console.warn(`${label} Se utilizará el fallback estático.`, error);
    return useStaticCatalog(error?.message ?? String(error));
  }
}

export function loadPublicProducts({ refresh = false } = {}) {
  if (refresh || !catalogPromise) {
    catalogPromise = loadCatalogOnce();
  }
  return catalogPromise;
}

export async function refreshCatalog() {
  return loadPublicProducts({ refresh: true });
}

export function getCatalogState() {
  return { ...catalogState };
}

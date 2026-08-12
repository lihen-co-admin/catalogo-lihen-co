import { getSupabaseConfig } from '../config/supabase.js';

const DEFAULT_TIMEOUT_MS = 12000;

function buildCatalogUrl(baseUrl) {
  const base = String(baseUrl || '').replace(/\/+$/, '');
  const params = new URLSearchParams({
    select: '*',
    order: 'name.asc',
  });
  return `${base}/rest/v1/catalog_public?${params.toString()}`;
}

export async function fetchPublicCatalog({ fetchImpl = globalThis.fetch, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const { url, publishableKey, isConfigured } = getSupabaseConfig();
  if (!isConfigured) {
    throw new Error('Supabase no está configurado para el catálogo público.');
  }
  if (typeof fetchImpl !== 'function') {
    throw new Error('Este navegador no dispone de fetch para consultar el catálogo.');
  }

  const controller = typeof AbortController === 'function' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const response = await fetchImpl(buildCatalogUrl(url), {
      method: 'GET',
      headers: {
        apikey: publishableKey,
        Accept: 'application/json',
        'X-Client-Info': 'lihen-web-catalog/1.0',
      },
      cache: 'no-store',
      signal: controller?.signal,
    });

    const body = await response.text();
    let payload = null;
    try { payload = body ? JSON.parse(body) : []; } catch { payload = body; }

    if (!response.ok) {
      const detail = payload?.message || payload?.error || body || response.statusText || 'sin detalle';
      throw new Error(`catalog_public respondió HTTP ${response.status}: ${detail}`);
    }
    if (!Array.isArray(payload)) {
      throw new Error('catalog_public devolvió un formato inesperado.');
    }
    return payload;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error(`Tiempo de espera agotado consultando catalog_public (${timeoutMs} ms).`);
    }
    throw error;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

import { ENV } from '../js/config/env.js';

const base = String(ENV.SUPABASE_URL || '').replace(/\/+$/, '');
const key = String(ENV.SUPABASE_PUBLISHABLE_KEY || '');
const sensitive = new Set([
  'current_cost','average_cost','minimum_stock','reserved_stock','pending_stock',
  'available_stock','supplier_id','supplier_name','created_by','updated_by'
]);

if (!/^https:\/\/[a-z0-9]+\.supabase\.co$/i.test(base)) throw new Error('SUPABASE_URL inválida.');
if (!/^sb_publishable_[A-Za-z0-9_-]+$/.test(key)) throw new Error('Publishable Key inválida.');

async function request(table, query='select=*&limit=3') {
  try {
    const response = await fetch(`${base}/rest/v1/${table}?${query}`, {
      headers: { apikey: key, Accept: 'application/json', 'X-Client-Info': 'lihen-release-test/1.0' },
      signal: AbortSignal.timeout(12000),
    });
    const text = await response.text();
    let body = text;
    try { body = text ? JSON.parse(text) : null; } catch {}
    return { connected: true, status: response.status, ok: response.ok, body };
  } catch (error) {
    return { connected: false, status: 0, ok: false, body: String(error?.cause?.code || error?.message || error) };
  }
}

const catalog = await request('catalog_public', 'select=*&limit=3');
console.log(`catalog_public: ${catalog.connected ? `HTTP ${catalog.status}` : `CONEXIÓN FALLIDA (${catalog.body})`}`);
if (!catalog.connected) process.exitCode = 2;
else if (!catalog.ok || !Array.isArray(catalog.body)) process.exitCode = 1;
else {
  const leaks = [...new Set(catalog.body.flatMap(row => Object.keys(row).filter(k => sensitive.has(k.toLowerCase()))))];
  console.log(`campos sensibles: ${leaks.length ? `FAIL ${leaks.join(', ')}` : 'PASS'}`);
  if (leaks.length) process.exitCode = 1;
}

for (const table of ['products','inventory','suppliers','inventory_movements']) {
  const result = await request(table, 'select=*&limit=1');
  if (!result.connected) {
    console.log(`${table}: CONEXIÓN FALLIDA (${result.body})`);
    process.exitCode = process.exitCode || 2;
    continue;
  }
  const leakedRows = result.ok && Array.isArray(result.body) && result.body.length > 0;
  if (leakedRows) {
    console.log(`${table}: FAIL HTTP ${result.status} entregó datos administrativos`);
    process.exitCode = 1;
  } else if (!result.ok) {
    console.log(`${table}: PASS acceso denegado HTTP ${result.status}`);
  } else {
    console.log(`${table}: WARN HTTP ${result.status} sin filas; no hubo fuga, pero no fue denegación explícita`);
  }
}

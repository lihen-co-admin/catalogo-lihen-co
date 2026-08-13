import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { adaptCatalogRow } from '../js/adapters/catalogAdapter.js';

const repo = readFileSync(new URL('../js/repositories/catalogRepository.js', import.meta.url), 'utf8');
const env = readFileSync(new URL('../js/config/env.js', import.meta.url), 'utf8');
const contract = readFileSync(new URL('../PUBLIC_CATALOG_CONTRACT.md', import.meta.url), 'utf8');

test('WEB conserva catalog_public como única fuente remota del catálogo', () => {
  assert.match(repo, /rest\/v1\/catalog_public/);
  for (const privateTable of ['products','inventory','suppliers','financial_movements']) {
    assert.doesNotMatch(repo, new RegExp(`rest/v1/${privateTable}`));
  }
});

test('Adapter ignora cantidades exactas aunque el backend las enviara por error', () => {
  const product = adaptCatalogRow({
    id: '1', sku: 'BC-999', name: 'Prueba', sale_price: 1000,
    availability_status: 'available', public_stock_quantity: 987,
    main_image_url: '/assets/test.webp', images: [], variants: [],
  });
  assert.equal(product.availabilityInfo.quantity, null);
  assert.equal(product.availabilityStatus, 'available');
});

test('configuración de producción usa Supabase dinámico con fallback transitorio', () => {
  assert.match(env, /CATALOG_SOURCE:\s*'auto'/);
  assert.match(env, /CATALOG_FALLBACK_ON_ERROR:\s*true/);
  assert.doesNotMatch(env, /service_role|sb_secret_/i);
});

test('contrato documenta gate de publicación y campos prohibidos', () => {
  assert.match(contract, /visible_on_website = true/);
  assert.match(contract, /fotografía pública válida/);
  assert.match(contract, /cantidades exactas de stock/);
  assert.match(contract, /costos, proveedor/);
});

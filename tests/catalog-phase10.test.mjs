import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { adaptCatalogRow, adaptCatalogRows } from '../js/adapters/catalogAdapter.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('adapter convierte contrato Supabase al contrato actual de la tienda', () => {
  const product = adaptCatalogRow({
    id: 'uuid-1', sku: 'BC-001', catalog_code: 'B1', name: 'Producto', brand: 'Marca',
    business_line: 'Beauty Care', category: 'Labios', subcategory: 'Gloss', description: 'Descripción',
    sale_price: 28000, availability_status: 'available', availability_text: 'Disponible',
    images: [{ url: 'https://example.test/2.webp', sort_order: 2, is_main: false }, { url: 'https://example.test/1.webp', sort_order: 1, is_main: true }],
    variants: [{ id: 'v1', size: 'M', color: 'Negro', additional_price: 0 }],
  });
  assert.equal(product.id, 'uuid-1');
  assert.equal(product.priceValue, 28000);
  assert.match(product.price, /28[.]?000/);
  assert.equal(product.availabilityText, 'Disponible');
  assert.deepEqual(product.images, ['https://example.test/1.webp', 'https://example.test/2.webp']);
  assert.equal(product.size, 'M');
  assert.equal(product.color, 'Negro');
});

test('adapter preserva id legado ante cruce exacto por SKU', () => {
  const [product] = adaptCatalogRows([{ id: 'uuid-2', sku: 'BC-043', name: 'X', sale_price: 1 }], {
    legacyProducts: [{ id: 'B90', sku: 'BC-043' }],
  });
  assert.equal(product.id, 'B90');
  assert.equal(product.sourceId, 'uuid-2');
});

test('storefront y search ya no importan products.js directamente', () => {
  for (const file of ['js/storefront.js', 'js/search.js']) {
    const source = read(file);
    assert.doesNotMatch(source, /from ['"]\.\/data\/products\.js['"]/);
    assert.match(source, /loadPublicProducts/);
  }
});

test('catalogRepository consulta exclusivamente catalog_public', () => {
  const source = read('js/repositories/catalogRepository.js');
  assert.match(source, /rest\/v1\/catalog_public/);
  assert.match(source, /apikey/);
  assert.doesNotMatch(source, /rest\/v1\/(?:products|inventory|suppliers|inventory_movements)/);
});

test('catalogService conserva products.js solo como fallback', () => {
  const source = read('js/services/catalogService.js');
  assert.match(source, /products as staticProducts/);
  assert.match(source, /fallback estático/);
});

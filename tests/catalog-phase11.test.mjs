import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { adaptCatalogRow } from '../js/adapters/catalogAdapter.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('availability conserva contrato textual usado por modal y búsqueda', () => {
  const product = adaptCatalogRow({
    id: 'uuid-a', name: 'Producto', sale_price: 10000,
    availability_status: 'out_of_stock', availability_text: 'Agotado',
  });
  assert.equal(product.availability, 'Agotado');
  assert.equal(product.availabilityStatus, 'out_of_stock');
  assert.deepEqual(product.availabilityInfo, { status: 'out_of_stock', text: 'Agotado', quantity: null });
});

test('producto sin imágenes mantiene arreglo vacío y mainImage nula', () => {
  const product = adaptCatalogRow({ id: 'uuid-b', name: 'Sin foto', sale_price: 5000, images: [] });
  assert.deepEqual(product.images, []);
  assert.equal(product.mainImage, null);
});

test('producto sin variantes mantiene compatibilidad de talla y color', () => {
  const product = adaptCatalogRow({ id: 'uuid-c', name: 'Sin variante', sale_price: 5000, variants: [] });
  assert.equal(product.size, 'Por confirmar');
  assert.equal(product.color, 'Por confirmar');
});

test('search prioriza priceValue numérico para ordenar', () => {
  const source = read('js/search.js');
  assert.match(source, /p\.priceValue/);
});

test('storefront y search comparten catalogService y no acceden a Supabase directamente', () => {
  for (const file of ['js/storefront.js', 'js/search.js']) {
    const source = read(file);
    assert.match(source, /loadPublicProducts/);
    assert.doesNotMatch(source, /\.from\(['\"]catalog_public['\"]\)/);
    assert.doesNotMatch(source, /createClient\(/);
  }
});

test('modal productivo puede seguir renderizando availability como texto', () => {
  const source = read('js/modules/productModal.js');
  assert.match(source, /modalProduct\.availability/);
  const product = adaptCatalogRow({ id: 'uuid-d', name: 'Disponible', availability_status: 'available', availability_text: 'Disponible' });
  assert.equal(typeof product.availability, 'string');
});

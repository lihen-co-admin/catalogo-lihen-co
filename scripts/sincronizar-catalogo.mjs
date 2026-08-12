import fs from 'node:fs';
import path from 'node:path';
import { validateCatalog } from './validar-catalogo.mjs';
import {
  BACKUP_DIR,
  CATALOG_FILE,
  canonicalBrand,
  PRODUCTS_FILE,
  PUBLIC_HEADERS,
  ROOT,
  discoverImages,
  loadProducts,
  normalizeText,
  publicPrice,
  searchTextFor,
  serializeProducts,
  timestamp,
  toCsv
} from './catalogo-utils.mjs';

const validation = validateCatalog({ silent: false });
if (validation.errors.length) process.exit(1);

const current = await loadProducts();
const currentById = new Map(current.map((product) => [product.id, product]));
const usedIds = new Set(validation.records.map((record) => record.ID).filter(Boolean));
const nextByPrefix = (prefix) => {
  const nums = [...usedIds]
    .filter((id) => id.startsWith(prefix))
    .map((id) => Number(id.slice(1)))
    .filter(Number.isFinite);
  return (nums.length ? Math.max(...nums) : 0) + 1;
};
let nextB = nextByPrefix('B');
let nextS = nextByPrefix('S');
let created = 0;
let updated = 0;
let unchanged = 0;
let inactive = 0;
let hidden = 0;
const output = [];

for (const r of validation.records) {
  if (r.Estado.toLowerCase() === 'inactivo') {
    inactive += 1;
    continue;
  }

  let id = r.ID;
  if (!id) {
    const prefix = r['Línea'] === 'Style' ? 'S' : 'B';
    let candidate;
    do {
      candidate = `${prefix}${prefix === 'S' ? nextS++ : nextB++}`;
    } while (usedIds.has(candidate));
    id = candidate;
    usedIds.add(id);
    r.ID = id;
    created += 1;
  }

  if (normalizeText(r['Visible en tienda']) !== 'Sí') {
    hidden += 1;
    continue;
  }

  let images = r.Imágenes.split('|').map(normalizeText).filter(Boolean);
  if (!images.length) {
    images = discoverImages(r['Línea'], r['Carpeta categoría'], r['Carpeta producto']);
  }

  const product = {
    id,
    sku: r.SKU || '',
    line: r['Línea'],
    category: r['Categoría'],
    subcategory: r.Subcategoría || '',
    name: r.Nombre,
    brand: canonicalBrand(r.Marca),
    price: publicPrice(r.Precio),
    availability: r.Disponibilidad,
    desc: r.Descripción,
    images,
    size: r.Talla,
    color: r.Color,
    tag: r.Etiqueta,
    searchText: ''
  };
  product.searchText = searchTextFor(product);
  output.push(product);

  if (currentById.has(id)) {
    const old = currentById.get(id);
    JSON.stringify(old) === JSON.stringify(product) ? unchanged += 1 : updated += 1;
  }
}

fs.mkdirSync(BACKUP_DIR, { recursive: true });
const stamp = timestamp();
fs.copyFileSync(PRODUCTS_FILE, path.join(BACKUP_DIR, `products-${stamp}.js`));
fs.copyFileSync(CATALOG_FILE, path.join(BACKUP_DIR, `catalogo-${stamp}.csv`));
fs.writeFileSync(PRODUCTS_FILE, serializeProducts(output), 'utf8');

// Persistir IDs asignados y rutas que pudieron descubrirse, manteniendo solo campos públicos.
const rows = validation.records.map((record) => {
  let images = record.Imágenes.split('|').map(normalizeText).filter(Boolean);
  if (record.Estado.toLowerCase() === 'activo' && !images.length) {
    images = discoverImages(record['Línea'], record['Carpeta categoría'], record['Carpeta producto']);
  }
  const refreshed = {
    ...record,
    Imágenes: images.join('|'),
    'Registro fotográfico visible': images.length ? 'Sí' : 'No',
    'Cantidad de fotografías': String(images.length)
  };
  return PUBLIC_HEADERS.map((header) => refreshed[header] ?? '');
});
fs.writeFileSync(CATALOG_FILE, toCsv([PUBLIC_HEADERS, ...rows]), 'utf8');

console.log('');
console.log('✅ Sincronización completada.');
console.log(`Activos generados: ${output.length}`);
console.log(`Nuevos con ID asignado: ${created} | Actualizados: ${updated} | Sin cambios: ${unchanged} | Ocultos: ${hidden} | Inactivos: ${inactive}`);
console.log(`Con SKU público: ${output.filter((product) => product.sku).length}`);
console.log(`Sin imagen propia (fallback LIHEN): ${output.filter((product) => !product.images.length).length}`);
console.log(`Respaldo: ${path.relative(ROOT, BACKUP_DIR)}`);

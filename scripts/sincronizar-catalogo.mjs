import fs from 'node:fs';
import path from 'node:path';
import { validateCatalog } from './validar-catalogo.mjs';
import { BACKUP_DIR, CATALOG_FILE, PRODUCTS_FILE, ROOT, discoverImages, formatCop, loadProducts, normalizeText, parsePrice, searchTextFor, serializeProducts, timestamp } from './catalogo-utils.mjs';

const validation = validateCatalog({silent:false});
if (validation.errors.length) process.exit(1);
const current = await loadProducts();
const currentById = new Map(current.map(p=>[p.id,p]));
const usedIds = new Set(validation.records.map(r=>r.ID).filter(Boolean));
const nextByPrefix = prefix => {
  const nums = [...usedIds].filter(id=>id.startsWith(prefix)).map(id=>Number(id.slice(1))).filter(Number.isFinite);
  return (nums.length ? Math.max(...nums) : 0) + 1;
};
let nextB = nextByPrefix('B'), nextS = nextByPrefix('S');
let created=0, updated=0, unchanged=0, inactive=0;
const output=[];

for (const r of validation.records) {
  if (r.Estado.toLowerCase() === 'inactivo') { inactive++; continue; }
  let id = r.ID;
  if (!id) {
    const prefix = r['Línea']==='Style' ? 'S' : 'B';
    let candidate;
    do candidate = `${prefix}${prefix==='S' ? nextS++ : nextB++}`; while (usedIds.has(candidate));
    id = candidate; usedIds.add(id); r.ID = id; created++;
  }
  let images = r['Imágenes'].split('|').map(normalizeText).filter(Boolean);
  if (!images.length) images = discoverImages(r['Línea'], r['Carpeta categoría'], r['Carpeta producto']);
  const product = {
    id,
    line:r['Línea'],
    category:r['Categoría'],
    name:r['Nombre'],
    brand:r['Marca'],
    price:formatCop(parsePrice(r['Precio'])),
    availability:r['Disponibilidad'],
    desc:r['Descripción'],
    images,
    size:r['Talla'],
    color:r['Color'],
    tag:r['Etiqueta'],
    searchText:''
  };
  product.searchText = searchTextFor(product);
  output.push(product);
  if (currentById.has(id)) {
    const old = currentById.get(id);
    JSON.stringify(old) === JSON.stringify(product) ? unchanged++ : updated++;
  }
}

fs.mkdirSync(BACKUP_DIR,{recursive:true});
const stamp=timestamp();
fs.copyFileSync(PRODUCTS_FILE,path.join(BACKUP_DIR,`products-${stamp}.js`));
fs.copyFileSync(CATALOG_FILE,path.join(BACKUP_DIR,`catalogo-${stamp}.csv`));
fs.writeFileSync(PRODUCTS_FILE,serializeProducts(output),'utf8');

// Persistir IDs asignados y rutas descubiertas en la matriz.
const { HEADERS, toCsv } = await import('./catalogo-utils.mjs');
const rows = validation.records.map(r=>HEADERS.map(h=>r[h] ?? ''));
for (let i=0;i<validation.records.length;i++) {
  const r=validation.records[i];
  if (r.Estado.toLowerCase()==='activo' && !r['Imágenes']) {
    rows[i][HEADERS.indexOf('Imágenes')] = discoverImages(r['Línea'],r['Carpeta categoría'],r['Carpeta producto']).join('|');
  }
}
fs.writeFileSync(CATALOG_FILE,toCsv([HEADERS,...rows]),'utf8');

console.log('');
console.log(`✅ Sincronización completada.`);
console.log(`Activos generados: ${output.length}`);
console.log(`Nuevos: ${created} | Actualizados: ${updated} | Sin cambios: ${unchanged} | Inactivos: ${inactive}`);
console.log(`Respaldo: ${path.relative(ROOT,BACKUP_DIR)}`);

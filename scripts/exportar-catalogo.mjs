import fs from 'node:fs';
import path from 'node:path';
import { CATALOG_FILE, HEADERS, loadProducts, productToRow, toCsv } from './catalogo-utils.mjs';

const force = process.argv.includes('--force');
if (fs.existsSync(CATALOG_FILE) && !force) {
  console.error(`❌ Ya existe ${path.relative(process.cwd(), CATALOG_FILE)}.`);
  console.error('Para reemplazarlo conscientemente, ejecute: npm run products:export -- --force');
  process.exit(1);
}
const products = await loadProducts();
fs.mkdirSync(path.dirname(CATALOG_FILE), {recursive:true});
fs.writeFileSync(CATALOG_FILE, toCsv([HEADERS, ...products.map(productToRow)]), 'utf8');
console.log(`✅ Catálogo maestro exportado: ${products.length} productos.`);
console.log(`📄 ${path.relative(process.cwd(), CATALOG_FILE)}`);

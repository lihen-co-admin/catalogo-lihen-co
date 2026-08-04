import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const PRODUCTS_FILE = path.join(ROOT, 'js', 'data', 'products.js');
export const CATALOG_FILE = path.join(ROOT, 'data', 'catalogo', 'catalogo_maestro.csv');
export const BACKUP_DIR = path.join(ROOT, 'backups', 'catalogo');

export const HEADERS = [
  'ID','Estado','Línea','Categoría','Nombre','Marca','Precio','Disponibilidad',
  'Descripción','Talla','Color','Etiqueta','Carpeta categoría','Carpeta producto','Imágenes'
];

export function normalizeText(value) {
  return String(value ?? '').trim();
}

export function csvEscape(value, delimiter=';') {
  const text = String(value ?? '');
  return /["\r\n;]/.test(text) || text.includes(delimiter)
    ? `"${text.replaceAll('"','""')}"`
    : text;
}

export function toCsv(rows) {
  return '\uFEFF' + rows.map(row => row.map(value => csvEscape(value)).join(';')).join('\r\n') + '\r\n';
}

export function detectDelimiter(text) {
  const firstLine = text.replace(/^\uFEFF/, '').split(/\r?\n/,1)[0] ?? '';
  const semis = (firstLine.match(/;/g) || []).length;
  const commas = (firstLine.match(/,/g) || []).length;
  return semis >= commas ? ';' : ',';
}

export function parseCsv(text) {
  text = text.replace(/^\uFEFF/, '');
  const delimiter = detectDelimiter(text);
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i=0; i<text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i+1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === delimiter) { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row=[]; field=''; }
    else field += ch;
  }
  if (field.length || row.length) { row.push(field.replace(/\r$/, '')); rows.push(row); }
  return rows.filter(r => r.some(v => normalizeText(v) !== ''));
}

export function parsePrice(value) {
  const raw = normalizeText(value);
  const digits = raw.replace(/[^0-9]/g, '');
  if (!digits) return null;
  const amount = Number(digits);
  return Number.isSafeInteger(amount) && amount >= 0 ? amount : null;
}

export function formatCop(value) {
  return `$${Number(value).toLocaleString('es-CO')}`;
}

export function slug(value) {
  return normalizeText(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLowerCase().replace(/ñ/g,'n').replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
}

export function lineFolder(line) {
  if (line === 'Style') return 'STYLE';
  if (line === 'Beauty Care') return 'BEAUTY_CARE';
  return '';
}

export function categoryFolderFromImages(images) {
  const first = images?.[0] || '';
  const match = first.match(/^\.\/assets\/productos\/(?:STYLE|BEAUTY_CARE)\/([^/]+)\//);
  return match?.[1] || '';
}

export function productFolderFromImages(images) {
  const first = images?.[0] || '';
  const match = first.match(/^\.\/assets\/productos\/(?:STYLE|BEAUTY_CARE)\/[^/]+\/([^/]+)\//);
  return match?.[1] || '';
}

export function discoverImages(line, categoryFolder, productFolder) {
  const folder = path.join(ROOT, 'assets', 'productos', lineFolder(line), categoryFolder, productFolder);
  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) return [];
  const allowed = new Set(['.webp','.png','.jpg','.jpeg','.avif']);
  return fs.readdirSync(folder)
    .filter(name => allowed.has(path.extname(name).toLowerCase()))
    .sort((a,b) => a.localeCompare(b, 'es', {numeric:true, sensitivity:'base'}))
    .map(name => `./assets/productos/${lineFolder(line)}/${categoryFolder}/${productFolder}/${name}`);
}

export function searchTextFor(product) {
  return `${product.name} ${product.brand} ${product.category} ${product.line}`.toLowerCase();
}

export function productToRow(product) {
  return [
    product.id, 'Activo', product.line, product.category, product.name, product.brand,
    parsePrice(product.price) ?? '', product.availability, product.desc, product.size,
    product.color, product.tag, categoryFolderFromImages(product.images),
    productFolderFromImages(product.images), (product.images || []).join('|')
  ];
}

export async function loadProducts() {
  const source = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  const url = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
  const mod = await import(url);
  if (!Array.isArray(mod.products)) throw new Error('products.js no exporta un arreglo products válido.');
  return mod.products;
}

export function serializeProducts(products) {
  return `// Etapa 3 - Datos del catálogo real de LIHEN.CO\n// Este archivo solamente almacena información. No modifica el HTML.\n// GENERADO AUTOMÁTICAMENTE desde data/catalogo/catalogo_maestro.csv.\n// No editar manualmente: use npm run products:sync.\n\nexport const products = ${JSON.stringify(products, null, 2)};\n\nexport const productLines = ["Todos", "Beauty Care", "Style"];\n`;
}

export function timestamp() {
  return new Date().toISOString().replace(/[:.]/g,'-');
}

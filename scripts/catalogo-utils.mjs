import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CURRENT_FILE = fileURLToPath(import.meta.url);
const CURRENT_DIR = path.dirname(CURRENT_FILE);

export const ROOT = path.resolve(CURRENT_DIR, '..');
export const PRODUCTS_FILE = path.join(ROOT, 'js', 'data', 'products.js');
export const CATALOG_FILE = path.join(ROOT, 'data', 'catalogo', 'catalogo_maestro.csv');
export const INTERNAL_CATALOG_FILE = path.join(ROOT, 'data-private', 'catalogo_maestro_interno.csv');
export const BACKUP_DIR = path.join(ROOT, 'backups', 'catalogo');

// Columnas autorizadas para el catálogo que puede quedar publicado con la tienda.
// SKU se conserva como llave de interoperabilidad; proveedor, costo e ID interno no se publican.
export const PUBLIC_HEADERS = [
  'ID',
  'SKU',
  'Estado',
  'Visible en tienda',
  'Línea',
  'Categoría',
  'Subcategoría',
  'Nombre',
  'Marca',
  'Precio',
  'Disponibilidad',
  'Descripción',
  'Talla',
  'Color',
  'Etiqueta',
  'Carpeta categoría',
  'Carpeta producto',
  'Imágenes',
  'Registro fotográfico visible',
  'Cantidad de fotografías'
];

export const INTERNAL_HEADERS = [
  'ID',
  'SKU',
  'ID interno',
  'Estado',
  'Visible en tienda',
  'Línea',
  'Categoría',
  'Subcategoría',
  'Nombre',
  'Marca',
  'Proveedor',
  'Costo real unitario',
  'Precio',
  'Disponibilidad',
  'Descripción',
  'Talla',
  'Color',
  'Etiqueta',
  'Carpeta categoría',
  'Carpeta producto',
  'Imágenes',
  'Registro fotográfico visible',
  'Cantidad de fotografías'
];

// Alias histórico para no romper scripts existentes.
export const HEADERS = PUBLIC_HEADERS;

export function normalizeText(value) {
  return String(value ?? '').trim();
}

// Nombres oficiales de marca aprobados para mantener catálogo, filtros y logos consistentes.
export function brandLookupKey(value) {
  return normalizeText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

const OFFICIAL_BRAND_ALIASES = new Map([
  ['akarella cosmeticos', 'Akarella'], ['akarella cosmetics', 'Akarella'], ['akarella', 'Akarella'],
  ['alissha', 'Alissha Beauty'], ['alissha beauty', 'Alissha Beauty'],
  ['anik', 'Ani-K'], ['ani k', 'Ani-K'], ['ani k cosmetics', 'Ani-K'], ['anik cosmetics', 'Ani-K'],
  ['atenea', 'Atenea'], ['bioaqua', 'Bioaqua'],
  ['centella', 'Madagascar Centella'], ['centella madagascar', 'Madagascar Centella'], ['madagascar centella', 'Madagascar Centella'],
  ['karite', 'Karité'], ['koec', 'KOEC'], ['lampina', 'Lampiña'], ['prosa', 'Prosa'],
  ['rayitos de sol', 'Rayitos de Sol'], ['ruby rose', 'Ruby Rose'], ['samy', 'Samy'], ['sammy', 'Samy'], ['sas', 'SAS'],
  ['star charming', 'Star Charming'], ['ushas', 'Ushas'], ['vidan dreams', 'Vidan Dreams'], ['vogue', 'Vogue'],
  // Capitalización ya respaldada por logos oficiales existentes del proyecto.
  ['vive beauty', 'Vive Beauty'], ['lihen co', 'LIHEN.CO'], ['marca g', 'LIHEN.CO'],
  ['bloom', 'Bloomshell'], ['bloomshell', 'Bloomshell'],
  ['destiny', 'Destiny by La Segura'], ['destiny by la segura', 'Destiny by La Segura'],
  ['girly', 'Girly by Luisa Palacio'], ['girly by luisa palacio', 'Girly by Luisa Palacio'],
  ['purpure', 'Púrpure by Angie Bedoya'], ['purpure by angie bedoya', 'Púrpure by Angie Bedoya']
]);

export function canonicalBrand(value) {
  const original = normalizeText(value).replace(/\s+/g, ' ');
  if (!original) return '';
  return OFFICIAL_BRAND_ALIASES.get(brandLookupKey(original)) || original;
}

export function csvEscape(value, delimiter = ';') {
  const text = String(value ?? '');
  return /["\r\n;]/.test(text) || text.includes(delimiter)
    ? `"${text.replaceAll('"', '""')}"`
    : text;
}

export function toCsv(rows) {
  return (
    '\uFEFF' +
    rows.map((row) => row.map((value) => csvEscape(value)).join(';')).join('\r\n') +
    '\r\n'
  );
}

export function detectDelimiter(text) {
  const firstLine = text.replace(/^\uFEFF/, '').split(/\r?\n/, 1)[0] ?? '';
  const semis = (firstLine.match(/;/g) || []).length;
  const commas = (firstLine.match(/,/g) || []).length;
  return semis >= commas ? ';' : ',';
}

export function parseCsv(text) {
  text = text.replace(/^\uFEFF/, '');
  const delimiter = detectDelimiter(text);
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === delimiter) {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }

  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ''));
    rows.push(row);
  }

  return rows.filter((currentRow) =>
    currentRow.some((value) => normalizeText(value) !== '')
  );
}

export function recordsFromCsvFile(file) {
  if (!fs.existsSync(file)) return { headers: [], records: [] };
  const rows = parseCsv(fs.readFileSync(file, 'utf8'));
  if (!rows.length) return { headers: [], records: [] };
  const headers = rows[0].map(normalizeText);
  const records = rows.slice(1).map((row, index) => {
    const obj = { __row: index + 2 };
    headers.forEach((header, column) => {
      obj[header] = normalizeText(row[column]);
    });
    return obj;
  }).filter((record) =>
    Object.entries(record).some(([key, value]) => key !== '__row' && normalizeText(value) !== '')
  );
  return { headers, records };
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

export function publicPrice(value) {
  const amount = parsePrice(value);
  return amount && amount > 0 ? formatCop(amount) : 'Precio por confirmar';
}

export function slug(value) {
  return normalizeText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
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
  if (!line || !categoryFolder || !productFolder) return [];
  const folder = path.join(ROOT, 'assets', 'productos', lineFolder(line), categoryFolder, productFolder);
  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) return [];

  const allowed = new Set(['.webp', '.png', '.jpg', '.jpeg', '.avif']);
  return fs.readdirSync(folder)
    .filter((name) => allowed.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true, sensitivity: 'base' }))
    .map((name) => `./assets/productos/${lineFolder(line)}/${categoryFolder}/${productFolder}/${name}`);
}

export function searchTextFor(product) {
  return [
    product.sku,
    product.name,
    product.brand,
    product.category,
    product.subcategory,
    product.line
  ].filter(Boolean).join(' ').toLowerCase();
}

export function productToRow(product) {
  return [
    product.id,
    product.sku || '',
    'Activo',
    'Sí',
    product.line,
    product.category,
    product.subcategory || '',
    product.name,
    canonicalBrand(product.brand),
    parsePrice(product.price) ?? '',
    product.availability,
    product.desc,
    product.size,
    product.color,
    product.tag,
    categoryFolderFromImages(product.images),
    productFolderFromImages(product.images),
    (product.images || []).join('|'),
    (product.images || []).length ? 'Sí' : 'No',
    String((product.images || []).length)
  ];
}

export async function loadProducts() {
  const source = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  const url = `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
  const mod = await import(url);
  if (!Array.isArray(mod.products)) {
    throw new Error('products.js no exporta un arreglo products válido.');
  }
  return mod.products;
}

export function serializeProducts(products) {
  return `// Etapa 3 - Datos públicos del catálogo real de LIHEN.CO
// Este archivo solamente almacena información comercial autorizada.
// GENERADO AUTOMÁTICAMENTE desde data/catalogo/catalogo_maestro.csv.
// No contiene proveedor, costo real unitario ni ID interno.
// No editar manualmente: use npm run products:sync.

export const products = ${JSON.stringify(products, null, 2)};

export const productLines = ["Todos", "Beauty Care", "Style"];
`;
}

export function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

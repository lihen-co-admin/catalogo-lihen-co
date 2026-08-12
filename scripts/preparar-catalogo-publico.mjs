import fs from 'node:fs';
import path from 'node:path';
import { BACKUP_DIR, CATALOG_FILE, INTERNAL_CATALOG_FILE, PUBLIC_HEADERS, ROOT, canonicalBrand, toCsv, timestamp } from './catalogo-utils.mjs';
import { validateInternalCatalog } from './validar-catalogo-interno.mjs';

const validation = validateInternalCatalog({ silent: false });
if (validation.errors.length) process.exit(1);

fs.mkdirSync(path.dirname(CATALOG_FILE), { recursive: true });
fs.mkdirSync(BACKUP_DIR, { recursive: true });
if (fs.existsSync(CATALOG_FILE)) {
  fs.copyFileSync(CATALOG_FILE, path.join(BACKUP_DIR, `catalogo-publico-${timestamp()}.csv`));
}

const rows = validation.records.map((record) => {
  const publicRecord = { ...record, Marca: canonicalBrand(record.Marca) };
  if (!publicRecord.Talla) publicRecord.Talla = 'Por confirmar';
  if (!publicRecord.Color) publicRecord.Color = 'Por confirmar';
  if (!publicRecord.Etiqueta) publicRecord.Etiqueta = 'Consulta disponibilidad';
  return PUBLIC_HEADERS.map((header) => publicRecord[header] ?? '');
});
fs.writeFileSync(CATALOG_FILE, toCsv([PUBLIC_HEADERS, ...rows]), 'utf8');

console.log('');
console.log(`✅ Catálogo público preparado: ${validation.records.length} registros.`);
console.log(`Fuente privada: ${path.relative(ROOT, INTERNAL_CATALOG_FILE)}`);
console.log(`Salida pública: ${path.relative(ROOT, CATALOG_FILE)}`);
console.log('Campos privados excluidos: ID interno, Proveedor, Costo real unitario.');

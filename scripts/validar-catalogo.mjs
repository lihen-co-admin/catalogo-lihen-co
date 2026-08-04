import fs from 'node:fs';
import path from 'node:path';
import { CATALOG_FILE, HEADERS, parseCsv, normalizeText, parsePrice, lineFolder, discoverImages, ROOT } from './catalogo-utils.mjs';

export function validateCatalog({silent=false}={}) {
  const errors = [], warnings = [];
  if (!fs.existsSync(CATALOG_FILE)) return {errors:[`No existe ${path.relative(ROOT, CATALOG_FILE)}.`], warnings, records:[]};
  const rows = parseCsv(fs.readFileSync(CATALOG_FILE,'utf8'));
  if (!rows.length) return {errors:['El catálogo maestro está vacío.'], warnings, records:[]};
  const headers = rows[0].map(normalizeText);
  for (const required of HEADERS) if (!headers.includes(required)) errors.push(`Falta la columna obligatoria: ${required}`);
  if (errors.length) return {errors,warnings,records:[]};
  const records = rows.slice(1).map((row,index) => {
    const obj = {__row:index+2};
    headers.forEach((h,i)=>obj[h]=normalizeText(row[i]));
    return obj;
  }).filter(r => Object.values(r).some((v,k)=>k!=='__row' && normalizeText(v)!==''));

  const ids = new Map(), folders = new Map();
  for (const r of records) {
    const pfx = `Fila ${r.__row}`;
    const state = r['Estado'].toLowerCase();
    if (!['activo','inactivo'].includes(state)) errors.push(`${pfx}: Estado debe ser Activo o Inactivo.`);
    if (!['Style','Beauty Care'].includes(r['Línea'])) errors.push(`${pfx}: Línea debe ser Style o Beauty Care.`);
    for (const field of ['Categoría','Nombre','Marca','Disponibilidad','Descripción','Talla','Color','Etiqueta']) {
      if (!r[field]) errors.push(`${pfx}: falta ${field}.`);
    }
    if (parsePrice(r['Precio']) === null) errors.push(`${pfx}: Precio inválido (${r['Precio'] || 'vacío'}).`);
    if (r['ID']) {
      if (!/^[BS]\d+$/.test(r['ID'])) errors.push(`${pfx}: ID inválido (${r['ID']}).`);
      const expected = r['Línea']==='Style' ? 'S' : 'B';
      if (!r['ID'].startsWith(expected)) errors.push(`${pfx}: el ID ${r['ID']} no corresponde a ${r['Línea']}.`);
      if (ids.has(r['ID'])) errors.push(`${pfx}: ID repetido ${r['ID']} (también fila ${ids.get(r['ID'])}).`);
      ids.set(r['ID'], r.__row);
    }
    if (!r['ID'] && state === 'inactivo') errors.push(`${pfx}: un producto nuevo inactivo necesita ID.`);
    const explicitImages = r['Imágenes'].split('|').map(normalizeText).filter(Boolean);
    if (state === 'activo') {
      let images = explicitImages;
      if (!images.length) {
        if (!r['Carpeta categoría'] || !r['Carpeta producto']) errors.push(`${pfx}: indique Imágenes o ambas carpetas.`);
        else images = discoverImages(r['Línea'], r['Carpeta categoría'], r['Carpeta producto']);
      }
      if (!images.length) errors.push(`${pfx}: no se encontraron imágenes para ${r['Nombre']}.`);
      for (const image of images) {
        const rel = image.replace(/^\.\//,'');
        if (!fs.existsSync(path.join(ROOT, rel))) errors.push(`${pfx}: imagen inexistente ${image}.`);
      }
    }
    if (r['Carpeta categoría'] && r['Carpeta producto']) {
      const key = `${lineFolder(r['Línea'])}/${r['Carpeta categoría']}/${r['Carpeta producto']}`;
      if (folders.has(key) && folders.get(key)!==r['ID']) warnings.push(`${pfx}: carpeta compartida con otro producto: ${key}.`);
      folders.set(key, r['ID'] || `fila-${r.__row}`);
    }
  }
  if (!silent) {
    console.log(`Productos revisados: ${records.length}`);
    console.log(`Activos: ${records.filter(r=>r.Estado.toLowerCase()==='activo').length}`);
    console.log(`Inactivos: ${records.filter(r=>r.Estado.toLowerCase()==='inactivo').length}`);
    warnings.forEach(w=>console.warn(`⚠️ ${w}`));
    errors.forEach(e=>console.error(`❌ ${e}`));
    if (!errors.length) console.log('✅ Catálogo maestro válido.');
  }
  return {errors,warnings,records};
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateCatalog();
  process.exit(result.errors.length ? 1 : 0);
}

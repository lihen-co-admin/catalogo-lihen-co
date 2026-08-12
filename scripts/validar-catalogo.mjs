import fs from 'node:fs';
import path from 'node:path';
import { CATALOG_FILE, PUBLIC_HEADERS, canonicalBrand, parseCsv, normalizeText, parsePrice, lineFolder, discoverImages, ROOT } from './catalogo-utils.mjs';

export function validateCatalog({ silent = false } = {}) {
  const errors = [];
  const warnings = [];
  if (!fs.existsSync(CATALOG_FILE)) {
    return { errors: [`No existe ${path.relative(ROOT, CATALOG_FILE)}.`], warnings, records: [] };
  }

  const rows = parseCsv(fs.readFileSync(CATALOG_FILE, 'utf8'));
  if (!rows.length) return { errors: ['El catálogo maestro está vacío.'], warnings, records: [] };
  const headers = rows[0].map(normalizeText);
  for (const required of PUBLIC_HEADERS) {
    if (!headers.includes(required)) errors.push(`Falta la columna pública obligatoria: ${required}`);
  }
  for (const forbidden of ['ID interno', 'Proveedor', 'Costo real unitario']) {
    if (headers.includes(forbidden)) errors.push(`El catálogo público no debe exponer la columna privada: ${forbidden}`);
  }
  if (errors.length) return { errors, warnings, records: [] };

  const records = rows.slice(1).map((row, index) => {
    const obj = { __row: index + 2 };
    headers.forEach((header, column) => {
      obj[header] = normalizeText(row[column]);
    });
    return obj;
  }).filter((record) =>
    Object.entries(record).some(([key, value]) => key !== '__row' && normalizeText(value) !== '')
  );

  const ids = new Map();
  const skus = new Map();
  const folders = new Map();

  for (const r of records) {
    const pfx = `Fila ${r.__row}`;
    const state = r.Estado.toLowerCase();
    const storefrontVisible = normalizeText(r['Visible en tienda']);
    if (!['activo', 'inactivo'].includes(state)) errors.push(`${pfx}: Estado debe ser Activo o Inactivo.`);
    if (!['Sí', 'No'].includes(storefrontVisible)) errors.push(`${pfx}: Visible en tienda debe ser Sí o No.`);
    if (state === 'inactivo' && storefrontVisible === 'Sí') errors.push(`${pfx}: un producto Inactivo no puede tener Visible en tienda = Sí.`);
    if (!['Style', 'Beauty Care'].includes(r['Línea'])) errors.push(`${pfx}: Línea debe ser Style o Beauty Care.`);

    for (const field of ['Categoría', 'Nombre', 'Marca', 'Disponibilidad', 'Descripción', 'Talla', 'Color', 'Etiqueta']) {
      if (!r[field]) errors.push(`${pfx}: falta ${field}.`);
    }
    if (!r.Subcategoría) warnings.push(`${pfx}: Subcategoría vacía para ${r.Nombre}.`);
    if (r.Marca && canonicalBrand(r.Marca) !== r.Marca) warnings.push(`${pfx}: Marca no normalizada (${r.Marca} → ${canonicalBrand(r.Marca)}).`);

    const price = parsePrice(r.Precio);
    if (price === null) errors.push(`${pfx}: Precio inválido (${r.Precio || 'vacío'}).`);
    else if (price === 0) warnings.push(`${pfx}: Precio en 0 para ${r.Nombre}; el frontend mostrará "Precio por confirmar".`);

    if (r.ID) {
      if (!/^[BS]\d+$/.test(r.ID)) errors.push(`${pfx}: ID inválido (${r.ID}).`);
      const expected = r['Línea'] === 'Style' ? 'S' : 'B';
      if (!r.ID.startsWith(expected)) errors.push(`${pfx}: el ID ${r.ID} no corresponde a ${r['Línea']}.`);
      if (ids.has(r.ID)) errors.push(`${pfx}: ID repetido ${r.ID} (también fila ${ids.get(r.ID)}).`);
      ids.set(r.ID, r.__row);
    }
    if (!r.ID && state === 'inactivo') errors.push(`${pfx}: un producto nuevo inactivo necesita ID.`);

    if (r.SKU) {
      const skuKey = r.SKU.toUpperCase();
      if (!/^(?:BC|ST)-\d{3}$/.test(skuKey)) warnings.push(`${pfx}: SKU con formato no estándar (${r.SKU}).`);
      if (skus.has(skuKey)) errors.push(`${pfx}: SKU repetido ${r.SKU} (también fila ${skus.get(skuKey)}).`);
      skus.set(skuKey, r.__row);
    }

    const explicitImages = r.Imágenes.split('|').map(normalizeText).filter(Boolean);
    let auditedImages = explicitImages;
    if (state === 'activo' && !auditedImages.length && r['Carpeta categoría'] && r['Carpeta producto']) {
      auditedImages = discoverImages(r['Línea'], r['Carpeta categoría'], r['Carpeta producto']);
    }
    if (state === 'activo' && !auditedImages.length) {
      if (storefrontVisible === 'Sí') errors.push(`${pfx}: ${r.Nombre} está marcado Visible en tienda = Sí, pero no tiene fotografías. Primero agrega fotos o cambia la visibilidad a No.`);
      else warnings.push(`${pfx}: ${r.Nombre} no tiene imágenes y permanecerá oculto en la tienda.`);
    }
    for (const image of auditedImages) {
      const rel = image.replace(/^\.\//, '');
      if (!fs.existsSync(path.join(ROOT, rel))) errors.push(`${pfx}: imagen inexistente ${image}.`);
    }

    const photoVisible = normalizeText(r['Registro fotográfico visible']);
    const photoCountRaw = normalizeText(r['Cantidad de fotografías']);
    if (!['Sí', 'No'].includes(photoVisible)) errors.push(`${pfx}: Registro fotográfico visible debe ser Sí o No.`);
    if (!/^\d+$/.test(photoCountRaw)) errors.push(`${pfx}: Cantidad de fotografías debe ser un entero no negativo.`);
    else {
      const photoCount = Number(photoCountRaw);
      if (photoCount !== auditedImages.length) errors.push(`${pfx}: Cantidad de fotografías (${photoCount}) no coincide con imágenes válidas (${auditedImages.length}).`);
      const expectedVisible = auditedImages.length ? 'Sí' : 'No';
      if (photoVisible !== expectedVisible) errors.push(`${pfx}: Registro fotográfico visible debería ser ${expectedVisible}.`);
    }

    if (r['Carpeta categoría'] && r['Carpeta producto']) {
      const key = `${lineFolder(r['Línea'])}/${r['Carpeta categoría']}/${r['Carpeta producto']}`;
      if (folders.has(key) && folders.get(key) !== r.ID) warnings.push(`${pfx}: carpeta compartida con otro producto: ${key}.`);
      folders.set(key, r.ID || `fila-${r.__row}`);
    }
  }

  if (!silent) {
    console.log(`Productos revisados: ${records.length}`);
    console.log(`Activos: ${records.filter((r) => r.Estado.toLowerCase() === 'activo').length}`);
    console.log(`Inactivos: ${records.filter((r) => r.Estado.toLowerCase() === 'inactivo').length}`);
    console.log(`Visibles en tienda: ${records.filter((r) => normalizeText(r['Visible en tienda']) === 'Sí').length}`);
    console.log(`Ocultos en tienda: ${records.filter((r) => normalizeText(r['Visible en tienda']) === 'No').length}`);
    console.log(`Con SKU: ${records.filter((r) => r.SKU).length}`);
    warnings.forEach((warning) => console.warn(`⚠️ ${warning}`));
    errors.forEach((error) => console.error(`❌ ${error}`));
    if (!errors.length) console.log('✅ Catálogo público válido.');
  }
  return { errors, warnings, records };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateCatalog();
  process.exit(result.errors.length ? 1 : 0);
}

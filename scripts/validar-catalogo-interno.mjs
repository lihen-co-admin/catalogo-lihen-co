import fs from 'node:fs';
import { INTERNAL_CATALOG_FILE, INTERNAL_HEADERS, canonicalBrand, normalizeText, parsePrice, recordsFromCsvFile } from './catalogo-utils.mjs';

export function validateInternalCatalog({ silent = false } = {}) {
  const errors = [];
  const warnings = [];
  if (!fs.existsSync(INTERNAL_CATALOG_FILE)) {
    return { errors: ['No existe data-private/catalogo_maestro_interno.csv.'], warnings, records: [] };
  }

  const { headers, records } = recordsFromCsvFile(INTERNAL_CATALOG_FILE);
  for (const required of INTERNAL_HEADERS) {
    if (!headers.includes(required)) errors.push(`Falta la columna interna obligatoria: ${required}`);
  }
  if (errors.length) return { errors, warnings, records };

  const ids = new Map();
  const skus = new Map();
  const internalIds = new Map();
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  for (const r of records) {
    const pfx = `Fila ${r.__row}`;
    const state = normalizeText(r.Estado).toLowerCase();
    const storefrontVisible = normalizeText(r['Visible en tienda']);
    if (!['activo', 'inactivo'].includes(state)) errors.push(`${pfx}: Estado debe ser Activo o Inactivo.`);
    if (!['Sí', 'No'].includes(storefrontVisible)) errors.push(`${pfx}: Visible en tienda debe ser Sí o No.`);
    if (state === 'inactivo' && storefrontVisible === 'Sí') errors.push(`${pfx}: un producto Inactivo no puede tener Visible en tienda = Sí.`);
    if (!['Style', 'Beauty Care'].includes(r['Línea'])) errors.push(`${pfx}: Línea debe ser Style o Beauty Care.`);
    if (!r.ID || !/^[BS]\d+$/.test(r.ID)) errors.push(`${pfx}: ID web inválido o vacío (${r.ID || 'vacío'}).`);
    if (r.ID) {
      const expected = r['Línea'] === 'Style' ? 'S' : 'B';
      if (!r.ID.startsWith(expected)) errors.push(`${pfx}: ${r.ID} no corresponde a ${r['Línea']}.`);
      if (ids.has(r.ID)) errors.push(`${pfx}: ID repetido ${r.ID} (también fila ${ids.get(r.ID)}).`);
      ids.set(r.ID, r.__row);
    }

    const sku = normalizeText(r.SKU);
    if (sku) {
      if (!/^(?:BC|ST)-\d{3}$/i.test(sku)) warnings.push(`${pfx}: SKU con formato no estándar (${sku}).`);
      if (skus.has(sku.toUpperCase())) errors.push(`${pfx}: SKU repetido ${sku} (también fila ${skus.get(sku.toUpperCase())}).`);
      skus.set(sku.toUpperCase(), r.__row);
    }

    const internalId = normalizeText(r['ID interno']);
    if (internalId) {
      if (!uuidPattern.test(internalId)) warnings.push(`${pfx}: ID interno no tiene formato UUID (${internalId}).`);
      if (internalIds.has(internalId)) errors.push(`${pfx}: ID interno repetido ${internalId}.`);
      internalIds.set(internalId, r.__row);
    }

    for (const field of ['Nombre', 'Marca', 'Categoría']) {
      if (!normalizeText(r[field])) warnings.push(`${pfx}: falta ${field}.`);
    }
    if (normalizeText(r.Marca) && canonicalBrand(r.Marca) !== normalizeText(r.Marca)) warnings.push(`${pfx}: Marca no normalizada (${r.Marca} → ${canonicalBrand(r.Marca)}).`);
    const price = parsePrice(r.Precio);
    if (price === null) errors.push(`${pfx}: Precio inválido (${r.Precio || 'vacío'}).`);
    else if (price === 0) warnings.push(`${pfx}: Precio público en 0 para ${r.Nombre}; la tienda mostrará "Precio por confirmar".`);

    const costRaw = normalizeText(r['Costo real unitario']);
    if (costRaw && parsePrice(costRaw) === null) errors.push(`${pfx}: Costo real unitario inválido (${costRaw}).`);
    if (sku && !internalId) warnings.push(`${pfx}: SKU ${sku} no tiene ID interno.`);
    if (sku && !normalizeText(r.Proveedor)) warnings.push(`${pfx}: SKU ${sku} no tiene proveedor.`);

    const photoVisible = normalizeText(r['Registro fotográfico visible']);
    const photoCountRaw = normalizeText(r['Cantidad de fotografías']);
    const explicitImages = normalizeText(r.Imágenes).split('|').map(normalizeText).filter(Boolean);
    if (!['Sí', 'No'].includes(photoVisible)) errors.push(`${pfx}: Registro fotográfico visible debe ser Sí o No.`);
    if (!/^\d+$/.test(photoCountRaw)) errors.push(`${pfx}: Cantidad de fotografías debe ser un entero no negativo.`);
    else {
      const photoCount = Number(photoCountRaw);
      if (photoCount !== explicitImages.length) errors.push(`${pfx}: Cantidad de fotografías (${photoCount}) no coincide con Imágenes (${explicitImages.length}).`);
      const expectedVisible = explicitImages.length ? 'Sí' : 'No';
      if (photoVisible !== expectedVisible) errors.push(`${pfx}: Registro fotográfico visible debería ser ${expectedVisible}.`);
      if (storefrontVisible === 'Sí' && !explicitImages.length) errors.push(`${pfx}: ${r.Nombre} no puede publicarse sin fotografías; usa Visible en tienda = No hasta cargar imágenes.`);
    }
  }

  if (!silent) {
    console.log(`Registros internos revisados: ${records.length}`);
    console.log(`Con SKU: ${records.filter((r) => r.SKU).length}`);
    console.log(`Con ID interno: ${records.filter((r) => r['ID interno']).length}`);
    console.log(`Visibles en tienda: ${records.filter((r) => normalizeText(r['Visible en tienda']) === 'Sí').length}`);
    console.log(`Ocultos en tienda: ${records.filter((r) => normalizeText(r['Visible en tienda']) === 'No').length}`);
    warnings.forEach((warning) => console.warn(`⚠️ ${warning}`));
    errors.forEach((error) => console.error(`❌ ${error}`));
    if (!errors.length) console.log('✅ Catálogo interno válido para preparar la versión pública.');
  }

  return { errors, warnings, records };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateInternalCatalog();
  process.exit(result.errors.length ? 1 : 0);
}

const moneyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

function stringValue(value, fallback = '') {
  return value === null || value === undefined ? fallback : String(value).trim();
}

function numberValue(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function normalizeImages(images = [], mainImageUrl = '') {
  const normalized = (Array.isArray(images) ? images : [])
    .map((image, index) => {
      if (typeof image === 'string') {
        return { url: image, alt: '', sortOrder: index, isMain: index === 0 };
      }

      return {
        url: stringValue(image?.url ?? image?.public_url ?? image?.storage_path),
        alt: stringValue(image?.alt ?? image?.alt_text),
        sortOrder: numberValue(image?.sort_order ?? image?.sortOrder, index),
        isMain: Boolean(image?.is_main ?? image?.isMain),
      };
    })
    .filter((image) => image.url)
    .sort((a, b) => Number(b.isMain) - Number(a.isMain) || a.sortOrder - b.sortOrder);

  const main = stringValue(mainImageUrl);
  if (main && !normalized.some((image) => image.url === main)) {
    normalized.unshift({ url: main, alt: '', sortOrder: -1, isMain: true });
  }

  return normalized;
}

function normalizeVariants(variants = []) {
  return (Array.isArray(variants) ? variants : []).map((variant) => ({
    id: stringValue(variant?.id),
    size: stringValue(variant?.size) || null,
    color: stringValue(variant?.color) || null,
    tone: stringValue(variant?.tone) || null,
    presentation: stringValue(variant?.presentation) || null,
    additionalPrice: numberValue(variant?.additional_price ?? variant?.additionalPrice, 0),
  }));
}

function availabilityFromRow(row) {
  const rawStatus = stringValue(row?.availability_status).toLowerCase();
  const rawText = stringValue(row?.availability_text ?? row?.catalog_availability_text);
  const status = ['available', 'out_of_stock', 'coming_soon'].includes(rawStatus)
    ? rawStatus
    : /agotad/i.test(rawText)
      ? 'out_of_stock'
      : /pr[oó]xim|pendiente/i.test(rawText)
        ? 'coming_soon'
        : 'available';

  const text = rawText || (status === 'out_of_stock' ? 'Agotado' : status === 'coming_soon' ? 'Próximamente' : 'Disponible');
  const quantityRaw = row?.public_stock_quantity;
  const quantity = quantityRaw === null || quantityRaw === undefined ? null : numberValue(quantityRaw, null);

  return { status, text, quantity };
}

export function adaptCatalogRow(row, { legacyProduct = null } = {}) {
  const variants = normalizeVariants(row?.variants);
  const normalizedImages = normalizeImages(row?.images, row?.main_image_url);
  const availability = availabilityFromRow(row);
  const priceValue = numberValue(row?.sale_price, 0);

  const sku = stringValue(row?.sku) || null;
  const catalogCode = stringValue(row?.catalog_code) || null;
  // Cuando existe un cruce exacto con el catálogo legado preservo su id para no
  // invalidar selecciones guardadas. Si no existe, el UUID de products es estable.
  const id = stringValue(legacyProduct?.id) || stringValue(row?.id) || catalogCode || sku;

  const line = stringValue(row?.business_line);
  const category = stringValue(row?.category);
  const subcategory = stringValue(row?.subcategory);
  const name = stringValue(row?.name, 'Producto LIHEN.CO');
  const brand = stringValue(row?.brand);
  const description = stringValue(row?.description);
  const firstVariant = variants[0] ?? {};
  const images = normalizedImages.map((image) => image.url);
  const price = priceValue > 0 ? moneyFormatter.format(priceValue) : 'Precio por confirmar';

  return {
    id,
    sourceId: stringValue(row?.id),
    sku,
    catalogCode,
    line,
    category,
    subcategory,
    name,
    brand,
    description,
    desc: description,
    priceValue,
    price,
    // Compatibilidad: los consumidores actuales esperan availability como texto.
    availability: availability.text,
    availabilityInfo: availability,
    availabilityStatus: availability.status,
    availabilityText: availability.text,
    // Compatibilidad con storefront/search actuales.
    size: firstVariant.size || firstVariant.presentation || 'Por confirmar',
    color: firstVariant.color || firstVariant.tone || 'Por confirmar',
    mainImage: normalizedImages[0]?.url ?? null,
    imageObjects: normalizedImages,
    images,
    variants,
    tag: availability.status === 'out_of_stock' ? 'Agotado' : availability.status === 'coming_soon' ? 'Próximamente' : 'Producto disponible',
    searchText: [sku, catalogCode, name, brand, line, category, subcategory, description, availability.text]
      .filter(Boolean)
      .join(' ')
      .toLowerCase(),
  };
}

export function adaptCatalogRows(rows, { legacyProducts = [] } = {}) {
  const bySku = new Map(
    legacyProducts
      .filter((product) => product?.sku)
      .map((product) => [String(product.sku).trim().toUpperCase(), product]),
  );
  const byId = new Map(legacyProducts.map((product) => [String(product?.id ?? '').trim(), product]));

  return (Array.isArray(rows) ? rows : []).map((row) => {
    const sku = stringValue(row?.sku).toUpperCase();
    const catalogCode = stringValue(row?.catalog_code);
    const legacyProduct = (sku && bySku.get(sku)) || (catalogCode && byId.get(catalogCode)) || null;
    return adaptCatalogRow(row, { legacyProduct });
  });
}

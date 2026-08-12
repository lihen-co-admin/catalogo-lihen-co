# Archivos modificados / agregados en la actualización del catálogo

## Datos

- `data-private/catalogo_maestro_interno.csv` — fuente interna completa de 20 columnas.
- `data-private/catalogo_cruce_admin_web.csv` — cruce interno ID web/SKU/UUID.
- `data-private/catalogo_diferencias_2026-08-07.csv` — altas y cambios detectados.
- `data/catalogo/catalogo_maestro.csv` — catálogo público seguro de 17 columnas.
- `data/catalogo/catalogo_cruce_sku_publico.csv` — cruce público mínimo.
- `js/data/products.js` — regenerado con 178 productos, SKU y subcategoría.

## Automatización del catálogo

- `scripts/catalogo-utils.mjs`
- `scripts/validar-catalogo.mjs`
- `scripts/validar-catalogo-interno.mjs` (nuevo)
- `scripts/preparar-catalogo-publico.mjs` (nuevo)
- `scripts/sincronizar-catalogo.mjs`
- `scripts/validate-project.mjs`
- `scripts/validate-release.mjs` — se retiró una validación obsoleta de una página de invitaciones que ya no existe en el proyecto actual.
- `package.json`

## Tienda

- `js/search.js` — búsqueda compatible con SKU y subcategoría.
- `js/catalog/catalogFilters.js` — búsqueda de catálogo compatible con SKU y subcategoría.
- `js/storefront.js` — SKU incluido en selección/WhatsApp y aliases de logos para marcas equivalentes.

## Documentación

- `README.md`
- `GUIA_CATALOGO_MAESTRO_LIHEN.md`
- `docs/INTEGRACION_ADMIN_WEB_CATALOGO.md`
- `docs/REPORTE_CATALOGO_ACTUALIZADO_2026-08-07.md`
- `docs/catalogo-contrato-v1.json`
- `VALIDACION_CATALOGO_ACTUALIZADO_2026-08-07.txt`

No se modificó el ZIP de LIHEN_ADMIN_PRO ni se activó sincronización remota. Ese proyecto se utilizó como referencia para validar la compatibilidad de SKU y el diseño futuro.

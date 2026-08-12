# REPORTE DE ACTUALIZACIÓN DEL CATÁLOGO MAESTRO — 2026-08-07

## Resumen ejecutivo

- Catálogo web anterior: **95 productos**.
- Catálogo maestro actualizado: **178 productos**.
- Productos nuevos por ID web: **83**.
- Productos existentes con cambios comerciales: **2**.
- Productos existentes sin cambios comerciales: **93**.
- Productos eliminados respecto al catálogo anterior: **0**.
- Registros con SKU: **85**.
- Registros sin SKU: **93**.
- Registros con ID interno: **85**.
- Registros con proveedor: **85**.
- Registros con costo real unitario: **85**.
- Registros con imágenes propias: **95**.
- Registros sin imágenes propias: **83**; usan el fallback visual oficial de LIHEN.CO hasta cargar fotografías reales.
- Precios públicos en 0 o vacíos: **1**; el frontend los muestra como **“Precio por confirmar”**.

## Distribución actual

- Beauty Care: **111** registros.
- Style: **67** registros.
- Nuevos Beauty Care: **69**.
- Nuevos Style: **14**.

## Compatibilidad con LIHEN_ADMIN_PRO

El ZIP administrativo incluye `data/inventario_inicial.json` con **78** SKU. Los **78** SKU del inventario inicial aparecen en el catálogo actualizado.

- SKU del catálogo actualizado que todavía no están en el inventario inicial integrado del ZIP ADMIN: **7**.
- Lista: BC-075, BC-076, BC-077, BC-078, BC-079, BC-080, BC-081.

Esto no significa que estén ausentes de la base Supabase en producción; el análisis se limita a los archivos entregados en los ZIP.

## Cambios detectados en productos existentes

- **B87 — Gel oil cocoa**: Categoría, Nombre.
- **B90 — Lip duo tono SANGRIA**: Nombre, Marca, Precio. Precio 44900 → 45000.

## Separación de información pública e interna

La tienda pública NO debe exponer costo de compra, proveedor ni UUID administrativo.

| Campo | Catálogo interno | Catálogo público | products.js | Uso futuro |
|---|---:|---:|---:|---|
| ID web | Sí | Sí | Sí | Identidad histórica de la tienda |
| SKU | Sí | Sí | Sí | Cruce ADMIN ↔ WEB |
| ID interno | Sí | No | No | UUID/Supabase administrativo |
| Nombre | Sí | Sí | Sí | Comercial |
| Marca | Sí | Sí | Sí | Comercial/filtros |
| Categoría | Sí | Sí | Sí | Comercial/filtros |
| Subcategoría | Sí | Sí | Sí | Filtros y reportes futuros |
| Proveedor | Sí | No | No | Administración |
| Costo real unitario | Sí | No | No | Administración |
| Precio | Sí | Sí | Sí | Precio público |
| Stock | ADMIN | No en esta fase | No en esta fase | Disponibilidad futura |

## Archivos de cruce

- `data-private/catalogo_maestro_interno.csv`: matriz completa de 20 columnas. Está ignorada por Git y no debe publicarse.
- `data-private/catalogo_cruce_admin_web.csv`: cruce técnico interno ID web ↔ SKU ↔ ID interno.
- `data/catalogo/catalogo_maestro.csv`: versión pública sin proveedor/costo/ID interno.
- `data/catalogo/catalogo_cruce_sku_publico.csv`: referencia pública mínima de SKU ↔ ID web.
- `js/data/products.js`: representación optimizada consumida por la tienda.

## Advertencias de calidad pendientes

1. **{stats['missing_images']} productos** no tienen fotografías propias en el catálogo actualizado. No se inventaron imágenes; la tienda usa el logo/fallback de LIHEN.CO.
2. Parte del catálogo histórico no tiene `Subcategoría`. Se conserva así para no inventar clasificación; puede completarse en una futura limpieza de datos.
3. El producto con SKU **BC-013** tiene precio 0 en el archivo fuente; se conserva el dato interno y en la tienda se presenta “Precio por confirmar”.
4. Los campos SKU/ID interno/proveedor/costo solo aparecen en los registros donde fueron suministrados; no se inventaron valores faltantes.

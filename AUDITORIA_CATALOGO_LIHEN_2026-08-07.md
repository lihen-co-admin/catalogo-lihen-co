# Auditoría de catálogo LIHEN.CO — 2026-08-07

## Alcance
Se actualizó el catálogo de `LIHEN_WEB_RENACER` a partir de `catalogo_maestro ACTUALIZADA.csv`, preservando todos los SKU existentes y separando los campos públicos de los datos administrativos privados.

## Resultado numérico
- Productos iniciales: **178**
- Productos finales: **177**
- Con SKU: **85**
- Sin SKU: **92**
- Duplicados confirmados eliminados sin SKU: **1**
- SKU eliminados: **0**
- Candidatos de similitud documentados: **70**
- Candidatos protegidos porque al menos uno tiene SKU: **18**

## Fotografías
- Productos con fotografía propia válida: **94**
- Productos sin fotografía propia: **83**
- Referencias de imágenes integradas: **298**
- Rutas rotas detectadas al preparar el catálogo: **0**
- Imágenes de producto existentes que no son WebP: **0**

Todas las imágenes de producto ya integradas en el proyecto y referenciadas por el catálogo final están en `.webp`. Las fotografías externas localizadas en sitios oficiales se registraron como fuentes de referencia, pero no se copiaron al repositorio cuando no existía evidencia de una licencia o permiso de reutilización.

## Descripciones
- Descripciones mejoradas: **170**
- Mejoras apoyadas directamente por ficha oficial identificada: **10**
- Mejoras conservadoras basadas en datos objetivos del catálogo: **159**

Las descripciones evitan promesas médicas, garantías o beneficios no verificados.

## Duplicación confirmada
- **B57** se eliminó y se conservó **B55**. Ambos carecían de SKU. La fotografía de B55 identifica claramente el empaque como “Shampoo de Romero para Cabello Graso”, mientras B57 tenía ese nombre pero estaba enlazado a una carpeta que corresponde a otra referencia.

El producto general **B89 Lip Gloss Destiny** se conservó: agrupa seis tonos, mientras B112/B113 son variantes concretas con SKU. No se consideran registros idénticos.

## Archivos privados de auditoría
Los reportes detallados quedaron en `data-private/auditoria/`, carpeta excluida de Git por la configuración existente. Incluyen cambios de descripciones, fuentes, candidatos de duplicidad, productos pendientes de fotografía y productos con fotografía sin SKU.

## Validaciones técnicas finales
- `npm run products:update`: aprobado.
- Segunda ejecución de `npm run products:update`: 177 productos sin cambios (idempotencia aprobada).
- `npm run check:js`: aprobado; 97 archivos JavaScript revisados por el validador del proyecto.
- `npm run check`: aprobado; 12 páginas HTML, 12 migraciones SQL y 298 referencias de imágenes revisadas.
- `node scripts/validate-release.mjs`: aprobado.
- Prueba HTTP local: `index.html`, `js/data/products.js` y una fotografía real del catálogo respondieron HTTP 200.

## Pendientes fotográficos
Se mantienen 83 productos sin fotografía propia. Para 10 referencias se localizó una página oficial exacta o suficientemente específica y quedó registrada en `data-private/auditoria/FUENTES_FOTOGRAFIAS_PRODUCTOS_2026-08-07.csv`. El resto se mantiene con fallback y marcado como pendiente hasta contar con una fuente exacta y material autorizado para reutilización.

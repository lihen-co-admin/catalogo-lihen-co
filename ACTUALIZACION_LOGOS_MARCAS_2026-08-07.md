# ACTUALIZACIÓN DE LOGOS Y NOMBRES OFICIALES DE MARCA · 2026-08-07

## Resumen
- Logos suministrados: **18**.
- Logos convertidos/optimizados a `.webp`: **18**.
- Logos integrados al mapping de `Compra por marcas`: **18**.
- Logos no integrables: **0**.
- Variantes de marca corregidas: **12**.
- Productos afectados por normalización: **35**.
- Marcas únicas actuales en Beauty Care: **35**.
- Marcas únicas actuales en Style: **4**.

## Logos integrados
| Marca oficial | Archivo recibido | WebP final | Integrado | Observación |
|---|---|---|---|---|
| Bioaqua | `Bioaqua logo.png` | `bioaqua.webp` | Sí | OK |
| Vogue | `Vogue.jpg` | `vogue.webp` | Sí | OK |
| Vidan Dreams | `Vidan dreams logo.png` | `vidan-dreams.webp` | Sí | OK |
| Ushas | `Ushas logo.jpg` | `ushas.webp` | Sí | OK |
| Star Charming | `Star charming logo.webp` | `star-charming.webp` | Sí | OK |
| SAS | `SAS logo.jpg` | `sas.webp` | Sí | OK |
| Samy | `Sammy logo.png` | `samy.webp` | Sí | OK |
| Ruby Rose | `Ruby Rose logo.webp` | `ruby-rose.webp` | Sí | OK |
| Rayitos de Sol | `Rayitos de sol logo.webp` | `rayitos-de-sol.webp` | Sí | OK |
| Prosa | `Prosa logo.jpg` | `prosa.webp` | Sí | OK |
| Lampiña | `Lampiña logo.jpg` | `lampina.webp` | Sí | OK |
| KOEC | `Koec logo.webp` | `koec.webp` | Sí | OK |
| Karité | `Karite logo.jpg` | `karite.webp` | Sí | OK |
| Madagascar Centella | `Centella logo.png` | `madagascar-centella.webp` | Sí | OK |
| Akarella | `Akarella cosmeticos logo.jpg` | `akarella.webp` | Sí | OK |
| Alissha Beauty | `Alissha logo.jpg` | `alissha-beauty.webp` | Sí | OK |
| Ani-K | `Anik logo.webp` | `ani-k.webp` | Sí | OK |
| Atenea | `Atenea logo.webp` | `atenea.webp` | Sí | OK |

## Normalización aplicada
| Nombre anterior | Nombre oficial | Productos afectados |
|---|---|---:|
| Akarella cosmeticos | Akarella | 1 |
| Alissha | Alissha Beauty | 1 |
| Anik | Ani-K | 1 |
| Centella | Madagascar Centella | 1 |
| Lihen.co | LIHEN.CO | 20 |
| Karite | Karité | 1 |
| Koec | KOEC | 1 |
| Rayitos de sol | Rayitos de Sol | 1 |
| Sammy | Samy | 1 |
| Star charming | Star Charming | 1 |
| Vidan dreams | Vidan Dreams | 2 |
| Vive beauty | Vive Beauty | 4 |

## Arquitectura
La normalización queda centralizada en `scripts/catalogo-utils.mjs` mediante `canonicalBrand()`. `npm run products:update` ejecuta primero `products:brands`, corrige la matriz privada, genera el catálogo público y luego regenera `js/data/products.js`. Esto evita que las variantes antiguas reaparezcan al sincronizar.

## Archivos principales modificados
- `data-private/catalogo_maestro_interno.csv`
- `data/catalogo/catalogo_maestro.csv`
- `js/data/products.js`
- `js/storefront.js`
- `css/storefront.css`
- `index.html`
- `scripts/catalogo-utils.mjs`
- `scripts/normalizar-marcas.mjs`
- `scripts/preparar-catalogo-publico.mjs`
- `scripts/sincronizar-catalogo.mjs`
- `scripts/validar-catalogo-interno.mjs`
- `scripts/validar-catalogo.mjs`
- `package.json`
- `assets/images/brands/*.webp`

## Validaciones completadas
- `npm run products:update` ✅
- Segunda ejecución idempotente: **178 sin cambios** ✅
- `npm run check:js` ✅
- `npm run check` ✅
- `npm run products:check` ✅ (solo advertencias preexistentes de contenido, sin errores)
- `node scripts/validate-release.mjs` ✅
- 97 archivos JavaScript revisados ✅
- 12 páginas HTML revisadas ✅
- 12 migraciones SQL revisadas ✅
- 300 referencias de imágenes de producto revisadas ✅
- 18 logos WebP comprobados físicamente y servidos por HTTP local ✅
- 18 marcas oficiales comprobadas contra `products.js` y sus filtros ✅
- `Samy` queda como una sola marca y agrupa 4 productos ✅
- Catálogo interno y público sin variantes pendientes según `canonicalBrand()` ✅
- Revisión visual directa de los 18 WebP convertidos ✅

## Limitación de la validación automatizada del navegador
El entorno de ejecución bloquea por política administrativa la navegación de Chromium/Playwright a `localhost` y a `file://` (`ERR_BLOCKED_BY_ADMINISTRATOR`). Por esa razón no se afirma una prueba automatizada de consola del navegador. La carga HTTP de `index.html` y de los 18 recursos WebP sí fue comprobada mediante servidor local, y las validaciones sintácticas, de datos, rutas y release finalizaron correctamente.

## Nota
No se modificaron SKU, IDs, precios, stock, costos, proveedores, nombres de producto ni otros datos ajenos a la normalización de marca. Los logos existentes que ya funcionaban se conservaron. `object-fit: contain` evita recortes de logotipos horizontales, y el frontend conserva fallback por iniciales si una imagen falla.

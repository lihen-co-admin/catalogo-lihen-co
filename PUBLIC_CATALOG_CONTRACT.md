# PUBLIC_CATALOG_CONTRACT — LIHEN ADMIN → WEB

## Fuente de verdad

`LIHEN_ADMIN_PRO` administra el write model en Supabase. `LIHEN_WEB_RENACER` consume exclusivamente `public.catalog_public`.

## Regla de publicación

Un producto solo puede entrar al catálogo público cuando cumple simultáneamente:

- `status = activo`
- `visible_on_website = true`
- existe al menos una fotografía pública válida (`main_image_url` o `product_images.public_url`)

Disponibilidad y visibilidad son conceptos distintos. Un producto puede estar publicado y aparecer como `Agotado`.

## Campos públicos esperados

- `id`
- `catalog_code`
- `sku`
- `name`
- `brand`
- `business_line`
- `category`
- `subcategory`
- `description`
- `sale_price`
- `availability_status`
- `availability_text`
- `catalog_availability_text` (compatibilidad temporal)
- `main_image_url`
- `category_folder`
- `product_folder`
- `variants`
- `images`

## Datos prohibidos en la WEB

Nunca deben formar parte del contrato público: costos, proveedor, cantidades exactas de stock, reservas, pendientes, costo promedio, cuentas/movimientos financieros, auditoría, `service_role` o secretos.

## Identidad

SKU es la identidad interoperable ADMIN/WEB. Durante la transición el Adapter preserva IDs legacy cuando existe cruce exacto por SKU/código de catálogo.

## Fallback

`js/data/products.js` se conserva temporalmente como contingencia. No es fuente maestra y debe retirarse después de validar el cutover definitivo a Supabase.

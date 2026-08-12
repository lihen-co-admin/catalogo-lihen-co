# Prueba E2E controlada — ADMIN → Supabase → WEB

Usar 1–3 SKU de prueba con imágenes verificadas.

## Caso A — Precio
1. Abrir producto en ADMIN.
2. Registrar precio anterior.
3. Cambiar precio y guardar.
4. Verificar `products.sale_price` en Supabase.
5. Refrescar WEB.
6. Confirmar nuevo precio sin redeploy.

## Caso B — Stock
1. Registrar stock actual.
2. Ajustar a 0 desde ADMIN.
3. Confirmar movimiento de inventario.
4. Refrescar WEB.
5. Debe mostrar `Agotado`.
6. Restaurar stock > 0.
7. Debe mostrar `Disponible`.

## Caso C — Visibilidad
1. `visible_on_website = false`.
2. Refrescar WEB: producto ausente.
3. `visible_on_website = true` y `status = activo`.
4. Refrescar WEB: producto presente.

## Caso D — Seguridad
Con Publishable Key:
- `catalog_public`: permitido.
- `products`: denegado.
- `inventory`: denegado.
- INSERT/UPDATE/DELETE: denegados.

## Caso E — Fallback
1. `CATALOG_SOURCE = static`.
2. Confirmar Home/búsqueda/modal.
3. Volver a `auto`.

## Evidencia mínima a registrar
- SKU;
- valor antes/después;
- timestamp;
- captura ADMIN;
- resultado SQL;
- captura WEB;
- resultado final PASS/FAIL.

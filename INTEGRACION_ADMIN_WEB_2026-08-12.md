# Integración con LIHEN_ADMIN_PRO — 2026-08-12

La tienda permanece separada del ADMIN y consume el mismo proyecto Supabase mediante `catalog_public`.

## Flujo

`LIHEN_ADMIN_PRO → Supabase write model → catalog_public → catalogRepository → catalogAdapter → catalogService → LIHEN_WEB_RENACER`

## Reglas

- WEB no consulta tablas administrativas.
- WEB no recibe costos, proveedores ni cantidades exactas de inventario.
- Producto publicable = activo + visible + foto válida.
- Disponibilidad = estado derivado, independiente de visibilidad.
- `products.js` es fallback temporal.
- La migración canónica del backend está en el paquete ADMIN: `sql/045_integracion_admin_web_catalog_contract.sql`.

## Validación local

- `npm run check`: OK.
- tests WEB: 22/22.

## Producción

Después de aplicar la migración 045 en Supabase, recargar la tienda debe reflejar cambios de precio, visibilidad y disponibilidad sin editar nuevamente los archivos de la WEB.

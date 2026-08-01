# Validación Fase 5 · Limpieza y consolidación CSS

## Objetivo
Reducir solicitudes de archivos CSS y mantener el mismo orden de cascada sin cambiar el diseño aprobado.

## Cambios acumulativos
Esta versión conserva las Fases 1, 2, 3 y 4.

## Cambios de esta fase
1. Integré `css/components/prelaunch-modal.css` al final de `css/storefront.css`.
2. Consolidé `css/responsive-v32.css` y `css/responsive-bootstrap-audit.css` en `css/responsive.css`.
3. Conservé el orden original de la cascada: primero V32 y después la auditoría responsive.
4. Actualicé los HTML para cargar menos archivos CSS.
5. Agregué versión de caché `v=20260801-fase5`.

## Resultado esperado
- Páginas de tienda: pasan de 4 solicitudes CSS locales a 2.
- Páginas legales: pasan de 3 solicitudes CSS locales a 2.
- Menos archivos separados que descargar y coordinar.
- Menor riesgo de alterar el orden entre correcciones responsive.

## Pruebas manuales pendientes
- Revisar inicio, búsqueda, ideas para regalar, nosotros y Mi selección.
- Revisar políticas, términos, cambios y PQRS.
- Probar 375 px, 768 px, 1024 px y escritorio.
- Confirmar que modal, menú, carruseles y carrito conserven el diseño.
- Revisar la consola y la pestaña Network del navegador.

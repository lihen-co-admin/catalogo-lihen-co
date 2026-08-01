# LIHEN.CO V18 — Fases 3, 4 y 5

## Fase 3 — Refactor del módulo comercial

Se redujo la concentración de responsabilidades en la tienda pública:

- `js/storefront/heroCarousel.js`: carrusel principal, navegación, gestos y pausa por visibilidad.
- `js/storefront/welcomePromo.js`: beneficio de bienvenida, modal y enlace seguro a WhatsApp.
- `js/catalog/catalogFilters.js`: estado y reglas puras de filtrado del catálogo.
- `js/catalog/catalogCarousel.js`: avance automático, controles y progreso de carruseles.
- `js/pages/catalog.js`: queda como coordinador del catálogo modular.

## Fase 4 — Refactor del panel administrativo

Se creó `js/admin/adminRequestView.js` para separar:

- construcción segura de tarjetas;
- mensajes de estado;
- renderizado del listado;
- cambio entre acceso y panel.

`js/pages/admin.js` conserva la autenticación, la consulta de datos y la coordinación de eventos.

## Fase 5 — Integración y limpieza transversal

- Se añadieron comprobaciones DOM para evitar errores cuando un elemento opcional no existe.
- Se mantuvieron Supabase y sus credenciales fuera de los módulos visuales.
- Se agregó versión de caché `v=190` a la tienda pública y al panel administrativo.
- Se revisaron los contratos de importación y exportación.
- No se modificaron migraciones, tablas, funciones ni políticas de Supabase.

## Validación requerida en el equipo local

```bash
npm run check
npm run check:js
npm run dev
```

Pruebas manuales:

1. Inicio: carrusel principal, flechas, puntos y gesto táctil.
2. Beneficio: abrir, cerrar, ocultar y enviar el formulario a WhatsApp.
3. Catálogo: búsqueda, filtros globales, filtros por línea y categorías.
4. Productos: modal, galería y selección.
5. Administración: acceso, carga, búsqueda, filtro y cambio de estado.

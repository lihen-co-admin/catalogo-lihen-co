# Actualización aprobada: carruseles, regalos y responsive

## Cambios aplicados

- Autoplay de Beauty Care y Style cada 3 segundos.
- `prefers-reduced-motion` elimina la animación suave, pero no bloquea el avance automático.
- Un único temporizador y una única instancia por carrusel.
- Pausa durante interacción y reanudación controlada.
- Reinicio al llegar al final.
- Recalculo al cambiar tamaño, orientación o visibilidad de la pestaña.
- Eliminación visual de la etiqueta “Producto confirmado” en tarjetas, buscador y componentes reutilizables.
- Ideas para regalar conectada a `js/data/products.js` con productos reales de hasta $20.000 COP.
- Filtros Todos, Beauty Care y Style con mensaje claro cuando no existen coincidencias.
- Responsive de categorías reforzado para conservar círculos y textos legibles.
- Carpeta `.git` excluida del ZIP de entrega.

## Archivos principales modificados

- `js/storefront.js`
- `js/search.js`
- `js/components/productCard.js`
- `css/responsive-v32.css`
- `index.html`
- `ideas-para-regalar.html`

## Validación automática

- 118 archivos JavaScript revisados.
- 19 páginas HTML revisadas.
- 12 migraciones SQL encontradas.
- 282 referencias de imágenes de producto revisadas.
- 88 productos en catálogo: 37 Beauty Care y 51 Style.
- 7 productos reales con precio igual o inferior a $20.000 COP.

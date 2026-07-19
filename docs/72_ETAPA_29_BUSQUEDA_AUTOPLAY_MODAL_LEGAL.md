# Etapa 29 — Búsqueda, autoplay, modal e icono legal

## Objetivo
Corregir el carrusel principal para que avance siempre cada 3 segundos, mejorar la visualización completa del aviso del beneficio, crear una página de búsqueda funcional y reemplazar el acceso superior por un icono legal coherente con LIHEN.CO.

## Archivos modificados
- `index.html`, `ideas-para-regalar.html`, `mi-seleccion.html`, `nosotros.html`: lupa enlazada a la búsqueda e icono legal nuevo.
- `buscar.html`: página completa de búsqueda.
- `js/search.js`: filtrado, orden, paginación y renderizado de productos.
- `js/storefront.js`: autoplay continuo y reanudación después de interacción.
- `css/storefront.css`: estilos responsive de búsqueda, modal e icono legal.

## Pruebas esperadas
1. Abrir el inicio y esperar: la portada cambia cada 3 segundos sin pasar el mouse ni hacer scroll.
2. Usar flechas o puntos: el carrusel sigue funcionando después de la interacción.
3. Abrir el beneficio: se visualizan botón, “Ahora no” y texto legal completo.
4. Pulsar la lupa: abre `buscar.html`.
5. Buscar por nombre, categoría, marca o descripción.
6. Aplicar filtros, orden y paginación.
7. Usar “Vista previa” y “Agregar a mi selección” desde los resultados.

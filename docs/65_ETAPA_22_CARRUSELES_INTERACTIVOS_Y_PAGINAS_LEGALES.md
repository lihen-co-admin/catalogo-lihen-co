# Etapa 22 — Carruseles interactivos y páginas legales

## Objetivo
Separar las líneas Beauty Care y Style, mostrar todos sus productos en carruseles automáticos e incorporar páginas legales navegables con identidad LIHEN.CO.

## Cambios realizados
- `index.html`: se reorganizó la página en introducción Beauty Care, carrusel Beauty Care, introducción Style y carrusel Style.
- `js/storefront.js`: carga todos los productos desde `js/data/products.js`, los separa por línea, crea las tarjetas y controla los carruseles cada cinco segundos.
- `css/storefront.css`: incorpora transición de segunda imagen, brillo, profundidad, flechas, indicadores, adaptación responsive e insignias animadas de reposición.
- `terminos-y-condiciones.html`: página interactiva con filtros y acordeones.
- `politica-de-privacidad.html`: derechos del titular y apartados desplegables.
- `cambios-y-devoluciones.html`: reglas por línea y proceso de solicitud.
- `politica-de-envios.html`: cobertura, zonas, tiempos, ciclo del pedido y alertas públicas.
- `css/legal.css` y `js/legal.js`: estilos y comportamiento reutilizable de las páginas legales.

## Pruebas realizadas
- `npm run check`: aprobado.
- `npm run check:js`: aprobado.
- Se verificó que las imágenes declaradas en el catálogo existen.
- Se evitó publicar las direcciones y notas operativas internas de la política de envíos.

## Resultado esperado
- Los carruseles avanzan cada cinco segundos y reinician al completar el catálogo.
- Al pasar el mouse, aparece una segunda imagen con transición suave.
- En pantallas táctiles se puede deslizar horizontalmente.
- Los enlaces del footer conducen a la sección o página correspondiente.
- Los acordeones legales cierran el apartado anterior cuando se abre uno nuevo.

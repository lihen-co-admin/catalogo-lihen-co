# Actualización de catálogo y portada

Cambios aplicados con alcance controlado:

- Se conservaron los 37 productos confirmados de Beauty Care y los 51 de Style.
- Los carruseles de Beauty Care y Style ahora usan desplazamiento responsivo, autoplay cada cinco segundos, botones laterales, indicadores y gesto táctil.
- Los botones anterior y siguiente quedaron ubicados a los lados y centrados respecto a las tarjetas.
- Las imágenes de las campañas Beauty Care y Style se cargan desde el catálogo actual.
- Las secciones “Algo especial para cada ocasión”, “De nuevo disponibles” y “Así se vive LIHEN.CO” usan productos actuales del catálogo.
- La cantidad visible se adapta a escritorio, tableta y móvil.

Archivos de código modificados:

- `index.html`
- `js/storefront.js`
- `css/storefront.css`

Validaciones realizadas:

- Sintaxis JavaScript completa: correcta.
- 88 productos registrados: 37 Beauty Care y 51 Style.
- Rutas de imágenes del catálogo: sin faltantes.

Nota: `npm run check` requiere `js/config/env.js`, archivo que no estaba incluido en el proyecto recibido. No se creó ni alteró para evitar modificar la configuración privada del proyecto. `npm run check:js` sí fue ejecutado correctamente.

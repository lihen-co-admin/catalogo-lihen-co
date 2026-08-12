# Implementación final — Catálogo por marcas

## Alcance completado

Se integró la sección **Compra por marcas** en dos ubicaciones independientes:

- **Beauty Care:** después del bloque promocional “Cuidado que realza tu belleza natural” y antes del carrusel de productos Beauty Care.
- **Style:** después del bloque promocional “Estilo cómodo para moverte con seguridad” y antes del carrusel de productos Style.

## Archivos modificados

- `index.html`: incorporación de los dos bloques de marcas en las ubicaciones solicitadas.
- `js/storefront.js`: extracción, normalización y filtrado independiente de marcas; actualización de los carruseles existentes; navegación accesible.
- `css/storefront.css`: estilos responsive, estados activos, flechas, accesibilidad y reducción de movimiento.

## Funcionamiento

- Las marcas se obtienen de `js/data/products.js` usando el campo `brand`.
- Se eliminan duplicados normalizando espacios, mayúsculas, minúsculas y acentos.
- Beauty Care y Style mantienen estados de filtro completamente independientes.
- “Todas las marcas” restaura solo el carrusel correspondiente.
- Cuando no existe un logo oficial dentro del proyecto, se utiliza una tarjeta tipográfica con monograma; no se inventaron ni descargaron logos.
- Se reutiliza el controlador de carrusel ya existente, sin agregar frameworks ni librerías.

## Validaciones ejecutadas

- `npm run check:js`: aprobado.
- `npm run check`: aprobado.
- `npm run products:check`: aprobado; 95 productos activos y catálogo válido.
- Prueba HTTP local de `index.html`, `js/storefront.js` y `css/storefront.css`: aprobada.
- Revisión de rutas relativas y compatibilidad estructural con GitHub Pages: aprobada.

## Marcas detectadas actualmente

- Beauty Care: 9 marcas.
- Style: 3 marcas.

Las marcas futuras aparecerán automáticamente cuando se agreguen productos con el campo `brand` correspondiente y se sincronice el catálogo.

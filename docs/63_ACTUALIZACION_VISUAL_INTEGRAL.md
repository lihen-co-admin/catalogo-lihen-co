# Actualización visual integral — LIHEN.CO

Esta versión integra las indicaciones visuales consolidadas para la página principal sin modificar los módulos de inauguración, administración ni las migraciones de Supabase.

## Archivos principales modificados

### `index.html`
- Líneas 16–25: introducción de video a pantalla completa.
- Líneas 28–112: encabezado, navegación y mega menú de Beauty Care y Style.
- Líneas 116–194: nuevo inicio o hero.
- Líneas 195–271: propósito y valores.
- Líneas 272–319: buscador, categorías y filtros globales.
- Líneas 320–376: catálogo editorial Beauty Care.
- Líneas 377–430: catálogo editorial Style.
- Líneas 431–526: Así se vive y Studio.
- Líneas 527–638: Cómo consultar, aliados y condiciones.
- Líneas 639–687: preguntas frecuentes.
- Líneas 688–729: contacto.
- Líneas 749–769: barra inferior de selección.
- Líneas 770–926: nueva ficha ampliada del producto y productos relacionados.
- Líneas 927 en adelante: panel lateral Mi selección.

### `css/pages/redesign.css`
Archivo nuevo que concentra solamente la actualización visual para no saturar los estilos existentes.
- Líneas 1–126: variables, esferas animadas, iconos y encabezado.
- Líneas 127–202: mega menú y productos rotativos.
- Líneas 203–284: inicio.
- Líneas 285–330: propósito.
- Líneas 331–429: catálogos y carruseles.
- Líneas 430–507: tarjetas de productos y efectos hover.
- Líneas 508–623: secciones institucionales, FAQ y contacto.
- Líneas 624–749: detalle del producto y relacionados.
- Líneas 750 en adelante: barra inferior, selección lateral y responsive.

### JavaScript
- `js/components/megaMenu.js`: mega menú y cambio aleatorio de imágenes cada 6,5 segundos.
- `js/components/icons.js`: familia única de iconos SVG lineales dorados.
- `js/pages/catalog.js`: filtros, catálogos separados y carruseles automáticos.
- `js/components/productCard.js`: cambio de imágenes al pasar el mouse y glow de tarjeta.
- `js/components/productModal.js`: galería, cantidad, relacionados y detalle editorial.
- `js/components/selectionDrawer.js`: cantidades, barra inferior y panel lateral.
- `js/state/productSelection.js`: persistencia de cantidades en localStorage.
- `js/services/whatsappService.js`: mensaje consolidado con cantidades.
- `js/main.js`: inicialización de todos los módulos nuevos.

## Comportamientos implementados

- Video de entrada a pantalla completa, una vez por sesión.
- Mega menú en Beauty Care y Style con productos aleatorios.
- Esferas suaves animadas sin bloquear los clics.
- Beauty Care y Style separados en carruseles editoriales.
- Carruseles automáticos cada 5,2 segundos, con pausa al interactuar.
- Cambio automático de imágenes al pasar el mouse por una tarjeta.
- Sombra luminosa en la tarjeta observada.
- Buscador, selector de categoría y filtros globales conservados.
- Vista ampliada con galería, cantidad, acordeones y relacionados.
- Barra inferior y panel lateral de selección con cantidades.
- Mensaje de WhatsApp con productos y cantidades.
- Adaptación para celular, tableta, computador y pantalla grande.
- Reducción de movimiento mediante `prefers-reduced-motion`.

## Validación

Se ejecutó `npm run check` con este resultado:

- 95 archivos JavaScript revisados.
- 6 páginas HTML revisadas.
- 12 migraciones SQL encontradas en secuencia.
- 295 referencias de imágenes revisadas.

# Apuntes por archivo — Etapa 3

## `js/data/products.js`
Guardo los productos como objetos. No dibujo nada en pantalla. Así los datos pueden reemplazarse después por Supabase sin reescribir las tarjetas.

## `js/pages/catalog.js`
Coordino el catálogo: leo los filtros, selecciono los productos que cumplen las condiciones y vuelvo a dibujar la cuadrícula.

## `js/components/productCard.js`
Creo una tarjeta reutilizable por cada producto. Recibo el producto y una función para abrir sus detalles.

## `js/components/productModal.js`
Muestro las imágenes y la información completa. También controlo el cierre con el fondo, la X y la tecla Escape.

## `js/services/whatsappService.js`
Construyo el mensaje de consulta sin mezclar esta responsabilidad con el catálogo. El número oficial queda centralizado en una sola constante.

## `js/utils/normalizeText.js`
Convierto el texto a minúsculas y retiro tildes para que búsquedas como `lapiz` encuentren `Lápiz`.

## `css/components/products.css` y `modal.css`
Mantengo los estilos del catálogo separados de los estilos generales.

## Error que esta estructura evita
Antes, datos, filtros, botones, modales y WhatsApp convivían en un archivo muy largo. Ahora cada cambio se realiza en el módulo correspondiente.

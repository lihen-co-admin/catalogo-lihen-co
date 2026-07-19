# Etapa 5 — Detalle, galería y consulta múltiple

## Objetivo
Mejorar la exploración de cada producto y permitir que la persona reúna varias referencias antes de enviar una sola consulta por WhatsApp.

## Funcionalidades incorporadas
- Imagen principal de mayor tamaño dentro del detalle.
- Miniaturas para escoger una imagen específica.
- Flechas anterior y siguiente.
- Navegación con las teclas de dirección.
- Contador de imágenes.
- Selección de productos desde la tarjeta o el detalle.
- Persistencia de la selección en `localStorage`.
- Panel lateral con todos los productos seleccionados.
- Eliminación individual y vaciado completo.
- Mensaje de WhatsApp que reúne todas las referencias.

## Flujo interno
1. `productCard.js` solicita agregar o quitar un identificador.
2. `productSelection.js` actualiza la selección y la guarda en el navegador.
3. Los módulos suscritos reciben el cambio.
4. `selectionDrawer.js` busca los productos completos a partir de los identificadores.
5. `whatsappService.js` construye un único mensaje con todas las referencias.

## Ejecución
```bash
npm run dev
```

## Validación de sintaxis
```bash
npm run check
```

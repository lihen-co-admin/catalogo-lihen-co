# Manual técnico

## Requisitos

Node.js y npm para validación y servidor local; Git para control de versiones.

## Comandos

- `npm run dev`: servidor local.
- `npm run check`: valida estructura y referencias.
- `npm run check:js`: valida sintaxis JavaScript.

## Actualización de productos

Los productos se administran en `js/data/products.js`. Cada registro debe conservar identificador único, nombre, línea, marca, imágenes, disponibilidad, variantes, descripción y precio o estado de confirmación.

## Diagnóstico

Ante un fallo, reviso consola del navegador, pestaña Network, rutas relativas, errores JavaScript y resultado de los validadores.

# Cambio visual del encabezado

## Objetivo

Ajustar el encabezado de la página principal para acercarlo a la referencia visual compartida: fondo blanco, logo pequeño a la izquierda, menú horizontal delgado, enlaces en mayúsculas con espaciado amplio, enlace de inauguración destacado y una franja degradada inferior.

## Archivos modificados

### `index.html`

- Líneas 29 a 55: se reorganizó todo el bloque del encabezado.
- Líneas 31 a 33: se dejó el logo dentro de un enlace independiente.
- Líneas 35 a 38: se sustituyó el símbolo de menú por tres líneas visuales.
- Líneas 40 a 51: se amplió y organizó el menú principal.
- Línea 45: se destacó el enlace de Inauguración.
- Línea 53: se añadió la franja degradada inferior.

### `css/components/header.css`

- Líneas 6 a 15: fondo blanco, posición fija al desplazarse y sombra sutil.
- Líneas 17 a 23: nueva cuadrícula del encabezado.
- Líneas 25 a 37: tamaño y alineación del logo.
- Líneas 39 a 64: nuevo botón de menú móvil.
- Líneas 66 a 105: navegación móvil y estilos de los enlaces.
- Líneas 107 a 116: franja degradada inferior.
- Líneas 118 a 134: barra de progreso.
- Líneas 136 a 192: diseño horizontal para computador.
- Líneas 194 a 221: ajustes para pantallas grandes y celulares.

### `css/base/responsive.css`

- Línea 19: el cambio al menú horizontal ahora ocurre desde 1120 px, para evitar que los enlaces se amontonen en pantallas medianas.

## Validación

Se ejecutó `npm run check` y el proyecto superó:

- 93 archivos JavaScript.
- 6 páginas HTML.
- 12 migraciones SQL.
- 295 referencias de imágenes.

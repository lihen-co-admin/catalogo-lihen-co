# Correcciones posteriores a la actualización Style — Fase 2

## Problemas corregidos

- Formato de precios colombiano: `$82.500`, `$112.500`, etc.
- Modal de producto con **Talla** y **Color** en campos separados.
- Navegación de carruseles Beauty Care y Style estabilizada.
- Botones anterior/siguiente centrados sobre el área de imagen.
- Avance automático, reinicio al final, pausa al pasar el mouse y navegación táctil conservados.

## Archivos reemplazados

- `js/storefront.js`
- `js/utils/formatters.js`
- `css/storefront.css`

## Validación automática

Ejecutar `npm run check:release` y después probar `/`, `/buscar?q=Style`, `/ideas-para-regalar` y `/mi-seleccion`.

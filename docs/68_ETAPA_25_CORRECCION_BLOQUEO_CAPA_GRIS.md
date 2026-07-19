# Etapa 25 — Corrección del bloqueo por capa gris

## Problema observado
Al cargar la página principal aparecía una capa gris sobre toda la interfaz y no era posible hacer clic en ningún elemento.

## Causa
Las clases `.modal-backdrop` y `.drawer-backdrop` tenían propiedades `display` definidas en la hoja de estilos. Esas reglas podían prevalecer sobre el atributo HTML `hidden`, por lo que la capa permanecía visible aunque el modal o el panel lateral estuvieran cerrados.

## Corrección
Se añadió una regla específica para que los elementos emergentes con el atributo `hidden` siempre usen `display: none !important`.

## Archivos modificados
- `css/storefront.css`
- `docs/68_ETAPA_25_CORRECCION_BLOQUEO_CAPA_GRIS.md`

## Resultado esperado
- La página carga sin capa oscura.
- El menú, los botones y los enlaces pueden pulsarse normalmente.
- La capa oscura solo aparece al abrir la vista previa de un producto o el panel de Mi selección.

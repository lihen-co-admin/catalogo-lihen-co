# VALIDACIÓN FASE 4 — ORGANIZACIÓN DE JAVASCRIPT

## Objetivo

Separar responsabilidades grandes de `js/storefront.js` sin cambiar el comportamiento visible de la tienda.

## Cambios aplicados

### 1. Carruseles

La lógica reutilizable de carruseles fue trasladada a:

```text
js/modules/carousel.js
```

El archivo recibe:

- el contenedor del carrusel;
- la lista de productos;
- la función que construye cada tarjeta.

Continúa controlando flechas, indicadores, desplazamiento táctil, cambio de tamaño, movimiento automático y pausa cuando la pestaña no está visible.

### 2. Vista previa de productos

La lógica del modal fue trasladada a:

```text
js/modules/productModal.js
```

El módulo controla:

- apertura y cierre;
- galería de imágenes;
- cantidad seleccionada;
- botón para agregar;
- cierre con la tecla Escape.

El catálogo continúa siendo la fuente única de los productos. El módulo recibe las funciones que necesita desde `storefront.js`.

### 3. Archivo principal

`js/storefront.js` continúa siendo el archivo que inicia la tienda, pero ya no contiene internamente toda la implementación de los carruseles ni del modal.

La versión usada en las páginas se actualizó a:

```text
storefront.js?v=20260801-fase4
```

## Archivos nuevos

```text
js/modules/carousel.js
js/modules/productModal.js
```

## Validación automática ejecutada

```text
✓ 97 archivos JavaScript revisados.
✓ 12 páginas HTML revisadas.
✓ 12 migraciones SQL encontradas en secuencia.
✓ 281 referencias de imágenes de producto revisadas.
✓ Sin errores de sintaxis JavaScript.
```

## Pruebas manuales pendientes

```text
[ ] Abrir una vista previa desde una tarjeta.
[ ] Cambiar las fotografías del modal.
[ ] Aumentar y disminuir la cantidad del modal.
[ ] Agregar el producto desde el modal.
[ ] Cerrar el modal con el botón, el fondo y Escape.
[ ] Mover los carruseles con flechas.
[ ] Mover los carruseles deslizando en móvil.
[ ] Cambiar el tamaño de la ventana.
[ ] Confirmar que el carrusel automático continúa funcionando.
[ ] Revisar que no existan errores rojos en la consola.
```

## Resultado

La Fase 4 conserva las Fases 1, 2 y 3. No se eliminaron productos, imágenes ni funcionalidades. La separación facilita localizar errores y modificar una funcionalidad sin intervenir directamente en las demás.

# Fase 1 — Estabilidad de LIHEN.CO

Fecha: 1 de agosto de 2026

## Objetivo

Evitar que una sección opcional ausente o un dato inválido en `localStorage` detenga el archivo principal de la tienda.

## Cambios aplicados

### 1. Selectores seguros

Se actualizaron las funciones `$` y `$$` en `js/storefront.js`.

- `$` devuelve `null` cuando el contenedor no existe.
- `$$` devuelve un array vacío cuando el contenedor no existe.
- El resto de la página continúa ejecutándose.

### 2. Validación de `localStorage`

La función `loadSelection()` ahora:

- comprueba que la información guardada sea un objeto;
- descarta productos que ya no existen;
- descarta cantidades inválidas, negativas o decimales;
- inicia una selección vacía cuando el contenido está dañado.

La función `saveSelection()` ahora evita detener la tienda cuando el navegador bloquea el almacenamiento.

### 3. Actualización de caché

Las páginas que cargan `storefront.js` utilizan la versión:

```text
?v=20260801-fase1
```

Esto obliga al navegador a solicitar el JavaScript corregido.

## Validación automática ejecutada

```text
✓ 95 archivos JavaScript revisados.
✓ 12 páginas HTML revisadas.
✓ 12 migraciones SQL encontradas en secuencia.
✓ 282 referencias de imágenes de producto revisadas.
✓ No se encontraron errores en la validación integral.
```

## Pruebas manuales pendientes en navegador

- Abrir Mi selección sin productos.
- Agregar un producto.
- Agregar varios productos.
- Aumentar y disminuir cantidades.
- Eliminar productos.
- Recargar y comprobar persistencia.
- Revisar la consola del navegador.
- Probar carrito lateral y WhatsApp.

No se afirma que estas pruebas manuales pasaron hasta ejecutarlas en el navegador.

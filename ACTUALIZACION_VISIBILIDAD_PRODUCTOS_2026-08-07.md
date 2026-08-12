# Control manual de visibilidad de productos

Se agregó la columna **Visible en tienda** al catálogo maestro.

## Regla

- `Estado = Activo` + `Visible en tienda = Sí` + al menos una fotografía válida → el producto se genera en la tienda pública.
- `Estado = Activo` + `Visible en tienda = No` → el producto sigue creado en el catálogo, pero no aparece públicamente.
- `Estado = Inactivo` → no se publica.
- Un producto sin fotografías **no puede** tener `Visible en tienda = Sí`; el validador detiene la sincronización para evitar publicar fichas sin registro fotográfico.

## Flujo recomendado

1. Crear o conservar el producto en `catalogo_maestro.csv`.
2. Mientras no tenga fotos, dejar `Visible en tienda = No`.
3. Cargar las imágenes en su carpeta y actualizar los campos fotográficos.
4. Cambiar `Visible en tienda` a `Sí`.
5. Ejecutar `npm run products:sync`.

La columna **Registro fotográfico visible** sigue siendo un indicador técnico de si existen imágenes; **Visible en tienda** es la decisión comercial manual de publicar u ocultar.

# Guía del catálogo maestro LIHEN.CO

## Qué cambió

La página continúa leyendo `js/data/products.js` exactamente como antes. No se modificaron HTML, CSS ni los módulos visuales. Ahora ese archivo se puede generar desde `data/catalogo/catalogo_maestro.csv`.

La plantilla de Excel es una forma cómoda de editar la misma información. Antes de sincronizar, guárdala como CSV UTF-8 con el nombre `catalogo_maestro.csv` dentro de `data/catalogo/`.

## Comandos

```bash
npm run products:check
npm run products:sync
npm run check
npm run check:js
npm run dev
```

- `products:check`: revisa datos, IDs, precios, carpetas e imágenes sin modificar la web.
- `products:sync`: crea respaldos y genera `js/data/products.js` desde la matriz.
- `products:export`: exporta el catálogo actual. No reemplaza la matriz si ya existe. Para reemplazarla conscientemente: `npm run products:export -- --force`.

## Columnas

- **ID:** no cambiar en productos existentes. Déjalo vacío en productos nuevos; el sistema asignará el siguiente `B...` o `S...`.
- **Estado:** `Activo` aparece en la web. `Inactivo` queda en la matriz pero no aparece.
- **Línea:** únicamente `Beauty Care` o `Style`.
- **Categoría:** texto visible usado por filtros y búsqueda.
- **Nombre:** nombre comercial visible.
- **Marca:** fabricante o `LIHEN.CO`.
- **Precio:** solo número, por ejemplo `45000`.
- **Disponibilidad:** texto visible, por ejemplo `Disponible`, `Agotado` o `Disponible / por confirmar`.
- **Descripción:** descripción completa del producto.
- **Talla:** tallas o `Por confirmar`.
- **Color:** colores o `Por confirmar`.
- **Etiqueta:** texto corto de la tarjeta, por ejemplo `Nuevo ingreso`.
- **Carpeta categoría:** carpeta técnica dentro de `STYLE` o `BEAUTY_CARE`.
- **Carpeta producto:** carpeta técnica del producto.
- **Imágenes:** rutas separadas por `|`. Para productos nuevos puede quedar vacía si las carpetas están bien creadas; el sistema localizará las imágenes y guardará las rutas.

## Imágenes de productos nuevos

Ejemplo Style:

```text
assets/productos/STYLE/ropa_deportiva/licra_deportiva_corta_nike/
```

Ejemplo Beauty Care:

```text
assets/productos/BEAUTY_CARE/maquillaje_de_labios/bloom_lip_gloss/
```

Nombres recomendados:

```text
licra_deportiva_corta_nike_0.webp
licra_deportiva_corta_nike_1.webp
licra_deportiva_corta_nike_2.webp
```

No uses espacios, tildes, `ñ` ni símbolos en nombres de carpetas o archivos. La imagen `_0` debe ser la portada.

## Agregar, actualizar o retirar

- **Agregar:** nueva fila, ID vacío, Estado Activo, imágenes en su carpeta.
- **Actualizar:** busca el ID y cambia precio, texto, disponibilidad o rutas; no cambies el ID.
- **Cambiar fotos:** reemplaza los archivos y ajusta `Imágenes`, o deja esa celda vacía para que el script vuelva a leer la carpeta.
- **Retirar:** cambia Estado a `Inactivo`. No borres la fila.
- **Reactivar:** vuelve a cambiar Estado a `Activo`.

## Flujo recomendado con Git

```bash
git switch main
git pull origin main
git switch -c feature/actualizacion-catalogo
npm run products:check
npm run products:sync
npm run check
npm run check:js
npm run dev
```

Después de probar visualmente:

```bash
git add data/catalogo/catalogo_maestro.csv
git add assets/productos
git add js/data/products.js
git add scripts package.json .gitignore GUIA_CATALOGO_MAESTRO_LIHEN.md
git commit -m "feat: actualizar catálogo de productos"
git push -u origin feature/actualizacion-catalogo
```

Crea el Pull Request hacia `main` solo después de revisar filtros, buscador, modal, imágenes, precios y WhatsApp.

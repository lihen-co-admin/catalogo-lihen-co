# Guía del catálogo maestro LIHEN.CO

## Arquitectura actual

Desde la actualización del 7 de agosto de 2026 el catálogo se divide en dos capas para preparar la interoperabilidad con **LIHEN_ADMIN_PRO** sin exponer información administrativa en la tienda pública.

### 1. Catálogo interno

Ruta:

```text
data-private/catalogo_maestro_interno.csv
```

Puede contener:

- ID web
- SKU
- ID interno
- Estado
- Línea
- Categoría
- Subcategoría
- Nombre
- Marca
- Proveedor
- Costo real unitario
- Precio
- Disponibilidad
- Descripción
- Talla
- Color
- Etiqueta
- Carpetas técnicas
- Imágenes

`data-private/` está ignorado por Git. No debe subirse al repositorio público.

### 2. Catálogo público

Ruta:

```text
data/catalogo/catalogo_maestro.csv
```

Se genera automáticamente desde la matriz interna y excluye:

- ID interno
- Proveedor
- Costo real unitario

Sí conserva `SKU`, porque es la llave recomendada para el cruce futuro con LIHEN_ADMIN_PRO.

### 3. Datos consumidos por la tienda

Ruta:

```text
js/data/products.js
```

Se genera desde el catálogo público y contiene únicamente información comercial autorizada.

## Flujo recomendado

Después de reemplazar o actualizar `data-private/catalogo_maestro_interno.csv`:

```bash
npm run products:update
npm run check
node scripts/validate-release.mjs
```

`products:update` ejecuta en orden:

1. `products:check:internal`
2. `products:prepare`
3. `products:sync`

## Comandos individuales

```bash
npm run products:check:internal
npm run products:prepare
npm run products:check
npm run products:sync
npm run check
npm run check:js
npm run dev
```

- **products:check:internal:** valida IDs, SKU, UUID, proveedor, costo y precio sin publicar datos privados.
- **products:prepare:** genera la matriz pública segura.
- **products:check:** valida el catálogo que sí puede quedar en GitHub Pages.
- **products:sync:** genera `js/data/products.js` y crea respaldos.
- **products:export:** exporta el catálogo público actual desde `products.js`.

## Identificadores

### ID web

Ejemplos: `B50`, `S66`.

- No cambiar en productos existentes.
- Se conserva por compatibilidad con selección, enlaces, historial y lógica de la tienda.

### SKU

Ejemplos: `BC-029`, `ST-001`.

- Debe ser único cuando exista.
- Es la llave principal recomendada para relacionar WEB ↔ ADMIN.
- Puede aparecer en la tienda, búsqueda y mensajes de WhatsApp.

### ID interno

- Se mantiene solo en el catálogo interno.
- Actualmente puede ser UUID de Supabase.
- No se necesita en el navegador público.

## Columnas públicas

- **ID**
- **SKU**
- **Estado**
- **Línea**
- **Categoría**
- **Subcategoría**
- **Nombre**
- **Marca**
- **Precio**
- **Disponibilidad**
- **Descripción**
- **Talla**
- **Color**
- **Etiqueta**
- **Carpeta categoría**
- **Carpeta producto**
- **Imágenes**

## Reglas de precio

- `Precio` es el valor comercial para el cliente.
- `Costo real unitario` es interno y nunca se exporta a `products.js`.
- Si el precio público es `0`, el sistema conserva el dato fuente pero muestra **Precio por confirmar** en la tienda para evitar publicar `$0`.

## Imágenes

Para productos con imágenes:

```text
assets/productos/STYLE/<categoria>/<producto>/
assets/productos/BEAUTY_CARE/<categoria>/<producto>/
```

Las rutas pueden indicarse explícitamente en la columna `Imágenes` separadas por `|`.

Si un producto activo aún no tiene imágenes propias:

- no se inventa una imagen,
- el validador genera una advertencia,
- la tienda usa temporalmente el fallback oficial de LIHEN.CO.

Cuando se agreguen fotos reales, actualiza `Imágenes` o las carpetas técnicas y vuelve a ejecutar `npm run products:update`.

## Talla, color y etiqueta faltantes

La matriz interna conserva exactamente la información recibida. Para mantener una experiencia pública estable, durante la preparación pública:

- Talla vacía → `Por confirmar`
- Color vacío → `Por confirmar`
- Etiqueta vacía → `Consulta disponibilidad`

No se inventa una variante concreta.

## Agregar o actualizar productos

### Producto existente

1. Mantén el `ID` web.
2. Si ya tiene SKU, no lo cambies salvo corrección documentada.
3. Actualiza los demás campos.
4. Ejecuta `npm run products:update`.

### Producto nuevo

1. Asigna o registra un ID web siguiendo la convención existente.
2. Agrega SKU cuando exista en LIHEN_ADMIN_PRO.
3. Mantén proveedor/costo solo en el catálogo interno.
4. Agrega imágenes reales cuando estén disponibles.
5. Ejecuta las validaciones.

## Retirar un producto

Cambia `Estado` a `Inactivo` en la matriz interna. No elimines la fila si necesitas conservar trazabilidad.

## Archivos de cruce

### Interno

```text
data-private/catalogo_cruce_admin_web.csv
```

Contiene información técnica para relacionar ID web, SKU e ID interno.

### Público

```text
data/catalogo/catalogo_cruce_sku_publico.csv
```

Contiene únicamente campos no sensibles para referencia técnica.

## Futuro con Supabase

La dirección recomendada es:

```text
LIHEN_ADMIN_PRO → Supabase → vista catalog_public → LIHEN_WEB_RENACER
```

La tienda debe consultar solo columnas públicas. Stock, costos y proveedores deben permanecer protegidos por permisos/RLS.

Consulta:

```text
docs/INTEGRACION_ADMIN_WEB_CATALOGO.md
```

para el diseño completo de transición.

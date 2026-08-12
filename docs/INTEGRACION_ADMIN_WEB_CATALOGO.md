# LIHEN · Preparación de integración ADMIN ↔ WEB

## Propósito

Este documento deja preparado el contrato de datos entre:

- **LIHEN_ADMIN_PRO**: sistema administrativo, inventario físico, compras, proveedores, costos, stock y precios.
- **LIHEN_WEB_RENACER**: tienda pública y experiencia de cliente.

La integración automática completa **no se activa en esta fase**. El objetivo actual es que ambos sistemas puedan reconocer el mismo producto sin duplicar identidades ni exponer información privada.

## Identificadores

### ID web

Ejemplos: `B50`, `S66`.

- Se conserva para compatibilidad histórica de la tienda.
- No debe reasignarse si un producto ya existe.
- Puede seguir usándose en selección, enlaces, localStorage y componentes web.

### SKU

Ejemplos: `BC-029`, `ST-001`.

- Es la llave de interoperabilidad recomendada entre ADMIN y WEB.
- Debe ser único.
- Un SKU representa una referencia comercial concreta.
- La tienda puede exponer el SKU; no revela costos ni stock interno.

### ID interno

- Actualmente los registros suministrados usan UUID.
- Debe permanecer en el ámbito administrativo/privado.
- Es apropiado como llave técnica de Supabase, importaciones y relaciones internas.
- No es necesario publicarlo en `products.js`.

## Separación de datos

### Público

La tienda puede consumir:

- ID web
- SKU
- Estado de catálogo
- Línea
- Categoría
- Subcategoría
- Nombre
- Marca
- Precio público
- Disponibilidad comercial
- Descripción
- Talla
- Color
- Etiqueta
- Imágenes

### Administrativo

Debe permanecer fuera de GitHub Pages y del navegador público:

- ID interno
- Proveedor
- Costo real unitario
- Stock físico
- Stock mínimo
- Compras
- Entradas y salidas
- Márgenes internos
- Datos financieros

## Flujo local actual

```text
catalogo_maestro_interno.csv
        │
        │ npm run products:prepare
        ▼
data/catalogo/catalogo_maestro.csv
        │
        │ npm run products:sync
        ▼
js/data/products.js
        │
        ▼
LIHEN_WEB_RENACER
```

El primer archivo vive en `data-private/`, carpeta ignorada por Git.

## Comandos

### Validar matriz interna

```bash
npm run products:check:internal
```

### Generar versión pública segura

```bash
npm run products:prepare
```

### Validar catálogo público

```bash
npm run products:check
```

### Sincronizar products.js

```bash
npm run products:sync
```

### Ejecutar todo el flujo

```bash
npm run products:update
```

## Arquitectura futura recomendada

```text
                LIHEN_ADMIN_PRO
                     │
                     │ escritura autenticada
                     ▼
┌──────────────────────────────────────────┐
│                 Supabase                 │
│                                          │
│ products / catalog                       │
│ inventory                                │
│ suppliers                                │
│ costs                                    │
│ prices                                   │
│ stock_movements                          │
│                                          │
│ vista segura: catalog_public             │
└──────────────────────────────────────────┘
                     │
                     │ lectura pública limitada
                     ▼
              LIHEN_WEB_RENACER
```

El ZIP de **LIHEN_ADMIN_PRO** ya contiene un adaptador conceptual para una vista `catalog_public`. Esa dirección es adecuada: la tienda debe consultar una vista pública y nunca tablas con costos o proveedores.

## Contrato sugerido para `catalog_public`

Campos sugeridos:

- `id` o `catalog_code`
- `sku`
- `business_line`
- `category`
- `subcategory`
- `name`
- `brand`
- `sale_price`
- `catalog_availability_text`
- `description`
- `images`
- variantes públicas de talla/color

No incluir:

- `current_cost`
- `supplier_id`
- `supplier_name`
- `physical_stock` como número exacto si no se desea exponerlo
- márgenes
- información de caja

## Disponibilidad futura

No está implementada en esta entrega. Cuando LIHEN defina la regla comercial, puede calcularse una disponibilidad pública derivada del stock administrativo, por ejemplo:

```text
physical_stock > 0  → Disponible
physical_stock = 0  → Agotado / consultar
```

Conviene exponer solamente el estado comercial, no necesariamente el número exacto de unidades.

## Precio futuro

`LIHEN_ADMIN_PRO` puede convertirse en la autoridad del precio de venta. Una actualización administrativa de `sale_price` podría reflejarse en `catalog_public` y, posteriormente, en la tienda.

**Nunca** debe mapearse `current_cost` a un campo público de precio.

## Seguridad

Para la futura integración:

- mantener Row Level Security (RLS),
- usar roles separados para administración y lectura pública,
- exponer una vista o endpoint público con columnas permitidas,
- no colocar claves `service_role` en JavaScript del navegador,
- validar SKU únicos en base de datos,
- mantener auditoría de cambios de inventario y precios.

## Regla de transición

Mientras la tienda siga usando `products.js`, mantenerlo como fallback estable. La migración a Supabase debe hacerse en paralelo, validar filtros/búsqueda/selección/WhatsApp y retirar el archivo estático solo cuando la lectura remota esté probada.

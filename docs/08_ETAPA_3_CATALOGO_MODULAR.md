# Etapa 3 — Migración modular del catálogo real

## Resultado
Se migraron **64 productos reales**: **47 Beauty Care** y **17 Style**. También se conservaron las imágenes del proyecto anterior.

## Objetivo de aprendizaje
Separar los datos, la creación de tarjetas, el filtrado, la ventana de detalles y WhatsApp para que cada archivo tenga una sola responsabilidad.

## Flujo
`products.js → catalog.js → productCard.js / productModal.js → index.html`

## Ejecución
1. Abrir la carpeta `LIHEN_WEB_RENACER` en Visual Studio Code.
2. Abrir **Terminal → Nueva terminal**.
3. Ejecutar `npm run dev`.
4. Abrir la dirección local que muestre la terminal.

## Pruebas obligatorias
- Buscar por nombre, marca y categoría.
- Filtrar por Beauty Care y Style.
- Abrir productos con una y varias imágenes.
- Cerrar el modal con la X, el fondo y Escape.
- Probar en celular y computador.
- Confirmar que no aparezcan errores rojos en la consola.

## Pendiente controlado
El número oficial de WhatsApp continúa vacío para no usar un número sin confirmación. El sistema copia el mensaje mientras se configura el número definitivo.

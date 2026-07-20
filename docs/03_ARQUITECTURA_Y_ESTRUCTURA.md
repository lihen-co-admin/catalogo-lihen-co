# Arquitectura y estructura

## Separación de responsabilidades

- HTML: estructura semántica y contenido.
- CSS: identidad visual, distribución, estados y responsive.
- JavaScript: catálogo, búsqueda, selección, carruseles y modales.
- `data/`: información estructurada de productos.
- Supabase: persistencia y servicios que requieren backend.

## Principios

Yo evito mezclar secretos en el frontend, reutilizo funciones, nombro componentes por responsabilidad y reduzco reglas CSS contradictorias. Todo enlace y recurso debe usar rutas compatibles con GitHub Pages.

## Flujo principal

Inicio o búsqueda → tarjeta → vista previa → agregar a selección → revisar selección → consultar por WhatsApp.

## Manejo de errores

Cada módulo debe soportar datos faltantes, listas vacías, imágenes no disponibles, enlaces inválidos y servicios externos temporalmente inaccesibles.

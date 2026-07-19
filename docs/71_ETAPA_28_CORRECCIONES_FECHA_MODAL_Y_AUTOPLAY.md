# Etapa 28 — Correcciones de fecha, modal promocional y autoplay

## Objetivo
Corregir la fecha pública de creación de LIHEN.CO, mejorar la experiencia del beneficio de bienvenida y garantizar que el carrusel principal avance automáticamente.

## Cambios realizados

### `nosotros.html`
- Se cambió “fundada en 2024” por “fundada en 2026”.
- Se actualizó el nacimiento de la marca a 2026.
- Se cambió el año de constitución a 2026.

### `js/storefront.js`
- El carrusel principal ahora avanza cada 3 segundos.
- Se eliminó la pausa por mantener el cursor sobre toda la portada, porque podía hacer parecer que el carrusel estaba detenido.
- Se conserva la navegación manual, los indicadores, el gesto táctil y el reinicio del temporizador después de una interacción.
- El modal promocional ahora usa `lihen_beneficio_bienvenida.webp`.

### `css/storefront.css`
- Se redujo el modal para que no ocupe casi toda la pantalla.
- Se compactaron textos, campos, botones y espacios.
- En escritorio, el contenido se visualiza sin scroll interno.
- En pantallas pequeñas, el diseño se reorganiza de manera responsive.

### Imagen promocional
- La imagen PNG entregada se convirtió a WebP con calidad alta.
- Ruta de producción: `assets/banners/lihen_beneficio_bienvenida.webp`.

## Resultado esperado
1. La sección Nosotros muestra 2026 en todas sus referencias visibles.
2. El carrusel principal cambia de imagen automáticamente cada 3 segundos.
3. El modal del beneficio de bienvenida se aprecia completo y compacto en escritorio.
4. La imagen promocional conserva su nitidez y se carga en formato WebP.

## Pruebas sugeridas
- Abrir `nosotros.html` y revisar las tres menciones del año.
- Dejar la portada abierta durante más de 9 segundos y comprobar al menos tres cambios.
- Usar flechas y puntos del carrusel y confirmar que el autoplay se reinicia.
- Abrir el beneficio lateral en resoluciones de escritorio y celular.
- Confirmar que la X, el formulario, el botón y el aviso legal sean visibles.

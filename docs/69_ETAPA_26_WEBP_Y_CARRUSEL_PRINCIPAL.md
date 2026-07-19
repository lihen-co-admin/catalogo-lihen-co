# Etapa 26 — WebP y carrusel principal

## 1. Objetivo
Optimizar los recursos gráficos de LIHEN.CO y convertir la portada en un carrusel visual con las tres nuevas piezas entregadas por la marca, además de la portada existente.

## 2. Archivos trabajados
- `index.html`: estructura del carrusel principal.
- `css/storefront.css`: estilos, transiciones, flechas, indicadores y comportamiento responsive.
- `js/storefront.js`: rotación automática, navegación manual, pausa y gesto táctil.
- `assets/`: conversión y actualización de todas las imágenes de producción.

## 3. Conversión de imágenes
- Imágenes del proyecto anterior y nuevas piezas revisadas: **381**.
- Imágenes finales en WebP: **381**.
- Logo transparente: WebP sin pérdida. Resto de PNG/JPG/JPEG: WebP de alta calidad (92) con transparencia preservada, sin pérdida visual perceptible en pantalla.
- JPG/JPEG fotográficos: WebP en calidad 95 para evitar degradación visual perceptible.
- Los originales PNG/JPG/JPEG se retiraron del paquete de producción después de comprobar que su WebP existía.

## 4. Carrusel de portada
El carrusel contiene cuatro piezas:
1. Portada Beauty Care & Style existente.
2. “¿Qué te representa? Beauty | Style”.
3. “LIHEN — estilo que te impulsa”.
4. Pieza de identidad LIHEN sobre nube.

Comportamiento:
- cambio automático cada 5 segundos;
- ciclo infinito;
- flechas anterior/siguiente;
- indicadores clicables;
- pausa al pasar el mouse o enfocar controles;
- deslizamiento táctil en celular y tableta;
- respeto por `prefers-reduced-motion`.

## 5. Cómo comprobar que funciona
1. Ejecutar `npm run dev`.
2. Abrir la dirección local indicada por la terminal.
3. Esperar cinco segundos y comprobar el cambio de portada.
4. Usar flechas e indicadores.
5. Revisar el sitio en celular y arrastrar horizontalmente.
6. Abrir DevTools > Network y confirmar que las imágenes terminan en `.webp`.
7. Ejecutar `npm run check` y `npm run check:js`.

## 6. Resultado de peso
- Peso estimado de imágenes antes de la conversión: **137.02 MB**.
- Peso final de imágenes WebP: **65.40 MB**.
- Diferencia: **71.62 MB** (52.3% de reducción).

## 7. Resultado esperado
La página debe mantener nitidez visual, cargar únicamente imágenes WebP y mostrar un carrusel principal funcional sin afectar menús, productos, modales, Mi selección ni páginas legales.

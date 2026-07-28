# Etapa 33 · Auditoría responsive basada en breakpoints de Bootstrap

## Decisión técnica

No se instaló Bootstrap. Se conservaron el HTML, CSS y JavaScript propios de LIHEN.CO para evitar conflictos visuales y regresiones. Se adoptaron únicamente sus puntos de control como guía de revisión:

- XS: menos de 576 px
- SM: desde 576 px
- MD: desde 768 px
- LG: desde 992 px
- XL: desde 1200 px
- XXL: desde 1400 px

## Archivo agregado

`css/responsive-bootstrap-audit.css`

Este archivo se carga después de los estilos existentes en las páginas públicas de tienda, inauguración, invitaciones y transmisión.

## Mejoras aplicadas

- Contenedores fluidos con ancho máximo según breakpoint.
- Prevención de desbordamiento horizontal en imágenes, video, SVG e iframes.
- Protección de columnas flex/grid mediante `min-width: 0`.
- Reorganización de la tarjeta de invitación en tablet y móvil.
- Botones apilados y de ancho completo en XS.
- QR limitado al ancho real del dispositivo.
- Formularios y bloques de confirmación adaptados a móvil.
- Ajuste para pantallas de poca altura.
- Conservación de `prefers-reduced-motion`.

## Alcance

La auditoría se aplicó sin cambiar la identidad visual ni introducir las clases de Bootstrap. Esto permite practicar el criterio aprendido en clase sin someter el proyecto terminado a una migración innecesaria.

## Pruebas recomendadas

Validar como mínimo en DevTools:

- 375 × 667 px
- 390 × 844 px
- 576 × 800 px
- 768 × 1024 px
- 992 × 768 px
- 1200 × 800 px
- 1400 × 900 px

Comprobar que no exista scroll horizontal, que los textos no se corten, que los botones sean utilizables y que los QR conserven legibilidad.

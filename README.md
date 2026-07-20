# LIHEN_WEB_RENACER

**Versión 36.0.0** — catálogo web responsive de LIHEN.CO preparado para GitHub Pages y pruebas de publicación.

## Propósito

Este proyecto presenta las líneas Beauty Care y Style, permite consultar productos, crear una selección y enviarla por WhatsApp. La selección no constituye una compra hasta que LIHEN.CO confirme disponibilidad, variantes, precio y envío.

## Ejecutar localmente

```bash
npm install
npm run check
npm run dev
```

Después se abre la dirección local indicada por la terminal.

## Validar antes de publicar

```bash
npm run check
npm run check:js
```

También se debe comprobar manualmente la navegación, los enlaces, los modales, la selección, WhatsApp y el diseño en celular, tableta y escritorio.

## Rutas principales

- `/` — inicio, catálogo y presentación institucional.
- `/buscar.html` — búsqueda y filtros.
- `/ideas-para-regalar.html` — ideas organizadas por categoría.
- `/mi-seleccion.html` — resumen de productos seleccionados.
- `/nosotros.html` — información corporativa y contacto.
- `/inauguracion/` — experiencia de inauguración.
- `/evento-admin.html` — administración del evento.

## Organización

- `assets/`: imágenes, banners, íconos y videos.
- `css/`: estilos generales, legales y responsive.
- `js/`: catálogo, búsqueda, selección, componentes y utilidades.
- `supabase/`: migraciones y recursos de base de datos.
- `scripts/`: validadores técnicos.
- `docs/`: guía académica, técnica, pruebas, publicación y mantenimiento.

## Seguridad

No se debe publicar una clave `service_role`, contraseña o secreto dentro del frontend. Las variables públicas deben revisarse antes de cada despliegue.

## Documentación

La ruta de lectura recomendada es:

1. `docs/01_GUIA_MAESTRA_DESARROLLO_WEB.md`
2. `docs/02_DEFINICION_Y_PLANEACION_LIHEN.md`
3. `docs/03_ARQUITECTURA_Y_ESTRUCTURA.md`
4. `docs/04_DESARROLLO_FRONTEND.md`
5. `docs/05_RESPONSIVE_Y_MULTIDISPOSITIVO.md`
6. `docs/06_PRUEBAS_Y_VALIDACION.md`
7. `docs/07_GIT_GITHUB_Y_PUBLICACION.md`
8. `docs/08_MANUAL_TECNICO.md`
9. `docs/09_MANUAL_DE_USUARIO.md`
10. `docs/10_MANTENIMIENTO_Y_MEJORAS.md`


## Inauguración 2 de agosto

La inauguración pública vive dentro del mismo repositorio, sin reemplazar el catálogo:

- Catálogo: `/index.html`
- Invitación pública: `/inauguracion/index.html`
- Experiencia interactiva: `/inauguracion/experiencia.html`
- Pantalla para proyección: `/inauguracion/pantalla.html`

Hasta la inauguración, los botones de consulta de Mi selección abren primero una pantalla informativa. La persona puede conocer el evento, unirse voluntariamente al grupo oficial o continuar a WhatsApp con su selección y una autorización breve de contacto.

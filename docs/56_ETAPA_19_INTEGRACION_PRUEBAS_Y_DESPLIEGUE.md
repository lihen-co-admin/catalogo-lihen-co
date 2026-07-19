# Etapa 19 — Integración final, pruebas y despliegue

## Propósito

Esta etapa no agrega otro juego. Su objetivo es comprobar que todo lo construido entre las etapas 1 y 18 pueda convivir, ejecutarse y publicarse como una sola aplicación web.

## Resultado de la integración

El proyecto conserva cuatro accesos principales:

- `/index.html`: catálogo, información institucional, contacto y acceso a la inauguración.
- `/inauguracion/`: registro, sala del participante, juegos y recompensas.
- `/inauguracion/pantalla.html`: vista pública para televisor o proyector.
- `/evento-admin.html`: control privado del evento.
- `/admin.html`: gestión privada de solicitudes de contacto.

## Archivos incorporados

- `netlify.toml`: publicación, rutas cortas, caché y encabezados básicos de seguridad.
- `404.html`: página de error coherente con LIHEN.CO.
- `scripts/validate-project.mjs`: revisión automática del proyecto completo.
- `docs/57_PLAN_DE_PRUEBAS_MULTIDISPOSITIVO.md`.
- `docs/58_MANUAL_DE_USUARIO.md`.
- `docs/59_MANUAL_ADMINISTRATIVO.md`.
- `docs/60_GUIA_DESPLIEGUE_NETLIFY_Y_SUPABASE.md`.
- `docs/61_REPORTE_FINAL_ETAPA_19.md`.

## Comandos

Abrir una terminal en la carpeta principal:

```bash
npm run check
```

Resultado esperado:

```text
✓ Proyecto listo para pruebas manuales y despliegue de preproducción.
```

Ejecutar localmente:

```bash
npm run dev
```

Abrir la URL indicada por la terminal, normalmente `http://localhost:3000`.

## Qué valida automáticamente el proyecto

1. Sintaxis de todos los archivos JavaScript dentro de `js/`.
2. Existencia de recursos locales referenciados desde HTML.
3. Ausencia de eventos `onclick` embebidos.
4. Secuencia de migraciones SQL.
5. Ausencia de una clave `service_role` en la configuración pública.
6. Ausencia de credenciales reales dentro del ZIP compartido.
7. Existencia de imágenes referenciadas por el catálogo.

## Limitación honesta

La validación automática no reemplaza la prueba real con varios celulares, conexiones de internet y una instancia configurada de Supabase. Esa prueba debe realizarse siguiendo el plan multidispositivo antes del evento.

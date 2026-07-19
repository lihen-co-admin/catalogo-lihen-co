# LIHEN_WEB_RENACER

Versión 19.0.0 — integración final, validación, documentación y preparación para Netlify.

## Ejecutar

```bash
npm run check
npm run dev
```

## Rutas principales

- `/` — catálogo y página institucional.
- `/inauguracion/` — participante.
- `/inauguracion/pantalla.html` — televisor/proyector.
- `/evento-admin.html` — administración del evento.
- `/admin.html` — solicitudes de contacto.

## Configuración pendiente antes de una prueba real

1. Ejecutar las migraciones SQL `001` a `012` en Supabase.
2. Configurar URL y clave pública en `js/config/env.js` en la copia privada de despliegue.
3. Crear y autorizar una cuenta administrativa.
4. Configurar el número oficial de WhatsApp.
5. Completar el plan multidispositivo de `docs/57_PLAN_DE_PRUEBAS_MULTIDISPOSITIVO.md`.

No colocar una clave `service_role` en el frontend.

## Etapa 30

Yo corrijo navegación, autoplay, galería de vista previa, favicon, títulos dinámicos y botón compacto de WhatsApp. Consulta `docs/73_ETAPA_30_NAVEGACION_AUTOPLAY_GALERIA_FAVICON.md`.

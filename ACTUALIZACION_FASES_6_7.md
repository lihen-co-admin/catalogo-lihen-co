# LIHEN.CO V18 — Fases 6 y 7

## Fase 6 — Pruebas integrales, seguridad, rendimiento y correcciones finales

Se fortaleció el proceso de validación sin cambiar la lógica comercial ni la base de datos:

- `npm run check` ya funciona aunque `js/config/env.js` no exista en un ZIP descargado de GitHub.
- Se agregó `npm run check:release` para revisar el proyecto antes de integrar o desplegar.
- Se verifica la ausencia de `service_role` y referencias a `localhost` en archivos activos.
- Se verifican enlaces externos con `target="_blank"` y protección `rel="noopener"`.
- Se comprueba que `.gitignore` mantenga fuera del repositorio la configuración local.
- Se comprueban archivos críticos para GitHub Pages y despliegue estático.
- Se agregó `.nojekyll` para que GitHub Pages publique todos los recursos estáticos sin procesamiento Jekyll.

## Fase 7 — Integración con main y despliegue definitivo

El paquete deja preparada la rama para integración. El merge real debe realizarse en GitHub después de aprobar las pruebas manuales, porque un ZIP no contiene el historial Git ni permite integrar ramas de forma verificable.

Flujo recomendado:

1. Ejecutar `npm run check:release`.
2. Probar tienda, invitaciones, inauguración y panel administrativo.
3. Subir el commit a `refactor/lihen-v18`.
4. Crear Pull Request contra `main`.
5. Confirmar que los checks estén verdes.
6. Crear una etiqueta de respaldo antes del merge.
7. Integrar mediante Pull Request.
8. Verificar GitHub Pages en producción con recarga forzada.

No se modificaron migraciones, políticas, tablas ni funciones de Supabase.

# LIHEN_WEB_RENACER V18 — Estabilización crítica

Esta versión parte de la V17.1 funcional y aplica únicamente las correcciones críticas aprobadas después de la auditoría completa.

## Cambios aplicados

1. `js/config/supabase.js`
   - Se añadió la exportación `isSupabaseConfigured()`.
   - La función reutiliza `getSupabaseConfig()` para evitar duplicar la lógica de configuración.

2. `js/utils/voteTimer.js`
   - Se sustituyó la importación inexistente `calculateTriviaSeconds` por la función real `getTriviaSecondsLeft`.
   - Se conserva la API pública `calculateVoteSeconds` utilizada por votación y reto relámpago.

3. Supabase
   - Se corrigió `is_active` por `active` en la migración 003 para que una instalación limpia sea reproducible.
   - Se añadió la migración idempotente `013_fix_event_participant_admin_policies.sql` para corregir también proyectos de Supabase ya creados.

4. `scripts/validate-project.mjs`
   - Ahora comprueba contratos de importación/exportación entre módulos JavaScript locales.
   - La validación detecta funciones importadas que no estén exportadas por el archivo de origen.

## Alcance conservado

No se modificaron:

- diseño visual;
- invitaciones ni sus códigos;
- catálogo o selección de productos;
- estructura de juegos;
- datos privados;
- credenciales;
- archivos históricos.

## Validaciones ejecutadas

- `npm run check`
- `npm run check:js`
- prueba directa de exportación de Supabase;
- prueba directa del temporizador de votación;
- búsqueda de marcadores de conflicto Git.

La migración 013 debe ejecutarse en Supabase antes de validar el panel administrativo del evento en producción.

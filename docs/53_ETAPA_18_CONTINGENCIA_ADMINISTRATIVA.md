# Etapa 18 — Contingencia administrativa

## Objetivo
Recuperar una sala atascada sin borrar historial de respuestas, votos, giros, ganadores o recompensas.

## Acciones
- Diagnóstico del estado operativo.
- Cierre de todas las rondas abiertas.
- Liberación del turno activo.
- Reconstrucción de colas.
- Reapertura de sala y registro.
- Recuperación suave.
- Reinicio operativo protegido por confirmación escrita.

## Migración
Ejecutar `supabase/migrations/012_admin_contingency_and_recovery.sql` después de la 011.

## Regla de seguridad
Todas las funciones verifican `is_event_admin(auth.uid())` y registran la acción en `event_contingency_logs`. El reinicio operativo no elimina tablas ni historiales.

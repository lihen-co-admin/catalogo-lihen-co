# Apuntes por archivo — Etapa 18

## `012_admin_contingency_and_recovery.sql`
Crea el diagnóstico, las funciones seguras de recuperación y la bitácora administrativa.

## `adminContingencyRepository.js`
Aísla las llamadas RPC a Supabase. La interfaz no escribe directamente en las tablas.

## `adminContingency.js`
Presenta el diagnóstico, solicita confirmaciones y ejecuta cada acción de recuperación.

## `evento-admin.html`
Incluye el panel visual de contingencia dentro del área autenticada.

## `event-admin.css`
Contiene la presentación de métricas, alertas, botones de emergencia e historial.

# Etapa 14 — Vota tu favorito

## Objetivo
Construir un juego de votación simultánea separado del sistema de turnos. Todas las personas registradas pueden votar una sola vez por ronda y observar el ranking actualizado en tiempo real.

## Flujo
1. La administradora selecciona una votación.
2. Define entre 10 y 300 segundos.
3. Supabase crea una ronda abierta.
4. Participantes presenciales y virtuales votan al mismo tiempo.
5. La función `submit_event_vote()` valida identidad, acceso, ronda y opción.
6. La restricción `unique(round_id, participant_id)` evita votos duplicados.
7. Participante, administración y televisor consultan el mismo ranking.

## Prueba
Ejecutar las migraciones 001 a 008, abrir varias sesiones de participante, el panel administrativo y la pantalla pública. Abrir una votación y confirmar que cada persona pueda votar una vez y que el ranking cambie en todas las vistas.

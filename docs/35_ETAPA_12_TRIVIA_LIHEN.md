# Etapa 12 — Trivia LIHEN

## Objetivo
Reconstruir el primer juego como un módulo independiente, sincronizado con Supabase y habilitado únicamente para la persona que tiene el turno activo.

## Flujo
1. La administradora activa un participante desde la cola.
2. Selecciona una pregunta y define el tiempo.
3. Supabase crea una ronda abierta.
4. Participante y televisor reciben la pregunta en tiempo real.
5. Solo el participante activo puede responder.
6. La función SQL valida la respuesta sin publicar la opción correcta.
7. El resultado se guarda y la pantalla muestra al ganador.

## Migración
Ejecutar `006_trivia_game.sql` después de las migraciones 001 a 005.

## Prueba mínima
- Tener Supabase configurado.
- Registrar un participante y activarlo desde el panel.
- Abrir una pregunta desde `evento-admin.html`.
- Responder desde `/inauguracion/`.
- Confirmar el resultado en administración y `/inauguracion/pantalla.html`.

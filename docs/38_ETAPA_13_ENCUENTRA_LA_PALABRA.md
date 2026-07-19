# Etapa 13 — Encuentra la palabra

## Objetivo
Reconstruir el segundo juego de la inauguración como un módulo independiente, sincronizado con Supabase y habilitado únicamente para la persona que tenga el turno activo.

## Flujo
1. La administradora selecciona una pista y define el tiempo.
2. Supabase crea una ronda abierta.
3. La pista y la palabra incompleta aparecen en participante y televisor.
4. Solo el participante activo puede escribir una respuesta.
5. La validación se hace dentro de Supabase; la solución no se publica en JavaScript.
6. El resultado se sincroniza y la ronda se cierra cuando la respuesta es correcta.

## Archivos principales
- `js/data/wordChallenges.js`: catálogo administrativo de pistas.
- `js/repositories/wordGameRepository.js`: lectura pública, suscripción y envío de respuesta.
- `js/repositories/adminWordGameRepository.js`: acciones administrativas.
- `js/pages/inauguration/wordGame.js`: interfaz del participante.
- `js/pages/inauguration/wordScreen.js`: presentación para televisor.
- `js/pages/adminWordGame.js`: control administrativo.
- `supabase/migrations/007_word_game.sql`: tablas, vistas, políticas y funciones.

## Migraciones
Ejecutar en orden desde `001` hasta `007_word_game.sql`.

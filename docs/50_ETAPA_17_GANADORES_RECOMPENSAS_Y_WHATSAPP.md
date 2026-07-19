# Etapa 17 — Ganadores, recompensas y reclamación

Se unificaron los resultados premiados de Trivia, Encuentra la palabra, Reto relámpago y Ruleta en `event_rewards`. Cada recompensa recibe un código único, un estado de entrega y una referencia al juego de origen.

## Flujo
1. Un juego registra un ganador.
2. Un trigger crea la recompensa sin duplicarla.
3. El participante ve su premio y código.
4. Al reclamar, el estado cambia a `claimed` y se prepara el mensaje de WhatsApp.
5. La administradora marca la recompensa como entregada o cancelada.

Los ganadores quedan excluidos de las colas normales porque su estado es `winner`. La votación no genera premio automático.

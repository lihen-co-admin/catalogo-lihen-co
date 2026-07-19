# Apuntes por archivo — Etapa 11

- `turnQueueRepository.js`: llama funciones seguras de Supabase para activar, pausar, reanudar y finalizar turnos.
- `turnTimer.js`: calcula el tiempo restante sin duplicar la lógica en cada pantalla.
- `eventAdmin.js`: coordina controles, colas y participantes.
- `room.js`: muestra al participante quién tiene el turno y avisa cuando es su turno.
- `screen.js`: presenta el turno y cronómetro en televisor.
- `005_turn_queue_and_timer.sql`: concentra la regla de alternancia y las operaciones atómicas en la base de datos.

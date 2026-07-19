# Apuntes por archivo — Etapa 14

- `votePolls.js`: guarda las votaciones públicas que llenan el selector administrativo.
- `voteRepository.js`: consulta ronda y ranking, envía votos y escucha Realtime.
- `adminVoteRepository.js`: llama funciones administrativas y consulta quién votó.
- `voteGame.js`: controla opciones, mensaje y ranking del participante.
- `voteScreen.js`: muestra pregunta, total y ranking en televisor.
- `adminVoteGame.js`: abre, cierra, reinicia y revisa resultados.
- `voteTimer.js`: reutiliza el cálculo de tiempo compartido.
- `008_vote_favorite.sql`: crea encuestas, opciones, rondas, votos, vistas, políticas y funciones.

La decisión principal fue no reutilizar el turno activo porque este juego requiere participación simultánea. Aun así, se conserva la validación del participante mediante su `public_id` y `access_code`.

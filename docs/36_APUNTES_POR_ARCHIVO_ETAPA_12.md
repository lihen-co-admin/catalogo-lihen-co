# Apuntes por archivo — Etapa 12

## `triviaQuestions.js`
Guarda la lista visible de preguntas para poblar el selector administrativo. No contiene la respuesta correcta.

## `triviaRepository.js`
Lee preguntas y rondas públicas, escucha Realtime y envía la respuesta mediante una función SQL.

## `adminTriviaRepository.js`
Agrupa las acciones reservadas para administración: abrir, cerrar, reiniciar y consultar respuestas.

## `trivia.js`
Controla la vista del participante. Compara el participante local con el turno activo y deshabilita las opciones cuando no le corresponde responder.

## `triviaScreen.js`
Muestra la misma pregunta en el televisor sin permitir interacción.

## `adminTrivia.js`
Conecta el selector de preguntas y los controles administrativos con Supabase.

## `triviaTimer.js`
Calcula el tiempo restante a partir de `closes_at`, evitando tener un cronómetro diferente en cada dispositivo.

## `006_trivia_game.sql`
Separa preguntas públicas, respuestas correctas privadas, rondas y respuestas. La validación ocurre en Supabase.

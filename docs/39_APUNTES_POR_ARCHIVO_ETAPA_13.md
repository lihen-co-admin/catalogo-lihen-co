# Apuntes por archivo — Etapa 13

## `wordChallenges.js`
Guardé pistas públicas para llenar el selector administrativo. No guardé las respuestas correctas aquí.

## `wordGameRepository.js`
Separé las operaciones de Supabase de la interfaz. Consulta la ronda actual, escucha cambios y envía la respuesta mediante una función SQL.

## `wordGame.js`
Comprueba si el usuario actual coincide con el participante activo. Solo en ese caso habilita el campo y el botón.

## `wordScreen.js`
Muestra pista, palabra incompleta, cronómetro y ganador. No tiene controles de escritura.

## `adminWordGame.js`
Permite abrir, cerrar y reiniciar rondas, además de revisar los intentos recibidos.

## `007_word_game.sql`
La respuesta correcta se guarda en una tabla privada. La función normaliza mayúsculas, tildes, espacios y signos antes de comparar.

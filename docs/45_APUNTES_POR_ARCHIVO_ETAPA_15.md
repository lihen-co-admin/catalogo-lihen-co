# Apuntes por archivo — Etapa 15

## `js/data/flashChallenges.js`
Guardé los retos públicos. Separé contenido y lógica para poder cambiar instrucciones sin tocar la interfaz.

## `js/repositories/flashChallengeRepository.js`
Consulto la ronda pública, envío el reporte del participante y escucho cambios Realtime.

## `js/repositories/adminFlashChallengeRepository.js`
Agrupé las operaciones administrativas: abrir, cerrar, reiniciar, listar reportes y validar resultados.

## `js/pages/inauguration/flashChallenge.js`
Manejo la experiencia del participante. Compruebo visualmente el turno y envío el reporte al servidor.

## `js/pages/adminFlashChallenge.js`
Conecto los controles del panel con Supabase y muestro los botones para aprobar o no aprobar.

## `js/pages/inauguration/flashScreen.js`
Presento el reto en televisor sin controles administrativos.

## `supabase/migrations/009_flash_challenge.sql`
Creo tablas, vistas, políticas, funciones y publicación Realtime. La base de datos es la autoridad para validar el resultado.

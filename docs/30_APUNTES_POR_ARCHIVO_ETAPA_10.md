# Apuntes por archivo · Etapa 10

## `roomPresenceService.js`
Centraliza el canal Realtime. Convierte el estado de presencia en una lista sencilla y ofrece una simulación local con `BroadcastChannel`.

## `room.js`
Conecta la identidad guardada del participante con la sala, actualiza los contadores y muestra el estado general del evento.

## `eventRoomRepository.js`
Lee y actualiza `event_rooms`. También escucha cambios con Postgres Changes.

## `participantPresenceService.js`
Actualiza el estado propio mediante una función SQL que exige UUID y código de acceso.

## `screen.js`
Renderiza una interfaz de solo lectura para televisor, sin controles administrativos ni datos privados.

## `eventAdmin.js`
Comprueba la cuenta administrativa, publica cambios y permite actualizar estados de participantes.

## `004_realtime_room_presence_and_views.sql`
Agrega estado de evento, políticas RLS, función segura de estado y publicación Realtime.

# Etapa 10 · Sala compartida Realtime y vistas separadas

## Objetivo
Activar la presencia de participantes y separar tres experiencias: participante, administradora y pantalla pública.

## Resultado
- La vista del participante se une a un canal de presencia al pulsar **Entrar a la sala**.
- El panel muestra total, presenciales y virtuales conectados.
- `inauguracion/pantalla.html` presenta el estado del evento en formato de televisor o proyector.
- `evento-admin.html` permite publicar estado, actividad y avisos, y administrar estados de participantes.
- Sin Supabase se usa `BroadcastChannel` para hacer pruebas entre pestañas del mismo navegador.

## Migración requerida
Ejecutar `supabase/migrations/004_realtime_room_presence_and_views.sql` después de las migraciones 001, 002 y 003.

## Flujo de presencia
Participante local → `room.js` → `roomPresenceService.js` → Supabase Realtime Presence → participante, pantalla y conteos.

## Privacidad
La presencia pública comparte únicamente identificador público, nombre visible y modalidad. No transmite correo ni nombre completo.

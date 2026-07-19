# Etapa 9 — Inauguración, registro y preparación de sala

## Objetivo
Separar la experiencia de inauguración del catálogo y construir primero las bases: navegación, reglas, registro, modalidades y vista de sala. Los juegos aún no se activan.

## Página creada
`inauguracion/index.html`

## Flujo
1. La persona lee la bienvenida y las reglas.
2. Completa nombre, correo, modalidad y nombre visible.
3. El sistema valida cada dato.
4. Se crea un objeto `Participant`.
5. Se guarda un respaldo local.
6. Si Supabase está configurado, se intenta crear el registro remoto.
7. Se muestra un acceso y la persona puede entrar a la vista de sala.

## Ejecución
Desde la raíz:
```bash
npm run dev
```
Abrir: `http://localhost:3000/inauguracion/`

## Supabase
Ejecutar después de las migraciones 001 y 002:
`supabase/migrations/003_event_room_and_participants.sql`

## Pendiente
Realtime, presencia, colas P/V, cronómetro, juegos, premios y panel de control del evento se desarrollan en etapas posteriores.

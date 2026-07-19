# Etapa 15 — Reto relámpago

## Objetivo
Construir el cuarto juego de la inauguración como un módulo independiente. El reto pertenece al participante que tiene el turno activo, usa un tiempo compartido y requiere validación de la administradora.

## Flujo
1. La administradora activa un participante desde el sistema de turnos.
2. Selecciona un reto y define su duración.
3. Supabase publica la ronda y copia el participante activo.
4. El reto aparece en participante y pantalla pública.
5. Solo la persona activa puede pulsar el botón de finalización.
6. La administradora aprueba o no aprueba el reporte.
7. El resultado se sincroniza en tiempo real.
8. Cuando se aprueba, el participante queda con estado `winner`.

## Seguridad
La validación no depende del navegador. Las funciones SQL verifican la cuenta administrativa, el turno activo, el código del participante, el tiempo y que no exista un reporte duplicado.

## Migración
Ejecutar `supabase/migrations/009_flash_challenge.sql` después de las migraciones 001 a 008.

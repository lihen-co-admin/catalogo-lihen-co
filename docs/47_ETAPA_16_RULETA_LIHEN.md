# Etapa 16 — Ruleta LIHEN

## Objetivo
Reconstruir la ruleta como un módulo independiente, con animación en el navegador y asignación segura del resultado dentro de Supabase.

## Flujo
1. La administradora activa un participante desde el sistema de turnos.
2. Abre una ronda de ruleta.
3. Únicamente el participante activo puede pulsar **Girar ruleta**.
4. La función `spin_event_roulette()` bloquea la ronda, elige una opción disponible, descuenta inventario y registra el giro en una sola transacción.
5. Participante y televisor reproducen la animación hacia el mismo segmento.
6. Si el resultado corresponde a un premio, el participante queda marcado como ganador.

## Premios iniciales
- 10 % de descuento: 5 unidades.
- 15 % de descuento: 5 unidades.
- Obsequio: 6 unidades.
- Dulce: 10 unidades.
- Sigue intentando: sin límite.

Las cantidades pueden ajustarse desde el panel administrativo. Un premio con stock cero deja de participar en el sorteo.

## Migración
Ejecutar `supabase/migrations/010_roulette_game_and_inventory.sql` después de las migraciones 001 a 009.

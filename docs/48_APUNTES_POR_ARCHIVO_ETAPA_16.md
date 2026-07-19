# Apuntes por archivo — Etapa 16

## `roulettePrizes.js`
Mantiene la representación visual y el orden de los segmentos. No decide el premio real.

## `rouletteAnimation.js`
Pinta la rueda, calcula la rotación final y ejecuta una animación desacelerada. Separé esta responsabilidad para reutilizarla en participante y televisor.

## `rouletteRepository.js`
Consulta la ronda pública, escucha Realtime y envía el giro mediante una función RPC.

## `adminRouletteRepository.js`
Agrupa las acciones protegidas de administración: abrir, cerrar, reiniciar y actualizar inventario.

## `roulette.js`
Controla la experiencia del participante. Verifica visualmente el turno, bloquea dobles clics y anima el resultado devuelto por Supabase.

## `rouletteScreen.js`
Muestra el mismo giro en el televisor sin permitir acciones.

## `adminRoulette.js`
Conecta los controles administrativos con el inventario y el historial de la ronda.

## `010_roulette_game_and_inventory.sql`
Crea tablas, vistas, políticas y funciones. El punto más importante es que selección, descuento de stock y registro ocurren juntos dentro de la base de datos.

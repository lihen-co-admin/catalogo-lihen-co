# Etapa 11 — Turnos, colas y cronómetro

## Objetivo
Organizar la participación presencial y virtual sin mezclar la lógica de turnos con la interfaz.

## Flujo
1. Los participantes registrados, conectados o en espera forman la cola.
2. El sistema intenta alternar presencial y virtual.
3. Dentro de cada modalidad respeta `registered_order`.
4. La administradora activa el siguiente turno.
5. El cronómetro puede pausarse, reanudarse o finalizarse.
6. Al finalizar se decide si la persona vuelve a espera, gana, queda deshabilitada o sale.

## Migración
Ejecutar `005_turn_queue_and_timer.sql` después de las migraciones 001 a 004.

## Prueba recomendada
Registrar al menos dos personas presenciales y dos virtuales. Activar turnos consecutivos y comprobar la alternancia P/V, el orden, el cronómetro y la actualización en participante y televisor.

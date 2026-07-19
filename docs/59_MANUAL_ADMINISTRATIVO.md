# Manual administrativo — Evento LIHEN.CO

## Antes del evento

1. Confirmar que las 12 migraciones fueron ejecutadas.
2. Configurar URL y clave pública de Supabase en `js/config/env.js` únicamente en la copia que se desplegará.
3. Crear cuenta en Supabase Auth y autorizar su UUID en `admin_profiles`.
4. Abrir `/evento-admin.html` e iniciar sesión.
5. Verificar inventario de Ruleta.
6. Ejecutar el plan de pruebas con varios dispositivos.
7. Reiniciar datos de prueba mediante procedimientos controlados, no borrando tablas manualmente durante el evento.

## Orden recomendado durante el evento

1. Abrir registro.
2. Abrir sala.
3. Publicar actividad y aviso.
4. Revisar colas presencial/virtual.
5. Activar siguiente participante.
6. Abrir solamente el juego correspondiente.
7. Cerrar la ronda antes de cambiar de juego.
8. Finalizar el turno indicando el estado correcto.

## Televisor

Abrir `/inauguracion/pantalla.html`, activar pantalla completa y evitar iniciar sesión administrativa allí.

## Contingencia

Usar primero “Diagnosticar”. Después preferir “Recuperación suave”. El “Reinicio operativo” requiere escribir `REINICIAR` y debe reservarse para un bloqueo serio.

## Protección de datos

- No proyectar `evento-admin.html`.
- No compartir capturas con correos, teléfonos, códigos de acceso o códigos de reclamación.
- No colocar `service_role` en ningún archivo del proyecto.
- Cerrar sesión al terminar.

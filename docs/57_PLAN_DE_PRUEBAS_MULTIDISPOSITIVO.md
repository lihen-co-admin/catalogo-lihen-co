# Plan de pruebas multidispositivo

## Preparación

Usar una URL de preproducción distinta de la URL pública definitiva. Ejecutar las 12 migraciones SQL en orden y crear al menos una cuenta administrativa autorizada.

Preparar como mínimo:

- Un computador para administración.
- Un computador o televisor para la pantalla pública.
- Dos celulares: uno presencial y otro virtual.
- Dos navegadores diferentes o ventanas privadas.
- Una conexión alternativa de datos móviles para simular acceso externo.

## Matriz mínima

| Caso | Dispositivo | Acción | Resultado esperado |
|---|---|---|---|
| P-01 | Celular | Abrir catálogo | Sin desplazamiento horizontal y botones táctiles |
| P-02 | Computador | Buscar producto | Resultados correctos con y sin tildes |
| P-03 | Celular | Agregar varios productos | Selección persiste al recargar |
| P-04 | Computador | Enviar contacto | Registro en Supabase o mensaje claro de modo local |
| E-01 | Celular | Registrar participante | Código creado y acceso a la sala |
| E-02 | Dos celulares | Entrar a la sala | Ambos aparecen en presencia y contadores |
| E-03 | Admin | Cerrar registro | Nuevo registro es rechazado de forma comprensible |
| T-01 | Admin | Activar siguiente | Respeta alternancia presencial/virtual |
| T-02 | Televisor | Observar turno | Nombre y cronómetro coinciden con administración |
| G-01 | Participante activo | Responder Trivia | Solo una respuesta y resultado sincronizado |
| G-02 | Participante no activo | Intentar responder | Controles deshabilitados y servidor rechaza manipulación |
| G-03 | Todos | Votar favorito | Un voto por persona y ranking en vivo |
| G-04 | Participante activo | Girar ruleta | Un giro, mismo resultado en todas las vistas |
| R-01 | Ganador | Reclamar recompensa | Código visible y mensaje de WhatsApp preparado |
| C-01 | Admin | Recuperación suave | Rondas cerradas, turno libre y datos históricos conservados |
| S-01 | Usuario no autorizado | Abrir panel | Acceso denegado y sesión cerrada |

## Resoluciones visuales

Comprobar como mínimo:

- 360 × 800 px: celular pequeño.
- 390 × 844 px: celular habitual.
- 768 × 1024 px: tableta vertical.
- 1366 × 768 px: portátil.
- 1920 × 1080 px: televisor Full HD.

## Prueba de red

1. Abrir la sala en dos dispositivos.
2. Desactivar internet durante 20 segundos en uno.
3. Reactivar la conexión.
4. Verificar que la interfaz no invente datos y que pueda recuperar el estado al recargar.
5. Repetir con la vista de televisor.

## Criterio de aprobación

No publicar como versión definitiva si existe alguno de estos bloqueos:

- Dos participantes activos al mismo tiempo.
- Premios duplicados por una sola ronda.
- Datos privados visibles en la pantalla pública.
- Usuario no autorizado capaz de leer o modificar información.
- Cronómetro con diferencias relevantes entre vistas.
- Error que impida recuperar la sala desde contingencia.

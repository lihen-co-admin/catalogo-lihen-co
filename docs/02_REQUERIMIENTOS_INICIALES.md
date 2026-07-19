# Requerimientos iniciales

## 1. Requerimientos funcionales

### Catálogo

| ID | Requerimiento |
|---|---|
| RF-01 | El sistema debe mostrar la identidad visual de LIHEN.CO. |
| RF-02 | El sistema debe mostrar productos agrupados por línea y categoría. |
| RF-03 | El usuario debe poder filtrar productos. |
| RF-04 | El usuario debe poder abrir el detalle de un producto. |
| RF-05 | El detalle debe mostrar imágenes, información y precio disponible. |
| RF-06 | El usuario debe poder seleccionar uno o varios productos. |
| RF-07 | El sistema debe construir un mensaje de consulta para WhatsApp. |
| RF-08 | La navegación debe permitir regresar y cerrar modales sin perder el estado necesario. |

### Inauguración

| ID | Requerimiento |
|---|---|
| RF-09 | Una persona debe poder registrarse como participante presencial o virtual. |
| RF-10 | El sistema debe guardar el orden de registro. |
| RF-11 | El sistema debe impedir registros cuando la administradora cierre la sala. |
| RF-12 | El sistema debe mostrar participantes conectados. |
| RF-13 | La administradora debe poder activar el siguiente turno. |
| RF-14 | Solo el participante activo debe poder interactuar en juegos por turno. |
| RF-15 | Los votos simultáneos deben registrarse y reflejarse en un ranking. |
| RF-16 | La ruleta debe finalizar en un resultado válido y sincronizado. |
| RF-17 | Los resultados y ganadores deben almacenarse. |
| RF-18 | Un ganador debe recibir una ruta a WhatsApp para reclamar su recompensa. |
| RF-19 | Un ganador puede quedar inhabilitado para rondas posteriores cuando la regla lo establezca. |
| RF-20 | La administradora debe poder reiniciar o recuperar un juego mediante contingencia. |

### Administración y proyección

| ID | Requerimiento |
|---|---|
| RF-21 | La administradora debe autenticarse o validarse antes de controlar la sala. |
| RF-22 | La administradora debe poder iniciar, pausar, continuar y cerrar juegos. |
| RF-23 | La administradora debe poder eliminar o corregir participantes cuando sea necesario. |
| RF-24 | Debe existir una vista de espectador que no cuente como participante. |
| RF-25 | La vista de espectador debe mostrar estado, turno, ranking y resultados. |

## 2. Requerimientos no funcionales

| ID | Requerimiento |
|---|---|
| RNF-01 | La interfaz debe adaptarse a celular, tableta, computador y pantalla grande. |
| RNF-02 | Los textos principales deben ser legibles a distancia en la vista de proyección. |
| RNF-03 | El proyecto debe separar HTML, CSS, JavaScript, datos y servicios. |
| RNF-04 | Cada archivo JavaScript debe tener una responsabilidad principal clara. |
| RNF-05 | El código debe estar formateado y documentado sin comentarios innecesarios. |
| RNF-06 | Las operaciones críticas deben mostrar mensajes comprensibles de éxito o error. |
| RNF-07 | El sitio debe funcionar en versiones recientes de Chrome, Edge, Firefox y Safari. |
| RNF-08 | Las imágenes deben optimizarse para no bloquear innecesariamente la carga. |
| RNF-09 | Las claves privadas no deben exponerse en el repositorio ni en el navegador. |
| RNF-10 | Las políticas de Supabase deben limitar las operaciones según el rol. |
| RNF-11 | La sala realtime debe recuperarse de desconexiones temporales cuando sea posible. |
| RNF-12 | Debe existir una alternativa manual de contingencia para el evento. |
| RNF-13 | La navegación debe permitir uso básico mediante teclado. |
| RNF-14 | Los botones interactivos deben tener tamaño suficiente para pantalla táctil. |
| RNF-15 | La publicación debe realizarse en un entorno de pruebas antes de producción. |

## 3. Reglas de negocio iniciales

| ID | Regla |
|---|---|
| RN-01 | El registro puede cerrarse cinco minutos después del inicio, según la configuración del evento. |
| RN-02 | Los participantes deben conservar su orden de llegada. |
| RN-03 | La alternancia presencial/virtual debe aplicarse cuando ambas filas tengan participantes. |
| RN-04 | Solo el turno activo puede responder en juegos no simultáneos. |
| RN-05 | Vota tu favorito permite participación simultánea. |
| RN-06 | Trivia, Encuentra la palabra y Reto relámpago pueden generar ganadores con premio. |
| RN-07 | Los premios disponibles deben respetar cantidades máximas configuradas. |
| RN-08 | La ruleta no debe simular un movimiento que contradiga el resultado final. |
| RN-09 | El modo espectador no puede registrarse ni alterar conteos. |
| RN-10 | La administradora puede aplicar contingencia si la sincronización falla. |

## 4. Pendientes por confirmar

- Número exacto de unidades para cada premio.
- Distribución entre descuentos del 10 % y 15 %.
- Duración definitiva de cada turno.
- Número de rondas por juego.
- Datos obligatorios del registro.
- Tiempo de conservación de participantes y resultados.
- Método definitivo de acceso administrativo.
- URL corporativa definitiva de WhatsApp.

# Apuntes por archivo — Etapa 4

## `js/components/introVideo.js`
Controla únicamente la introducción. Revisa si ya fue vista en la sesión, reproduce el video, permite omitirlo y libera el desplazamiento de la página al terminar.

## `js/components/reveal.js`
Observa las secciones mientras se desplaza la página. Cuando una entra en pantalla, agrega la clase que activa la animación. No contiene información de productos.

## `js/components/accordion.js`
Controla las preguntas frecuentes. Actualiza `aria-expanded`, muestra u oculta la respuesta y mantiene el comportamiento accesible.

## `js/components/purpose.js`
Muestra u oculta la explicación extendida del propósito. Este comportamiento quedó separado del HTML y no usa `onclick` en línea.

## `js/components/pageEnhancements.js`
Agrupa mejoras generales pequeñas: barra de progreso, contadores y accesos que activan un filtro del catálogo.

## `css/components/intro.css`
Contiene solamente la presentación visual del video de introducción.

## `css/components/institutional.css`
Contiene estilos de propósito, valores, Studio, pasos, condiciones, FAQ, pie de página, animaciones y botón flotante.

## `index.html`
Conserva el contenido y la estructura semántica. No contiene la lógica de reproducción, acordeones, filtros ni animaciones.

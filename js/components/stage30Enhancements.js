/**
 * ETAPA 30 · Navegación, favicon, títulos y accesos rápidos.
 *
 * En este archivo concentro las mejoras globales que deben funcionar en todas
 * las páginas públicas de LIHEN.CO. Lo separo del catálogo para que cada archivo
 * conserve una responsabilidad clara y sea más fácil de estudiar y mantener.
 */

// Aquí defino el nombre base que quiero mostrar en la pestaña del navegador.
const NOMBRE_BASE = 'LIHEN.CO';

// Aquí relaciono cada sección del inicio con el texto que debe aparecer después de la barra vertical.
const TITULOS_POR_HASH = {
  '#novedades': 'Novedades',
  '#beauty': 'Belleza',
  '#beauty-products': 'Belleza',
  '#style': 'Moda',
  '#style-products': 'Moda',
  '#accesorios': 'Accesorios',
  '#hogar': 'Así se vive LIHEN.CO',
  '#regalos': 'Ideas para regalar',
  '#contacto': 'Información y contacto'
};

// Aquí identifico el nombre del archivo actual para asignar un título coherente en páginas independientes.
const archivoActual = window.location.pathname.split('/').pop() || 'index.html';

// Aquí creo una función pequeña para actualizar el título sin repetir la misma estructura en varios lugares.
function establecerTitulo(seccion) {
  // Aquí conservo siempre el nombre LIHEN.CO y agrego la sección visitada.
  document.title = `${NOMBRE_BASE} | ${seccion}`;
}

// Aquí calculo el título correcto cada vez que cambia la URL o se recarga la página.
function actualizarTituloDesdeLaRuta() {
  // Aquí manejo primero las páginas que tienen un archivo propio.
  const titulosPorArchivo = {
    'buscar.html': 'Buscar productos',
    'ideas-para-regalar.html': 'Ideas para regalar',
    'nosotros.html': 'Nosotros',
    'mi-seleccion.html': 'Mi selección',
    'terminos-y-condiciones.html': 'Términos y condiciones',
    'politica-de-privacidad.html': 'Política de privacidad',
    'cambios-y-devoluciones.html': 'Cambios y devoluciones',
    'politica-de-envios.html': 'Política de envíos'
  };

  // Aquí uso el título del archivo cuando la persona está fuera de la página principal.
  if (titulosPorArchivo[archivoActual]) {
    establecerTitulo(titulosPorArchivo[archivoActual]);
    return;
  }

  // Aquí uso el hash de la página principal para reflejar la sección seleccionada.
  const tituloDeSeccion = TITULOS_POR_HASH[window.location.hash] || 'Novedades';
  establecerTitulo(tituloDeSeccion);
}

// Aquí convierto cualquier lupa antigua en un enlace real hacia la página completa de búsqueda.
function prepararAccesoDeBusqueda() {
  // Aquí busco tanto el enlace nuevo como el botón antiguo para cubrir todas las páginas del proyecto.
  const controles = document.querySelectorAll('.search-trigger, [data-search-toggle]');

  // Aquí recorro cada control para asegurar el mismo comportamiento en toda la web.
  controles.forEach((control) => {
    // Aquí creo un enlace porque un enlace es más confiable y accesible para navegar a otra página.
    const enlace = document.createElement('a');

    // Aquí copio las clases visuales para que la lupa conserve el diseño actual.
    enlace.className = `${control.className || 'icon-btn'} search-trigger`.trim();

    // Aquí indico la página completa que debe abrirse al hacer clic.
    enlace.href = './buscar.html';

    // Aquí agrego una explicación accesible para lectores de pantalla.
    enlace.setAttribute('aria-label', 'Abrir la búsqueda de productos');

    // Aquí reutilizo el SVG existente cuando ya está disponible.
    enlace.innerHTML = control.querySelector('svg')
      ? control.querySelector('svg').outerHTML
      : '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="14" cy="14" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m19.5 19.5 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

    // Aquí reemplazo el control anterior para evitar eventos antiguos que bloqueaban la navegación.
    control.replaceWith(enlace);
  });
}

// Aquí preparo el escudo superior para que lleve a la información y contacto del pie de página.
function prepararAccesoAlPie() {
  // Aquí localizo todos los accesos con el estilo de escudo legal.
  const accesos = document.querySelectorAll('.legal-access');

  // Aquí aplico el mismo destino y comportamiento a cada página pública.
  accesos.forEach((acceso) => {
    // Aquí cambio el destino al footer de la página actual.
    acceso.setAttribute('href', '#contacto');

    // Aquí explico claramente la función del icono.
    acceso.setAttribute('aria-label', 'Ir a información, contacto y políticas');

    // Aquí intercepto el clic para realizar un desplazamiento suave y estable.
    acceso.addEventListener('click', (evento) => {
      // Aquí evito una navegación brusca por defecto.
      evento.preventDefault();

      // Aquí localizo el pie de página que contiene contacto, categorías y políticas.
      const pie = document.querySelector('#contacto');

      // Aquí desplazo la vista solo cuando el footer existe en la página actual.
      if (pie) {
        pie.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#contacto');
        actualizarTituloDesdeLaRuta();
      }
    });
  });
}

// Aquí simplifico el botón flotante para mostrar únicamente el icono de WhatsApp.
function simplificarWhatsAppFlotante() {
  // Aquí localizo todos los botones flotantes de contacto.
  document.querySelectorAll('.whatsapp-float').forEach((boton) => {
    // Aquí mantengo una etiqueta accesible aunque retire el texto visible.
    boton.setAttribute('aria-label', 'Contactar por WhatsApp');

    // Aquí uso un SVG reconocible para evitar que la interfaz se vea saturada.
    boton.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 4.2A11.6 11.6 0 0 0 6 21.6L4.5 27.8l6.4-1.5A11.6 11.6 0 1 0 16 4.2Zm0 20.9c-1.9 0-3.7-.5-5.2-1.5l-.4-.2-3.8.9.9-3.7-.2-.4A9.2 9.2 0 1 1 16 25.1Zm5.1-6.9c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.4.2-.7.1-2-.8-3.3-2.8-3.5-3.2-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z"/></svg>';
  });
}

// Aquí actualizo el título cuando la persona navega con los enlaces, el botón atrás o el botón adelante.
window.addEventListener('hashchange', actualizarTituloDesdeLaRuta);
window.addEventListener('popstate', actualizarTituloDesdeLaRuta);

// Aquí ejecuto todas las mejoras cuando el documento ya está disponible.
prepararAccesoDeBusqueda();
prepararAccesoAlPie();
simplificarWhatsAppFlotante();
actualizarTituloDesdeLaRuta();

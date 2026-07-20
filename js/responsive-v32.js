/**
 * ETAPA 32 · COMPORTAMIENTOS RESPONSIVE MULTIDISPOSITIVO
 *
 * En este archivo organizo las interacciones que dependen del tamaño de pantalla.
 * Mantengo aquí el menú móvil, los cierres accesibles y las correcciones táctiles
 * para no mezclar estas responsabilidades con la lógica del catálogo.
 */

// Aquí guardo el ancho máximo que utilizo para considerar activa la navegación móvil.
const CONSULTA_MOVIL = window.matchMedia('(max-width: 950px)');

// Aquí localizo los elementos principales del encabezado que necesito coordinar.
const encabezado = document.querySelector('.site-header');
const anuncio = document.querySelector('.announcement');
let botonMenu = document.querySelector('.menu-toggle');
const navegacion = document.querySelector('.main-nav');

// Aquí calculo la altura real del anuncio y del encabezado para colocar bien el menú.
function actualizarAlturaDelEncabezado() {
  // Aquí termino cuando la página actual no tiene encabezado comercial.
  if (!encabezado) return;

  // Aquí sumo la altura del anuncio y la altura visible del encabezado.
  const altoAnuncio = anuncio?.getBoundingClientRect().height || 0;
  const altoEncabezado = encabezado.getBoundingClientRect().height || 0;

  // Aquí guardo una variable CSS que puedo reutilizar desde la hoja responsive.
  document.documentElement.style.setProperty(
    '--mobile-header-offset',
    `${Math.round(altoAnuncio + altoEncabezado)}px`
  );
}

// Aquí cierro el menú móvil y devuelvo la página a su estado normal.
function cerrarMenuMovil() {
  // Aquí retiro la clase que hace visible el panel.
  navegacion?.classList.remove('open');

  // Aquí informo a tecnologías de apoyo que el menú está cerrado.
  botonMenu?.setAttribute('aria-expanded', 'false');

  // Aquí retiro el bloqueo de desplazamiento que corresponde al menú.
  document.body.classList.remove('mobile-menu-open');
}

// Aquí abro o cierro el menú móvil con un comportamiento uniforme.
function alternarMenuMovil() {
  // Aquí termino cuando falta alguno de los controles necesarios.
  if (!botonMenu || !navegacion) return;

  // Aquí determino si debo abrir el menú según su estado actual.
  const debeAbrirse = !navegacion.classList.contains('open');

  // Aquí aplico el nuevo estado visual.
  navegacion.classList.toggle('open', debeAbrirse);

  // Aquí actualizo el atributo accesible del botón.
  botonMenu.setAttribute('aria-expanded', String(debeAbrirse));

  // Aquí bloqueo solamente el fondo mientras el menú móvil está abierto.
  document.body.classList.toggle('mobile-menu-open', debeAbrirse);
}

// Aquí reemplazo el evento anterior del botón para evitar que se ejecute dos veces.
function prepararBotonDelMenu() {
  // Aquí termino si la página no incluye navegación móvil.
  if (!botonMenu || !navegacion) return;

  // Aquí creo una copia limpia del botón sin eventos anteriores.
  const botonLimpio = botonMenu.cloneNode(true);

  // Aquí reemplazo el botón original por la copia limpia.
  botonMenu.replaceWith(botonLimpio);

  // Aquí actualizo la referencia para que las funciones posteriores usen el botón visible.
  botonMenu = botonLimpio;

  // Aquí escucho el clic únicamente con la lógica de esta etapa.
  botonLimpio.addEventListener('click', alternarMenuMovil);

  // Aquí cierro el menú después de seleccionar una opción.
  navegacion.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', cerrarMenuMovil);
  });
}

// Aquí convierto las tarjetas con efecto hover en elementos útiles mediante toque.
function prepararTarjetasTactiles() {
  // Aquí recorro todas las tarjetas de producto y contenido intercambiable.
  document.querySelectorAll('.product-card, .swap-card').forEach((tarjeta) => {
    // Aquí escucho el primer toque sin impedir el funcionamiento de botones y enlaces.
    tarjeta.addEventListener('pointerup', (evento) => {
      // Aquí ignoro la acción cuando la persona tocó un control interactivo real.
      if (evento.target.closest('button, a, input, select, textarea')) return;

      // Aquí aplico el estado alternativo solamente en dispositivos táctiles.
      if (window.matchMedia('(hover: none)').matches) {
        tarjeta.classList.toggle('is-touch-active');
      }
    });
  });
}

// Aquí cierro elementos abiertos cuando la persona presiona la tecla Escape.
function prepararCierreConEscape() {
  // Aquí escucho cada pulsación de teclado en la página.
  document.addEventListener('keydown', (evento) => {
    // Aquí termino cuando la tecla no es Escape.
    if (evento.key !== 'Escape') return;

    // Aquí cierro primero el menú móvil.
    cerrarMenuMovil();

    // Aquí intento cerrar el modal de producto mediante su botón existente.
    document.querySelector('[data-modal-close]')?.click();

    // Aquí intento cerrar Mi selección mediante su botón existente.
    document.querySelector('[data-drawer-close]')?.click();

    // Aquí intento cerrar el beneficio de bienvenida mediante su botón existente.
    document.querySelector('[data-welcome-close]')?.click();
  });
}

// Aquí corrijo la interfaz cuando cambia el tamaño o la orientación del dispositivo.
function responderAlCambioDePantalla() {
  // Aquí recalculo la posición del menú móvil.
  actualizarAlturaDelEncabezado();

  // Aquí cierro el menú cuando la pantalla vuelve al diseño de escritorio.
  if (!CONSULTA_MOVIL.matches) cerrarMenuMovil();
}

// Aquí preparo el botón del menú después de que todos los módulos anteriores se cargaron.
prepararBotonDelMenu();

// Aquí preparo la interacción táctil de las tarjetas.
prepararTarjetasTactiles();

// Aquí habilito el cierre accesible con Escape.
prepararCierreConEscape();

// Aquí calculo la posición inicial del menú.
actualizarAlturaDelEncabezado();

// Aquí actualizo la interfaz cuando cambia el tamaño de la ventana.
window.addEventListener('resize', responderAlCambioDePantalla, { passive: true });

// Aquí actualizo la interfaz cuando cambia la orientación física del equipo.
window.addEventListener('orientationchange', responderAlCambioDePantalla, { passive: true });

// Aquí respondo también cuando cambia directamente la consulta de pantalla.
CONSULTA_MOVIL.addEventListener?.('change', responderAlCambioDePantalla);

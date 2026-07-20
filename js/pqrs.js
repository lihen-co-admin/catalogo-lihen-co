// Aquí preparo el formulario de PQRS para que la persona pueda conservar un radicado antes de enviar su solicitud.
const formularioPQRS = document.querySelector('#pqrs-form');
const resultadoPQRS = document.querySelector('#pqrs-result');

// Aquí creo un radicado sencillo usando la fecha, la hora y un número aleatorio corto.
function crearRadicado() {
  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10).replaceAll('-', '');
  const hora = ahora.toTimeString().slice(0, 8).replaceAll(':', '');
  const aleatorio = Math.floor(100 + Math.random() * 900);
  return `LIHEN-${fecha}-${hora}-${aleatorio}`;
}

// Aquí convierto los datos del formulario en un mensaje ordenado para el correo corporativo.
function construirMensaje(datos, radicado, fechaHora) {
  return [
    `Radicado: ${radicado}`,
    `Fecha y hora: ${fechaHora}`,
    `Nombre: ${datos.get('nombre')}`,
    `Correo: ${datos.get('correo')}`,
    `Teléfono: ${datos.get('telefono')}`,
    `Pedido: ${datos.get('pedido') || 'No informado'}`,
    `Tipo: ${datos.get('tipo')}`,
    `Medio de respuesta: ${datos.get('medio')}`,
    '',
    'Descripción:',
    datos.get('descripcion')
  ].join('\n');
}

// Aquí escucho el envío, valido los campos y abro el correo con toda la información preparada.
formularioPQRS?.addEventListener('submit', (evento) => {
  evento.preventDefault();

  if (!formularioPQRS.checkValidity()) {
    formularioPQRS.reportValidity();
    return;
  }

  const datos = new FormData(formularioPQRS);
  const radicado = crearRadicado();
  const fechaHora = new Date().toLocaleString('es-CO');
  const mensaje = construirMensaje(datos, radicado, fechaHora);
  const asunto = encodeURIComponent(`PQRS LIHEN.CO - ${radicado}`);
  const cuerpo = encodeURIComponent(mensaje);
  const enlaceCorreo = `mailto:hl.lihen.co@gmail.com?subject=${asunto}&body=${cuerpo}`;

  resultadoPQRS.hidden = false;
  resultadoPQRS.innerHTML = `<h2>Tu radicado es ${radicado}</h2><p>Fecha y hora: ${fechaHora}</p><p>Guarda este número y pulsa el botón para enviar la solicitud desde tu correo.</p><a class="pqrs-send" href="${enlaceCorreo}">Abrir correo y enviar</a>`;
  resultadoPQRS.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

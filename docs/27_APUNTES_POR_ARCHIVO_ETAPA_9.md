# Apuntes por archivo — Etapa 9

## `inauguracion/index.html`
Creé una página independiente para no mezclar la inauguración con el catálogo. Contiene estructura semántica, formulario, reglas, vista de acceso y sala.

## `css/pages/inauguration.css`
Guardé únicamente el diseño de la inauguración. Incluí cambios para celular, tableta, computador y pantalla grande.

## `Participant.js`
Creé una clase para que cada participante tenga la misma estructura y pueda convertirse al formato de la base de datos.

## `participantValidations.js`
Separé las validaciones del formulario. También genera un código local de acceso.

## `participantRepository.js`
Guarda, lee y elimina el registro local sin obligar a otros archivos a conocer la clave de `localStorage`.

## `remoteParticipantRepository.js`
Su única responsabilidad es insertar el registro en Supabase.

## `participantService.js`
Coordina respaldo local y envío remoto. Si falla internet, conserva el registro local.

## `registration.js`
Conecta el formulario con las validaciones, el modelo, el servicio y la vista de sala.

## `rulesDialog.js`
Controla el diálogo de reglas sin usar `onclick` dentro del HTML.

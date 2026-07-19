# Apuntes por archivo — Etapa 6

## `js/models/Customer.js`

Creo una plantilla para representar a una persona con datos consistentes. Normalizo el correo y puedo obtener el primer nombre para personalizar la respuesta.

## `js/models/ContactRequest.js`

Agrupo el cliente, asunto, mensaje, autorización, fecha y estado de la solicitud. Genero un identificador local para distinguir cada registro.

## `js/utils/contactValidations.js`

Centralizo las reglas del formulario. Devuelvo `isValid`, los errores y los datos normalizados. Así la interfaz no necesita conocer cada regla.

## `js/repositories/contactRepository.js`

Encapsulo la lectura y escritura de `localStorage`. El resto del proyecto no usa directamente sus claves internas.

## `js/pages/contact.js`

Coordino la interfaz: leo el formulario, ejecuto las validaciones, muestro errores, creo los modelos y llamo al repositorio.

## `css/components/contact-form.css`

Separo la presentación del formulario del resto del sitio y agrego estados visuales de foco, error y éxito.

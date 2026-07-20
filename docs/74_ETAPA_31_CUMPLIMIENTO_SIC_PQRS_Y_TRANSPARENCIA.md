# Etapa 31 - Cumplimiento SIC, PQRS y transparencia comercial

## Objetivo de esta etapa

En esta etapa incorporé los cambios que podía implementar sin inventar precios, direcciones o condiciones comerciales que todavía no han sido confirmadas por LIHEN.CO.

## 1. Enlace visible hacia la SIC

Agregué en los pies de página un enlace de texto hacia la Sede Electrónica de la Superintendencia de Industria y Comercio. Decidí no utilizar el logotipo institucional como sello, porque no quiero sugerir que la SIC avala, certifica o recomienda a LIHEN.CO.

El enlace abre una pestaña nueva y utiliza `noopener noreferrer` para evitar que la página externa pueda controlar la pestaña original.

## 2. Página de PQRS

Creé `pqrs.html` para que la persona pueda registrar una petición, queja, reclamo, solicitud de información, garantía, cambio o devolución.

En `js/pqrs.js`:

- genero un radicado con fecha, hora y un número aleatorio;
- valido los campos obligatorios;
- preparo el asunto y el cuerpo del correo;
- muestro el radicado antes de abrir la aplicación de correo;
- mantengo la solicitud bajo control de la persona, porque ella debe confirmar el envío.

Esta primera versión no guarda la PQRS en una base de datos. Para una fase posterior debo conectarla a Supabase y almacenar fecha, hora, estado y trazabilidad de cada caso.

## 3. Información de precios

No inventé precios. Cuando un producto todavía dice “Por confirmar”, ahora muestro además:

- que el precio definitivo se informará antes del pago;
- que el envío no está incluido;
- que la disponibilidad está sujeta a confirmación.

Cuando LIHEN.CO entregue la lista real de precios, debo reemplazar los valores “Por confirmar” en `js/data/products.js`.

## 4. Términos imprimibles y descargables

Agregué botones para:

- imprimir los términos;
- descargar una versión PDF;
- presentar una PQRS.

También corregí el texto de retracto para diferenciar:

- retracto legal;
- cambio comercial voluntario;
- garantía por defecto, vencimiento, inseguridad o incumplimiento.

## 5. WhatsApp oficial

Reemplacé los enlaces genéricos por el número oficial `573058947808` en los archivos públicos revisados.

## 6. Datos pendientes que no inventé

Todavía se deben confirmar:

- precios reales de cada referencia;
- dirección empresarial para notificaciones;
- plazos definitivos de entrega por zona;
- condiciones y vigencia de promociones;
- monto definitivo del envío gratis;
- almacenamiento de PQRS en Supabase.

## 7. Pruebas que realicé

- validé la sintaxis de los archivos JavaScript;
- ejecuté el validador del proyecto;
- verifiqué que el PDF se renderizara sin texto cortado;
- comprobé que los enlaces SIC usen una URL oficial;
- comprobé que el formulario genere un radicado y prepare el correo;
- confirmé que el ZIP final pueda abrirse y listar todos sus archivos.

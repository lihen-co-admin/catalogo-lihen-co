# Etapa 33 — Modal “No podré acompañarlos” y limpieza CSS

## Cambios funcionales
- Se añadió un modal de confirmación para la opción `no_asiste`.
- La persona debe aceptar la condición antes de registrar su ausencia.
- La selección se guarda con la modalidad `no_asiste` mediante el mismo flujo de confirmación existente.
- Después se prepara un mensaje personalizado de WhatsApp para dejar constancia de la ausencia.

## Cambios técnicos
- Se consolidaron las reglas finales repetidas del sello, transiciones, confeti, título y responsive.
- Se eliminó la cadena de sobrescrituras acumulada en versiones anteriores.
- Se mantuvieron las reglas aprobadas como una única sección final V14.

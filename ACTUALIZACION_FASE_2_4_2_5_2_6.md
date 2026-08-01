# LIHEN.CO V18 — Cierre de la Fase 2

## Fase 2.4 — Animaciones y audio

Se creó `js/invitations/invitationExperience.js` para concentrar:

- transición de entrada al sello;
- apertura visual de la invitación;
- confeti y destellos;
- ambiente sonoro Web Audio;
- activación y pausa del sonido.

## Fase 2.5 — Estado y coordinación

Se creó `js/invitations/invitationState.js` para administrar:

- invitación activa;
- modalidad elegida;
- cantidad de asistentes;
- nombre digitado;
- código del enlace;
- ubicación protegida.

`js/pages/invitaciones.js` conserva la coordinación del flujo y los enlaces entre validadores, repositorio, vista, estado y experiencia.

## Fase 2.6 — Regresión y cierre

Validaciones requeridas:

```bash
npm run check
npm run check:js
npm run dev
```

Casos manuales mínimos:

1. `LHN-LIZ-018` con `Andrés Cardona`.
2. Código `NOEXISTE`.
3. Apertura del sello y confeti.
4. Activar y pausar ambiente.
5. Abrir y cerrar programación.
6. Elegir modalidad presencial.
7. Elegir modalidad virtual y aceptar el aviso.
8. Elegir no asistencia y aceptar el aviso.
9. Confirmar consentimiento y respuesta.
10. Comprobar que la ubicación solo se revele tras una confirmación presencial válida.

No se modificaron tablas, funciones, políticas ni migraciones de Supabase.

# LIHEN.CO V18 — Fase 2.3

## Objetivo
Separar la interfaz y el renderizado del flujo de invitaciones sin modificar Supabase, la base de datos ni el diseño visible.

## Archivos incluidos

- `invitaciones/index.html`
- `js/pages/invitaciones.js`
- `js/invitations/invitationView.js`

## Cambios realizados

- Se creó `invitationView.js` como módulo responsable de las actualizaciones del DOM.
- Se extrajeron el cambio de pantallas, mensajes, datos del invitado, selector de asistentes, modalidad virtual exclusiva, botones, programación, ubicación protegida, WhatsApp, QR y estado del sonido.
- `invitaciones.js` conserva la coordinación del flujo, validación, repositorio, eventos y estado.
- La versión de caché del punto de entrada cambió de `v=181` a `v=182`.
- No se modificaron tablas, funciones RPC, políticas RLS ni migraciones SQL.

## Validaciones realizadas

- `node --check js/pages/invitaciones.js`
- `node --check js/invitations/invitationView.js`
- `npm run check`
- `npm run check:js`

El archivo `js/config/env.js` no viene en los ZIP descargados de GitHub porque está ignorado. Para la validación automática se utilizó temporalmente una configuración vacía y no se incluyó en este paquete.

## Pruebas manuales requeridas antes del commit

1. Abrir `http://localhost:3000/invitaciones/?codigo=LHN-LIZ-018`.
2. Escribir `Andrés Cardona` y comprobar que abre la invitación.
3. Verificar “Ver programación” y “Elegir modalidad”.
4. Seleccionar modalidad virtual y presencial cuando corresponda.
5. Abrir `http://localhost:3000/invitaciones/?codigo=NOEXISTE` y confirmar el error controlado.
6. Confirmar que no aparece el mensaje de error de inicialización.

## Commit recomendado

```bash
git add invitaciones/index.html
git add js/pages/invitaciones.js
git add js/invitations/invitationView.js
git add ACTUALIZACION_FASE_2_3.md
git commit -m "refactor: separar interfaz del modulo de invitaciones"
git push origin refactor/lihen-v18
git status
```

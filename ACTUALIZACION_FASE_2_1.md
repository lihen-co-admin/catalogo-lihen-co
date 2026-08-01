# LIHEN.CO V18 — Fase 2.1

## Objetivo
Extraer la normalización y validación de nombres del archivo principal de invitaciones sin cambiar el comportamiento visible.

## Archivos incluidos

- `js/invitations/invitationValidators.js` — nuevo módulo puro de validación.
- `js/pages/invitaciones.js` — consume el módulo nuevo y elimina la lógica duplicada.
- `invitaciones/index.html` — actualiza la versión de caché del módulo principal de `v=171` a `v=180`.

## Aplicación

1. Copia el contenido de este paquete dentro de la raíz de `LIHEN_WEB_RENACER`.
2. Acepta combinar carpetas y reemplazar archivos.
3. No borres otros archivos del proyecto.

## Validación local

Ejecuta:

```bash
npm run check
npm run check:js
npm run dev
```

Prueba:

```text
http://localhost:3000/invitaciones/?codigo=LHN-LIZ-018
```

Casos mínimos:

- Nombre correcto: `Andrés Cardona`.
- Nombre abreviado válido: `Andrés`.
- Nombre incorrecto: debe mostrar el mensaje de validación y no abrir la invitación.
- Código inexistente: debe mostrar un error controlado.

## Commit recomendado

```bash
git add invitaciones/index.html js/pages/invitaciones.js js/invitations/invitationValidators.js
git commit -m "refactor: extraer validadores del modulo de invitaciones"
git push origin refactor/lihen-v18
git status
```

## Validaciones realizadas antes de la entrega

- `npm run check`: aprobado con un `env.js` temporal vacío, porque GitHub no incluye ese archivo ignorado en el ZIP.
- `npm run check:js`: aprobado.
- 108 archivos JavaScript revisados.
- 169 contratos de importación/exportación revisados.
- 18 páginas HTML activas revisadas.
- Pruebas unitarias rápidas de normalización, alias y coincidencia de nombres: aprobadas.

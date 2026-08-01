# LIHEN.CO V18 — Fase 2.2

## Objetivo

Separar el acceso a datos del módulo de invitaciones mediante un repositorio, sin alterar la experiencia visual ni las reglas de negocio.

## Archivos incluidos

- `js/invitations/invitationRepository.js` — nuevo repositorio para búsqueda y confirmación.
- `js/pages/invitaciones.js` — deja de llamar directamente a Supabase y a los datos locales.
- `invitaciones/index.html` — actualización de caché a `v=181`.

## Validaciones requeridas

```bash
npm run check
npm run check:js
npm run dev
```

Probar:

- `http://localhost:3000/invitaciones/?codigo=LHN-LIZ-018` con `Andrés Cardona`.
- `http://localhost:3000/invitaciones/?codigo=NOEXISTE`.
- Selección de modalidad y preparación de confirmación.

## Commit sugerido

```bash
git add invitaciones/index.html
git add js/pages/invitaciones.js
git add js/invitations/invitationRepository.js
git add ACTUALIZACION_FASE_2_2.md
git commit -m "refactor: separar acceso a datos de invitaciones"
git push origin refactor/lihen-v18
```

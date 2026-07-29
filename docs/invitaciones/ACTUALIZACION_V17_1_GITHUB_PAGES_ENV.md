# LIHEN.CO · Actualización V17.1

## Problema corregido

La página de invitaciones funcionaba en localhost, pero fallaba en GitHub Pages porque `js/config/supabase.js` importaba `env.js`. Ese archivo está excluido por `.gitignore`, por lo que no existe en la publicación.

## Cambio aplicado

- `supabase.js` ya no depende obligatoriamente de `env.js`.
- Se usa una configuración pública opcional desde `globalThis.LIHEN_ENV`.
- Si Supabase no está configurado, el respaldo local continúa permitiendo abrir la invitación.
- Se actualizó la versión de caché a `v=171`.

## Comportamiento conservado

- Los códigos y enlaces individuales no cambian.
- La lista local de invitados se conserva.
- Las restricciones de invitaciones solo virtuales se conservan.

# V16.2 · Estabilización de invitaciones

- Se reemplazó la carga modular por un único bundle para evitar fallos de caché/importación en GitHub Pages.
- Se conservan los 109 invitados y la restricción `virtual_only`.
- El formulario mantiene `type="button"` y no puede cambiar la URL a `guestName`.
- La conexión real a Supabase sigue requiriendo completar la URL y la clave publicable antes de usar ubicación protegida y registro centralizado.

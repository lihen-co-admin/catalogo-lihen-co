# LIHEN.CO · V17 · Fase A: estabilización del inicio de invitaciones

## Problema atendido

La página publicada reconocía el código y permitía escribir el nombre, pero el botón **Descubrir mi invitación** no avanzaba al sello.

## Cambios aplicados

1. Se dejó `js/pages/invitaciones.js` como único punto de entrada activo de la página.
2. La inicialización espera explícitamente a que el DOM esté disponible.
3. Los errores de inicio se capturan y se muestran en pantalla y consola.
4. Se versionaron el script principal y sus importaciones con `v=170` para evitar caché antigua en GitHub Pages.
5. Se mantuvo el diseño, las transiciones, los códigos, las modalidades y las reglas `virtual_only`.
6. El bundle anterior se conserva sin uso durante esta fase para facilitar comparación y reversión.

## Archivos modificados

- `invitaciones/index.html`
- `js/pages/invitaciones.js`
- `js/config/supabase.js`

## Validaciones ejecutadas

- `node --check js/pages/invitaciones.js`
- `node --check js/config/supabase.js`
- `npm run check`
- búsqueda de marcadores de conflicto Git

## Pruebas manuales requeridas después de publicar

1. Abrir `?codigo=LHN-DIA-003`, escribir `Erika Palomino` y comprobar que llega al sello.
2. Abrir `?codigo=LHN-LIZ-018`, escribir `Andrés Cardona` y comprobar que la opción presencial está oculta.
3. Probar un nombre incorrecto y verificar el mensaje de validación.
4. Revisar la consola del navegador y confirmar que no haya errores rojos.
5. Hacer recarga fuerte con `Ctrl + F5` después del despliegue.

## Pendiente deliberado

No se añadieron credenciales de Supabase. La conexión remota seguirá pendiente hasta configurar únicamente la URL del proyecto y la clave publicable. Nunca debe usarse una clave secreta o `service_role` en GitHub Pages.

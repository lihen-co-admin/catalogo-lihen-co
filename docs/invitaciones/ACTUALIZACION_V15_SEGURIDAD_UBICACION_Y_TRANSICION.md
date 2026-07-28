# V15 · Seguridad de ubicación y transición de acceso

## Cambios aplicados
1. La dirección y el enlace de Google Maps se retiraron del HTML y del JavaScript público.
2. La ubicación solo se solicita como parte de la respuesta segura de Supabase después de confirmar modalidad presencial.
3. Las modalidades virtual y no asistencia nunca reciben datos de ubicación.
4. El botón de ubicación permanece bloqueado y conduce al formulario de modalidad mientras no haya confirmación presencial.
5. La transición desde «Descubrir mi invitación» hasta el sello se amplió para que las ondas, la bruma y la aparición progresiva sean perceptibles en computador, tableta y celular.
6. Las pruebas locales no revelan ubicación; esto evita simular una seguridad inexistente en un sitio estático.

## Paso requerido en Supabase
Ejecutar nuevamente `docs/invitaciones/supabase_invitaciones.sql` y luego guardar la ubicación real directamente en la tabla privada indicada por el archivo SQL. No subir la dirección a GitHub.

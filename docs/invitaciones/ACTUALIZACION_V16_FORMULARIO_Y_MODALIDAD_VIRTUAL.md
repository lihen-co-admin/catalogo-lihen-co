# Actualización V16

- Corrige el formulario para conservar `?codigo=...` y evitar que el navegador cambie a `?guestName=...`.
- Añade carga forzada del JavaScript con versión `v=16`.
- Actualiza el respaldo local con 109 invitaciones activas.
- Elimina 4 códigos marcados como `Quitar`.
- Añade la propiedad `virtual_only`.
- Oculta la opción presencial para 20 invitaciones marcadas como virtual.
- La función de Supabase también bloquea la confirmación presencial para esas invitaciones.
- Amplía el cupo permitido hasta 4 personas porque el Excel contiene una invitación con máximo 4.

Antes de publicar:
1. Ejecutar `ACTUALIZACION_V16_INVITADOS_Y_SOLO_VIRTUAL.sql` en Supabase.
2. Probar códigos de Diana, Lizeth y Hellen.
3. Confirmar que una invitación virtual no muestre la modalidad presencial.
4. Subir el proyecto a GitHub.

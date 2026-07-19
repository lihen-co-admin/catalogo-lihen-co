# Reporte de validación · Etapa 8

## Comprobaciones automáticas

- Sintaxis JavaScript mediante `npm run check`.
- Página administrativa independiente.
- Autenticación persistente y renovación automática de sesión.
- Repositorio remoto separado de la interfaz.
- Políticas SQL de lectura y actualización restringidas.
- No se incluyeron claves reales ni `service_role`.

## Comprobaciones manuales pendientes

Estas pruebas requieren un proyecto real de Supabase configurado:

- Crear la cuenta administrativa.
- Autorizar el UUID en `admin_profiles`.
- Iniciar sesión desde `admin.html`.
- Consultar solicitudes existentes.
- Cambiar estados y comprobarlos en Supabase.

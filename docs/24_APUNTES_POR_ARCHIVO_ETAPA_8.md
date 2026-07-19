# Apuntes por archivo · Etapa 8

## `admin.html`
Creé una página separada para evitar mezclar el panel privado con el catálogo público. Contiene la vista de inicio de sesión y la vista de solicitudes.

## `js/services/adminAuthService.js`
Centralicé el inicio de sesión, cierre de sesión, lectura de sesión y validación del perfil administrativo. Así la interfaz no llama directamente a todos los métodos de autenticación.

## `js/repositories/adminContactRepository.js`
Separé las consultas a la tabla `contact_requests`. Este archivo lista solicitudes y actualiza su estado.

## `js/pages/admin.js`
Coordina la pantalla: escucha formularios y botones, solicita datos al repositorio y construye las tarjetas. No contiene credenciales ni políticas de seguridad.

## `css/pages/admin.css`
Contiene únicamente los estilos del panel para no aumentar los estilos de la página pública.

## `002_admin_auth_and_contact_management.sql`
Crea `admin_profiles` y las políticas RLS que autorizan lectura y actualización solo a administradores activos.

## Pruebas esperadas

1. Sin iniciar sesión, solo debe verse el formulario de acceso.
2. Con una cuenta no autorizada, el acceso debe rechazarse.
3. Con una administradora activa, deben aparecer las solicitudes.
4. Cambiar el estado debe persistir después de actualizar la página.
5. Cerrar sesión debe regresar a la vista de acceso.

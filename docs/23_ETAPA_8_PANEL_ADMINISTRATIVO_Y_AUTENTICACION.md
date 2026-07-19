# Etapa 8 · Panel administrativo y autenticación segura

## Objetivo

Crear un espacio privado para que LIHEN.CO pueda consultar y organizar las solicitudes recibidas, sin permitir que el público lea los datos de los clientes.

## Resultado construido

Se añadió `admin.html`, una pantalla separada del sitio público. La administradora debe iniciar sesión con correo y contraseña usando Supabase Auth. Después de autenticarse, el sistema confirma que la cuenta también exista como perfil activo en `admin_profiles`.

El panel permite:

- Consultar solicitudes en orden de la más reciente a la más antigua.
- Filtrar por estado.
- Buscar por nombre, correo o asunto.
- Ver los datos de contacto y el mensaje.
- Cambiar el estado entre nueva, en revisión, respondida y cerrada.
- Abrir un correo de respuesta.
- Cerrar la sesión.

## Preparación en Supabase

1. Ejecutar primero `supabase/migrations/001_create_contact_requests.sql`.
2. Ejecutar `supabase/migrations/002_admin_auth_and_contact_management.sql`.
3. Entrar a **Authentication → Users → Add user**.
4. Crear la cuenta administrativa con correo y contraseña segura.
5. Copiar el UUID de la cuenta creada.
6. Ejecutar en SQL Editor:

```sql
insert into public.admin_profiles (user_id, display_name)
values ('UUID-DE-LA-CUENTA', 'Lina Lizeth');
```

7. Configurar `js/config/env.js` con la URL y la clave pública de Supabase.
8. Ejecutar `npm run dev` y abrir `/admin.html`.

## Seguridad aplicada

- La clave pública puede estar en el navegador; la clave `service_role` no se usa.
- El público conserva únicamente permiso de inserción en `contact_requests`.
- Solo un usuario autenticado y autorizado en `admin_profiles` puede consultar o actualizar solicitudes.
- Una cuenta creada en Auth pero no registrada como administradora será expulsada inmediatamente.
- Las políticas RLS siguen siendo la protección principal aunque alguien inspeccione el JavaScript.

## Límite actual

El panel administra solicitudes de contacto. Todavía no incluye inventario, productos, inauguración, juegos ni participantes.

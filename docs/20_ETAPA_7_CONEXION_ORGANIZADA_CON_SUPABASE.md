# Etapa 7 · Conexión organizada con Supabase

## Objetivo
Preparar el envío remoto de solicitudes sin mezclar credenciales, base de datos, interfaz y validaciones en un mismo archivo.

## Flujo implementado
1. El formulario valida los datos.
2. Se crea `Customer` y `ContactRequest`.
3. `contactService.js` crea primero un respaldo local.
4. `remoteContactRepository.js` intenta insertar en Supabase.
5. Si la inserción funciona, el respaldo local queda marcado `synced`.
6. Si falta configuración o falla la red, queda `pending-remote` y la interfaz informa que LIHEN.CO todavía no recibió la solicitud.

## Configuración paso a paso
1. En Supabase abre **SQL Editor**.
2. Ejecuta `supabase/migrations/001_create_contact_requests.sql`.
3. En **Project Settings > API** copia la Project URL y la clave pública `anon` o `publishable`.
4. Copia `js/config/env.example.js` como `js/config/env.js`.
5. Completa únicamente `SUPABASE_URL` y `SUPABASE_ANON_KEY`.
6. Nunca uses `service_role` en una página web.
7. Ejecuta `npm run dev`.

## Seguridad aplicada
- Row Level Security activado.
- El visitante solo puede insertar.
- No existe política pública para leer, modificar o borrar solicitudes.
- La clave administrativa no se incluye en el frontend.
- El proyecto funciona en modo local cuando no hay configuración.

## Prueba esperada
Con Supabase configurado, el formulario muestra “Conexión remota preparada”. Al enviar datos válidos debe aparecer un registro en `contact_requests` y un mensaje de confirmación real.

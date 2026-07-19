# Apuntes por archivo · Etapa 7

## `js/config/env.example.js`
Plantilla que enseña cuáles valores se requieren sin compartir credenciales reales.

## `js/config/supabase.js`
Lee y valida la configuración. No crea consultas ni modifica la interfaz.

## `js/services/supabaseClient.js`
Carga la librería oficial de Supabase y crea una sola instancia reutilizable.

## `js/repositories/remoteContactRepository.js`
Traduce el objeto del proyecto a las columnas de la tabla y ejecuta el `insert`.

## `js/services/contactService.js`
Orquesta el respaldo local y el envío remoto. Decide el resultado que verá la interfaz.

## `js/repositories/contactRepository.js`
Continúa administrando `localStorage`, pero ahora registra si una solicitud está sincronizada o pendiente.

## `supabase/migrations/001_create_contact_requests.sql`
Crea la tabla, restricciones, índice, RLS y política de inserción pública.

## Aprendizaje central
Separar responsabilidades permite cambiar Supabase en el futuro sin reescribir el formulario completo.

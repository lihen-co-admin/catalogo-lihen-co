# Guía de despliegue — Netlify y Supabase

## 1. Preparar Supabase

Ejecutar en SQL Editor, uno por uno y en orden, los archivos de `supabase/migrations/001_...` hasta `012_...`. Si una migración falla, detenerse y corregirla antes de continuar.

Crear el usuario administrador en Authentication y agregar su UUID a `public.admin_profiles`.

## 2. Configurar el frontend

En la copia privada para despliegue, editar:

```javascript
// js/config/env.js
export const ENV = {
  SUPABASE_URL: "https://TU-PROYECTO.supabase.co",
  SUPABASE_ANON_KEY: "TU-CLAVE-PUBLICA",
};
```

La clave `anon`/`publishable` es pública por diseño, pero la seguridad real depende de RLS. Nunca usar `service_role`.

## 3. Validar

```bash
npm run check
npm run dev
```

Probar todas las rutas antes de comprimir o subir.

## 4. Publicar en Netlify

El proyecto es estático y `netlify.toml` ya define `publish = "."`.

Opciones:

- Arrastrar la carpeta completa en Netlify Drop.
- Conectar un repositorio Git y dejar vacío el comando de compilación.

No subir el ZIP como archivo dentro del sitio; subir su contenido descomprimido.

## 5. Rutas cortas preparadas

- `/admin` → `/admin.html`
- `/evento-admin` → `/evento-admin.html`
- `/pantalla` → `/inauguracion/pantalla.html`
- `/inauguracion` → `/inauguracion/`

## 6. Verificación posterior

Abrir la URL pública en modo incógnito y probar:

1. Página principal y recursos visuales.
2. Registro de inauguración.
3. Inicio de sesión administrativo.
4. Realtime entre dos redes diferentes.
5. Pantalla pública Full HD.
6. Formulario de contacto.
7. Encabezados y página 404.

## 7. Recomendación de publicación

Mantener dos sitios:

- Preproducción: pruebas y ensayos.
- Producción: evento real.

No experimentar con migraciones ni inventario directamente en producción durante la inauguración.

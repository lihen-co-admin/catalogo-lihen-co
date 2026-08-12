# Fase 18 — Operación de la tienda dinámica

## Fuente de catálogo

Producción estable:

```text
CATALOG_SOURCE = supabase
```

Transición/contingencia:

```text
CATALOG_SOURCE = auto
```

Rollback inmediato del frontend:

```text
CATALOG_SOURCE = static
```

## Qué debe actualizarse sin redeploy

- nombre;
- descripción;
- precio;
- stock/disponibilidad;
- visibilidad;
- estado;
- marca;
- categoría/subcategoría;
- imágenes/variantes cuando el contrato público las refleje.

## Diagnóstico rápido

Si un producto no aparece:

1. comprobar `status = activo`;
2. comprobar `visible_on_website = true`;
3. comprobar que `catalog_public` lo devuelve;
4. comprobar imagen/precio;
5. revisar consola de la WEB;
6. comprobar configuración Supabase;
7. probar temporalmente `CATALOG_SOURCE = static` para separar un problema de datos de un problema visual.

## Seguridad

La WEB solo debe utilizar URL del proyecto + Publishable Key. Nunca incluir credenciales administrativas o de servidor.

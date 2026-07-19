# Etapa 6 — Cliente, formulario y validaciones

## Objetivo

Construir un flujo de contacto organizado sin conectar todavía una base de datos. La práctica separa la representación de los datos, las reglas de validación, el almacenamiento local y la interfaz.

## Funcionalidades incorporadas

- Formulario accesible con nombre, correo, teléfono, ciudad, canal, asunto y mensaje.
- Consentimiento obligatorio para gestionar la consulta.
- Teléfono obligatorio únicamente al seleccionar WhatsApp.
- Mensajes de error junto a cada campo y enfoque automático en el primer error.
- Contador del mensaje hasta 800 caracteres.
- Modelos `Customer` y `ContactRequest`.
- Repositorio local basado en `localStorage`.
- Recuperación del perfil para no escribir nuevamente los datos básicos.
- Aviso explícito: la solicitud no se envía todavía a LIHEN.CO.

## Flujo

```text
Formulario
  → lectura de datos
  → validaciones
  → Customer
  → ContactRequest
  → contactRepository
  → localStorage
  → mensaje de confirmación local
```

## Ejecución

```bash
npm run dev
```

Abre la dirección local y ve a **Contacto**.

## Prueba mínima

1. Envía el formulario vacío y verifica los errores.
2. Selecciona WhatsApp sin teléfono y confirma la validación.
3. Completa datos válidos y guarda.
4. Recarga la página: nombre, correo y datos básicos deben recuperarse.
5. Abre DevTools → Application → Local Storage para observar las claves de práctica.

## Límite de esta etapa

El guardado local sirve para aprender. No es un envío real, no sincroniza dispositivos y no sustituye Supabase.

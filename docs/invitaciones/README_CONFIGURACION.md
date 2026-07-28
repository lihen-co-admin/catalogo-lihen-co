# Módulo de invitaciones LIHEN.CO

## Rutas creadas
- `/invitaciones/`: acceso privado por código único.
- `/transmision/`: invitación pública para redes y acceso al TikTok.

## Prueba inmediata
Abra `invitaciones/index.html` mediante un servidor local y use el código `LHN-DEMO-001`.

## Antes de publicar invitaciones reales
1. Configure Supabase en `js/config/env.js`.
2. Ejecute `docs/invitaciones/supabase_invitaciones.sql`.
3. Importe el archivo privado `data-private/invitados_provisionales.csv` en la tabla `invitations`.
4. Revise nombres, teléfonos, cupos y códigos.
5. No suba la carpeta `data-private/` a GitHub; quedó agregada a `.gitignore`.
6. Reemplace la dirección pendiente cuando Diana Nails la confirme.
7. Complete los invitados faltantes antes del envío final.

## Enlaces individuales
Ejemplo: `https://lihen-co-admin.github.io/catalogo-lihen-co/invitaciones/?codigo=LHN-DIA-001`

## Decisiones implementadas
- Máximo provisional: 3 personas por invitación.
- Invitaciones agrupadas descuentan sus personas nombradas del cupo total.
- Jhon David tiene invitación separada.
- Ruleta: participación y premios solo presenciales; audiencia virtual solo observa.
- Música ambiental generativa inicia únicamente tras interacción del usuario.
- Confirmación se guarda en Supabase y luego abre WhatsApp con mensaje preparado.

## Protección de la ubicación
- La dirección ya no se encuentra en el HTML ni en el JavaScript público.
- Solo `confirm_invitation` devuelve la ubicación cuando la modalidad guardada es `presencial`.
- Para `virtual` y `no_asiste`, la respuesta devuelve `location: null`.
- Antes de publicar, configure la dirección y el enlace de Maps directamente en la tabla privada `invitation_private_event_config` desde Supabase SQL Editor.
- En pruebas locales basadas en `localInvitations.js`, la ubicación permanece bloqueada porque no existe validación segura del servidor.

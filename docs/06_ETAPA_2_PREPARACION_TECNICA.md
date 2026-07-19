# Etapa 2 — Preparación técnica y primera ejecución

## Propósito

En esta etapa creo la primera base ejecutable del proyecto LIHEN_WEB_RENACER. Todavía no migro todo el catálogo ni los juegos. Primero compruebo que la estructura modular funciona correctamente.

## Programas necesarios

- Visual Studio Code.
- Git.
- Node.js, únicamente para usar un servidor local sencillo y futuras herramientas.
- Un navegador actualizado.

## Paso 1. Abrir la carpeta

1. Abro Visual Studio Code.
2. Selecciono **Archivo → Abrir carpeta**.
3. Busco y abro `LIHEN_WEB_RENACER`.
4. Confirmo que Visual Studio Code muestre `index.html`, `css`, `js`, `assets` y `docs`.

## Paso 2. Abrir la terminal integrada

Selecciono **Terminal → Nuevo terminal**.

Compruebo mi ubicación:

```bash
pwd
```

En Windows PowerShell también puedo usar:

```powershell
Get-Location
```

La ruta debe terminar en `LIHEN_WEB_RENACER`.

## Paso 3. Inicializar Git

```bash
git init
git status
```

Resultado esperado: Git informa que existe un repositorio nuevo y muestra los archivos pendientes de seguimiento.

## Paso 4. Crear el primer registro

```bash
git add .
git commit -m "chore: crear base modular del proyecto LIHEN"
```

Si Git solicita el nombre y el correo, ejecuto:

```bash
git config --global user.name "Mi nombre"
git config --global user.email "mi-correo@example.com"
```

Después repito el commit.

## Paso 5. Ejecutar el proyecto

La forma recomendada es usar un servidor local, porque JavaScript utiliza módulos `import` y `export`.

```bash
npx serve .
```

La primera vez, la terminal puede preguntar si deseo instalar temporalmente `serve`. Respondo `y`.

Abro en el navegador la dirección que muestre la terminal, normalmente:

```text
http://localhost:3000
```

## Qué debo comprobar

- El logo aparece.
- El menú móvil abre y cierra.
- Los enlaces llevan a cada sección.
- Se muestran las tarjetas Beauty Care y Style.
- El diseño cambia correctamente entre celular y computador.
- El botón de WhatsApp abre una nueva pestaña. Por ahora el número es provisional.
- La consola del navegador no muestra errores rojos.

## Cómo abrir la consola del navegador

1. Presiono `F12`.
2. Entro en la pestaña **Console** o **Consola**.
3. Recargo la página.
4. Compruebo que no existan errores.

## Estructura creada

```text
LIHEN_WEB_RENACER/
├── index.html
├── package.json
├── assets/
│   ├── images/
│   ├── icons/
│   └── videos/
├── css/
│   ├── main.css
│   ├── base/
│   ├── components/
│   └── pages/
├── js/
│   ├── main.js
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── services/
│   └── utils/
└── docs/
```

## Por qué no abro index.html con doble clic

Al usar módulos de JavaScript, el navegador puede bloquear algunas importaciones cuando el archivo se abre directamente con `file://`. Un servidor local entrega los archivos por `http://` y reproduce mejor el funcionamiento que tendrá en Netlify.

## Errores posibles

### `npx` no se reconoce

Node.js no está instalado o la terminal no se reinició después de instalarlo.

### La página aparece sin estilos

Reviso que `index.html` contenga:

```html
<link rel="stylesheet" href="./css/main.css">
```

### Aparece `Failed to load module script`

Probablemente abrí el archivo con doble clic. Debo ejecutar `npx serve .`.

### El botón de WhatsApp abre un número incorrecto

El número actual es provisional. Se cambiará en `js/services/whatsappService.js` cuando confirmemos el número corporativo definitivo.

# ETAPA 32 · Responsive multidispositivo

## Objetivo de esta etapa

En esta etapa adapto la experiencia pública de LIHEN.CO para que conserve su identidad, su contenido y sus funciones en celulares, tabletas, portátiles y pantallas de escritorio. No intento comprimir el diseño de computador dentro de un teléfono; reorganizo cada sección según el espacio real disponible.

## Archivos que agregué

### `css/responsive-v32.css`

Aquí concentro las correcciones responsive finales. Lo cargo después de las hojas anteriores para resolver inconsistencias sin borrar la identidad visual construida durante las etapas previas.

En este archivo:

- controlo el desbordamiento horizontal;
- adapto el encabezado y el menú móvil;
- mantengo áreas táctiles mínimas;
- reorganizo la portada principal;
- convierto las categorías en una fila táctil;
- limito el tamaño de tarjetas y fotografías;
- muestro las acciones de producto sin depender de `hover`;
- adapto la vista previa de productos;
- adapto Mi selección y sus recomendaciones;
- compacto el beneficio de bienvenida;
- reorganizo el buscador;
- adapto el footer;
- corrijo las páginas legales y PQRS.

### `js/responsive-v32.js`

Aquí organizo los comportamientos que cambian según el tamaño o el tipo de interacción.

En este archivo:

- calculo la altura real del encabezado móvil;
- abro y cierro el menú sin duplicar eventos;
- cierro el menú cuando la persona selecciona una opción;
- cierro menú, modales y paneles con `Escape`;
- habilito una vista alternativa mediante toque en tarjetas que antes dependían del mouse;
- respondo al cambio de tamaño y orientación del dispositivo.

## Páginas públicas actualizadas

Agrego los archivos responsive a:

- `index.html`;
- `buscar.html`;
- `ideas-para-regalar.html`;
- `mi-seleccion.html`;
- `nosotros.html`;
- `terminos-y-condiciones.html`;
- `politica-de-privacidad.html`;
- `cambios-y-devoluciones.html`;
- `politica-de-envios.html`;
- `pqrs.html`.

## Comportamiento esperado por ancho

### 320 a 390 píxeles

- Muestro un menú móvil vertical.
- Conservo lupa, logo, Mi selección y menú.
- Apilo botones de portada.
- Muestro una tarjeta compacta por movimiento de carrusel.
- Apilo modales, formularios y páginas legales.
- Evito que botones flotantes tapen acciones importantes.

### 391 a 700 píxeles

- Mantengo una experiencia móvil con tarjetas compactas.
- Conservo controles táctiles de al menos 44 píxeles.
- Muestro categorías mediante desplazamiento horizontal natural.
- Uso una columna para buscador y Mi selección.

### 701 a 950 píxeles

- Mantengo menú móvil para evitar una navegación comprimida.
- Uso dos columnas cuando el contenido puede conservar buena lectura.
- Adapto campañas y footer sin desbordamiento.

### Más de 950 píxeles

- Mantengo la navegación y la composición de escritorio ya aprobadas.

## Pruebas que debo realizar manualmente

Yo debo abrir las herramientas de desarrollo del navegador y revisar, como mínimo:

1. 320 × 568.
2. 360 × 800.
3. 390 × 844.
4. 430 × 932.
5. 768 × 1024.
6. 1024 × 768.
7. 1366 × 768.
8. 1920 × 1080.

En cada tamaño debo comprobar:

- que no aparezca desplazamiento horizontal accidental;
- que la navegación abra y cierre;
- que el carrusel principal avance;
- que las flechas y puntos puedan tocarse;
- que Vista previa cambie solamente la fotografía;
- que Agregar a Mi selección funcione;
- que el panel Mi selección cierre y permita cambiar cantidades;
- que el mensaje preparado para WhatsApp conserve los productos;
- que el beneficio muestre sus condiciones y pueda cerrarse;
- que las páginas legales permitan leer y abrir sus acordeones;
- que PQRS permita completar sus campos;
- que el footer muestre todos sus enlaces.

## Validación automática realizada

Ejecuto:

```bash
npm run check:js
npm run check
```

Con estas pruebas verifico sintaxis JavaScript, páginas HTML, migraciones SQL y referencias de imágenes. La validación automática no reemplaza las pruebas visuales en dispositivos reales.

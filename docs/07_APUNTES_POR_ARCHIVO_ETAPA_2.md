# Apuntes por archivo — Etapa 2

## `index.html`

### Qué hice

Construí la estructura semántica principal de la página: encabezado, navegación, contenido, secciones y pie de página.

### Para qué sirve

Es el documento que el navegador interpreta primero. No contiene la lógica completa ni todos los estilos; únicamente conecta los archivos responsables.

### Qué aprendí

- `header`, `nav`, `main`, `section` y `footer` describen la función del contenido.
- `data-*` permite identificar elementos desde JavaScript sin depender de clases visuales.
- `type="module"` permite utilizar `import` y `export`.

### Prueba

Ejecuto el servidor y compruebo que todas las secciones aparezcan en el orden correcto.

---

## `css/main.css`

### Qué hice

Creé un archivo de entrada que importa los estilos pequeños y organizados.

### Para qué sirve

Evita enlazar muchos archivos CSS desde el HTML y permite conocer el orden en el que se cargan.

---

## `css/base/variables.css`

### Qué hice

Guardé la paleta aprobada de LIHEN.CO, las tipografías, tamaños, sombras y transiciones en variables reutilizables.

### Para qué sirve

Si cambia un color, no tengo que buscarlo en cientos de líneas. Modifico la variable una vez.

---

## `js/main.js`

### Qué hice

Creé el punto de entrada de JavaScript.

### Para qué sirve

Inicia los módulos de navegación y página principal cuando el HTML termina de cargar.

### Flujo

```text
index.html
   ↓ carga
js/main.js
   ↓ llama
initializeNavigation()
initializeHomePage()
```

---

## `js/data/categories.js`

### Qué hice

Separé los datos de Beauty Care y Style del HTML.

### Para qué sirve

Permite agregar, editar o reutilizar categorías sin repetir tarjetas manualmente.

---

## `js/components/categoryCard.js`

### Qué hice

Construí una función que crea una tarjeta de categoría usando elementos del DOM.

### Para qué sirve

Cada tarjeta conserva la misma estructura y puede reutilizarse con datos diferentes.

---

## `js/components/navigation.js`

### Qué hice

Programé la apertura y el cierre del menú móvil sin usar `onclick` dentro del HTML.

### Para qué sirve

Separa el comportamiento del diseño y mejora la accesibilidad mediante `aria-expanded`.

---

## `js/pages/home.js`

### Qué hice

Coordiné las acciones propias de la página inicial: mostrar categorías, activar WhatsApp y actualizar el año.

### Para qué sirve

Impide que `main.js` se convierta en un archivo saturado.

---

## `js/services/whatsappService.js`

### Qué hice

Aislé la construcción y apertura del enlace de WhatsApp.

### Para qué sirve

Cuando necesite cambiar el número o la forma del mensaje, lo haré en un único archivo.

### Pendiente

Reemplazar el número provisional por el número corporativo confirmado.

# Apuntes por archivo — Etapa 5

## `js/state/productSelection.js`
Creé un estado central para no guardar la selección por separado en cada tarjeta. Utilicé un `Set` porque evita identificadores repetidos. La información también se conserva en `localStorage`, por lo que no desaparece al recargar la página.

## `js/components/productCard.js`
Agregué el botón “Agregar a mi consulta”. La tarjeta pregunta al estado si el producto ya está seleccionado y cambia su apariencia sin duplicar la información del producto.

## `js/components/productModal.js`
Separé la imagen principal de las miniaturas. El módulo controla el índice actual, actualiza la imagen y permite navegar con botones o teclado. También puede agregar el producto a la consulta.

## `js/components/selectionDrawer.js`
Construí un panel lateral que representa la selección actual. Este módulo no almacena productos: consulta el estado y relaciona los identificadores con `products.js`.

## `js/services/whatsappService.js`
Conservé el mensaje individual y añadí una función para crear el mensaje de varios productos. El número oficial sigue pendiente para evitar publicar un dato incorrecto.

## `js/pages/catalog.js`
El catálogo se suscribe a los cambios de selección. Cuando algo cambia, vuelve a construir las tarjetas para que todas reflejen el mismo estado.

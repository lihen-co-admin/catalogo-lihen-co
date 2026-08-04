# Respaldos del catálogo

`base-main-products.js` es la copia del catálogo recibida desde la rama `main` antes de implementar la matriz maestra.

Cada ejecución de `npm run products:sync` crea copias con fecha de `products.js` y del CSV maestro. Esas copias automáticas se ignoran en Git para no llenar el repositorio, pero permanecen localmente hasta que decidas borrarlas.

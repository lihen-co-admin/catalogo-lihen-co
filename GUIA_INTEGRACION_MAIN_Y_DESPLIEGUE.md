# Guía de integración a `main` y despliegue definitivo

## 1. Validar en la rama de trabajo

```bash
npm run check:release
git status
```

El proyecto debe aprobar todas las validaciones. Después de copiar esta actualización, `git status` mostrará los archivos nuevos y modificados de las Fases 6 y 7.

## 2. Registrar y subir la actualización

```bash
git add package.json
git add scripts/validate-project.mjs
git add scripts/validate-release.mjs
git add invitaciones/index.html
git add .nojekyll
git add ACTUALIZACION_FASES_6_7.md
git add VALIDACION_FASES_6_7.txt
git add GUIA_INTEGRACION_MAIN_Y_DESPLIEGUE.md

git commit -m "chore: cerrar pruebas y preparar despliegue definitivo"
git push origin refactor/lihen-v18
git status
```

El estado final debe indicar `nothing to commit, working tree clean`.

## 3. Crear respaldo antes del merge

Desde la rama actual:

```bash
git tag v18-release-candidate
git push origin v18-release-candidate
```

Si la etiqueta ya existe, no la vuelvas a crear; usa un nombre incremental como `v18-release-candidate-2`.

## 4. Integrar mediante Pull Request

En GitHub:

1. Abrir el repositorio `catalogo-lihen-co`.
2. Seleccionar la rama `refactor/lihen-v18`.
3. Pulsar **Contribute** y luego **Open pull request**.
4. Base: `main`.
5. Compare: `refactor/lihen-v18`.
6. Revisar que los checks estén aprobados.
7. Usar **Create pull request**.
8. Después de revisar los archivos, usar **Merge pull request**.

No eliminar la rama hasta comprobar el despliegue público.

## 5. Verificar GitHub Pages

Después del merge, esperar a que termine el workflow de GitHub Pages y probar:

- página principal;
- búsqueda y filtros;
- ideas para regalar;
- mi selección;
- nosotros;
- invitaciones con código válido e inválido;
- inauguración;
- panel administrativo;
- enlaces de redes sociales y WhatsApp.

Hacer una recarga forzada con `Ctrl + F5` para evitar caché anterior.

## 6. Recuperación rápida

Si aparece un problema grave después del merge, no borrar commits. Crear un revert desde GitHub sobre el Pull Request integrado, o usar:

```bash
git checkout main
git pull origin main
git revert -m 1 <HASH_DEL_MERGE>
git push origin main
```

El método de GitHub es más seguro para principiantes porque deja trazabilidad del cambio.

# Etapa 0 — Respaldo, control y reglas de reconstrucción

## 1. Propósito

Antes de escribir código nuevo, protejo el proyecto que ya existe y establezco una forma segura de trabajar. El objetivo es evitar perder recursos, funcionalidades, configuraciones o decisiones visuales ya aprobadas.

## 2. Archivos de referencia recibidos

- Proyecto original: `LIHEN_WEB_V4_5_29_SALA_COMPARTIDA_Y_ACCESO_JUEGOS(1).zip`
- Material de aprendizaje: `Backup5_GENERATION_Jr_Full-Stack_Java.pdf`
- Auditoría técnica inicial: `AUDITORIA_INICIAL_LIHEN_WEB.md`

## 3. Regla de conservación

El ZIP original se considera una **copia maestra de referencia**.

No debo:

- editar archivos directamente dentro del ZIP;
- sobrescribir la carpeta original;
- borrar recursos que parezcan repetidos sin comprobar su uso;
- cambiar simultáneamente diseño, lógica y base de datos;
- copiar todo el código antiguo dentro de la nueva versión sin revisarlo;
- publicar la reconstrucción sobre la URL principal antes de probarla.

Sí debo:

- trabajar en una carpeta diferente llamada `LIHEN_WEB_RENACER`;
- migrar una funcionalidad por vez;
- probar cada módulo antes de avanzar;
- documentar qué se tomó del proyecto anterior;
- registrar errores y correcciones;
- comparar la versión nueva con la anterior;
- conservar las credenciales privadas fuera del repositorio.

## 4. Copia de seguridad recomendada en Windows

### 4.1. Crear carpeta de trabajo

1. Abro el Explorador de archivos.
2. Entro a la carpeta donde guardo mis proyectos.
3. Creo una carpeta llamada:

```text
LIHEN_RECONSTRUCCION
```

4. Dentro creo estas carpetas:

```text
LIHEN_RECONSTRUCCION/
├── 00_RESPALDO_ORIGINAL/
├── 01_REFERENCIA_EXTRAIDA/
├── 02_PROYECTO_NUEVO/
├── 03_DOCUMENTACION/
└── 04_EVIDENCIAS/
```

### 4.2. Guardar el ZIP original

Copio el ZIP sin cambiarlo dentro de:

```text
00_RESPALDO_ORIGINAL/
```

### 4.3. Crear una copia extraída

Extraigo una copia dentro de:

```text
01_REFERENCIA_EXTRAIDA/
```

Esta carpeta sirve para consultar el código anterior, pero no será la nueva aplicación.

### 4.4. Crear la carpeta del proyecto nuevo

La reconstrucción se guardará en:

```text
02_PROYECTO_NUEVO/LIHEN_WEB_RENACER/
```

## 5. Verificación del respaldo

Antes de avanzar debo confirmar:

- [ ] El ZIP original sigue intacto.
- [ ] La copia extraída abre correctamente.
- [ ] `index.html` de la referencia puede abrirse.
- [ ] Las imágenes y el video existen.
- [ ] La carpeta `inauguracion` existe.
- [ ] Los archivos SQL de Supabase están disponibles.
- [ ] La reconstrucción está en una carpeta distinta.

## 6. Control de versiones con Git

Git se utilizará desde el inicio para guardar avances pequeños y reversibles.

### 6.1. Abrir la carpeta correcta

En Visual Studio Code:

1. Selecciono **Archivo → Abrir carpeta**.
2. Abro únicamente `LIHEN_WEB_RENACER`.
3. Abro **Terminal → Nuevo terminal**.
4. Verifico la ruta:

```powershell
pwd
```

La ruta debe terminar en `LIHEN_WEB_RENACER`.

### 6.2. Inicializar Git

```powershell
git init
```

### 6.3. Crear el primer registro

```powershell
git add .
git commit -m "docs: iniciar reconstruccion de LIHEN web"
```

### 6.4. Comprobar el estado

```powershell
git status
```

Resultado esperado:

```text
nothing to commit, working tree clean
```

## 7. Convención para los commits

Ejemplos:

```text
docs: definir alcance y requerimientos
feat: crear estructura base del catalogo
feat: agregar tarjeta reutilizable de producto
fix: corregir apertura del modal en celular
refactor: separar filtros del catalogo
style: ajustar vista para pantallas grandes
test: registrar prueba de navegacion movil
```

## 8. Regla de trabajo por módulo

Para cada módulo debo seguir este orden:

1. Identificar qué problema resuelve.
2. Revisar cómo funciona en la versión anterior.
3. Definir qué archivo será responsable.
4. Construir una versión pequeña.
5. Ejecutarla.
6. Comparar el resultado.
7. Probar casos correctos e incorrectos.
8. Documentar errores y correcciones.
9. Hacer commit.
10. Avanzar al siguiente módulo.

## 9. Criterio para considerar terminada la Etapa 0

La Etapa 0 queda completa cuando:

- existe un respaldo intacto;
- existe una carpeta nueva independiente;
- Git está inicializado;
- están definidas las reglas de conservación;
- se abrió una bitácora de aprendizaje;
- todavía no se ha reemplazado el proyecto publicado.

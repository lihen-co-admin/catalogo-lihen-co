# Etapa 1 — Definición del proyecto LIHEN.CO Web

## 1. Nombre provisional

**LIHEN.CO — Catálogo, experiencia de marca e inauguración interactiva**

Nombre técnico de la reconstrucción:

```text
LIHEN_WEB_RENACER
```

## 2. Contexto

LIHEN.CO es una marca orientada a productos de belleza, cuidado personal, moda y accesorios. El aplicativo actual ya cuenta con una identidad visual definida, catálogo, consulta mediante WhatsApp, experiencia de inauguración, juegos, participantes, premios y una integración inicial con Supabase.

La reconstrucción no nace porque el proyecto carezca de funcionalidades, sino porque el código creció rápidamente y necesita una estructura más clara, modular, accesible para una desarrolladora principiante y fácil de mantener.

## 3. Problema principal

El aplicativo actual reúne muchas responsabilidades dentro de pocos archivos extensos. Esto dificulta:

- comprender qué hace cada parte;
- encontrar errores;
- modificar una funcionalidad sin afectar otra;
- reutilizar componentes;
- probar cada módulo por separado;
- continuar aprendiendo sobre el código construido;
- mantener sincronizada la experiencia de inauguración;
- escalar posteriormente a nuevas funcionalidades.

## 4. Pregunta orientadora

¿Cómo reconstruir el aplicativo web de LIHEN.CO conservando su identidad visual y sus funciones aprobadas, pero usando una arquitectura modular, documentada, responsive y conectada de forma segura con una base de datos?

## 5. Objetivo general

Reconstruir progresivamente el aplicativo web de LIHEN.CO mediante HTML, CSS y JavaScript modular, conservando su identidad visual y sus funcionalidades principales, para obtener una solución organizada, comprensible, responsive, mantenible y preparada para integrarse con Supabase y publicarse en la web.

## 6. Objetivos específicos

1. Documentar la estructura y las funcionalidades del aplicativo actual.
2. Definir requerimientos funcionales y no funcionales antes de programar.
3. Separar estructura, presentación, datos y comportamiento.
4. Crear componentes reutilizables para productos, modales, formularios y notificaciones.
5. Separar cada juego de inauguración en su propio módulo.
6. Centralizar la conexión y las operaciones de Supabase.
7. Adaptar la interfaz para celular, tableta, computador y pantallas grandes.
8. Implementar pruebas progresivas por módulo y por dispositivo.
9. Mantener una bitácora clara de comandos, aprendizajes, errores y correcciones.
10. Publicar la nueva versión únicamente después de validar equivalencia funcional.

## 7. Usuarios del sistema

### 7.1. Visitante o cliente

Puede:

- conocer la marca;
- explorar categorías;
- consultar productos;
- abrir detalles y galerías;
- seleccionar productos;
- iniciar una consulta por WhatsApp;
- acceder a beneficios o contenido de inauguración.

### 7.2. Participante de inauguración

Puede:

- registrarse como presencial o virtual;
- visualizar su estado;
- esperar su turno;
- participar cuando esté habilitado;
- responder juegos;
- votar cuando corresponda;
- girar la ruleta cuando sea autorizado;
- ver resultados y mensajes de premio;
- dirigirse a WhatsApp para reclamar una recompensa.

### 7.3. Administradora

Puede:

- iniciar y cerrar juegos;
- activar participantes;
- controlar turnos;
- pausar o continuar cronómetros;
- revisar participantes y resultados;
- gestionar ganadores;
- bloquear o desbloquear la sala;
- ejecutar acciones de contingencia;
- usar una vista de proyección o espectador.

### 7.4. Espectador o pantalla de proyección

Puede:

- mostrar participantes conectados;
- visualizar el turno activo;
- mostrar cronómetros, rankings, resultados y celebraciones;
- funcionar en televisor o proyector sin alterar los datos del juego.

## 8. Alcance inicial de la reconstrucción

La primera versión reconstruida incluirá:

- página principal;
- identidad visual de LIHEN.CO;
- catálogo Beauty Care y Style;
- categorías y filtros;
- tarjetas de productos;
- detalle o modal de producto;
- galería de imágenes;
- selección de productos;
- consulta por WhatsApp;
- navegación responsive;
- introducción y recursos visuales aprobados;
- inauguración;
- registro de participantes;
- sala compartida;
- juegos existentes;
- ruleta;
- panel administrativo;
- conexión con Supabase;
- vista para pantalla grande;
- despliegue en Netlify.

## 9. Fuera del alcance inicial

No se implementará en la primera reconstrucción:

- aplicación móvil nativa para Android o iOS;
- aplicación nativa para Smart TV;
- pasarela de pagos completa;
- sistema logístico de envíos;
- facturación electrónica;
- integración con inventario contable;
- marketplace de terceros;
- framework frontend como React, salvo decisión posterior;
- panel empresarial completo para ventas y finanzas.

Estas funciones pueden considerarse en versiones futuras.

## 10. Restricciones

- La identidad visual aprobada debe conservarse.
- El proyecto debe seguir siendo publicable en Netlify.
- La interfaz debe funcionar con navegador moderno.
- La solución debe ser comprensible para una desarrolladora en formación.
- No se deben guardar claves privadas en JavaScript del navegador.
- La integración realtime depende de internet y de Supabase.
- El proyecto debe reconstruirse por etapas, no mediante una reescritura masiva.

## 11. Supuestos iniciales que deben validarse

- El catálogo seguirá utilizando WhatsApp como canal principal de consulta.
- Supabase será la base de datos y servicio realtime de la inauguración.
- Los productos actuales se conservarán inicialmente.
- Los juegos actuales seguirán siendo cinco.
- La administradora principal seguirá teniendo un acceso controlado.
- La vista de televisor será una vista web de proyección, no una app de Smart TV.
- Netlify seguirá siendo el servicio de publicación.

## 12. Indicadores de éxito

La reconstrucción será exitosa cuando:

- una persona pueda navegar el catálogo desde celular y computador;
- los productos se generen desde datos separados del HTML;
- los filtros y modales funcionen sin eventos `onclick` incrustados;
- cada juego tenga un módulo independiente;
- Supabase esté centralizado en servicios claros;
- dos o más dispositivos compartan correctamente el estado de una sala;
- la vista de televisor sea legible a distancia;
- el código esté documentado por archivo;
- los errores puedan localizarse sin revisar un archivo de más de mil líneas;
- la versión nueva supere una lista formal de pruebas antes de publicarse.

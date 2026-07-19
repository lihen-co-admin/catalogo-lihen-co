# Mapa funcional y priorización

## 1. Mapa general

```text
INICIO / CATÁLOGO
├── Introducción de marca
├── Navegación
├── Beauty Care
│   ├── Categorías
│   ├── Filtros
│   └── Detalle de producto
├── Style
│   ├── Categorías
│   ├── Filtros
│   └── Detalle de producto
├── Selección de productos
├── Consulta por WhatsApp
├── Información de marca
└── Acceso a inauguración

INAUGURACIÓN
├── Presentación y reglas
├── Registro
├── Sala compartida
├── Estado y participantes
├── Juegos
│   ├── Trivia
│   ├── Encuentra la palabra
│   ├── Vota tu favorito
│   ├── Reto relámpago
│   └── Ruleta LIHEN
├── Ganadores y premios
└── WhatsApp de reclamación

ADMINISTRACIÓN
├── Acceso administrativo
├── Estado de la sala
├── Lista de participantes
├── Filas presencial/virtual
├── Control de turnos
├── Control de juegos
├── Cronómetro
├── Ganadores
├── Premios
└── Contingencia

ESPECTADOR
├── Participantes conectados
├── Turno activo
├── Juego actual
├── Cronómetro
├── Ranking
└── Resultados y celebración
```

## 2. Priorización MoSCoW

### Debe tener — Must

- Identidad visual conservada.
- Navegación responsive.
- Catálogo y filtros.
- Detalle de producto.
- WhatsApp.
- Registro de participantes.
- Sala compartida.
- Turnos.
- Juegos existentes.
- Panel administrativo.
- Vista de espectador.
- Supabase.
- Validaciones y manejo básico de errores.

### Debería tener — Should

- Persistencia de selección del catálogo.
- Recuperación de sesión del participante.
- Optimización de imágenes.
- Indicador de conexión realtime.
- Historial de ganadores.
- Confirmaciones administrativas.
- Accesibilidad con teclado.

### Podría tener — Could

- Instalación como PWA.
- Notificaciones del turno.
- Reporte descargable del evento.
- Panel con métricas.
- Gestión de catálogo desde una interfaz administrativa.

### No se hará todavía — Won't for now

- Aplicación nativa móvil.
- Aplicación nativa de Smart TV.
- Pasarela de pago.
- Inventario empresarial completo.
- Facturación electrónica.

## 3. Orden de reconstrucción

1. Base del proyecto y Git.
2. Variables visuales y estilos globales.
3. Encabezado y navegación.
4. Modelo y datos de productos.
5. Tarjeta de producto.
6. Catálogo y filtros.
7. Modal y galería.
8. Selección y WhatsApp.
9. Responsive del catálogo.
10. Base visual de inauguración.
11. Registro y validaciones.
12. Configuración de Supabase.
13. Servicio de participantes.
14. Sala y turnos.
15. Juegos, uno por uno.
16. Ruleta y premios.
17. Panel administrativo.
18. Vista de espectador.
19. Pruebas multiusuario.
20. Publicación de prueba y producción.

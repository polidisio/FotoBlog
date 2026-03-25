# 📷 FotoBlog de Jose

**Blog de fotografía personal con diseño editorial tipo revista.**

## Vision

Un blog de fotografía elegante y minimalista donde Jose puede mostrar sus fotos con:
- Diseño editorial tipo Colossal
- Fotos grandes como protagonistas
- Comentarios opcionales
- Categorías y fechas

## Diseño

### Visual - Magazine/Editorial Style
- Fondo claro (#faf9f7) como papel de calidad
- Tipografía editorial: Playfair Display (serif) para títulos, Inter (sans) para cuerpo
- Hero photo grande
- Grid de fotos con espaciado generoso
- Modal para ver fotos en detalle
- Colores: negro/gris oscuro, acento rojo (#c9302c)

### Responsive
- Mobile-first
- Grid adapts al tamaño de pantalla

## Tech Stack

- **HTML5** - Semántico
- **CSS3** - Vanilla, custom properties
- **JavaScript** - Vanilla, sin frameworks
- **Vercel** - Hosting (static site)

## Estructura

```
FotoBlog/
├── index.html       # Galería principal
├── upload.html     # Formulario de subida
├── data/
│   └── photos.json # Metadatos de fotos
├── photos/         # Fotos (añadidas manualmente)
└── README.md
```

## Modelo de Datos

### photos.json
```json
{
  "photos": [
    {
      "id": "foto_001",
      "filename": "amanecer_galicia.jpg",
      "title": "Amanecer en Galicia",
      "comment": "Mi primer amanecer de 2026",
      "category": "paisajes",
      "date_added": "2026-03-24"
    }
  ]
}
```

## Funcionalidades

### Implementadas
- [x] Galería con hero photo
- [x] Grid de fotos
- [x] Modal para ver foto grande
- [x] Categorías y fechas
- [x] Diseño responsive
- [x] Página de upload (placeholder)

### Pendientes
- [ ] Sistema de upload real (requiere backend)
- [ ] Categorías filtrables
- [ ] Animaciones

## Deployment

- **URL:** https://fotoblog-opal.vercel.app
- **Hosting:** Vercel (static site)
- **Fotos:** Añadidas al repo en `photos/`

## Para Añadir Fotos

1. Añade la foto a la carpeta `photos/`
2. Edita `data/photos.json` añadiendo el entry
3. Commit y push → deploy automático en Vercel

---

_Contexto creado para Claude Coding Agent._

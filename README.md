# 📷 FotoBlog de Jose

Blog de fotografía personal con diseño editorial tipo revista.

## Diseño

- Tema claro tipo editorial (como Colossal)
- Fuentes: Playfair Display (títulos) + Inter (cuerpo)
- Hero photo grande
- Grid de fotos con categorías y fechas
- Modal para ver fotos

## Estructura

```
FotoBlog/
├── index.html      # Página principal (galería)
├── upload.html     # Formulario de subida
├── data/
│   └── photos.json # Metadatos de fotos
└── photos/         # Carpeta de fotos
```

## Añadir Fotos

Para añadir fotos, edita `data/photos.json`:

```json
{
  "photos": [
    {
      "id": "1",
      "filename": "mi_foto.jpg",
      "title": "Mi Foto",
      "comment": "Un comentario sobre la foto",
      "category": "Paisajes",
      "date_added": "2026-03-24"
    }
  ]
}
```

## Deployment

El site está desplegado en Vercel:
https://fotoblog-opal.vercel.app

Las fotos se suben al repositorio GitHub en la carpeta `photos/`.

## Desarrollo Local

1. Clona el repo
2. Abre `index.html` en tu navegador
3. O usa un servidor local: `python -m http.server 8000`

---

Construido con HTML, CSS y JavaScript vanilla.

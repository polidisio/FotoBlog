# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FotoBlog de Jose — a Spanish-language personal photography blog with vintage/analog film aesthetic. Photos are organized by rolls (carretes), inspired by film photography, Polaroid frames, and 70s magazine style.

## Tech Stack

- **Vanilla HTML/CSS/JS** — no frameworks, no build process, no npm
- **Cloudinary** — external image storage (URLs in `data/rolls.json`)
- **GitHub Pages** — static hosting at https://polidisio.github.io/FotoBlog/

## File Structure

```
FotoBlog/
├── index.html       # Home: hero Polaroid + rolls grid
├── roll.html        # Single roll view: contact sheet style photos
├── upload.html      # Upload form (generates JSON snippet)
├── styles.css       # All styles (vintage aesthetic)
├── app.js           # All JS (loadRolls, render, lightbox, filter)
├── data/
│   └── rolls.json   # Photos organized by rolls
└── photos/          # Local photos (git-tracked, rarely used)
```

## Development

```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

No build commands, no tests, no linting.

## Data Model (rolls.json)

```json
{
  "rolls": [
    {
      "id": "001",
      "name": "Madrid Days",
      "description": "Días de sol por Madrid",
      "location": "Madrid, España",
      "camera": "Canon AE-1",
      "date": "2026-03-25",
      "photos": [
        {
          "id": "001-01",
          "filename": "https://...",
          "title": "Montaña Mágica",
          "notes": "Primera exposición",
          "day_number": "001",
          "photo_number": "01"
        }
      ]
    }
  ]
}
```

## Adding Photos

1. Go to `/upload.html`
2. Select photo, fill in details (title, roll ID, day #, photo #, notes)
3. Upload to Cloudinary
4. Copy the JSON snippet generated
5. Manually add the snippet to the appropriate roll in `data/rolls.json`
6. Commit and push

## Design Elements

- **Colors**: Cream (#F5F0E6), Sepia (#704214), Military Green (#556B2F), Dark Brown (#3E2723)
- **Typography**: Playfair Display (headers, italic), Lora (body, italic)
- **Polaroid frames**: White border, exaggerated shadow, optional tape decoration
- **Contact sheet style**: Photos numbered in corner, sepia overlay on hover
- **Lightbox**: Projector/diapositive style with wipe transition
- **Paper texture**: Subtle grain overlay on entire page
- **Vignette**: Radial gradient on photos

## Deployment

Push to `main` branch → GitHub Pages auto-deploys in ~2 minutes.

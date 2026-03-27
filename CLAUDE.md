# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FotoBlog de Jose — a Spanish-language personal photography blog with an editorial magazine-style design (similar to Colossal). Static site deployed on Vercel.

## Tech Stack

- **Vanilla HTML/CSS/JS** — no frameworks, no build process, no npm
- **Cloudinary** — external image storage (URLs in `photos.json`)
- **Vercel** — static hosting with automatic deploys on push to main

## File Structure

```
FotoBlog/
├── index.html       # Homepage: hero photo + masonry gallery grid
├── gallery.html     # All photos in masonry grid (no hero)
├── upload.html      # Upload form (Cloudinary integration, placeholder workflow)
├── data/
│   └── photos.json  # Photo metadata (id, filename/URL, title, comment, category, date_added)
└── photos/          # Local photo storage (git-tracked, used for deployment)
```

## Development

```bash
# Local server
python -m http.server 8000

# Then open http://localhost:8000 in browser
```

No build commands, no tests, no linting. Just open the HTML files directly or serve statically.

## Photo Workflow

Photos are uploaded to Cloudinary via `upload.html`. The Cloudinary URL is then sent via Telegram to the owner, who manually adds it to `data/photos.json`.

To add a photo manually:
1. Add the photo to `photos/` folder
2. Edit `data/photos.json` to add the metadata entry
3. Commit and push → auto-deploy on Vercel

## Architecture Notes

- **CSS is duplicated** across `index.html`, `gallery.html`, and `upload.html` — future refactoring should extract to `styles.css`
- **JS is inline** in each HTML file — modal, photo loading, and rendering logic are duplicated
- Photos reference Cloudinary URLs in production, but `photos/` folder exists for local/git storage
- The `index.html` uses photo[0] as hero, then renders remaining photos in masonry grid
- The `gallery.html` renders all photos in masonry grid without a hero

## Deployment

- **URL:** https://fotoblog-opal.vercel.app
- Push to `main` branch triggers automatic Vercel deployment

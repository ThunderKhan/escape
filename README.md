# ESCAPE — Weekend Trip Planner

A frontend-only weekend trip discovery experience built for **The Frontend Odyssey 2026 — ESCAPE warm-up challenge**.

> Two days. Somewhere else.

ESCAPE helps users quickly choose a short getaway by filtering destinations by **mood** and **budget**, then opening a compact 48-hour plan they can save for later.

## Features

- Editorial, travel-first responsive design
- Mood filters: Mountains, Slow life, Food trip, Adventure
- Weekend-sized budget filters
- Six curated destinations using static/mock data
- Interactive destination cards
- 48-hour itinerary drawer for every destination
- Saved escapes persisted with `localStorage`
- Responsive mobile layout
- Reduced-motion accessibility support
- Dependency-free frontend: HTML + CSS + vanilla JavaScript

## Run locally

No install or build step is required.

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

You can also open `index.html` directly in a browser.

## Project structure

```text
escape/
├── index.html
├── styles.css
├── script.js
├── README.md
└── .github/workflows/pages.yml
```

## Challenge constraints

- Frontend only ✅
- Static/mock data ✅
- Designed for a 1-hour warm-up build ✅
- Responsive and functional ✅
- Deployable as a static site ✅

## Deployment

A GitHub Pages workflow is included. In repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions** if it is not already enabled. Any future push to `main` will then deploy automatically.

---

Built for the weekend. 🌄

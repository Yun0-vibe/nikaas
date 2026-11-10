# Nikaas — web

Marketing site and interactive launcher demo for Nikaas, built with Next.js (App
Router), React, TypeScript, Tailwind CSS v4 and Motion.

## Stack

- Next.js 16 · React 19 · TypeScript 5.9
- Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`)
- Motion (`motion/react`) for page and layout animations
- Local fonts (`src/app/fonts`, `next/font/local`) — no font CDN at build time
- Fully static: every route prerenders to HTML

## Local development

Node.js 20.9+ is required.

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint .
npm run build      # production build
```

## Project layout

```
├── src/app/               layout, page, global styles, metadata routes
│   ├── globals.css        forge design tokens + component classes
│   ├── opengraph-image.tsx  1200×630 social card (generated)
│   ├── icon.svg, manifest.webmanifest, robots.ts, sitemap.ts
├── src/components/        sections (hero, features, console, FAQ, footer…)
│   ├── console/           interactive launcher simulator panels
│   └── ui/                shared primitives (reveal, magnetic, toasts…)
├── src/lib/               data, launcher state machine, utils
└── public/                static assets
```

## Deploy to Vercel

The repository is the app itself, so Vercel needs no configuration.

1. Import [Yun0-vibe/nikaas](https://github.com/Yun0-vibe/nikaas) at
   [vercel.com/new](https://vercel.com/new), or open the
   [one-click import](https://vercel.com/new/clone?repository-url=https://github.com/Yun0-vibe/nikaas).
2. Leave every build setting at its default — Next.js is detected automatically.
3. Optional environment variable:
   - `NEXT_PUBLIC_SITE_URL` — canonical site URL, e.g. `https://nikaas.example`.
     When unset, the app derives the URL from
     `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`, so previews work without
     configuration.
4. Deploy. No server, database or third-party keys are needed.

Every push to `main` then triggers a production deployment; pull requests get
preview URLs automatically.

## Notes

- The `ConsoleDemo` section is a working simulation: it creates, renames and
  deletes chambers, installs catalog entries with dependencies, previews account
  flows and streams a release timeline. State is in memory only — nothing is
  persisted or sent anywhere.
- Motion respects `prefers-reduced-motion`; the ember canvas and parallax fall
  back to static rendering.

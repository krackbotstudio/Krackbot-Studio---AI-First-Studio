# Krackbot Studio

AI-First Engineering Studio — building intelligent automation, AI agents, and scalable digital products.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router v6
- **State / Data**: TanStack Query

## Local Development

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:8080`.

## Build

```bash
npm run build
```

Output goes to the `dist/` directory.

## Deployment (Vercel)

The project is configured for zero-config Vercel deployment via `vercel.json`.

Push to your connected Git branch — Vercel will automatically build and deploy.

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

All routes are rewritten to `index.html` to support client-side routing.

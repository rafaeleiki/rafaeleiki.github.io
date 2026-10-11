# CLAUDE.md

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (outputs to `out/`)
- `npm run deploy` — build + publish `out/` to the `master` branch (GitHub Pages)
- `npx eslint --fix <file>` — lint a single file

## Node version

`.nvmrc` requires **v20**.

## Branches

- **`main`** — source code (this is the default branch). Reflects the website.
- **`master`** — build output only, served by GitHub Pages (custom domain `rafaeleiki.com`). Never edit by hand; it is rewritten by `npm run deploy`.

## Architecture

Next.js 15 static site (`output: 'export'`) styled with Tailwind CSS v4. A single-page portfolio in a "signal" aesthetic.

The `out/` directory is generated and git-ignored; the `gh-pages` package pushes it to `master`.

## Key files

- `app/page.js` — renders the site
- `app/layout.js` — root layout (Sora + IBM Plex Mono fonts, metadata, globals.css, GA script)
- `app/globals.css` — Tailwind + keyframes + reduced-motion
- `components/SignalSite.jsx` — the single-scroll portfolio (client component)
- `components/site-data.js` — all bilingual content (EN/PT)
- `components/GeneratedBackdrop.jsx` — seeded generative background (canvas)
- `components/GeneratedPortrait.jsx` — seeded halftone self-portrait (canvas)
- `components/Reveal.jsx` — scroll-reveal wrapper
- `components/hooks/useInView.js` — IntersectionObserver hook

Language toggles via `?lang=pt` / `?lang=en` (or the in-page button).

## Hook

A PostToolUse hook (`.claude/settings.json`) auto-runs `eslint --fix` on any JS/TS file after Edit or Write tool use.

# AGENTS.md

## Code style

- Write code with no comments: names, props and small functions carry the meaning.
- Keep components small and single-purpose: one job per file; `SignalSite.jsx` composes the page.
- Extract shared logic into `components/hooks/` or `lib/` instead of copying it.
- Put durable invariants in this file, not in code comments.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (outputs to `out/`)
- `npm run deploy` — build + publish `out/` to the `production` branch (GitHub Pages)
- `npx eslint --fix <file>` — lint a single file

## Node version

`.nvmrc` requires **v20**.

## Branches

- **`main`** — source code (the default branch). Reflects the website.
- **`production`** — build output only, served by GitHub Pages (custom domain `rafaeleiki.com`). It is rewritten by `npm run deploy`, so edit `main` instead.

## Architecture

Next.js 16 static site (`output: 'export'`) styled with Tailwind CSS v4. A single-page portfolio in a "signal" aesthetic.

The `out/` directory is generated and git-ignored; the `gh-pages` package pushes it to `production`.

## Key files

- `app/page.js` — renders the site
- `app/layout.js` — root layout (Sora + IBM Plex Mono fonts, metadata, globals.css, GA script)
- `app/globals.css` — Tailwind theme tokens, keyframes, reduced-motion
- `lib/tokens.js` — JS mirror of the colour tokens, for canvas fills and inline styles
- `lib/random.js` / `lib/color.js` — shared seeded RNG and colour helpers
- `components/SignalSite.jsx` — page composition and shared state
- `components/site-data.js` — all bilingual content (EN/PT)
- `components/GeneratedBackdrop.jsx` — seeded generative background (canvas)
- `components/GeneratedPortrait.jsx` — seeded halftone self-portrait (canvas)
- `components/Reveal.jsx` — scroll-reveal wrapper
- `components/hooks/` — language store, document metadata, media queries, canvas and scroll effects
- `eslint.config.mjs` — ESLint flat config

Language toggles via `?lang=pt` / `?lang=en` (or the in-page button).

## Constraints

- Canvas `fillStyle` cannot resolve `var()`; keep `lib/tokens.js` in sync with the `@theme` block in `app/globals.css`.
- Keep body copy at 4.5:1 against the rendered backdrop. The backdrop fades to ink below the hero so text never sits on nebula, and its cloud radius scales with canvas width, never height.
- Plain `<img>` is intentional: the static export sets `images.unoptimized`, so `next/image` adds markup without benefit.
- Images ship as pre-sized webp variants under `public/images/`; keep their intrinsic dimensions and `srcSet` in `site-data.js` in sync.
- The static HTML is English; `?lang=pt` is applied after hydration, and `useDocumentMeta` keeps lang, title and description in sync. Next re-applies the static title during hydration, so the hook pins the translated title.

## Hook

A PostToolUse hook (`.claude/settings.json`) auto-runs `eslint --fix` on any JS/TS file after Edit or Write tool use.

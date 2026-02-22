# CLAUDE.md

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build (outputs to `out/`)
- `npm run deploy` — build + subtree-push `out/` to `master` branch (GitHub Pages)
- `npx eslint --fix <file>` — lint a single file

## Node version

`.nvmrc` requires **v20**.

## Architecture

Next.js 15 static site (`output: 'export'`) styled with Tailwind CSS v4. Deployed to GitHub Pages by force-pushing the `out/` directory as a subtree to the `master` branch.

### i18n

Uses **next-export-i18n v3** (`useTranslation` hook). Translation files live in `i18n/translations.{en,pt}.json`. Keys are namespaced by page path:

```
"i18n" → "shared" (navbar, footer, grid-media)
       → "/"        (home page)
       → "/developer"
       → "/researcher"
```

### Page pattern

Each page (e.g. `/developer`) has a corresponding **page-constants** file (`components/page-constants/developer-constants.js`) that defines grid rows. Each row contains `TEXT_COLUMN` or `IMAGE_COLUMN` entries. Text columns reference translation keys (e.g. `'experiences.liftventures'`) resolved at render time via `useTranslation`. New experiences are added with the `createWorkExperience` helper.

## Key files

- `app/` — Next.js App Router pages (`page.js`, `developer/page.js`, `researcher/page.js`)
- `app/layout.js` — Root layout (Inter font, metadata, globals.css, GA script)
- `app/globals.css` — Tailwind directives, background SVG, reduced-motion media query
- `components/page-constants/` — grid data per page
- `components/grid/` — `TEXT_COLUMN` / `IMAGE_COLUMN` components
- `i18n/translations.en.json`, `i18n/translations.pt.json` — all UI strings

## Hook

A PostToolUse hook (`.claude/settings.json`) auto-runs `eslint --fix` on any JS/TS file after Edit or Write tool use.

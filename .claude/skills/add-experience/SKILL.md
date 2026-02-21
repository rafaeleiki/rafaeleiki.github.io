---
name: add-experience
description: Add a new experience entry to the portfolio. Touches the page-constants file and both translation files (EN + PT) in one guided workflow.
---

# add-experience

Add a new portfolio entry end-to-end: page-constants JS file + both `translations.en.json` and `translations.pt.json`.

## When to use

Use this skill any time a new item needs to be added to one of the portfolio sections:
- **Developer page** – `experiences` (work history) or `education`
- **Researcher page** – `papers`, `initiatives`, or `advising`

## Parameters

Collect the following from the user before making any edits:

| Field | Example |
|-------|---------|
| `page` | `developer` or `researcher` |
| `section` | `experiences` / `education` / `papers` / `initiatives` / `advising` |
| `key` | Short slug, e.g. `anthropic` or `5` (papers use numbers) |
| `title_en` | Role/paper title in English |
| `subtitle_en` | Company name (work) or conference (papers) or subtitle in English |
| `time` | Date range, e.g. `Jan/2023-Present` |
| `description_en` | Full description in English |
| `title_pt` | Portuguese title |
| `subtitle_pt` | Portuguese subtitle / company |
| `description_pt` | Full description in Portuguese |
| `imageSrc` | *(optional)* Path to icon, e.g. `/images/icons/anthropic.webp` |
| `show` | *(optional)* Whether to add to a visible (`show: true`) grid row. Default: add to the first visible row's column. |

## Translation key structure

Keys in the page-constants files are **relative to the page namespace**. The resolver is:

```
useTranslation('/developer').f('experiences.KEY.title')
  → i18n["/developer"].experiences.KEY.title  (in translations.*.json)
```

So for a new **developer/experiences** entry with key `anthropic`, you will:
1. Add `createWorkExperience('experiences.anthropic')` to `EXPERIENCE_GRID` in `components/page-constants/developer-constants.js`
2. Add under `i18n["/developer"].experiences.anthropic` in both JSON files

For **papers**, keys are sequential numbers (`"5"`, `"6"`, …); use the next available number.

## Step-by-step workflow

### 1. Page-constants file

**Developer → experiences:**
```js
// In EXPERIENCE_GRID, inside the appropriate columns array:
{
  ...createWorkExperience('experiences.KEY'),
  imageSrc: '/images/icons/KEY.webp',  // omit if no icon
},
```

**Developer → education:**
```js
{
  ...createWorkExperience('education.KEY'),
  imageSrc: '/images/icons/KEY.webp',
},
```

**Researcher → papers** (use `title/subtitle/time/description` via inline keys, not createExperience):
```js
{
  title: 'papers.N.title',
  subtitle: 'papers.N.conference',
  time: 'papers.N.time',
  description: 'papers.N.description',
  long: true,
},
```

**Researcher → initiatives / advising** (use `createExperience`):
```js
{
  ...createExperience('initiatives.KEY'),
  imageSrc: '/images/icons/KEY.webp',
},
```

### 2. translations.en.json

Add the new entry under the correct section. Example for `developer/experiences`:
```json
"KEY": {
  "title": "...",
  "company": "...",
  "time": "...",
  "description": "..."
}
```

For `researcher/papers`:
```json
"N": {
  "title": "...",
  "conference": "...",
  "time": "...",
  "description": "..."
}
```

### 3. translations.pt.json

Mirror the exact same key structure with Portuguese values.

### 4. Verify sync

After editing, confirm both translation files have identical key structures by calling the `i18n-sync` skill (or simply eyeballing the diff).

## Notes

- Images live in `public/images/icons/` (logos) and `public/images/experiences/` (photos).
- The `show` flag on grid rows controls visibility; entries in rows with `show: false` are hidden on the live site.
- The deploy script is `yarn deploy` — it builds, exports, and force-pushes the `out/` folder to the `master` branch via git subtree.

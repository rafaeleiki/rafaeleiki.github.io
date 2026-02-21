---
name: i18n-sync
description: Check that translations.en.json and translations.pt.json have identical key structures, report missing keys, and optionally compile i18n. Run before every deploy.
disable-model-invocation: true
---

# i18n-sync

Diff the key structure of both translation files and report any missing or extra keys.

## When to use

- Before deploying (`yarn deploy`)
- After adding a new experience entry via `add-experience`
- Any time you edit a translation file manually

## What it checks

1. **Missing in PT** – keys that exist in `i18n/translations.en.json` but not in `i18n/translations.pt.json`
2. **Missing in EN** – keys that exist in `i18n/translations.pt.json` but not in `i18n/translations.en.json`
3. *(Optionally)* Runs `npm run i18n` (`extract:i18n` + `compile:i18n`) if `@formatjs/cli` is in use

## Steps

### 1. Flatten keys from both files

Read `i18n/translations.en.json` and `i18n/translations.pt.json`. Recursively flatten each file into a set of dot-separated leaf key paths. Example:

```
i18n./developer.experiences.liftventures.title
i18n./developer.experiences.liftventures.company
...
```

### 2. Diff the two sets

```
missing_in_pt = keys_en - keys_pt
missing_in_en = keys_pt - keys_en
```

### 3. Report

If both sets are empty → ✅ **Translation files are in sync.**

If there are differences, list them clearly:

```
❌ Missing in translations.pt.json:
  - i18n./developer.experiences.anthropic.title
  - i18n./developer.experiences.anthropic.company
  - i18n./developer.experiences.anthropic.time
  - i18n./developer.experiences.anthropic.description

❌ Missing in translations.en.json:
  (none)
```

Then offer to fill in the missing PT keys by asking the user for the Portuguese values for each missing leaf.

### 4. Compile (optional)

If the user confirms, run:

```bash
npm run i18n
```

This runs `extract:i18n` then `compile:i18n` via `@formatjs/cli`. Note: this project currently uses `next-export-i18n` with the hand-written translation files, so `npm run i18n` may not be needed unless `react-intl` message extraction is in use. Confirm with the user before running.

## File paths

- `i18n/translations.en.json`
- `i18n/translations.pt.json`

## Quick one-liner (Node.js)

You can also verify sync by running this in the project root:

```bash
node -e "
const en = require('./i18n/translations.en.json');
const pt = require('./i18n/translations.pt.json');
const flatten = (obj, prefix='') =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === 'object' && v !== null
      ? flatten(v, prefix ? prefix+'.'+k : k)
      : [prefix ? prefix+'.'+k : k]
  );
const enKeys = new Set(flatten(en));
const ptKeys = new Set(flatten(pt));
const missingPt = [...enKeys].filter(k => !ptKeys.has(k));
const missingEn = [...ptKeys].filter(k => !enKeys.has(k));
if (missingPt.length) console.log('Missing in PT:\n' + missingPt.join('\n'));
if (missingEn.length) console.log('Missing in EN:\n' + missingEn.join('\n'));
if (!missingPt.length && !missingEn.length) console.log('✅ In sync');
"
```

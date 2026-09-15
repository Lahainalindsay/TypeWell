# WPMTest

WPMTest is a free typing test, typing practice, employment-assessment, and career-skills platform focused on useful search traffic, repeat usage, and responsible ad-supported monetization. It uses a static Next.js SEO shell with an interactive React typing app.

## Stack

- Next.js App Router with static export
- React + TypeScript
- Local browser storage for anonymous progress
- Vitest for engine and storage tests
- No database or account system in version 1

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

The production and local development path is Next.js. Legacy Vite application entry/configuration files have been removed; do not reintroduce a parallel Vite app path.

## Production Build

```bash
npm test
npm run build
```

The static export is written to `out/`. Sitemap and robots files are generated in the export.

## Deployment

Production domain: `https://wpmtest.app`.

Configure it with:

```bash
NEXT_PUBLIC_SITE_URL=https://wpmtest.app
```

The generated sitemap and robots files use the production origin. Do not add a host-wide SPA rewrite that maps unknown URLs to the homepage.

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://wpmtest.app
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_ADS_ENABLED=false
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=
```

Never commit real secrets or local environment files. See `.env.example` when one is introduced.

## Architecture

See `docs/ARCHITECTURE.md` for current architecture and migration rules and `docs/REPOSITORY-AUDIT.md` for cleanup status.

Key rule: established public URLs are preserved, but major product implementations should move into dedicated routes and `src/features/*` domains rather than enlarging `src/App.tsx` or `src/seo/pages.ts`.

`src/seo/pages.ts` and `app/[[...slug]]` are legacy compatibility infrastructure. Migrate pages incrementally. New major career/product families should not be added to the monolithic registry.

## Typing formulas

One standardized typing word equals five characters.

- WPM: `(correct characters / 5) / elapsed minutes`
- Gross WPM: `(total typed characters / 5) / elapsed minutes`
- Net WPM: `((total typed characters - current incorrect characters) / 5) / elapsed minutes`
- Accuracy: `correct keystrokes / total keystrokes`
- CPM: `total typed characters / elapsed minutes`
- KPH: `keystrokes per minute * 60`

Corrected errors are counted separately. Current incorrect characters affect net WPM.

## Local storage

Progress is stored under `typewell.progress.v1`. Stored data includes sessions, settings, completed lessons, weak-key strokes, and rhythm best. Preserve compatibility with existing user data when storage models are migrated.

## Content

Typing passages currently live in `src/data/texts.ts`. Keep passages original, public-domain, or properly licensed. Do not copy competitor lessons or copyrighted modern text.

Editorial content should live in dedicated routes/content modules. Product/tool queries belong on interactive tool pages; informational queries belong in editorial/blog pages.

## SEO

For new major pages:

1. Prefer a dedicated Next.js route.
2. Keep metadata and canonical ownership with the route.
3. Use shared helpers from the future `src/lib/seo/` layer rather than duplicating schema logic.
4. Add only public indexable routes to the sitemap.
5. Provide useful visible content and crawlable internal links.
6. Preserve existing public URLs when migrating legacy pages.
7. Run the build and inspect generated HTML before merge.

## Analytics

Use `trackEvent()` from `src/analytics.ts`. Do not send exact typed text, custom text, names, email addresses, or other personal information.

## Advertising

Ad configuration is centralized in `src/ads.config.ts`. Do not place ads inside typing text, near restart/start controls, or over interactive UI. AdSense/CMP code may contribute to performance cost; do not remove monetization solely to chase a perfect Lighthouse score.

## Repository safety

- Keep `main` deployable.
- Structural migrations happen on a branch.
- Do not commit `.env` files, `.next/`, `out/`, `.wrangler/`, dependencies, logs or local caches.
- Classify suspected legacy files before deletion.
- Prefer extraction over wholesale rewrites of large active files.
- Build/test before merging structural changes.

## Current expansion direction

WPMTest is expanding toward reusable career-skill assessments. Career assessments should compose shared engines for prose, punctuation, numbers, 10-key, currency, dates, addresses, codes, structured records and verification. Standard assessments remain free; custom employer assessments are a future paid product.

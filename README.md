# Typewell

Typewell is a free typing test and typing practice platform focused on search traffic, repeat usage, and responsible ad-supported monetization. It uses a static Next.js SEO shell with an interactive React typing app.

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

Vite compatibility scripts remain available:

```bash
npm run vite:dev
npm run vite:build
```

## Production Build

```bash
npm test
npm run build
```

The static export is written to `out/`. The sitemap and robots files are generated as `out/sitemap.xml` and `out/robots.txt`.

## Deployment

Deploy the `out/` directory to a static host. Configure the canonical production domain with:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

The generated sitemap and robots files use `NEXT_PUBLIC_SITE_URL`; rebuild after changing the domain. Do not add a host-wide SPA rewrite that maps unknown URLs to the homepage. The host should serve `out/404/index.html` for missing routes.

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://typewell.app
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_ADS_ENABLED=false
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=
```

Analytics and ads are disabled unless explicitly enabled.

## Site Architecture

SEO pages are defined in `src/seo/pages.ts`. Each entry includes:

- URL path
- title
- meta description
- H1
- intro copy
- educational content
- related internal links

The interactive app lives in `src/App.tsx`. The Vite entry remains `src/main.tsx`.

## Typing Formulas

One standardized typing word equals five characters.

- WPM: `(correct characters / 5) / elapsed minutes`
- Gross WPM: `(total typed characters / 5) / elapsed minutes`
- Net WPM: `((total typed characters - current incorrect characters) / 5) / elapsed minutes`
- Accuracy: `correct keystrokes / total keystrokes`
- CPM: `total typed characters / elapsed minutes`
- KPH: `keystrokes per minute * 60`

Corrected errors are counted separately. Current incorrect characters affect net WPM.

## Local Storage

Progress is stored under `typewell.progress.v1`. Stored data includes sessions, settings, completed lessons, weak-key strokes, and rhythm best. Storage access uses safe helpers so blocked storage or quota errors do not crash the app.

## Adding Passages

Edit `src/data/texts.ts`. Keep passages original, public-domain, or properly licensed. Do not copy competitor lessons or copyrighted modern text.

## Adding SEO Pages

1. Add the page to `src/seo/pages.ts`.
2. Add the route to `app/[[...slug]]/page.tsx` static route data when it is not part of the primary registry.
3. Add the route to `app/sitemap.ts` only when it is a public indexable page.
4. Ensure the route maps to a real tool or useful content in `src/App.tsx`.
5. Run `npm run build`.
6. Inspect `out/<route>/index.html` for title, description, canonical, H1, content, and internal links.

## Analytics

Use `trackEvent()` from `src/analytics.ts`. Do not send exact typed text, custom text, names, email addresses, or other personal information.

## Advertising

Ad configuration is centralized in `src/ads.config.ts`. Ad slots are disabled by default and collapse when disabled. Do not place ads inside typing text, near restart/start controls, or over interactive UI.

## SEO Launch Checklist

- [ ] Production domain configured
- [ ] HTTPS enabled
- [ ] Canonicals verified
- [ ] Page titles verified
- [ ] Meta descriptions verified
- [ ] H1s verified
- [ ] Sitemap available
- [ ] robots.txt available
- [ ] 404 tested
- [ ] Google Search Console connected
- [ ] Sitemap submitted
- [ ] Bing Webmaster Tools connected
- [ ] Analytics configured
- [ ] Ad configuration disabled until approved
- [ ] Privacy policy reviewed
- [ ] Mobile pages tested
- [ ] Structured data validated
- [ ] Core Web Vitals tested
- [ ] Open Graph previews tested
- [ ] Production pages tested without JavaScript where appropriate
- [ ] No accidental noindex tags
- [ ] No staging domain indexed

## Performance Checklist

- [ ] Test homepage LCP
- [ ] Test typing input responsiveness
- [ ] Check mobile layout at 390px
- [ ] Check tablet layout at 768px
- [ ] Check desktop layout at 1440px
- [ ] Confirm ad slots do not shift active typing UI
- [ ] Run Lighthouse after deployment

## Features Not Built Yet

- Accounts
- Cloud history
- Teacher dashboards
- Employer dashboards
- Real AdSense code
- Affiliate pages
- Large programmatic SEO pages

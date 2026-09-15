# WPMTest repository audit — 2026-09

Status: cleanup foundation substantially complete on `architecture-cleanup-2026-09`. The branch remains isolated from `main` until explicit merge approval.

## Executive findings

### Resolved in this cleanup

1. **Canonical production origin** now resolves to `https://wpmtest.app` rather than the old `typewell.app` fallback.
2. **Vite application artifacts** were confirmed obsolete for the production Next.js static export and removed: `vite.config.ts`, `src/main.tsx`, and root `index.html`.
3. **Dependency validation** now uses a generated lockfile, strict `npm ci`, strict `npm audit`, tests, and a production build in CI.
4. **Dedicated route ownership** is explicit. The legacy catch-all excludes dedicated Next.js pages, and `tests/route-ownership.test.ts` fails if a future dedicated page is not registered.
5. **About, Privacy, Contact, and Terms** were moved to dedicated Next routes with WPMTest metadata and current copy. The privacy page now accurately discloses Google AdSense/cookie usage. Contact intentionally publishes no email until a real support address exists.
6. **Duplicate client-side SEO mutation** was removed from `src/App.tsx`. Next.js server metadata is now the SEO authority for migrated pages rather than client code rewriting titles, canonicals, OpenGraph metadata, and JSON-LD.
7. **Visible Typewell branding** found during the migration was removed from the active navigation upgrade, educator/professional pages, the core app copy, and the printable/shareable certificate flow. The remaining `TypewellApp` identifier is internal code only.
8. **Data Entry feature foundations** now live under `src/features/data-entry/` and career assessment configuration under `src/features/careers/`.
9. **Data Entry employment content** has a dedicated article route and the main Data Entry assessment page has dedicated metadata, schema, practice guidance, assessment sections, results guidance, and certificate language.
10. **Sitemap coverage** now includes the dedicated audience pages `/educators/` and `/professionals/` in addition to the other dedicated routes.
11. **SEO registry formatting churn** was reversed. `src/seo/pages.ts` retains readable main-branch formatting with only the intended domain correction.
12. **Obsolete Vite ad environment fallbacks** were removed. Ad configuration now uses the current Next.js environment names.

## Current validation state

Latest confirmed full validation before this document update:
- dependency install succeeded
- `npm audit`: 0 vulnerabilities
- 9 test files passed
- 30 tests passed
- TypeScript passed
- Next.js production build compiled successfully
- 44 static pages generated
- route-ownership guard passed

Every subsequent cleanup commit has continued to run through the same branch/PR validation workflow. Do not merge until the final head commit is green.

## Remaining structural risks

### 1. `src/App.tsx` is still too large

The file has been reduced substantially and no longer owns the legacy legal pages or duplicate SEO mutation layer, but it still contains too many product surfaces. Continue decomposition by extraction rather than rewrite.

Recommended extraction order:
- site shell/header/footer/navigation
- certificate/result UI
- progress/settings UI
- general typing test/practice surfaces
- games/rhythm/lessons

Do not rename the internal `TypewellApp` component merely for cosmetic reasons unless imports are being touched for another purpose.

### 2. CSS is still historically layered

The root layout still imports:
- `styles.css`
- `refresh.css`
- `homepage-v2.css`
- `homepage-v3.css`
- `certificate.css`
- `site-upgrade.css`

These files remain active and should not be deleted blindly. Consolidation is a later maintenance task after selector ownership is traced.

### 3. Runtime compatibility scripts remain active

`public/site-upgrade.js` and `public/certificate-flow.js` still perform live behavior. They are not dead files. Future work should migrate safe behavior into owned React/Next components, but only with regression coverage.

### 4. Legacy SEO registry still exists

`src/seo/pages.ts` remains the source for older catch-all routes. New major product families should use dedicated routes instead. Migrate legacy entries incrementally as their pages are modernized; do not perform a wholesale rewrite.

### 5. Old branches remain cleanup candidates

Redundant historical branches should only be deleted after this cleanup PR is merged and verified in production. Do not delete them as part of the pre-merge safety pass.

## Architecture direction

### Routing
- important indexable experiences: dedicated `app/**/page.tsx`
- legacy low-risk pages: catch-all during migration
- dedicated page ownership must remain covered by `tests/route-ownership.test.ts`

### SEO
- canonical origin: `https://wpmtest.app`
- dedicated Next metadata for major pages
- one useful page per distinct search intent
- no doorway/near-duplicate keyword pages
- sitemap and internal links must expose important crawlable pages

### Career assessments
Free tier:
- standardized assessment per career/category
- job seeker can practice, test, view results, and use the site-generated certificate
- employer can share/use the standardized assessment

Future paid tier:
- company/role-specific custom assessment
- optional branding and custom skills/content
- saved candidate/result workflow when backend support exists

### Data Entry target
Public URL: `/data-entry-typing-test/`

Architecture:
- dedicated route owns metadata/content/schema
- `src/features/data-entry/` owns structured-record models/data
- assessment definition lives in `src/features/careers/assessments/`
- numeric/KPH logic remains reusable rather than duplicated
- supporting article targets informational search intent and links into the tool

## Final checklist before merge

- [ ] final head commit CI green
- [x] strict dependency install/audit configured
- [x] tests passing on latest confirmed validation
- [x] production build passing on latest confirmed validation
- [x] route ownership guarded by automated test
- [x] canonical production domain is `wpmtest.app`
- [x] dedicated legal/about routes in place
- [x] AdSense disclosure present in Privacy
- [x] contact email intentionally omitted until real address exists
- [x] sitemap includes dedicated audience pages
- [x] visible old-brand references removed from audited active surfaces
- [x] no unsupported accreditation or employment-guarantee claims on migrated career pages
- [ ] final PR diff review
- [ ] explicit user approval before merge

## Post-merge follow-up

After production deployment:
1. verify live `/privacy/`, `/terms/`, `/about/`, `/contact/`, `/ads.txt`, `/robots.txt`, and `/sitemap.xml`
2. spot-check certificate download/share branding
3. verify dedicated career pages and internal links
4. confirm Search Console sees the production sitemap
5. continue incremental `src/App.tsx` and CSS/runtime decomposition without blocking product growth

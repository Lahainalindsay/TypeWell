# WPMTest architecture

WPMTest is expected to grow into a large typing, employment-assessment, practice, certificate, employer, and editorial platform. Organize new work by product domain instead of accumulating monolithic registries.

## Public URLs vs implementation

Preserve established public URLs with search value. Implementation folders do not need to mirror the marketing URL taxonomy. A route such as `/data-entry-typing-test/` can import a feature from `src/features/data-entry/`.

## App routes

Use dedicated Next.js route folders for important indexable experiences:

- `app/blog/` — editorial/search-intent content
- `app/certificate/` — certificate display and verification
- `app/employers/` — future employer/candidate workflow
- dedicated root route folders — established high-value public test URLs

Avoid another catch-all registry for major new products.

## Source domains

`src/features/`
- `typing/` — common typing engine and scoring
- `data-entry/` — structured records, field entry, verification
- `numeric/` — 10-key, KPM/KPH, numeric keypad
- `careers/` — career assessment definitions and shared career UI
- `certificates/` — certificate models/rendering
- `employers/` — employer/candidate flows
- `content/` — reusable editorial UI

`src/lib/`
- framework-independent utilities, analytics, storage, formatting and schema helpers

`src/content/`
- structured page copy, assessment definitions and datasets that are content rather than application logic

`src/components/`
- genuinely shared presentational components only

## SEO

Important pages own metadata beside their route. Shared SEO helpers belong in `src/lib/seo/`; structured SEO content may be split under `src/content/seo/` by domain.

Canonical production origin: `https://wpmtest.app`.

`src/seo/pages.ts` is legacy infrastructure. Migrate it incrementally. Do not add new major product families to it and do not change established public URLs simply to make folders look cleaner.

## Career assessments

Career products are compositions of reusable skills, not duplicated engines.

Reusable skill families:
- prose
- punctuation
- numbers
- 10-key
- currency and decimals
- dates and times
- phone numbers
- names and addresses
- IDs and codes
- structured records
- calculations
- verification
- transcription (future)

Free career assessments are standardized. Custom employer assessments are a separate future paid product.

## Blog/content

Blog articles target informational intent and link to the corresponding interactive product. Avoid near-duplicate articles created only for keyword variants. Product/tool intent belongs on tool pages; informational intent belongs in editorial content.

## File-size and ownership rule

Avoid source files that become registries for unrelated domains. Review a file when it approaches roughly 400 lines or owns more than one major product domain. Split by responsibility before it becomes difficult to inspect, test or safely edit.

## Archive policy

During cleanup classify candidates as:
1. active
2. compatibility or redirect dependency
3. safe to archive
4. safe to delete

Historical documentation can live under `docs/archive/`. Do not keep obsolete runtime code in an archive directory that production can accidentally import.

## Change safety

- Keep `main` deployable.
- Perform structural migrations on a branch.
- Preserve canonical URLs and sitemap coverage.
- Build and test before merge when execution is available.
- Never commit secrets, environment files, generated static output, local Cloudflare state or dependencies.

# WPMTest repository audit — November 10, 2026

## Completed

- Reproduced weak-key cursor display freezing while the actual input index advanced. The legacy DOM overlay only observed child mutations, so ordinary React class/status updates could leave its cloned cursor stale.
- Removed `public/site-upgrade.js` and its layout inclusion. Its homepage cleanup was already represented in the current React markup. React now owns the complete prompt; a three-line viewport scrolls after index updates and on resize. Mouse-down prevents the prompt taking focus from the capture textarea.
- Regression coverage verifies row advancement, scroll, focus retention, backspace and restart. Live production browser typing confirmed 100 correct weak-key characters and a longer 280-character practice run with automatic scrolling and retained textarea focus.
- Adapted useful unpublished SEO work for the data-entry practice hub and four focused drills: specific guidance, FAQs, breadcrumbs, contextual internal links and page-specific social metadata. Preserved current structured-field assessment behavior. Rejected old unsupported employer benchmarks and future-tense certificate/scoring claims.
- Closed obsolete language-revival draft PR #22, superseded by main's published collection and later editorial work.

## Validation

- `npm ci` succeeded; `npm audit` reports zero known vulnerabilities.
- 27 Vitest files / 127 tests pass; TypeScript and production static export pass.
- Export audit: 105 HTML outputs, 100 sitemap URLs, zero duplicate titles/descriptions/canonicals, unresolved internal links, missing sitemap pages or image discovery errors; 58 page/image sitemap associations.
- Cloudflare deployed fix commit `58ecfa356f0cb25f242531140133ac5512e1a402` successfully; live DOM and continuous typing verified.
- GitHub Actions did **not run** validation: the check annotation says, “The job was not started because your account is locked due to a billing issue.” This is an account-level blocker. Do not describe Actions as passing. Local validation remains the evidence for the changes.
- Build warns React 18 support is deprecated in Next.js 16. Schedule a tested React 19 migration before Next.js 17; no known npm advisory was reported.

## Branch cleanup disposition

Twenty non-main remote branches were reviewed. The table records the observed heads; none was remotely deleted in this session. Native GitHub tools can update content/refs and close PRs but expose no delete-ref operation; terminal Git/gh has no write authentication and the browser is signed out. Do not claim cleanup complete until the remote list is re-read after deletion. Recheck each SHA before deletion so new work is not removed.

| Branch | Reviewed head | Disposition: delete after head recheck |
| --- | --- | --- |
| `origin` | `58ecfa356f0cb25f242531140133ac5512e1a402` | Already merged into main. |
| `architecture-cleanup-2026-09` | `da96e0c39cd8ec75cd71791ef66331ff7c2be30f` | Already merged into main. |
| `copilot/add-new-feature` | `e4ff2fb09482d87bf6a869e86d60095600221616` | Already merged into main. |
| `copilot/optimize-data-entry-typing` | `1613c56d426ba8677288f0bbb5a2feea4402b07d` | Useful five practice-page SEO expansions adapted onto main in this audit; old assessment claims rejected; retain current scoring implementation. |
| `data-entry-career-funnel` | `adb81cefc58a904d109630e0c472aa21bd2ae48d` | Already merged into main. |
| `data-entry-career-funnel-v2` | `adb81cefc58a904d109630e0c472aa21bd2ae48d` | Already merged into main. |
| `data-entry-career-funnel-v3` | `b9dade220dadf87b9d0a19466578b52b5db12a15` | Superseded SEO registry trim; would remove current indexable content. |
| `data-entry-practice-paths` | `b6cfb045e93a30526d1052f7626fd38aeef3f2ab` | Already merged into main. |
| `feature/language-revival-hub-2026-11` | `71effe77f2e841651be006a70c4ffd64806e2e40` | Superseded by published revival implementation; conflicting route architecture; PR #22 closed. |
| `fix-cloudflare-static-assets` | `d36cde52f528bf3e3c7e4c9608777db331334cd4` | Already merged into main. |
| `fix-google-canonicals` | `15724a2eb5bad9b340308149a7f8fba3aab124e1` | Already merged into main. |
| `fix-mobile-navigation-and-results` | `b7ab888cb361e58e1a3eea7d55ad2c58c7332d0c` | Old menu CSS targets replaced navigation; educator/professional pages superseded by current dedicated layouts. |
| `fix-react-hydration-console` | `b465c91b0a3d39b862d2ea74844c2cf54e13d127` | Already merged into main. |
| `fix/mobile-certificate-menu` | `ddf9fdc9303f8bb0e23fc7f68bd88d4dbf6e2d76` | Already merged into main. |
| `fix/mobile-menu-language-links` | `eb7a82b61808cc9324846b9ab98fa7ad90a58729` | Already merged into main. |
| `mobile-typing-seo` | `1f8842f06e63ca6c760011cce7f4a48eb800e441` | Already merged into main. |
| `seo-optimization-completion` | `836a02d241d7b9d11fa8cb38f5aa458d7055dada` | Already merged into main. |
| `stabilize-typing-and-layout` | `b6c6d588bd211ca3681b1164ae7c5a6ab4be04c4` | Already merged into main. |
| `surface-data-entry-and-certificate` | `e795524d397715dc7342d50941ecd2e1c626f70c` | Already merged into main. |
| `typing-personality-test` | `55f3e5ce52ee8467ed8dd1682b895fa7a7a503f3` | Already merged into main. |

## Revenue and traffic findings

1. **Amazon is not configured.** No Amazon tracking ID or product links exist in the repo or supplied context. Previous blocker was SiteStripe on a phone. Obtain the public US Associates tracking ID (often ending `-20`) or a generated tagged product link; never request passwords. Confirm WPMTest.app is registered in the account. Use disclosed, sponsored links next to useful original keyboard/keypad guidance, with no fabricated product reviews, prices or ratings. Required Amazon disclosure: “As an Amazon Associate I earn from qualifying purchases.”
2. **Analytics is an unconnected interface.** `configureAnalytics` has no caller/provider in the repo. The custom browser event is not a reporting dashboard. Connect a chosen provider and verify test-start, completion, share and affiliate-click events before making conversion claims. Never collect typed custom text or personal certificate names.
3. **Ad placements are placeholders.** The AdSense loader/publisher metadata and ads.txt exist. `AdSlot` renders an “Ad placement” placeholder, not an `ins.adsbygoogle` ad unit. Auto Ads may be configured outside the repo; approval, serving and revenue cannot be confirmed here. Do not switch ads on or invent ad-unit IDs. Resolve approval/serving status in AdSense first.
4. **SEO checks verify technical eligibility, not Google ranking.** Search Console clicks, queries, CTR, indexed canonicals, Core Web Vitals and coverage were not authenticated or measured. Review existing pages with impressions before creating more overlapping keyword pages. Improve the best opportunities for employment/data-entry intent and link them contextually to their practical tests.
5. **Distribution needs a repeatable channel.** Test short typing-personality challenges and phone-versus-keyboard comparisons with clear links back to the actual tool. Seek relevant educational/community resource mentions through useful material; do not buy links. Keep language-revival content respectful and community-led, separate from the sarcastic entertainment tone.
6. **Maintain current product scope.** Keep no-account local practice, current language pathways, honest copying-drill labels, existing URLs and established article styling. Do not ship unreviewed language passages or sell practice results as accredited/proctored certification.

## Follow-up priorities

1. Resolve GitHub billing lock and delete reviewed obsolete remote branches through authenticated GitHub access.
2. Supply Amazon tracking ID / tagged product URL and finish disclosed link implementation.
3. Connect conversion analytics and review Search Console data.
4. Confirm AdSense account approval, Auto Ads settings and actual ad serving; implement manual units only with real approved slot IDs.
5. Measure mobile performance and test real phone input; plan React 19 and gradual extraction from `src/App.tsx`. Legacy CSS remains active and should not be deleted without tracing selector ownership.

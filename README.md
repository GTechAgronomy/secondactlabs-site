# Second Act Labs — site deploy package (brand refresh, Aug 2026)

Static site, no build step. Production is the Git-connected Cloudflare Pages project
`secondactlabs-site`, deployed from the protected `master` branch.

## Contents
- index.html — the entire site (inline CSS + vanilla JS: contour-field hero, scroll reveals, parallax, hide-on-scroll header)
- assets/ — product screenshots for GenCatalog, Fieldnote, Street Legal, and Shachar
- favicon.svg / favicon.ico / favicon-16.png / favicon-32.png — the rule mark alone (identity rule 1)
- avatar-180.png (apple-touch-icon), avatar-512.png
- robots.txt, sitemap.xml, llms.txt
- _headers — Cloudflare Pages / Netlify header rules (ignore on other hosts)

## Brand refresh notes
- Type: EB Garamond (masthead, headlines, italic Act), Archivo (proposition, body), IBM Plex Mono (uppercase labels).
- Off-white is #f4f1ea on #0b0a09, per the identity sheet.
- The "2A" monogram is retired. The masthead is the double-rule glyph + Second *Act* Labs.
- Footer colophon uses the paste-ready "Built by" setting from identity-final/colophons/street-legal.html.
- Shachar was added as the fourth product after the refreshed identity package was created.

## Deployment
- Fonts load from Google Fonts — no local font files needed.
- No dependencies, no framework, no build.
- Hero canvas and scroll effects degrade gracefully without JS (content stays visible).
- gencatalog-library.webp is 5120px wide (918 KB). Optionally generate a ~2400px version to save bandwidth.
- Update sitemap.xml lastmod on future edits.

## Release safety
- `master` is the production source of truth. Direct production uploads and dirty-worktree deploys are prohibited.
- Run `node .github/scripts/verify-site.mjs` before opening a pull request.
- `.github/brand-contract.json` pins the approved refreshed identity, required homepage markers, product count, and identity-asset hashes.
- The required `Verify approved site` check blocks identity regressions before merge.
- `Verify production parity` checks every production push and runs hourly so an out-of-band deployment cannot remain silent.
- The approved recovery point is tagged `approved-brand-2026-08-17`.

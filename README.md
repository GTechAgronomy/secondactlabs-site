# Second Act Labs — site deploy package

Static site, no build step. Deploy the contents of this folder as-is to any static host
(Cloudflare Pages, Netlify, Vercel, S3, GitHub Pages).

## Contents
- index.html — the entire site (inline CSS + vanilla JS: canvas hero, scroll reveals, parallax)
- assets/ — product screenshots (gencatalog-library.webp, fieldnote-watch.png, fieldnote-reflections.png)
- favicon.svg
- robots.txt, sitemap.xml, llms.txt
- _headers — Cloudflare Pages / Netlify header rules (ignore on other hosts)

## Notes for deployment
- Fonts load from Google Fonts (Geist, Geist Mono, Newsreader) — no local font files needed.
- No dependencies, no framework, no build. Everything is hand-inlined.
- The hero canvas animation and scroll effects degrade gracefully without JS (content stays visible).
- gencatalog-library.webp is 5120px wide (918 KB). Optionally generate a ~2400px version to save bandwidth.
- Update sitemap.xml lastmod on future edits.

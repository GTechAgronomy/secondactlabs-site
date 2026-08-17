# Second Act Labs repository guardrails

The committed `master` branch is the only production source of truth. Cloudflare Pages deploys from GitHub. Never deploy a dirty worktree, a temporary staging folder, an old archive, or an uncommitted local state directly to production.

Before changing or shipping the site:

1. Run `node .github/scripts/verify-site.mjs` before and after the change.
2. Treat `.github/brand-contract.json` as the approved refreshed identity contract. Do not weaken or update it unless the user explicitly approves an identity change.
3. Preserve the live-text double-rule `Second Act Labs` masthead, EB Garamond / Archivo / IBM Plex Mono typography, `Software, taken personally.` hero, four-product index, built-by colophon, and pinned identity assets.
4. Never reintroduce `A STUDIO OF ONE`, `EST. 2026`, the raster header lockup, the old Geist / Newsreader treatment, or `mix-blend-mode` on the masthead.
5. Keep Shachar as product 04 with `assets/shachar-splash-dark.png` and `assets/shachar-plan.jpg` unless the user explicitly changes that product.
6. For visual work, verify the actual checkout at 2520px, 1440px, and 390px. Confirm the masthead is visible, there is no horizontal overflow, and lazy-loaded product imagery decodes after scrolling.
7. Ship through a pull request after the required `Verify approved site` check passes. Do not bypass protected `master` or use `wrangler pages deploy` for production.
8. After merge, require the `Verify production parity` job to prove that `https://secondactlabs.com/` byte-matches the committed homepage.

If a supplied archive conflicts with current committed work, inventory and merge the delta. Never replace the site wholesale without preserving legitimate newer products and machine-readable updates.

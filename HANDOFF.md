# HANDOFF — Hotel Maa Sharda Palace

**Live:** https://maashardapalaceujjain.com (Hostinger shared, PHP + static React)
**Repo:** https://github.com/bantikevat-oss/maa-sharda-palace
**Local:** `website/websites/hotel-maa-sharda-palace` · dev on port 5202 (`npm run dev`)
**Admin:** `/#/admin` (HashRouter — every route lives under `#/`)

---

## 2026-08-07 — 100% dynamic admin

**PR:** https://github.com/bantikevat-oss/maa-sharda-palace/pull/1 (merged to `main`)
**Status:** 🟢 **LIVE on production** — deployed 2026-08-07 ~17:00 IST

### Deploy record (2026-08-07)
Host: `pukhta` (Hostinger `u937373134`, `82.180.166.85`) →
`domains/maashardapalaceujjain.com/public_html/`

```bash
# from website/websites/hotel-maa-sharda-palace
npm run build
rsync -az --stats \
  --exclude 'images/' --exclude 'api/site-config.json' \
  --exclude 'api/posts/' --exclude 'api/rooms.json' \
  dist/ pukhta:domains/maashardapalaceujjain.com/public_html/
```

- Pre-deploy backup: `~/backups/msp/msp-prehotfix-20260807-165504.tar.gz`
- 37 files uploaded; `images/` (94 files) and live data untouched.
- Cleanup (confirmed with Aman): the publicly downloadable 96 MB
  `public_html/dist_upload_latest.zip` was **moved** to
  `~/backups/msp/dist_upload_latest-2026-06-06.zip` (out of the web root), and the
  13 unreferenced 19-June asset files were deleted. Both are inside the backup tar.
- Post-deploy verified: home + 8 pages render, 0 broken images, 0 JS errors,
  admin login + page editor + media library (78 photos) work, `verify-file.php`
  write test passes, `/dist_upload_latest.zip` no longer serves the archive.

**Prod has no `api/site-config.json`** — the site runs entirely on the schema
defaults, which were seeded to match the previously-deployed bundle exactly
(phone 9109103571, Superior/Superior Deluxe/Executive/Executive Deluxe rooms,
₹3,000–₹6,000, check-in 12:00 PM). The file is created the first time someone
saves in the admin, and only stores keys that differ from the defaults.

### What changed
The whole site is now driven from one declarative content model, `src/content/schema.js`.

- 14 page groups → sections → typed fields (`text`, `textarea`, `number`, `image`, `toggle`, `tags`, `list`).
- `SITE_DEFAULTS` is generated from the schema — add a field there and it ships with its
  default *and* appears in the admin automatically. No other file to touch.
- Every public component reads through `useSite()` (`src/hooks/useSite.jsx`). There is no
  hardcoded copy, image path or list left on the public site.
- Rooms are one list. Adding a room in the admin creates `/rooms/<slug>` with no code change.

### Admin map
| Screen | Path | What it owns |
|---|---|---|
| Dashboard | `/#/admin` | counts + shortcuts |
| Website Content | `/#/admin/pages` | every page, section by section |
| Photos | `/#/admin/media` | media library, shows where each photo is used |
| Blog | `/#/admin/blog` | posts (unchanged) |
| SEO & Verification | `/#/admin/seo` | page titles/descriptions + Search Console file upload |
| Analytics | `/#/admin/gtm` | GTM / GA4 / FB Pixel |
| Settings | `/#/admin/settings` | admin username + password |

Old `/admin/content`, `/admin/rooms`, `/admin/images` routes redirect to the new ones.

### Config migration (automatic, idempotent)
`migrateConfig()` in `schema.js` upgrades the saved `api/site-config.json` on load:
- `stat_rooms` / `stat_guests` / `stat_experience` / `stat_banquets` → one `hotel_stats` list
- `seo_rooms` / `seo_about` / … objects → flat `seo_*_title` and `seo_*_desc` keys
- the four fixed room slots + `extra_rooms` → one `rooms` list

Verified against the live config: saved room names, prices, phones and gallery all survive.
Only keys that differ from the schema defaults are written back, so the file stays small
and future default changes flow through.

### New PHP endpoints
- `api/list-images.php` — lists `/images` for the media library (newest first).
- `api/verify-file.php` — GET lists / POST writes or deletes a search-engine verification
  file at the web root. Filenames are allow-listed (`google*.html`, `BingSiteAuth.xml`,
  `yandex_*`, `*-site-verification.*`); PHP/script content and path traversal are rejected.

### 🪤 Gotchas
- **HashRouter.** `src/main.jsx` imports `HashRouter as BrowserRouter`. `/rooms` renders the
  home page; the real URL is `/#/rooms`. Don't "fix" a page that looks wrong until you've
  checked you used the hash form.
- **GSC verification is not live yet.** `https://maashardapalaceujjain.com/google871b0a7dee5b2128.html`
  currently returns `index.html` (SPA fallback), i.e. the file was never actually placed on
  the server. Once this build is deployed, upload it from Admin → SEO & Verification; the
  `.htaccess` `-f` rule then serves the real file and Google can verify.
- **Never overwrite on the server:** `images/`, `api/site-config.json`, `api/posts/`.
  Those hold the client's live uploads, saved content and blog posts.
- Delete `public_html/assets/` before uploading the new one — stale Vite hashes cause a
  blank white page.

### Deploy package
`/Users/aman/claude/other/2026-08-07_maashardapalace-deploy-code-only.zip` (406 KB, 39 files)
— `index.html`, fresh `assets/`, all `api/*.php`, `.htaccess`, `robots.txt`, `sitemap.xml`,
favicons and the Google verification file. Images and live data are deliberately excluded.

### QA done (local, 2026-08-07)
- `npm run build` clean.
- All 21 routes render with unique content and unique `<title>`; zero JS errors; no broken images.
- Admin edit → Save → written to `site-config.json` → reflected on the public page.
- Verification upload works; `../../evil.php` carrying PHP is rejected.
- No horizontal overflow at 375px on any public or admin screen.

### Next
1. Upload the deploy package to Hostinger `public_html/` (needs hPanel/FTP access).
2. Post-deploy: `/api/list-images.php` should return JSON, `/#/admin` should log in,
   then upload the Search Console file and hit Verify in Google.

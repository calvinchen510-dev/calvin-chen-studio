# calvinchen.ai

Static site for Calvin Chen Studio, hosted on Cloudflare Pages (project `calvinchen`).
No build step: upload this folder as it is.

## Where things live

| Path | What it is |
|---|---|
| `index.html` | Home page (Chinese and English in one file) |
| `privacy.html` | Privacy notice |
| `assets/css/tokens.css` | **All colours, fonts, sizes, spacing, radius, motion.** Change look here only. |
| `assets/css/base.css` | Reset, type roles, layout helpers, language switch |
| `assets/css/components.css` | Reusable parts: buttons, chips, header, film frame, work layout, steps, contact rows, footer |
| `assets/js/lang.js` | Picks the language before the page paints |
| `assets/js/site.js` | Language toggle, hero load sequence, video pause, copy email |
| `assets/fonts/` | Hanken Grotesk, self-hosted (SIL Open Font License) |
| `media/` | Photos, hero film (`hero-wide.mp4`, 1600x900), share image |
| `_headers` | Security and cache headers for Cloudflare |
| `.well-known/security.txt` | Where to report a security issue |

## Changing colours

Open `assets/css/tokens.css`, edit the **1. Palette** block. Every other file reads colours
through the **2. Roles** block, so you never touch hex values anywhere else.
The audit check fails if a hex value appears outside `tokens.css`.

## Adding text

Every visible string is written twice, side by side:

```html
<span lang="zh-Hans">中文</span><span lang="en">English</span>
```

## Rules that keep the site safe

- No inline `<script>`, no `style="..."`, no `onclick=`. The security policy blocks them.
- External links always use `target="_blank" rel="noopener noreferrer"`.
- No Google Fonts, trackers or embeds. The only outside script allowed is Cloudflare Web Analytics (cookieless).
- If you add any outside service, update `_headers` and `privacy.html` in the same change.

## Deploying

This repo is the source of truth. Cloudflare Pages builds from the `main` branch:
no build command, output directory `/` (the repo root). Every push to `main` goes live;
every other branch gets its own preview link.

Design rules and the pre-launch checklist live in the Calvin Chen Studio Design Rule Book (Claude Docs).

## History

Versions before this repo (up to 2026-10-09) are zips in Google Drive:
`Calvin Chen Studio / 网站 / calvinchen.ai`.

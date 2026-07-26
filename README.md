# Proarc — Premium Redesign

A ground-up premium redesign of the Proarc website: full-screen scroll storytelling, GSAP + Lenis smooth-scroll animation, and a charcoal/off-white/stone palette anchored in the (monochrome) Proarc wordmark. Lives entirely in this folder, alongside — and independent of — the original site at the project root.

**Static output, build-time codegen.** The deployed site is plain HTML/CSS/JS with no runtime framework. A handful of Node scripts (using only `sharp` as a dependency) generate that static output from source content, so nothing here needs a server to run — open any `.html` file directly, or serve the folder with any static file server.

## Structure

```
index.html, about.html, services.html, projects.html, contact.html   ← compiled output (don't hand-edit — see below)
pages-src/*.html + pages-src/meta.json     ← source for the pages above
projects/<slug>.html                        ← GENERATED, one per project (47 total)
data/projects.json                          ← project content: the source of truth
images/manifest.json                        ← GENERATED image inventory (per-project hero/thumb/gallery paths)
images/projects/<slug>/, images/logos/      ← GENERATED .webp output
images/_raw/                                ← staged source photography (gitignored, ~630MB — see below)
css/tokens.css                              ← design tokens (palette, type scale, spacing) — edit this first for any visual rebrand
css/base.css, layout.css, components.css, animations.css, pages/*.css
js/smooth-scroll.js, reveals.js             ← shared animation init, loaded on every page
partials/head.html, header.html, footer.html, scripts.html, project-detail.template.html
build/*.js                                  ← the scripts described below
php/contact.php                             ← copied unchanged from the original site
```

## Rebuilding

Three independent scripts, run in this order when their inputs change:

```bash
npm install                       # once, installs sharp

node build/process-images.js      # data/projects.json + images/_raw/ + ../images/folio/  →  images/projects/*, images/logos/*, images/manifest.json
node build/generate-projects.js   # data/projects.json + images/manifest.json + partials/project-detail.template.html  →  projects/*.html
node build/inject-partials.js     # pages-src/*.html + pages-src/meta.json  →  index.html, about.html, services.html, projects.html, contact.html
```

**Never hand-edit** `projects/*.html`, `index.html`/`about.html`/`services.html`/`projects.html`/`contact.html`, or `images/manifest.json` — they're all generated. Edit the source instead and re-run the relevant script:

| To change… | Edit… | Then run… |
|---|---|---|
| Project copy, specs, category, adding a new project | `data/projects.json` | `generate-projects.js` (add its images to `images/_raw/<slug>/` first if it's a new project, then `process-images.js`) |
| A project's photos | `images/_raw/<slug>/` (new projects) or the original site's `images/folio/` (legacy projects, matched by `legacySlug`) | `process-images.js` → `generate-projects.js` |
| Nav, footer, `<head>` meta, CDN script versions | `partials/*.html` | `inject-partials.js` and/or `generate-projects.js` (both consume the partials) |
| Home/About/Services/Projects/Contact content | `pages-src/*.html` | `inject-partials.js` |
| Colors, type, spacing | `css/tokens.css` | nothing — CSS is linked directly, just refresh |

## Content sources

- **41 legacy projects**: content is pulled live from the original site's own project pages (`../azhagarden.html` etc.) by `build/enrich-legacy-content.js` — specifically the rendered `<p class="cs-desc">` body copy and "Project Data" fields, skipping anything the original page itself marks `data-placeholder="true"` (unconfirmed/generic filler). Re-run this script if the legacy pages change; it always re-derives from them rather than trusting stale JSON.
- **6 new projects** (Bluebell Residence, Azha Park Residences, One 678, DECA 035, Star Giga Tower, Zamzam Tower): copy transcribed from the client-supplied `details.txt` files and the Zamzam Tower `.docx`, hand-entered into `data/projects.json`. **DECA 035's project name is inferred** from its render filenames — no formal title was supplied — flagged via its `note` field in the JSON; confirm with DECA Properties before treating it as final.
- **Category taxonomy** was cleaned up vs. the original site: `Commercial`, `Educational`, `Residential`, `Retail & Mixed-Use`, `Religious` — fixing two live-site bugs (Al Ghala Mosque/Religious had no working filter class; "Mall" vs. "Mixed-Use" were labeled inconsistently between pages).
- **Careers and Testimonials pages were intentionally not built** — the wireframe's content for both is explicit "Content Required" placeholders (no real job listings or client quotes exist yet). Add them once real content is available, following the same `pages-src/` pattern.

## Deployment

This is two things bundled together:
1. **Static site** (everything except `php/`) — deployable anywhere that serves static files, including GitHub Pages.
2. **Contact form** (`php/contact.php`, copied unchanged from the original site) — needs a real PHP host with `mail()` configured; it will not run on GitHub Pages. The form posts to the relative `php/contact.php`, matching wherever the rest of the site is deployed.

**Known issue, inherited from the original file, not introduced here:** `contact.php` calls `get_magic_quotes_gpc()`, which was removed in PHP 8.0 — on a PHP 8+ host this will fatal-error and the form won't work at all. This needs a small fix (drop that check — magic quotes have been gone since PHP 5.4) before going live on a modern PHP version; flagging rather than silently patching it since it's shared with the original site's copy of the same file.

## `images/_raw/`

Staged, resized-down copies of every source photo (the unzipped project renders, the Zamzam Tower jpegs, and the client logo PNGs) that `process-images.js` reads from. It's gitignored and safe to delete to reclaim ~630MB of disk — the *original* uploaded files (`OneDrive_2026-07-25.zip`, the `.docx`, the loose jpegs) remain untouched at the project root regardless. Only delete it if you're done adding new projects; `process-images.js` needs it present to (re)process the 6 new projects, since — unlike the 41 legacy ones — they have no other source location.

# ProArc — Project Rules

## Typography and colour

The authoritative specification is `docs/ProArc-Typography-Guideline-v1.2.md` (supersedes v1.1 — see "Typography and layout — v1.2 additions" below; v1.1 stays in docs/ for history). **Read it before writing or changing any CSS, any component style, or any markup that renders text.** The rules below are the enforceable summary, not a replacement for it.

Design tokens live in `src/styles/tokens.css`. Every type and colour value in the codebase comes from a token. If a value you need is not a token, stop and ask — do not invent one.

### Hard rules — never violate these

1. **No hardcoded colours.** No hex, `rgb()`, `hsl()`, or named colours anywhere except `tokens.css`. Use `var(--color-*)`.
2. **No hardcoded font sizes.** Use `var(--fs-*)`. Font sizes are authored in `rem`, never `px`.
3. **The site is monochrome.** The only colour in the interface is `--color-signal` / `--color-signal-on-dark`, and it appears **only** in form validation states. If you are reaching for colour anywhere else, the answer is weight, size, or space.
4. **No italics on content type.** No `font-style: italic`, no `oblique`, no `transform: skew()` on text. The oblique belongs to the wordmark only.
5. **No physical direction properties.** The site is bilingual EN/AR. Use `margin-inline-start`, `padding-inline-end`, `border-inline-start`, `text-align: start`. Never `margin-left`, `padding-right`, `text-align: left`, `border-left`.
6. **Never apply `letter-spacing` to Arabic.** It is zero, always, enforced globally in `tokens.css`. Do not override it. Positive tracking severs the connecting strokes and negative tracking collides them.
7. **Light weight (300) is Latin-only.** Arabic never uses 300; it maps to 400.
8. **No text directly on a photograph.** Use the black panel (`--color-surface-dark`). If a full-bleed scrim is unavoidable, it must be **minimum 60% black across the entire text bounding box plus 24px bleed**, with pure `#FFFFFF` text. A gradient that fades to nothing behind the words is a bug.
9. **Body text is never below 16px** at any breakpoint. Minimum text size anywhere is 12px (13px Arabic), and that is reserved for captions, eyebrows and labels.
10. **No gradient text, no text-shadow, no glow.** No gradient fills on headings. No coloured shadows.

### Structural rules

- Heading levels follow document structure, not visual size. Never skip `h1` → `h3`. A large heading that is not the page's top-level heading is an `h2` styled at H1 size.
- `text-transform: uppercase` for uppercase. Never type capitals into the CMS.
- Metadata and spec lists are real `<table>` markup with `<th scope="row">` on the label cell.
- Set `lang` and `dir` on `<html>` and on every inline language switch.
- Never `user-select: none` on content type.
- Respect `prefers-reduced-motion`; no text animates in by default.

### Two collapses on mobile (≤767px) — these are intentional, do not "fix" them

- Mega Splash ceases to exist and resolves to H1 (both 34px).
- H3 and Body Large are both 20px, separated by weight (600 vs 300) and space only.

### Accessibility

WCAG 2.1 AA is the floor: 4.5:1 body, 3:1 large text (24px+, or 19px+ at 700). Every permitted pair is already measured in §5 of the guideline. **If you introduce a new text/background pair, measure it and add it to §5.** Contrast over photography is measured against the lightest patch inside the text box, never the image average.

Never signal meaning with colour alone. Nav active = weight 700 + underline. Inline emphasis = weight 600, no colour. Errors = colour + text string + 2px inline-start rule.

### The wordmark

- Never re-set the word "proarc" in General Sans as a stand-in for the mark. Use the supplied asset, or the plain string "ProArc" in text-only contexts.
- Never place the white mark on a photograph without its black field.
- The mark is never mirrored, flipped, or recoloured. In RTL its position moves; the artwork does not change.
- Minimum rendered width 96px desktop, 80px mobile. Minimum clear space 24px in the header.

## Before you finish any UI task

Run through this list and state the result:

1. `npx stylelint "src/**/*.css"` passes.
2. No new hardcoded hex, px font-size, or physical margin/padding/border property.
3. Any new text/background pair has a measured contrast ratio.
4. The change was checked at 375px, 768px and 1440px.
5. The change was checked with `dir="rtl"` and `lang="ar"`.
6. Zoom to 200% at 1280×720 produces no horizontal scroll.

## Asking rather than guessing

If a design need is not covered by the guideline, do not improvise a value. Say what is missing and ask. The specification is versioned; extending it is a deliberate act, not a build-time decision.

## Typography and layout — v1.2 additions

The authoritative spec is now `docs/ProArc-Typography-Guideline-v1.2.md` (supersedes v1.1; v1.1
stays in docs/ for history). Everything in the v1.1 rules above still holds. New in v1.2:

### Spacing — use the semantic aliases, never raw values

`--gap-inline` (12) · `--gap-tight` (16) · `--gap-block` (24) · `--gap-heading` (64) ·
`--gap-component` (64) · `--gap-section` (200) · `--gap-section-major` (280 — statement
sections only: mission/vision, closing CTA. Do not inflate every gap).
Container: `--container-max` (1120px), gutters `--gutter-desktop/tablet/mobile` (80/40/20).
Padding: `--pad-card` (40), `--pad-overlay-panel` (48), `--pad-table-row` (12).
The legacy `--space-*` scale in tokens-layout.css pre-dates v1.2 — do not extend its usage;
new code uses the aliases above. Migration of old usages is a planned, separate task.

### Measure

Running prose sits between 45 and 68 characters per line. Below 45, reduce the column count,
not the type size. Maximum two prose columns on desktop; three-up only for labelled items
under 25 words at a 32ch minimum.

### Third-party logos (§1.5a) — the second colour exception

Reproduce client marks exactly as supplied: no recolour, greyscale, invert, or hover-to-colour.
Never typeset a client's name in place of their mark — obtain the asset or omit the client.
All marks on white, 32px optical height, uniform container treatment, and no mark within
96px of `--color-signal`.

### Desktop navigation (§4.7)

Full-screen overlay, no horizontal top bar. One black pill trigger (icon + 12px uppercase
label in the same pill), hit target ≥44×44. Nav items 52px, 300 rest / 700 active, weight
plus brightness only. No bordered container around the mega-menu grid. Focus trapped while
open, restored on close, Escape closes, `aria-current="page"` on the active item.

### Additional prohibitions

No numbered markers on non-sequences. No grids of identical cards. No inline `style=""`
attributes in pages-src/ or partials/ — every styled value lives in `src/styles/` where
stylelint can see it. No border-radius (no radius tokens exist in the system).

### Build discipline

Root pages and projects/ pages are build outputs. Edit pages-src/, partials/, src/styles/,
data/ only, then run `node build/inject-partials.js && npm run build:pages`.

## v1.2.1 — deviation from §4.7 trigger side (reviewer decision, 31 Jul 2026)

§4.7 places the desktop nav trigger inline-start. Per the reviewer's punch list (item 2.6),
the build now places the trigger immediately inline-start of the boxed wordmark, with both
forming one fixed cluster at the top **inline-end** (top-right in LTR) instead. This is a
conscious, recorded spec deviation, not a silent build-time call — the underlying rule
(single black pill, icon + 12px uppercase MENU label, ≥44×44 hit target, one persistent black
element on the page) is otherwise followed exactly. Everything else in §4.7 (overlay regions,
nav item weights, focus trap) is unchanged. Written with logical properties
(`inset-inline-end`), so the Arabic build mirrors the cluster to the top-left automatically.

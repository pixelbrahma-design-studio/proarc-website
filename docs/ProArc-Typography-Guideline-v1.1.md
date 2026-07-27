# ProArc Typography Guideline — v1.1 (Locked)

**Status:** Locked specification. Supersedes v1.0 (27 July 2026) and the v0.2 open draft.
**Date:** 27 July 2026
**Audience:** Designers and developers implementing the ProArc website.
**Region:** United Arab Emirates. Bilingual English / Arabic.
**Rule of use:** Every value is a single decision. Nothing here is provisional. Deviations require a version bump, not a judgement call at build time.

**What changed from v1.0:** the system is now monochrome, rebuilt around the ProArc wordmark. The navy and rust two-tone is withdrawn. A bilingual Arabic specification and a logotype relationship section are added. Full change record in Appendix C.

---

## 0. Decisions Locked

| # | Question | Locked decision | Reason |
|---|---|---|---|
| 1 | Scope of "sans-serif only" | **Content and UI typography only.** The wordmark is exempt. | A wordmark is a brand asset, drawn once, never composed at runtime. |
| 2 | Metadata treatment | **Ruled table.** Two columns, hairline dividers, one family throughout. | Keeps the system to one Latin family. Monochrome rules and space do the separating work, which suits the brand. |
| 3 | Text over images | **Solid black panel is the default. Scrim is the permitted fallback. Direct-on-photo is prohibited.** | The panel is the mark's own field colour, so it is brand-native rather than a workaround. It is also invariant across every photograph. |
| 4 | Display register | **Dual register.** Hero Display (Bold, uppercase) for marketing; Editorial Display (Light, sentence case) for project narrative. | Same family, same size, different job. Supplies range without a second typeface. |
| 5 | Inline emphasis for key facts | **Weight-based, not colour-based.** Numerals and specifications step from 400 to 600. No colour. | Revised from v1.0. The GMR reference already demonstrates bold inline emphasis; the Dewan colour highlight cannot survive a monochrome brand. |
| 6 | Latin font family | **General Sans.** | Free across the full weight range required, distinctive grotesk character, and not Inter. |
| 7 | **Colour policy** | **Monochrome. Colour appears exactly once, as a validation signal, and never in editorial content.** | See §1.5. The mark is monochrome, and the photography is where colour belongs on an architecture site. |
| 8 | **Bilingual scope** | **English and Arabic, both first-class. IBM Plex Sans Arabic as the Arabic companion.** | See §6. Assumed in scope for the UAE market; flag immediately if the first release is English-only. |

**Correction carried from v1.0:** General Sans is by Frode Helland for the **Indian Type Foundry**, distributed through Fontshare. v0.2 attributed it to Pangram Pangram.

---

## 1. Font Family

### 1.1 Latin primary

**General Sans**, Indian Type Foundry (designer: Frode Helland), distributed via [Fontshare](https://www.fontshare.com/fonts/general-sans) under the **ITF Free Font License**. Six weights Extralight to Bold, each with an italic, plus two variable fonts. ProArc uses five weights and no italics.

### 1.2 Arabic companion

**IBM Plex Sans Arabic**, Mike Abbink and IBM BX&D with Bold Monday, distributed via [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic) under the **SIL Open Font License 1.1**. Seven weights, 100 to 700. No italics, because Arabic has no italic form.

It is chosen over Cairo, Almarai and Noto Sans Arabic for three reasons: it carries the exact five weights this system needs at matching numeric values, it was drawn as a systematic companion to a neutral Latin grotesk so its proportions sit comfortably beside General Sans, and its screen hinting holds at 14px, which matters because the metadata tables are the densest Arabic on the site.

### 1.3 Weights in use, and the source for each

Both families are free under their respective licences. There is no paid tier and no per-weight cost in either.

| Weight | Value | Latin use | Arabic use | Source and licence |
|---|---|---|---|---|
| Light | 300 | Editorial Display, Body Large | *Not used. See §6.4* | General Sans, Fontshare, ITF FFL / IBM Plex Sans Arabic, Google Fonts, OFL 1.1 |
| Regular | 400 | Body, metadata values, footer links | Body, metadata values, footer links, Editorial Display, Body Large | as above |
| Medium | 500 | Captions, eyebrows, navigation, overlay support text | Captions, eyebrows, navigation, overlay support text | as above |
| Semibold | 600 | H2, H3, inline emphasis, footer labels | H2, H3, inline emphasis, footer labels | as above |
| Bold | 700 | Hero Display, Mega Splash | Hero Display, Mega Splash | as above |

Extralight (200) and Thin (100) are not used in either family.

**Licensing action before launch.** Self-host WOFF2 for both families rather than hot-linking either CDN. Have the current ITF Free Font License and the SIL OFL 1.1 text read and filed by whoever signs off third-party assets. Both permit commercial use and web embedding; both prohibit selling the font files. OFL additionally requires that the licence text ship with any redistributed copy, which self-hosting satisfies by keeping the licence file in the font directory. Confirm against the licence as published on the day of download.

### 1.4 Fallback stacks

Inter is deliberately absent. Including it either does nothing, because most machines do not have it installed, or reintroduces the exact face the primary decision rejected.

```css
:root {
  --font-latin:
    "General Sans",
    -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto,
    "Helvetica Neue", Arial,
    sans-serif;

  --font-arabic:
    "IBM Plex Sans Arabic",
    "Noto Sans Arabic",
    "Geeza Pro", "Segoe UI",
    "Tahoma",
    sans-serif;
}

html:lang(en) { font-family: var(--font-latin); }
html:lang(ar) { font-family: var(--font-arabic); }
```

Arabic strings inside an English page, and Latin strings inside an Arabic page, are handled by `unicode-range` on the `@font-face` declarations rather than by wrapping spans. Declare the Arabic ranges (`U+0600-06FF, U+0750-077F, U+08A0-08FF, U+FB50-FDFF, U+FE70-FEFF`) on IBM Plex Sans Arabic and let the browser pick per character.

No `--font-mono` token exists. The monospace direction was not adopted and no role calls for it.

**Loading rules.**

1. Self-host WOFF2. Subset Latin to Latin plus the punctuation in use; subset Arabic separately.
2. `font-display: swap` on every `@font-face`.
3. Preload only what is above the fold: General Sans 400 and 700 on English pages, IBM Plex Sans Arabic 400 and 700 on Arabic pages. Never preload both families on the same page.
4. Apply `size-adjust`, `ascent-override` and `descent-override` on fallback `@font-face` declarations so the swap does not shift layout. Tune against Arial for Latin and Tahoma for Arabic.
5. Ship static weights, not the variable fonts, unless a measured build shows otherwise.

### 1.5 Colour policy, and why any colour exists at all

The ProArc wordmark is white on solid black. No second colour, no gradient, no tint. A type system that introduces a brand colour underneath a monochrome mark puts the two in competition, and the mark loses, because the colour is on every page and the mark is in one corner.

There is also a positive argument, not just a defensive one. On an architecture site the photography is the colour. Renders, site photography and material studies carry saturated content that changes on every project page. A neutral type system lets that colour land without contest. The moment the interface introduces its own accent, every photograph has to be checked against it, and the palette starts constraining which projects can be shown well. Monochrome type is the condition under which the work stays the loudest thing on the page.

So the system is monochrome. Every job that colour was doing in v1.0 has been given a monochrome equivalent that is at least as strong:

| Job | v1.0 solution | v1.1 solution |
|---|---|---|
| Eyebrow labels | Rust text | Secondary grey, preceded by a 24px hairline rule mark |
| Active navigation state | Rust text | Weight step 500 to 700, plus a 2px underline |
| Inline emphasis on key facts | Rust text | Weight step 400 to 600 (the GMR reference precedent) |

**The one exception, and its justification.** Colour survives in exactly one place: **form validation and error states.** This is the only case where the monochrome alternative is genuinely inferior, and the reason is specific rather than aesthetic. Helper text and error text occupy the same position, at the same size, in the same weight; set in the same grey they are indistinguishable until read. Everywhere else on the site a missed signal costs the reader a moment. In the enquiry form it costs a submission, which is the one conversion the site exists to produce.

Even there, colour never carries the message alone. An error state always presents three signals together: the colour, an explicit text string naming the problem, and a 2px rule on the inline-start edge of the field. A reader who cannot distinguish the hue loses nothing. This satisfies WCAG 1.4.1 and it means the colour is reinforcement, not information.

**Rejected: the desert palette.** Sand, ochre, warm beige and terracotta are the reflexive choice for a Gulf-region brand and they are the single most predictable thing this site could do. They are also, on a practical level, the exact tonal range that most architectural render output already sits in, so they muddy the photography rather than framing it. Not used.

### 1.6 Colour tokens

Every ratio below is measured against the WCAG relative-luminance formula, not estimated.

```css
:root {
  /* Neutral ramp */
  --color-ink:               #111111; /* primary text on light            */
  --color-ink-secondary:     #595959; /* metadata labels, captions        */
  --color-surface:           #FFFFFF;
  --color-surface-dark:      #000000; /* the wordmark's own field         */
  --color-on-dark:           #FFFFFF; /* display type and the mark        */
  --color-on-dark-body:      #EDEDED; /* body copy on black — see below   */
  --color-on-dark-secondary: #A6A6A6;
  --color-hairline:          #D6D6D6; /* rules on light. Non-text         */
  --color-hairline-dark:     #333333; /* rules on black. Non-text         */

  /* Signal — validation states only. Never editorial. */
  --color-signal:            #B3261E; /* light surfaces only              */
  --color-signal-on-dark:    #F2695C; /* dark surfaces only               */
}
```

| Pair | Ratio | Verdict |
|---|---|---|
| `--color-ink` on `--color-surface` | **18.88:1** | Passes AAA |
| `--color-ink-secondary` on `--color-surface` | **7.00:1** | Passes AAA |
| `--color-on-dark` on `--color-surface-dark` | **21.00:1** | Maximum possible |
| `--color-on-dark-body` on `--color-surface-dark` | **17.94:1** | Passes AAA |
| `--color-on-dark-secondary` on `--color-surface-dark` | **8.63:1** | Passes AAA |
| `--color-signal` on `--color-surface` | **6.54:1** | Passes AA at any size |
| `--color-signal-on-dark` on `--color-surface-dark` | **6.95:1** | Passes AA at any size |
| `--color-signal` on `--color-surface-dark` | **3.21:1** | **Fails. Prohibited.** |
| `--color-signal-on-dark` on `--color-surface` | **3.02:1** | **Fails. Prohibited.** |

The two signal tokens are not interchangeable. Each fails on the other's surface. There is no single red that clears 4.5:1 on both pure white and pure black.

**Why body copy on black is `#EDEDED` and not white.** Pure white on pure black at body size produces halation: the glyphs bloom optically and the counters close up, which is measurably slower to read over a long paragraph. Dropping to `#EDEDED` costs nothing in compliance, at 17.94:1, and removes the effect. Display type stays pure white, because at 52px the halation is imperceptible and the match to the wordmark matters more.

**Exception:** over a scrim, always use pure `#FFFFFF`. `#EDEDED` over a 60% scrim measures 4.90:1 against a blown-out photo region, which passes but eats most of the safety margin for no benefit. The halation argument applies to flat black surfaces, not to photographs.

---

## 2. Type Scale

Base: 16px = 1rem. Values below are the Latin scale. Arabic runs 5% larger; see §6.3.

The scale stays restrained through ordinary content, matching what all five reference sites do, and spends the golden ratio on one jump: Heading to Hero Display, then once more into Mega Splash. Applying φ at every step was tested in v0.2 and rejected: it produces a 10px caption and leaves no size for real project content.

| Role | px | rem | Step from previous |
|---|---|---|---|
| Caption / Label | 12 | 0.75 | — |
| Metadata | 14 | 0.875 | ×1.167 |
| Body | 16 | 1 | ×1.143 *(base)* |
| Body Large / Lead | 20 | 1.25 | ×1.25 |
| H3 — Subheading | 24 | 1.5 | ×1.20 |
| H2 — Heading | 32 | 2 | ×1.333 |
| **H1 — Display** | **52** | **3.25** | **×1.625 (φ)** |
| Mega Splash | 84 | 5.25 | ×1.615 (φ) |

The φ steps are rounded to whole pixels: 32 × 1.618 = 51.8, set at 52; 52 × 1.618 = 84.1, set at 84. The stated 1.625 and 1.615 are the ratios after rounding. Whole pixels are preferred because sub-pixel display sizes render inconsistently across browsers.

H1 carries both display registers at 52px, separated by weight, case and tracking. Mega Splash appears at most once per page.

---

## 3. Full Specifications by Role

Master table first, then the rules that cannot be expressed as a number. All values are Latin at desktop.

| Role | Size | Weight | Letter-spacing | Line-height | Max measure | Colour and contrast |
|---|---|---|---|---|---|---|
| **Hero Display (H1, marketing)** | 52px / 3.25rem | 700 | −0.03em | 1.05 | 20ch, hard cap 2 lines | `--color-ink` on white, 18.88:1. On black: `--color-on-dark`, 21.00:1 |
| **Editorial Display (H1, project pages)** | 52px / 3.25rem | 300 | −0.005em | 1.15 | 24ch, hard cap 3 lines | `--color-ink` on white, 18.88:1. Never on a photo |
| **H2 — Heading** | 32px / 2rem | 600 | −0.02em | 1.20 | 28ch | `--color-ink` on white, 18.88:1 |
| **H3 — Subheading** | 24px / 1.5rem | 600 | −0.015em | 1.30 | 45ch | `--color-ink` on white, 18.88:1 |
| **Body Large / Lead** | 20px / 1.25rem | 300 | −0.005em | 1.50 | 60ch | `--color-ink` on white, 18.88:1 |
| **Body** | 16px / 1rem | 400 | 0 | 1.60 | 68ch (640px) | `--color-ink` on white, 18.88:1. On black: `--color-on-dark-body`, 17.94:1 |
| **Body — inline emphasis** | 16px / 1rem | **600** | 0 | 1.60 | inherits | Same colour as body. **No colour change.** |
| **Caption / Label** | 12px / 0.75rem | 500 | +0.04em | 1.50 | 40ch | `--color-ink-secondary`, 7.00:1. On black: `--color-on-dark-secondary`, 8.63:1 |
| **Eyebrow** | 12px / 0.75rem | 500 | +0.04em, uppercase | 1.50 | 24ch | `--color-ink-secondary`, 7.00:1, with a 24px × 1px rule mark in `--color-ink` |
| **Metadata — label column** | 14px / 0.875rem | 500 | +0.02em | 1.65 | 18ch | `--color-ink-secondary`, 7.00:1 |
| **Metadata — value column** | 14px / 0.875rem | 400 | 0 | 1.65 | 40ch | `--color-ink`, 18.88:1 |
| **Nav — desktop bar** | 14px / 0.875rem | 500 | +0.06em, uppercase | 1.00 | n/a | `--color-ink`, 18.88:1. Active: weight 700 + 2px underline |
| **Nav — mobile stacked** | 24px / 1.5rem | 500 | −0.01em, sentence case | 1.40 | n/a | `--color-ink`, 18.88:1 |
| **Footer — section label** | 12px / 0.75rem | 600 | +0.06em, uppercase | 1.50 | 20ch | On black: `--color-on-dark-secondary`, 8.63:1 |
| **Footer — body and links** | 16px / 1rem | 400 | 0 | 1.60 | 32ch | On black: `--color-on-dark-body`, 17.94:1 |
| **Footer — dense office listing** | 14px / 0.875rem | 400 | 0 | 1.55 | 28ch | On black: `--color-on-dark-body`, 17.94:1 |
| **Text over image — panel (default)** | 52px / 3.25rem | 700 | −0.03em | 1.05 | 18ch | `--color-on-dark` on `--color-surface-dark`, 21.00:1 |
| **Text over image — scrim (fallback)** | 52px / 3.25rem | 700 | −0.03em | 1.05 | 18ch | Pure white on ≥60% black scrim, worst case 5.74:1 |
| **Text over image — supporting line** | 20px / 1.25rem | 500 | 0 | 1.45 | 40ch | Panel 21.00:1, or ≥60% scrim 5.74:1 |
| **Form — helper text** | 14px / 0.875rem | 400 | 0 | 1.55 | 40ch | `--color-ink-secondary`, 7.00:1 |
| **Form — error text** | 14px / 0.875rem | 500 | 0 | 1.55 | 40ch | `--color-signal`, 6.54:1, plus text string plus 2px inline-start rule |

### 3.1 Hero Display

Uppercase, maximum 8 words. If the headline needs more than 8 words it is not a hero headline; set it as Editorial Display. Never place an eyebrow, kicker or pill chip above it. The headline is the top of the page.

### 3.2 Editorial Display

Sentence case with terminal punctuation, in the register of "A Hotel for the Senses." Light 300 at 52px is the only place in the Latin system where a weight below 400 is permitted, and only at this size. Tracking stays near zero: tight tracking on a light weight thins the joins and makes the face look damaged.

Never set Editorial Display over a photograph. Light weight plus photographic noise breaks legibility and no scrim depth fully rescues it.

### 3.3 H2 and H3

Sentence case. Do not skip from `h1` to `h3` in the document outline. Visual size is a style choice; heading level is structural, and assistive technology follows the structure.

H3 at 24px and Body Large at 20px sit at a 1.20 step, tighter than the 1.25 general guidance. This is a deliberate, documented exception. Separation is carried by a 300-unit weight delta, 600 against 300, which is how the reference sites handle the same adjacency. Do not close the gap further and do not set Body Large at 600.

### 3.4 Body and inline emphasis

Left-aligned in English, right-aligned in Arabic, implemented as `text-align: start`. Never justified. Measure caps at 68 characters via `max-width: 640px`.

Inline emphasis qualifies only under all four conditions:

1. The string contains a numeral or a unit of specification. Qualifies: "50-floor", "12,000 m²", "2019–2024", "Phase 3". Does not qualify: "award-winning", "our approach", "sustainability".
2. One emphasis per paragraph. Never two.
3. It is expressed as weight 600 and nothing else. No colour, no underline, no background, no size change.
4. It is never a link. If it needs to be clickable it is a link, styled as a link.

Use `<strong>` where the emphasis is semantic and `<b>` where it is purely typographic. Most specification highlights are the latter.

### 3.5 Caption, label and eyebrow

12px Medium, +0.04em. Used for image captions, form labels, tags and eyebrows.

The eyebrow is the constrained element. Permitted only where it carries genuine taxonomy: project type, location, client, sector or date. Prohibited as an invented section label of the "OUR PROCESS" or "WHY CHOOSE US" variety, which turn a page into visible scaffolding. Further:

- Never above the Hero Display headline.
- Never on two consecutive sections.
- Never as a pill or chip. No background fill, no border, no radius.
- Marked by a 24px × 1px rule in `--color-ink`, set inline before the label with a 12px gap, vertically centred on the label's x-height. In Arabic the rule sits on the inline-start side, which is the right.

The rule mark replaces the accent colour that did this job in v1.0. It reads as deliberate at a glance and it costs the palette nothing.

### 3.6 Metadata and spec lists

Two-column ruled table. Labels on the inline-start side, values adjacent, one hairline rule below each row in `--color-hairline`. No outer border, no vertical rules, no zebra striping, no fill.

- Row padding: 12px top, 12px bottom.
- Rule weight: 1px.
- Labels use the `--color-ink-secondary` token, **not** an opacity value on `--color-ink`. v0.2 specified "70% opacity of body colour", which produces an unpredictable result the moment the table sits on any surface other than pure white. A token can be tested; an opacity cannot.
- Use a real `<table>` with `<th scope="row">` on the label cell. This is tabular data and the markup should say so.
- On black surfaces, rules switch to `--color-hairline-dark`.

### 3.7 Navigation

Desktop is a horizontal bar: 14px, Medium, uppercase, +0.06em. The loose tracking on short uppercase labels is the refined detail worth keeping from the Dewan reference, and it is the only place tracking exceeds +0.04em in Latin.

Mobile is a full-screen stacked menu: 24px, Medium, sentence case, −0.01em. Uppercase is dropped at this size. It works at 14px because the words are short labels; at 24px stacked it reads as shouting and removes the word-shape cues that make a list scannable.

Active state carries two signals, neither of them colour: **weight steps from 500 to 700**, and a **2px underline offset 6px below the baseline**. Reserve enough width for the bold state, or the bar will reflow as the user navigates; set the label width from the 700 metrics at build time.

Hover state: underline only, no weight change. This keeps weight meaning "you are here" rather than "your cursor is here".

### 3.8 Footer and contact

Set on `--color-surface-dark`. Section labels 12px Semibold uppercase +0.06em in `--color-on-dark-secondary` at 8.63:1. Body and links 16px Regular in `--color-on-dark-body` at 17.94:1. Multi-office listings compress to 14px Regular, which is the floor. Do not drop footer text to 12px to fit more offices; add a column.

Links are underlined on hover only, except links inside a body paragraph, which are underlined at rest. A link surrounded by running text must be identifiable without a cursor.

### 3.9 Text over images

**Default: solid black panel.** A `--color-surface-dark` block, inset from or abutting the image, never partially overlapping it. Text sits entirely inside the block. Padding 48px desktop, 32px tablet, 24px mobile. Contrast is 21.00:1 and it is invariant across every photograph in the library.

This is the one place where the monochrome decision pays a direct dividend. The panel is the wordmark's own field, so a hero with a black panel and a white headline is the mark scaled up. A branded accent panel would only ever have been an approximation of that.

**Fallback: scrim.** Permitted only for full-bleed photographic heroes where a panel would break the layout.

- Linear gradient, black, at **minimum 60% opacity across the whole bounding box of the text, plus a 24px bleed on all sides**. It may fade above and below that region; it may not fade inside it.
- Minimum size over a scrim: 20px. Minimum weight: 500.
- Pure `#FFFFFF` text only. Never `--color-on-dark-body`, never a secondary grey, never a signal colour.

v0.2 proposed 0% to 55%. That was measured and fails in practice. Against a blown-out white region a 55% scrim gives 4.74:1, clearing 4.5:1 by a margin too thin to survive JPEG artefacts, and only at the darkest point of the gradient. Above that point it fails outright.

| Scrim opacity | Effective background over a white photo region | White text | Verdict |
|---|---|---|---|
| 45% | #8C8C8C | 3.36:1 | Fails body |
| 50% | #808080 | 3.95:1 | Fails body |
| 55% | #737373 | 4.74:1 | Marginal, rejected |
| **60%** | **#666666** | **5.74:1** | **Specified minimum** |
| 65% | #595959 | 7.00:1 | Safe |
| 70% | #4D4D4D | 8.45:1 | Safe, image goes muddy |

**Prohibited: direct-on-photo.** No text on an unmodified photograph at any size or weight. The Dewan homepage works because that photograph has a plain sky behind the type. That is a property of one image, not a system, and it cannot be enforced across a growing project library.

---

## 4. Responsive Behaviour

Breakpoints: **Desktop ≥ 1024px · Tablet 768–1023px · Mobile ≤ 767px.**

The scale does not shrink proportionally. Display sizes fall steeply, mid sizes fall gently, functional text does not move.

| Role | Desktop | Tablet | Mobile |
|---|---|---|---|
| Mega Splash | 84px | 60px | **34px — collapsed into H1** |
| H1 Display (both registers) | 52px | 40px | **34px** |
| H2 | 32px | 28px | 26px |
| H3 | 24px | 22px | **20px — collapsed with Body Large** |
| Body Large / Lead | 20px | 20px | **20px** |
| Body | 16px | 16px | 16px |
| Metadata | 14px | 14px | 14px |
| Caption / Label | 12px | 12px | 12px |

### 4.1 The two collapses, stated explicitly

**Mega Splash collapses into H1 on mobile.** Below 768px there is no Mega Splash; both resolve to 34px. An 84px display size on a 375px viewport fits roughly four characters per line and turns a headline into a stack of fragments. Do not preserve the distinction with an intermediate value. Any layout that depends on Mega reading differently from H1 must be redesigned for small screens rather than rescaled.

**H3 collapses to the same size as Body Large on mobile.** Both are 20px. Separation is carried entirely by weight, 600 against 300, by the 32px of space above an H3, and by position. The alternative is either an H3 too close to Body at 16px, or demoting Body Large to Body and losing the lead paragraph as a device.

### 4.2 What does not scale

Body, Metadata and Caption hold their desktop values at every breakpoint. Body is already at the 16px accessible floor, and shrinking functional text on the device with the worst reading conditions is the wrong direction. Mobile gains reading comfort from a narrower measure, not smaller type.

### 4.3 Optical tracking correction

Negative tracking is a function of size, not of role, and must relax as display sizes fall.

| Role | Desktop | Tablet | Mobile |
|---|---|---|---|
| Hero Display | −0.03em | −0.025em | −0.02em |
| Editorial Display | −0.005em | −0.005em | 0 |
| H2 | −0.02em | −0.02em | −0.015em |
| H3 | −0.015em | −0.015em | −0.01em |
| Body Large | −0.005em | −0.005em | 0 |

Positive tracking on uppercase labels does not change across breakpoints. **Arabic tracking is always exactly zero at every breakpoint and every size.** See §6.5.

### 4.4 Line-height correction

Display line-heights open as sizes fall. 1.05 is correct at 52px and cramped at 34px.

| Role | Desktop | Tablet | Mobile |
|---|---|---|---|
| Mega Splash | 1.00 | 1.05 | 1.15 |
| Hero Display | 1.05 | 1.10 | 1.15 |
| Editorial Display | 1.15 | 1.18 | 1.25 |
| H2 | 1.20 | 1.22 | 1.25 |

Body, Body Large, Metadata and Caption line-heights do not change.

### 4.5 Measure and gutters

| Breakpoint | Body max-width (Latin) | Body max-width (Arabic) | Horizontal gutter |
|---|---|---|---|
| Desktop | 640px | 620px | 64px minimum |
| Tablet | 600px | 580px | 40px |
| Mobile | 100% minus gutters | 100% minus gutters | 20px each side |

`ch` units are unreliable for Arabic because the advance width of a connected form differs from the isolated glyph the unit is measured from. Latin measures may be authored in `ch`; Arabic measures are always authored in `px`.

### 4.6 Line-count caps on mobile

Hero Display extends from 2 lines to 3 on mobile. Beyond 3 lines it stops reading as a display element. If the copy will not fit in 3 lines at 34px, the copy is too long. Do not reduce the size below 34px to make it fit.

---

## 5. Accessibility Baseline

**Target: WCAG 2.1 Level AA.** 4.5:1 for text below 24px or below 19px bold. 3:1 for large text, meaning 24px and above, or 19px and above at weight 700.

Every combination this system permits is listed with its measured ratio. There are no unmeasured cases.

### 5.1 Light surfaces (#FFFFFF)

| Text | Ratio | Requirement | Margin |
|---|---|---|---|
| Hero / Editorial Display, `--color-ink` | 18.88:1 | 3:1 | Pass, 6.3× |
| H2, H3, `--color-ink` | 18.88:1 | 3:1 | Pass, 6.3× |
| Body Large 20px Light, `--color-ink` | 18.88:1 | 4.5:1 | Pass, 4.2× |
| Body 16px, `--color-ink` | 18.88:1 | 4.5:1 | Pass, 4.2× |
| Inline emphasis 16px 600, `--color-ink` | 18.88:1 | 4.5:1 | Pass, 4.2× |
| Caption 12px, `--color-ink-secondary` | 7.00:1 | 4.5:1 | Pass, 1.6× |
| Eyebrow 12px, `--color-ink-secondary` | 7.00:1 | 4.5:1 | Pass, 1.6× |
| Metadata label 14px, `--color-ink-secondary` | 7.00:1 | 4.5:1 | Pass, 1.6× |
| Metadata value 14px, `--color-ink` | 18.88:1 | 4.5:1 | Pass, 4.2× |
| Nav 14px rest and active, `--color-ink` | 18.88:1 | 4.5:1 | Pass, 4.2× |
| Form helper 14px, `--color-ink-secondary` | 7.00:1 | 4.5:1 | Pass, 1.6× |
| Form error 14px, `--color-signal` | 6.54:1 | 4.5:1 | Pass, 1.5× |

### 5.2 Dark surfaces (#000000) — panels and footer

| Text | Ratio | Requirement | Margin |
|---|---|---|---|
| Panel headline 52px 700, `--color-on-dark` | 21.00:1 | 3:1 | Pass, 7.0× |
| Panel supporting line 20px 500, `--color-on-dark` | 21.00:1 | 4.5:1 | Pass, 4.7× |
| Body copy on black, `--color-on-dark-body` | 17.94:1 | 4.5:1 | Pass, 4.0× |
| Footer section label 12px, `--color-on-dark-secondary` | 8.63:1 | 4.5:1 | Pass, 1.9× |
| Footer body and links 16px, `--color-on-dark-body` | 17.94:1 | 4.5:1 | Pass, 4.0× |
| Footer office listing 14px, `--color-on-dark-body` | 17.94:1 | 4.5:1 | Pass, 4.0× |
| Caption on black 12px, `--color-on-dark-secondary` | 8.63:1 | 4.5:1 | Pass, 1.9× |
| Form error on black 14px, `--color-signal-on-dark` | 6.95:1 | 4.5:1 | Pass, 1.5× |
| **`--color-signal` (#B3261E) on black** | **3.21:1** | 4.5:1 | **Fail. Prohibited.** |
| **`--color-signal-on-dark` (#F2695C) on white** | **3.02:1** | 4.5:1 | **Fail. Prohibited.** |
| **`--color-ink` (#111111) on black** | **1.11:1** | 4.5:1 | **Fail. Prohibited.** |

### 5.3 Scrim over photography

Contrast over a photograph is measured against the **lightest and busiest patch inside the text bounding box**, never the image average. The worst realistic case is a blown-out white region, and that is the case the specification is built for.

| Case | Effective background | Ratio | Requirement | Verdict |
|---|---|---|---|---|
| Headline 52px 700 on 60% scrim, pure white | #666666 | 5.74:1 | 3:1 | Pass, 1.9× |
| Supporting line 20px 500 on 60% scrim, pure white | #666666 | 5.74:1 | 4.5:1 | Pass, 1.3× |
| `--color-on-dark-body` on 60% scrim | #666666 | 4.90:1 | 4.5:1 | Passes but not permitted; use pure white |
| Any text on 55% scrim (v0.2 value) | #737373 | 4.74:1 | 4.5:1 | Rejected, margin too thin |
| Any text on 45% scrim | #8C8C8C | 3.36:1 | 4.5:1 | Fail |
| Text directly on photography | unbounded | unmeasurable | 4.5:1 | Prohibited |

The 20px supporting line at 5.74:1 is the tightest permitted case in the system. Re-test it first if any value changes.

### 5.4 Rules that are not ratios

1. **Never signal meaning with colour alone.** Nav active uses weight plus underline. Inline emphasis uses weight only. Errors use colour plus a text string plus a 2px rule. This is WCAG 1.4.1, and in a monochrome system it is nearly free.
2. **Heading levels follow document structure, not visual size.** No `h1` to `h3` skips. If a page needs a large heading that is not the top-level heading, it is an `h2` styled at H1 size.
3. **Minimum text size is 12px**, reserved for captions, eyebrows and labels. Body never falls below 16px at any breakpoint. Arabic minimum is 13px; see §6.3.
4. **Body line-height stays at 1.60** in Latin and 1.75 in Arabic, both above the WCAG 1.4.12 minimum of 1.5.
5. **Text must survive 200% zoom** without horizontal scrolling. Sizes are in `rem` and measures in `ch` or `max-width`, so this holds by construction. Verify at 1280×720 zoomed to 200%, in both language directions.
6. **Respect `prefers-reduced-motion`.** No text animates in by default. Any headline reveal is disabled under the query.
7. **Never disable text selection.** No `user-select: none` on content type.
8. **Uppercase is a style, not content.** Apply with `text-transform`, never by typing capitals into the CMS, so screen readers and search results receive the real string. This also means the Arabic build inherits the correct strings when uppercase is switched off.
9. **Set `lang` and `dir` correctly** on the `html` element and on any inline foreign-language run. Screen readers switch voice on `lang`; without it Arabic is read with an English phoneme set and is unintelligible.

---

## 6. Bilingual Arabic and RTL

**Scope assumption:** ProArc operates in the UAE and this specification assumes English and Arabic are both first-class, built together rather than retrofitted. If the first release is English-only, say so now, because the Latin face was partly chosen for how it sits beside its Arabic companion.

**Regulatory context, stated accurately.** The UAE Ministry of Culture received approval in 2026 to draft a federal Arabic Language Law, with implementation targeted for 2027. The draft covers ten sectors including economy and business, technology and digitisation, and customer service, and reported provisions require Arabic in all visual, audio and written advertising directed at the public. Published reporting does not specifically name commercial websites. Treat this as a strong reason to build bilingual capability into the type system now rather than as a settled compliance obligation, and confirm the final text against counsel and against the requirements of any specific tender before relying on it.

### 6.1 Both directions are first-class

The Arabic site is not a translated skin of the English one. Both are authored against this specification, and any layout that cannot be expressed in logical properties is a layout that has not been finished.

### 6.2 Layout: logical properties only

Never write `left`, `right`, `margin-left`, `padding-right`, `text-align: left`, or `border-left`. Use `inline-start` and `inline-end` equivalents throughout, and `text-align: start`. Set `dir="rtl"` on the `html` element for the Arabic build; do not set direction per component.

The metadata table mirrors: labels move to the right column, values to the left, hairline rules unchanged. The eyebrow rule mark moves to the right of the label. Navigation order reverses. The scrim gradient direction reverses if it is horizontal, and does not if it is vertical.

Numerals, telephone numbers, email addresses and Latin proper nouns inside Arabic text keep their internal LTR direction automatically under the Unicode bidirectional algorithm. Do not fight it with markup. Where a mixed string breaks, the fix is `<bdi>`, not a hard-coded direction.

### 6.3 Arabic size compensation

Arabic glyphs carry their weight lower and have a smaller effective x-height relative to their em than Latin grotesks. Set at identical sizes, Arabic reads smaller and lighter. Arabic runs at **1.05× the Latin size**, rounded to whole pixels.

```css
:root { --arabic-scale: 1.05; }
html:lang(ar) { font-size: calc(1rem * var(--arabic-scale)); }
```

| Role | Latin | Arabic |
|---|---|---|
| Caption / Label | 12px | 13px |
| Metadata | 14px | 15px |
| Body | 16px | 17px |
| Body Large / Lead | 20px | 21px |
| H3 | 24px | 25px |
| H2 | 32px | 34px |
| H1 Display | 52px | 55px |
| Mega Splash | 84px | 88px |

The 1.05 multiplier is a starting value derived from the two families' vertical metrics. Confirm it with a side-by-side proof at 16px and 17px before the first build sign-off, and adjust the single token if the match is off. Do not adjust individual roles.

### 6.4 Arabic weights

Arabic connecting strokes are thinner than Latin stems at the same nominal weight, so a Light Arabic reads under-inked and breaks up at small sizes and on low-DPI screens.

- **Light 300 is not used in Arabic.** Editorial Display and Body Large, which are 300 in Latin, are **400 in Arabic**.
- Everything else maps one to one: 400 to 400, 500 to 500, 600 to 600, 700 to 700.
- This means the Arabic Editorial Display loses some of the Latin version's delicacy. Compensate with space, not with a lighter weight: increase the margin above an Arabic Editorial Display from 48px to 64px.

### 6.5 Arabic tracking: always zero

**`letter-spacing` on Arabic is a defect, not a style.** Positive tracking severs the connecting strokes between joined letterforms and produces broken, unreadable words. Negative tracking collides the joins. There is no correct non-zero value.

```css
html:lang(ar) *,
[dir="rtl"] * { letter-spacing: 0 !important; }
```

The `!important` is deliberate. It is the one place in this system where it is warranted, because a single inherited tracking value from a Latin component will silently break Arabic across the whole site, and the failure looks like a font problem rather than a CSS problem.

### 6.6 Arabic case and style

- **No `text-transform`.** Arabic has no upper and lower case. `text-transform: uppercase` is a no-op on Arabic glyphs but will still apply to any Latin word in the same string, producing an inconsistent mixed line. Set `text-transform: none` for `lang(ar)`.
- Because uppercase is unavailable, the Arabic navigation and eyebrows rely on size, weight and the rule mark alone. Increase Arabic nav weight from 500 to 600 to compensate for the lost visual distinction.
- **No italics, real or synthetic.** IBM Plex Sans Arabic ships none, and `font-style: italic` will trigger a synthetic oblique that distorts the joins. Set `font-style: normal` explicitly for `lang(ar)`.
- **No underline on Arabic running text where it can be avoided.** Arabic descenders cross the underline position and the result is illegible. Use `text-underline-offset: 0.25em` and `text-decoration-skip-ink: auto` on any Arabic link, and prefer weight or a background shift for link states in dense Arabic copy.

### 6.7 Arabic line-height

Arabic needs more leading than Latin: the script has deeper descenders, and diacritics sit above the baseline where Latin has nothing.

| Role | Latin | Arabic |
|---|---|---|
| Mega Splash | 1.00 | 1.20 |
| Hero Display | 1.05 | 1.25 |
| Editorial Display | 1.15 | 1.30 |
| H2 | 1.20 | 1.35 |
| H3 | 1.30 | 1.45 |
| Body Large | 1.50 | 1.65 |
| Body | 1.60 | 1.75 |
| Metadata | 1.65 | 1.80 |
| Caption | 1.50 | 1.65 |

### 6.8 Numerals

**Use Western Arabic digits (0–9) in both language versions.** This is standard commercial and technical practice in the UAE, it keeps the metadata tables visually identical across the two builds, and it avoids a column-width divergence in the spec sheets. Eastern Arabic-Indic digits (٠١٢٣) are not used anywhere on the site.

Dates are written in full rather than in numeric shorthand, because numeric date order is ambiguous across the two audiences. Units stay metric with the symbol on the numeral's trailing side in both directions: `12,000 m²`.

### 6.9 Bilingual lockups

Where English and Arabic appear together in one composition, such as a dual-language hero or a bilingual plaque graphic:

- Both are set at their own scale values, so the Arabic is 5% larger. Do not force a matching pixel size.
- **The Latin drops uppercase in a bilingual lockup** and is set sentence case at weight 700, because an uppercase Latin line beside an Arabic line that has no uppercase equivalent reads as two different levels of emphasis rather than one message in two languages.
- Arabic sits first in the reading order on the Arabic build and second on the English build. Vertical order, not side by side, unless the composition is wide enough for both at full measure.

---

## 7. The Wordmark and Its Relationship to Content Type

The supplied mark is a white lowercase oblique bold wordmark with a trailing device of parallel diagonal strokes, set on a solid black field. Three of its properties are deliberate brand signatures, and all three are therefore **prohibited in content typography**, because a signature repeated everywhere stops being a signature.

1. **The oblique.** No content type is ever italic or obliqued. Not headlines, not pull quotes, not captions, not emphasis. Emphasis is weight. General Sans ships true italics; they are not used. Never apply a CSS `skew` transform to text.
2. **The lowercase.** No headline is set in all-lowercase to echo the mark. Hero Display is uppercase, Editorial Display is sentence case, and there is no third option.
3. **The diagonal stroke device.** It is a brand graphic, not a typographic ornament. It is never used as a bullet, a divider, a list marker, a hover underline, a section break or a letterform substitute. The eyebrow rule mark in §3.5 is horizontal and 1px, and is deliberately not a scaled-down version of the device.

**Further rules.**

- **Never re-set the word "proarc" in General Sans** as a stand-in for the mark, in any context, including plain-text email signatures where the image cannot load. Use the plain string "ProArc" there instead.
- **Clear space:** minimum equal to the cap height of the wordmark on all four sides. In the site header, minimum 24px regardless.
- **Minimum rendered width:** 96px desktop, 80px mobile. Below that the diagonal device fills in and the mark reads as a smudge.
- **Field colour:** the mark's master is white on `#000000`, which is exactly `--color-surface-dark`. Placing it on a dark panel therefore requires no adjustment and produces no visible seam. On light surfaces, use the inverted black-on-white master. **Action: confirm an inverted master exists and obtain it.** If one does not, commission it before build; do not derive it by CSS filter.
- **Never place the white mark on a photograph** without the black field behind it. The same argument that prohibits direct-on-photo text applies with more force to a mark that includes fine diagonal strokes.
- **The mark does not mirror in RTL.** In the Arabic build its position moves to the inline-start side of the header, which is the right, but the artwork itself is never flipped, reversed or redrawn. **Open brand question, flagged rather than decided here:** the diagonal device is directional, and in an RTL composition it points against the reading direction. That is a brand-identity call, not a typographic one. It sits with the mark's owner. This document's position is that a wordmark is a fixed asset and mirroring it produces a second, unauthorised mark.

---

## 8. Do's and Don'ts

Enforceable by looking at the file.

**Do**

1. **Align to `start`, never to a physical side.** `text-align: start` resolves correctly in both directions. No centred body copy, no centred headlines, and never justified text, which opens rivers and cannot be hyphenated reliably in either script.
2. **Use one family per script and let weight do the work.** General Sans for Latin, IBM Plex Sans Arabic for Arabic. Hierarchy comes from weight, size, case and space. A third family requires a version bump of this document.
3. **Cap the measure**: 68 characters for Latin body, 60 for lead paragraphs, 620px for Arabic body. Set it as `max-width`, not as a container the text happens to fill.
4. **Keep the page monochrome.** The only colour in the interface is the validation signal, and it appears only in form states. If a colour is doing decoration, it is in the wrong document.
5. **Space in groups, not on a grid.** Tight inside a block, 12px between a metadata label and its value; generous between blocks, 96px between page sections on desktop. The same gap everywhere flattens the page.
6. **Measure contrast against the worst pixel**, not the average, wherever type sits near an image.
7. **Set `lang` and `dir` on every page and on every inline language switch.** This is what makes the Arabic build readable to a screen reader and what makes the font stack resolve correctly.

**Don't**

8. **Don't italicise, oblique or skew content type**, and don't reach for the diagonal device as a typographic ornament. Those belong to the mark.
9. **Don't put an eyebrow above the hero**, and don't run eyebrows on consecutive sections. A page where every section opens with a small tracked label reads as scaffolding rather than content.
10. **Don't set body copy in uppercase**, and don't apply `text-transform: uppercase` to any element that can contain Arabic. Uppercase caps at 4 words or 32 characters and appears only in Latin navigation, eyebrows and footer labels.
11. **Don't apply letter-spacing to Arabic. Ever.** Positive tracking breaks the joins and negative tracking collides them. Zero is the only correct value.
12. **Don't set type on a bare photograph**, and don't use a gradient that fades to nothing behind the words. Black panel by default; if it must be a scrim, 60% minimum across the whole text area.
13. **Don't apply gradients, glows or shadows to text.** No gradient fills on headlines, no coloured drop shadows, no `text-shadow` used as a substitute for a scrim.
14. **Don't build hierarchy from opacity.** Every text colour is a named token with a measured ratio. `opacity: 0.7` is not a specification, because its result changes with whatever sits behind it.
15. **Don't stack a small rounded icon tile above a heading** in cards or feature blocks. If an icon is needed it sits inline with the heading on the same baseline.

---

## Appendix A — Complete CSS Token Block

```css
:root {
  /* ---- Families ---- */
  --font-latin:
    "General Sans",
    -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto,
    "Helvetica Neue", Arial,
    sans-serif;

  --font-arabic:
    "IBM Plex Sans Arabic",
    "Noto Sans Arabic",
    "Geeza Pro", "Segoe UI",
    "Tahoma",
    sans-serif;

  --arabic-scale: 1.05;

  /* ---- Weights ---- */
  --fw-light:    300; /* Latin only — never Arabic */
  --fw-regular:  400;
  --fw-medium:   500;
  --fw-semibold: 600;
  --fw-bold:     700;

  /* ---- Scale (desktop, Latin) ---- */
  --fs-caption:  0.75rem;  /* 12px */
  --fs-metadata: 0.875rem; /* 14px */
  --fs-body:     1rem;     /* 16px */
  --fs-body-lg:  1.25rem;  /* 20px */
  --fs-h3:       1.5rem;   /* 24px */
  --fs-h2:       2rem;     /* 32px */
  --fs-h1:       3.25rem;  /* 52px */
  --fs-mega:     5.25rem;  /* 84px */

  /* ---- Line-height (Latin) ---- */
  --lh-mega:      1.00;
  --lh-hero:      1.05;
  --lh-editorial: 1.15;
  --lh-h2:        1.20;
  --lh-h3:        1.30;
  --lh-body-lg:   1.50;
  --lh-body:      1.60;
  --lh-metadata:  1.65;
  --lh-caption:   1.50;
  --lh-nav:       1.00;

  /* ---- Tracking (Latin) ---- */
  --ls-hero:       -0.03em;
  --ls-editorial:  -0.005em;
  --ls-h2:         -0.02em;
  --ls-h3:         -0.015em;
  --ls-body-lg:    -0.005em;
  --ls-body:        0;
  --ls-caption:     0.04em;
  --ls-meta-label:  0.02em;
  --ls-nav:         0.06em;

  /* ---- Measure ---- */
  --measure-body:      68ch;
  --measure-body-lg:   60ch;
  --measure-h3:        45ch;
  --measure-h2:        28ch;
  --measure-hero:      20ch;
  --measure-editorial: 24ch;
  --measure-overlay:   18ch;
  --measure-body-ar:   620px;

  /* ---- Colour: neutral ramp ---- */
  --color-ink:               #111111;
  --color-ink-secondary:     #595959;
  --color-surface:           #FFFFFF;
  --color-surface-dark:      #000000;
  --color-on-dark:           #FFFFFF;
  --color-on-dark-body:      #EDEDED;
  --color-on-dark-secondary: #A6A6A6;
  --color-hairline:          #D6D6D6;
  --color-hairline-dark:     #333333;

  /* ---- Colour: validation signal only ---- */
  --color-signal:         #B3261E; /* light surfaces only */
  --color-signal-on-dark: #F2695C; /* dark surfaces only  */

  /* ---- Overlay ---- */
  --scrim-min-opacity: 0.60;

  /* ---- Brand ---- */
  --logo-min-width-desktop: 96px;
  --logo-min-width-mobile:  80px;
  --logo-clear-space:       24px;
}

/* ---- Arabic overrides ---- */
html:lang(ar), [dir="rtl"] {
  font-family: var(--font-arabic);
  font-size: calc(1rem * var(--arabic-scale));

  --lh-mega:      1.20;
  --lh-hero:      1.25;
  --lh-editorial: 1.30;
  --lh-h2:        1.35;
  --lh-h3:        1.45;
  --lh-body-lg:   1.65;
  --lh-body:      1.75;
  --lh-metadata:  1.80;
  --lh-caption:   1.65;

  --fw-light: 400; /* Light is never used in Arabic */
}

html:lang(ar) *, [dir="rtl"] * {
  letter-spacing: 0 !important;
  text-transform: none;
  font-style: normal;
}

/* ---- Tablet ---- */
@media (max-width: 1023px) {
  :root {
    --fs-mega:      3.75rem;  /* 60px */
    --fs-h1:        2.5rem;   /* 40px */
    --fs-h2:        1.75rem;  /* 28px */
    --fs-h3:        1.375rem; /* 22px */
    --lh-mega:      1.05;
    --lh-hero:      1.10;
    --lh-editorial: 1.18;
    --lh-h2:        1.22;
    --ls-hero:     -0.025em;
  }
}

/* ---- Mobile ---- */
@media (max-width: 767px) {
  :root {
    --fs-mega:      2.125rem; /* 34px — collapsed into H1     */
    --fs-h1:        2.125rem; /* 34px                          */
    --fs-h2:        1.625rem; /* 26px                          */
    --fs-h3:        1.25rem;  /* 20px — collapsed w/ Body Large */
    --lh-mega:      1.15;
    --lh-hero:      1.15;
    --lh-editorial: 1.25;
    --lh-h2:        1.25;
    --ls-hero:     -0.02em;
    --ls-editorial:  0;
    --ls-h2:       -0.015em;
    --ls-h3:       -0.01em;
    --ls-body-lg:    0;
  }
}
```

---

## Appendix B — Design Critique Record

Audited against the impeccable.style catalogue of 46 convergent-design patterns.

**Changed as a result of the audit**

- *Hero eyebrow and repeated section kickers*: restricted in §3.5 to genuine taxonomy, never above the hero, never consecutive, never a pill.
- *Overused font*: Inter removed from the primary decision and from the fallback chain.
- *Low contrast text*: the v0.2 scrim value of 55% measured at 4.74:1 and was replaced with a 60% floor at 5.74:1.
- *Hierarchy from opacity*: the "70% opacity" metadata label rule replaced with a measurable token.
- *AI colour palette* and *cream/beige palette*: both avoided by construction in v1.1. The desert-tone reflex is explicitly rejected in §1.5.
- *Gradient text, icon-tile-above-heading, justified text, all-caps body*: explicit prohibitions in §8.

**Considered and deliberately kept**

- *Single font family for everything*: the catalogue prefers a display face paired with a body face. Rejected. All five reference studios run one family, and the dual-register decision plus case and tracking supplies the differentiation. One family per script is a system decision, not a default.
- *Flat type hierarchy*: the 1.20 step between H3 and Body Large is below the 1.25 guidance. Kept, with the weight-delta rule documented in §3.3, because a six-step scale from 12px to 52px cannot hold 1.25 throughout and the references sit in the 1.2–1.4 band by choice.

---

## Appendix C — Change Record, v1.0 to v1.1

| Area | v1.0 | v1.1 | Trigger |
|---|---|---|---|
| Base palette | Navy `#0F1E2B` + rust `#A63A17` two-tone | Monochrome neutral ramp on `#111111` / `#000000` / `#FFFFFF` | Wordmark supplied: white on solid black, no second colour |
| Accent policy | Rust with three permitted jobs | Colour restricted to form validation, one job, justified in §1.5 | Brand leans monochrome |
| Dark surface | `#0F1E2B` navy panel | `#000000`, the mark's own field | Seam-free lockup with the supplied mark |
| Body on dark | Pure white | `#EDEDED`, 17.94:1 | Halation on pure white over pure black |
| Inline highlight | Rust text, weight 600 | Weight 600 only, no colour | Monochrome policy; GMR reference precedent replaces Dewan |
| Eyebrow | Rust text | Secondary grey plus a 24px hairline rule mark | Monochrome policy |
| Nav active state | Rust plus underline | Weight 500→700 plus underline | Monochrome policy |
| Arabic | Not addressed | New §6: companion family, scale, weights, tracking, case, line-height, numerals, RTL, bilingual lockups | UAE market |
| Logotype | Noted as exempt from the sans-only rule | New §7: oblique, lowercase and stripe device prohibited in content type; clear space, minimum width, inverted master, RTL mirroring position | Mark supplied |
| Contrast tables | 13 measured pairs | 21 measured pairs, all recomputed against the new palette | Palette change |

**Open items requiring an answer from ProArc**

1. Confirm an inverted black-on-white master of the wordmark exists, or commission one. Do not derive it with a CSS filter.
2. Confirm whether the first release is bilingual or English-only.
3. Decide the RTL treatment of the mark's directional stripe device. This document's position is that the mark is never mirrored; the brand owner may rule otherwise.
4. Run the 16px against 17px Latin/Arabic proof and confirm or adjust the single `--arabic-scale` token before build sign-off.

---

*ProArc Typography Guideline v1.1. Locked 27 July 2026. Changes require a version increment and re-verification of §5.*

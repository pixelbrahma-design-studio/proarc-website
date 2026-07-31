# ProArc v1 — Revision Punch List

**v2 — 31 July 2026 (midday).** Adds the reviewer's hero-copy directive (1.6), the header
re-arrangement — boxed logo top-right + hamburger (2.6, supersedes 2.5) — and the whole-site
sweep results: the eyebrow and inline-override violations are systemic across all pages (1.2,
1.10), an inline `font-size:53.2px` (4.8), centred headlines (4.9), and the testimonials page's
bracket placeholders (6.5). Coverage list at the end.

**Reviewer:** Mahesh · **For:** the coding agent working on the v1 build
**Spec:** every rule cited below is from `docs/ProArc-Typography-Guideline-v1.2.md` (the locked
spec — it supersedes v1.1). Read the cited section before changing anything.
**Sources of truth:** edit `pages-src/` and `src/styles/` only. Root HTML and `projects/*.html`
are build outputs — never hand-edit them.

**Tags:** `[SPEC §x]` = violates the cited clause · `[FACT]` = factually wrong · `[BUG]` =
rendering defect · `[DIRECTED]` = reviewer's revision instruction · `[DECIDE]` = needs a human
call before coding · `[QA]` = verify by hand after the change.

---

## 1 · The hero system — home and inner pages

The home hero currently: 84px uppercase bold headline mid-frame over a photo, an eyebrow above
it, a centred lead + two pill buttons, and a full-image gradient wash. Almost every element of
that contradicts the spec. The spec's own model for a full-bleed hero is: **headline at the top
of the hierarchy (no eyebrow), 52px/700 uppercase, start-aligned, pure white, standing on a ≥60%
scrim that covers only the text zone** — so the photograph stays a photograph.

1.1 `[SPEC §3, §4]` **Hero headline is set at Mega Splash (84px) over a photograph.** The only
over-image display register in the spec is **“Scrim text on image: 52px / 700 / −0.03em / lh 1.05
/ max 18ch”** (§4 table). Mega Splash has no over-photo role.
→ `src/styles/pages/home.css` `.hero-center h1`: change `font-size: var(--fs-mega)` to
`var(--fs-h1)`; set `max-width: 18ch`. This is also the fix for “the font is too thick” — the
weight stays 700, but 52px uppercase reads text-like where 84px reads like a wall.

1.2 `[SPEC §4.1, §9.9]` **An eyebrow sits above the hero H1 on every page of the site** —
verified in all eight templates: `pages-src/home.html:32`, `about.html:16`, `services.html:16`,
`projects.html:16`, `careers.html:16`, `contact.html:16`, `testimonials.html:16`,
`partials/project-detail.template.html:13`. §4.1: “Never place an eyebrow, kicker or pill above
it. The headline is the top of the page.”
→ Delete the span above the H1 in all eight files. Eyebrows remain legal *below* the headline
level for genuine taxonomy (project type, location) per §4.5.

1.3 `[SPEC §9.1]` **The hero block is centred.** The spec names this exact case: “The R1 home
hero and project slides are centred; the About hero is not, and the About hero is the correct
model.”
→ `.hero-center`: `align-items: flex-start; text-align: start;` and remove `margin-inline: auto`
from `.hero-center .lead`.

1.4 `[SPEC §4.9, §9.14]` **The scrim fades to nothing behind the words.** Current
(`home.css:42–44`): a radial dip plus `linear-gradient(65% → 22% @20% → 20% @55% → 86%)` — the
text sits where the wash is 20–35% black. §4.9: scrim must be **≥60% across the whole text
bounding box plus 24px bleed; it may fade above and below that region; it may not fade inside
it.** §9.14: “don’t use a gradient that fades to nothing behind the words.”
→ Anchor the text block to the lower third (1.3 already starts this) and replace the gradient
with one that is clean above and ≥62% under the text zone, e.g.
`linear-gradient(180deg, rgb(0 0 0 / 0%) 0%, rgb(0 0 0 / 0%) 42%, rgb(0 0 0 / 62%) 58%, rgb(0 0 0 / 80%) 100%)`
— then delete the radial layer. This is also the reviewer’s aesthetic note resolved: **the
photograph stops being covered edge-to-edge; only the text zone is shaded.**

1.5 `[SPEC §4]` **Lead over photo runs 52ch.** The scrim supporting-line register is **20px /
500 / max 40ch / pure #FFFFFF** (§4 table).
→ `.hero-center .lead`: `max-width: 40ch; font-weight: 500;` (colour is already pure white —
keep it; §1.6 prohibits grey over photography).

1.6 `[DIRECTED]` **The hero text becomes minimal and strong.** Reviewer’s instruction, final
form: **the headline and one CTA. Nothing else over the photograph.**
- Keep v1’s own line — “Designing Ajman’s skyline since 2006” — at the register items 1.1–1.4
  define: 52px / 700 / uppercase / start-aligned / pure white on the ≥60% zone. That
  combination *is* the “strong”; size was never the problem, the crowd around it was.
- **Delete the lead paragraph** (“A UAE-based architecture, engineering and project management
  consultancy…”) — its content already lives in the footer line and the About strip directly
  below the fold. Item 1.5’s 40ch rule then applies only if a supporting line ever returns.
- **One CTA:** keep “Explore our projects”; drop “Get in touch” from the hero (it already lives
  in the menu, the closing band, the footer and the contact page).
- The slide caption + dots stay (the slideshow’s own furniture). The register reference is the
  site’s own featured-projects slide (City Life, Al Tallah), which the reviewer signed off
  as-is.

1.7 `[SPEC — no basis]` `[DECIDE]` **Pill buttons.** `.btn` uses `border-radius: 999px`;
`--radius-*` tokens exist in the build but **no radius token exists anywhere in the spec**
(Appendix A). The only sanctioned pill in the whole system is the menu trigger (§4.7).
→ Proposed: buttons become square-cornered — filled black (primary) and 1px hairline (secondary),
radius 0. If the team wants rounded buttons, that is a spec version-bump decision, not a build
decision — decide before coding.

1.8 `[FACT]` **“19+ years shaping Ajman’s skyline”** (`pages-src/home.html:64` hero strip).
2006 → 2026 is **twenty** years; “19+” is wrong on the site’s own founding date.
→ Replace the string with **“Shaping Ajman’s skyline since 2006”** (no figure, always true).

1.9 `[SPEC §6.4.6]` **Hero text animates in** (`data-reveal` on the H1/lead/buttons). “Respect
`prefers-reduced-motion`. No text animates in by default.”
→ Minimum fix: the reveal script must no-op under `prefers-reduced-motion: reduce`. Preferred:
text renders static; reserve reveal animation for images.

1.10 **Inner-page heroes** (`.page-hero`, `src/styles/components.css:1108–1141`):
- `[SPEC §4.5]` eyebrow above the H1 — remove on every page (see 1.2).
- `[BUG — systemic]` The component’s own gradient (`0% → 62% @40% → 85%`) is compliant **only
  if the text sits in the ≥60% zone** — and **all six inner pages** override the component with
  the same inline styles (`height:88svh; align-items:center` on the section,
  `padding-bottom:0` on the body — line 11–13 of `about/services/projects/careers/contact/
  testimonials.html`), floating the text mid-frame in the thin part of the wash.
  → Delete the inline styles in all six files; let the component bottom-anchor the text as
  designed. If 88svh height is wanted, put it in the component CSS once — no per-page inline
  layout anywhere.
- `[SPEC §4]` any intro paragraph over the photo: pure `#FFFFFF`, max 40ch, inside the ≥60%
  zone — or move it below the hero onto white.

---

## 2 · The wordmark and the header

**What the spec says the header is (§4.7):** there is **no horizontal top bar**. The menu
trigger is a fixed black pill, inline-start, near the top — “the one persistent black element on
a white page, and that is intentional.” The wordmark is a separate element with its own rules
(§8). So the current geometry — logo at the container’s start edge, pill at the viewport edge —
is *two different frames*, and that is why it reads odd on wide monitors. Items:

2.1 `[SPEC §8, §4.9]` **The white mark sits on bare photography** (every hero — transparent
header over the image). The spec measured this exact failure in R1: the mark at **2.76:1** on
the About hero. “Never place the white mark on bare photography… Either give the mark a black
field or extend the header scrim until it clears 4.5:1.”
→ **Resolved by item 2.6:** the boxed logo *is* the black field — “a black panel with a white
headline is the mark scaled up” (§4.9). Clear space 24px inside the box (§8). Once boxed, the
mark needs no scrim anywhere, on any ground, in either scroll state.

2.2 `[SPEC §8]` **The light-header logo is derived with a CSS filter** —
`components.css:126: .site-header.is-scrolled .brand-logo { filter: invert(1) brightness(0.85) }`.
§8: “On light surfaces use the inverted master. **Do not derive it with a CSS filter.**” (And
`brightness(0.85)` renders the mark grey — a recolour.)
→ **With 2.6 the filter becomes deletable outright:** inside its black box the mark never meets
a light surface, so no inversion is needed in the header at all. Delete the filter and the
scroll-state swap. (The §8 open item — does an inverted master exist? — still goes to ProArc,
for any future light-surface use such as print or the favicon.)

2.3 `[SPEC §8]` **The footer re-sets “Proarc” in General Sans as a wordmark substitute**
(`partials/footer.html:5`, styled uppercase + tracked via `.brand`). “Never re-set ‘proarc’ in
General Sans as a stand-in for the mark. Use the plain string ‘ProArc’ in text-only contexts.”
→ Footer is `--color-surface-dark`: use the real mark asset (its native field), or plain body
text “ProArc” with no wordmark styling.

2.4 `[SPEC tokens]` **Scrolled header is translucent white + blur**
(`rgb(255 255 255 / 86%) + backdrop-filter`). No translucent surface exists in the token system;
every colour is a named token (§9.16).
→ `background: var(--color-surface)`, keep the hairline border, drop the blur.

~~2.5 `[DECIDE — geometry]` Logo x-position~~ — **superseded by 2.6.**

2.6 `[DIRECTED — supersedes the §4.7 trigger side; record as a guideline amendment]`
**The header becomes a top inline-end (top-right in LTR) cluster: the wordmark in its black
box, with the hamburger trigger beside it — in the Benoy manner.**
- **The box:** a `--color-surface-dark` rectangle carrying the white mark — its native field
  (this is item 2.1’s fix). Mark ≥96px wide (§8), 24px clear space inside the box on all sides,
  box flush to the viewport’s top inline-end corner or inset one gutter — reviewer will judge
  on the build.
- **The trigger:** the existing single black pill (icon + MENU label, ≥44px hit target — §4.7’s
  own spec), placed immediately **inline-start of the box**, same top line, so box + pill read
  as one cluster.
- **Write every position with logical properties** (`inset-inline-end`, not `right`) so the
  Arabic build mirrors the cluster to the left automatically.
- ⚠️ **Spec deviation, made consciously:** v1.2 §4.7 places the trigger *inline-start*. This
  directive moves the whole control cluster to *inline-end* on the reviewer’s instruction.
  Record it in the guideline’s change log (v1.2 → v1.2.1: “trigger + boxed wordmark relocate to
  the top inline-end cluster, reviewer decision 31 Jul”) — the spec’s own rule: deviations are
  version bumps, never silent build-time calls.
- The scrolled-state behaviour simplifies: the box never changes (black stays black on white or
  photo), so **delete the invert filter (2.2) and the transparent-header logic with it** — one
  header state instead of three.

---

## 3 · The menu overlay — the collision bug and the spec deltas

3.1 `[BUG]` **Menu items and project thumbnails overlap.** Root cause, precisely: the nav list
is split into **two columns** (`.nav-links-col` ×2 — Home/About/Services/Projects +
Testimonials/Careers/Contact), and the Projects mega-panel is **absolutely positioned to the
right of the trigger** with inline `top/width` set by `nav.js` (≥900px mode) — which is exactly
where column 2 renders. Thumbnails and “Testimonials / Careers / Contact” occupy the same
region.
→ **Fix structurally, per §4.7’s three-region layout — don’t patch with z-index:**
- one region each: **nav list (single column, inline-start) · mega-menu (centre) · contact
  (inline-end)** — all three are already children of `.nav-main-row`; make the mega a real flex
  member (`flex: 1` centre region), remove `position: relative/absolute` + all `nav.js` inline
  positioning for the panel;
- the nav list becomes **one column of seven** (52px items, 24px gaps — it fits any ≥760px-tall
  viewport; below that the overlay already scrolls).

3.2 `[SPEC §4.7]` **Nav item rest weight is 500** (`--fw-medium`) — spec: **Light 300 at rest,
Bold 700 when current** (§4 table row “Overlay nav item”). → change rest to
`var(--fw-light)`.

3.3 `[SPEC §4.7]` **Active item carries an underline** (`.nav-links-col > a.is-active` —
underline 2px). “Active state is weight plus brightness only… No colour, no underline, no
marker.” (The build comment cites “§3.7”, which does not exist in the spec.)
→ Remove `text-decoration`; keep the weight + brightness step. Add `aria-current="page"`.

3.4 `[SPEC §4.7]` **Reserve width for the bold state** so items don’t reflow when the active
page changes: size each item’s box from its 700 metrics (e.g. a hidden bold duplicate or
`inline-size` from the bold measurement).

3.5 `[SPEC §4.7, §3]` **Mega thumbnail captions are 12px** (`--fs-caption`) — spec: **14px**
(“Captions are 14px, not the ~11px the build ships”). → `var(--fs-metadata)`. Also:
`border-radius: var(--radius-sm)` on thumbnails → 0 (no radius in the system), and confirm no
bordered box wraps the grid (§4.7: “separate with space alone”).

3.6 `[BUG]` **A pale band appears across the top of the open overlay** when the page was
scrolled: `body.nav-open .site-header` resets `background` but **not `backdrop-filter`**, so the
scrolled header’s `blur(10px)` keeps compositing over the black overlay.
→ Add `backdrop-filter: none` to the `body.nav-open .site-header` rule. The overlay itself is
correctly full-viewport `inset: 0`.

3.7 `[QA §4.7]` With the overlay open: focus is trapped inside; Escape closes; focus returns to
the trigger on close; trigger carries `aria-expanded`. Test with keyboard only.

---

## 4 · Typography sweep — spec-named breaches to clear site-wide

4.1 `[SPEC §3]` **Type floors** — the spec names three R1 breaches: services card body at
~12–13px, overlay contact copy at ~13px, overlay thumbnail captions at ~11px. Floors: body
never below 16px; nothing below 12px; captions 12px minimum (mega captions 14px per §4.7).
→ Sweep every `font-size` in `src/styles/` against the §3 scale; nothing below
`var(--fs-caption)`, no body role below `var(--fs-body)`.

4.2 `[SPEC §4.3]` **Title Case headings → sentence case, everywhere.** Found in the sweep:
“Why Work With Us” · “Current Openings” · “Apply Now” · “Trusted By 45+ Organisations Across
the UAE” · “Work Across All Five Disciplines” · “What Our Clients Say” · “Visit Our Head
Office” · “Our Story” · “Why Proarc?”. The build already has correct examples on the same pages
(“Five disciplines, one in-house team.”) — make everything match those: capital on the first
word and proper nouns only.

4.3 `[SPEC §2.5]` **Three-column prose is prohibited.** The About “Our story” section runs
32–35 characters per line across three columns — the spec’s own named example. → max two
columns, each ≥45ch; if 45ch doesn’t fit, one column.

4.4 `[SPEC §9.10]` **Numbered markers on non-sequences** — the services page’s `01–05` on five
parallel disciplines (and any `01–03` reasons block). “Five parallel disciplines… are not
steps. Delete 01–05.”

4.5 `[SPEC §9.17]` **Icon tiles above headings** — if any “Why Proarc” blocks stack a small
icon tile over the heading, remove the tile.

4.8 `[SPEC §3, CLAUDE.md hard rule 2]` **A hardcoded pixel font-size hides in the markup:**
`pages-src/about.html:36` — `<h2 style="font-size:53.2px;">Our Story</h2>`. 53.2px exists
nowhere on the §3 scale (H2 is 32px; if the moment wants display scale it is an H2 styled at H1
size, per CLAUDE.md’s structural rules).
→ Remove the inline style; and sweep **all inline `style=` attributes carrying layout or type**
out of `pages-src/*.html` into classes — 1.10’s six-page override is the same disease.

4.9 `[SPEC §9.1]` **Centred headlines.** “No centred body copy or headlines.” Found:
`max-width:…; margin-inline:auto` centring on the CTA-band H2s (“Have a project in mind?”,
“Ready to start a conversation…”, “Visit Our Head Office”) plus centred text in the closing
bands. → start-align them; the band keeps its weight without the centring.

4.6 `[SPEC §2.4]` `[DECIDE — larger refactor]` **Container is 1301px with ~177px gutters** —
spec: `--container-max: 1120px`, min 80px gutters. “The single largest whitespace gain
available.” Flagging as its own task since it touches every page; schedule it deliberately.

4.7 `[SPEC §2.2]` `[P2]` Replace hardcoded section/heading gaps with the `--gap-*` aliases
(§2.2). The build’s measured values already match; this is token adoption, not re-spacing.

---

## 5 · Scrim audit — every gradient, measured against §4.9

Rule: **≥60% black across the whole text bounding box + 24px bleed; may fade above/below the
box, never inside it. Text on scrims is pure `#FFFFFF`.**

| Location | Current | Verdict → fix |
|---|---|---|
| `pages/home.css:42–44` hero | radial + linear, 20–22% mid-frame | **Fails under the text** → item 1.4 |
| `pages/home.css:271` featured slide | 65→22→20→86% | Caption sits in the bottom ~86% zone — **verify** the whole caption box + 24px sits ≥60%; nudge the 55% stop down if not |
| `pages/home.css:303` | 0→55→55% | **55% < 60% — fails** (§4.9 table: 55% was rejected) → raise to 62% |
| `pages/project-detail.css:15` | 5→75% | Verify the title box sits wholly in the ≥60% zone |
| `components.css:1126` `.page-hero::after` | 0→62%@40→85% | Compliant **only** with bottom-anchored text → item 1.10 |

---

## 6 · Facts to correct (wrong on the site’s own terms)

6.1 `[FACT]` “19+ Years” — three instances (`pages-src/home.html:77`, `pages-src/about.html:140`,
hero strip item 1.8). Founded 2006 → it is twenty years, and next year the string is stale
again. → Replace the counter with the phrase **“Since 2006”** wherever a year-count appears.

6.2 `[SPEC §6.4.6]` **Count-up animations animate text** (`data-count-to` on About + Home
stats). At minimum: render final values statically under `prefers-reduced-motion`; preferred:
drop the count-up, print the values.

6.3 `[FACT]` Habitat School project page: “a 500,000-square-metre organic farm” on a ten-acre
campus — 500,000 m² is ~123 acres. The figure is wrong somewhere; confirm the real number with
ProArc and correct the copy.

6.4 `[QA]` “Trusted By 45+ Organisations” — the logo wall ships 34 marks. Either the number or
the wall is wrong; confirm the claim with ProArc or drop the figure (also see 4.2 for its Title
Case).

6.5 `[FACT — blocker]` **The testimonials page is live with literal bracket placeholders** —
`pages-src/testimonials.html:57–63ff`: *“[ Client quote pending — to be collected ]”*,
*“[ Name ] [ Designation, Company ]”*, repeated per card, linked from the main nav. A published
page of empty brackets costs more trust than having no testimonials page.
→ Unlink and stop shipping the page until real, attributed quotes exist (name, designation,
company, with the client’s consent). Keep the template in source if useful.

---

## 7 · Repo hygiene

7.1 `CLAUDE.md` still names **v1.1** as the authoritative guideline; v1.2 is locked and
supersedes it. → Update the pointer (and its hard-rules summary if any figure moved).

7.2 The build defines `--radius-sm/md` tokens that exist nowhere in the spec (Appendix A is the
complete token block). After items 1.7/3.5, delete the tokens — or take the spec bump decision
consciously.

---

## Coverage — what was checked, so nothing is assumed

Every source file swept, 31 July 2026: `pages-src/` — home · about · services · projects ·
careers · contact · testimonials · `partials/` — header · footer · head · scripts ·
project-detail.template · `src/styles/` — tokens · tokens-layout · base · layout · components ·
animations · fonts · every `pages/*.css`. Checks run: hardcoded colours and px sizes (CSS *and*
inline styles), physical direction properties, italics, Arabic letter-spacing guard, text-shadow,
scrim values vs §4.9, eyebrow-above-H1, heading case, heading-level skips, centred headlines,
type floors, radius usage, counter animations, typed-caps, wordmark usage, and the §4.7 overlay
rules. Not checkable statically (hand-QA after the fixes): focus trap/Escape/aria (3.7), real
contrast over each photograph (§6.3 — measure the worst pixel), 200% zoom, and the RTL build.

---

*End of punch list. The order that pays fastest: 1.1–1.6 and 2.6 change what every visitor sees
in the first second; 3.1 kills the one outright rendering bug; 6.5 removes the page that
undermines trust; the rest stops the site arguing with its own guideline.*

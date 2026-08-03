# Response to "PROMPT 3 FOR RAVI" — what was built, and what we need to flag back

**Branch:** `proarc-premium1-benoy` (this is the working copy — see §5.2 of the ask).

All four supplied images (desktop + phone, all 8 files) are in as shipped, untouched, at
`images/home-hero/*-hero.webp` and `images/home-hero/*-hero-phone.webp`. Nothing was re-cropped or
re-corrected locally, per the instruction in READ-ME-FIRST.

---

## 1 · The scrim — implemented as specified

Moved off the shared `.hero-media::after` gradient entirely, onto a flat, per-slide `::after` on
`.hero-slide` itself (`src/styles/pages/home.css`). Values match the sheet exactly:

| slide | scrim shipped |
|---|---|
| City Life, Al Khor | none (`transparent`) |
| Exclusive Villas | 5% |
| The Black Square | 5% |
| Delhi Private School | 35% |

Each is a flat `rgb(0 0 0 / X%)`, not a gradient, with the measured source number written into the
CSS comment next to it, per §1.3 of the prompt.

## 2 · The dots — fixed all four points raised

- Active state now reads on **two channels**: fill opacity (0.55 → 1) *and* size (1× → 1.5×), not
  opacity alone.
- Each dot carries a `box-shadow: 0 0 0 1px rgb(0 0 0 / 35%)` ring so it holds against a bright
  background (tested: visible against City Life Al Khor's golden sky and Black Square's dark
  street, both).
- Hit target is a genuine 24×24px `<button>` — verified via `getBoundingClientRect()`, not assumed.
  The painted dot stays 6px via a `::before`; the button itself is what's padded.
- `:focus-visible` recoloured to on-dark (white), verified visible via computed style, not just
  present in the CSS.
- Variable count: the JS builds `slides`/`dots`/`links` arrays from `querySelectorAll` — nothing
  hard-codes four. Confirmed this still works correctly with the new 4-slide markup.

## 3 · `<picture>` — shipped, breakpoint is 700px

`<source media="(max-width: 700px)" srcset="...-hero-phone.webp">` with the desktop file as the
`<img>` fallback, per slide. **This is the breakpoint you asked us to report back** (§5.2/§3 of the
prompt) — chosen as a conventional phone/tablet cutover; happy to move it if the phone crops were
sized against a different assumption.

Verified live via `img.currentSrc`, not assumed: all four slides correctly load the `-phone.webp`
file at 390×844 and the desktop file above 700px.

## 4 · Object-position — applied exactly, and here is where we deviated

Desktop `object-position` values applied exactly as given (§5 of the prompt):

| slide | applied |
|---|---|
| City Life, Al Khor | `0% center` |
| Exclusive Villas | `17% center` |
| The Black Square | `0% center` |
| Delhi Private School | `0% center` |

🔴 **We did not ship a separate tablet-width object-position.** With the phone crop now carrying
the one breakpoint where the drift was large enough to matter (your own arithmetic: 27% of the
phone's visible slice), the residual drift between desktop and the ~700–1200px range is smaller and
we judged it not worth a third value per slide. This is exactly the trade-off your prompt itself
flagged as acceptable *"if you decide the drift is acceptable and say so"* — saying so here. Tell us
if you want a real number attached to that judgement and we'll measure it properly rather than
asserting it.

## 5 · 🔴 A real bug this surfaced, unrelated to the images

`js/home.js` had `document.querySelector(".hero-media img")` (singular) driving the "settle from
108% to 100%" zoom-in animation. With one slide this was invisible — it's the only image there. With
four, **only the first slide's image ever animated**; slides 2–4 were permanently stuck at their
CSS starting scale of 108%, which measurably changes what crop is actually on screen for three of
the four slides versus what the object-position math assumes. Changed to `querySelectorAll` so
every slide settles the same way. Confirmed via computed `transform` on each slide, not assumed —
before the fix, three of four slides showed `matrix(1.08, 0, 0, 1.08, 0, 0)` indefinitely.

## 6 · 🔴 Our live-contrast numbers don't match the sheet's — flagging rather than reconciling silently

Sampling the real rendered page (lightest patch inside the actual `h1` bounding box, blurred to
avoid single-pixel outliers, after the scrim, after the zoom-settle bug above was fixed) gives:

| slide | sheet (desktop, with its scrim) | measured here |
|---|---|---|
| City Life, Al Khor | 5.28 | 2.61 |
| Exclusive Villas | 4.80 | 2.72 |
| The Black Square | 4.48 | 2.71 |
| Delhi Private School | 5.98 (with 35% scrim) | 2.83 |

Every slide reads clearly legible to the eye in the actual screenshots (attached workflow, not
included in this doc) — this isn't "the type is unreadable." But the numbers don't line up, and we
would rather say that plainly than quietly report your figures as our own. We could not identify the
exact source of the gap (checked: viewport width, the zoom-settle bug above, raw-vs-blurred
sampling, box coordinates re-verified live) — most likely it's a difference in how "the text box" is
defined or sampled between your tooling and a browser screenshot crop. **Sending this back rather
than adjusting a crop or scrim value to force our number to match yours**, per your own instruction
in READ-ME-FIRST ("if any image does not work, send it back rather than correcting it locally") —
though to be clear, nothing here looked like it didn't work, the numbers just don't reconcile and we
don't want to paper over that.

## 7 · Type — unchanged, diffed not assumed

Computed `h1` font-size/weight/color/line-height/letter-spacing and bounding rect diffed against the
pre-this-change baseline at 1920px: zero difference. (375px showed a small transient gap on first
measurement that settled to zero once the page's own reveal-animation delay was given time to
finish — a measurement-timing artifact, not a real change; re-confirmed after settling.)

## 8 · What we don't have to send back

**§5.1 of the prompt** ("all the candidate images you pulled, not your shortlist") — that search
was performed in an earlier round against `images/projects/*` (documented in the previous
delivery's now-superseded record) and separately, you did your own 164-frame search against the
project archive for this round. We don't have your 164-frame list; only you do. Nothing to add back
on our side beyond what's already in this document and the earlier round's now-stale CSV, which we
removed since the images sheet supersedes it.

---

## Everything unchanged from the first brief, still true here

- Photo click → that slide's own project page. CTA (`"View all works"`, the strip's first cell,
  same destination it already had) → `projects.html`. Sibling elements, not nested — re-verified.
- Auto-advance pauses on hover and on keyboard focus.
- Only the active slide's link is tabbable; inactive ones carry `tabindex="-1"` + `aria-hidden`.
- All four project links, the CTA, and the other two strip links return 200 — checked live, not
  assumed.

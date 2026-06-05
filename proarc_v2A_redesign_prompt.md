# Claude Code Prompt — Proarc v2A Homepage & About Page Redesign

## CONTEXT

The v2A site is live at: https://pixelbrahma-design-studio.github.io/proarc-website/v2A/
The existing build followed the spec but the result looks generic and template-like.

This prompt redesigns TWO pages only:
1. **v2A/index.html** — Complete homepage rebuild
2. **v2A/about.html** — About page composition fix

Everything else stays untouched — journal pages, project detail pages, services,
contact, portfolio, all CSS custom properties, all GSAP animations. The design system
(Cormorant Garamond + Jost, golden ratio spacing, copper accent) stays exactly the same.
We're changing COMPOSITION, not the system.

---

## DESIGN PHILOSOPHY — READ THIS FIRST

The current site looks like a spec translated into HTML. It needs authorial voice.

Reference aesthetic: **David Chipperfield Architects + Olson Kundig** — show less,
not more. Let one image breathe. Use negative space the way their buildings use void.
Every spacing decision should feel intentional, like a floor plan.

**Three rules for this redesign:**
1. **Less is more** — Show 8 curated projects on the homepage, not all 40. The rest live on portfolio.html.
2. **Asymmetry creates hierarchy** — Not everything gets equal weight. One project dominates, others orbit.
3. **No widgets** — No scrollbar timelines, no carousel dots, no slider arrows. These are PowerPoint patterns, not architecture.

---

## PART 1 — HOMEPAGE REBUILD (v2A/index.html)

Replace the entire main content area between nav and footer. Keep the existing nav
and footer HTML structure. Keep all existing `<head>` content (meta tags, GSAP scripts,
CSS imports, JSON-LD).

### SECTION 1: HERO (replaces the current image slider)

**Kill the slider entirely.** Replace with a single full-viewport hero image.

```
STRUCTURE:
- Full-bleed section, 100vh height, position relative, overflow hidden
- Background: the BEST project image (use the Ajman Bank HQ hero image — 
  images/folio/projects/ajmanbank/ or whichever path has the main exterior shot)
- Dark gradient overlay from bottom: 
  linear-gradient(180deg, transparent 0%, transparent 40%, rgba(0,0,0,0.7) 100%)
- Content positioned absolute, bottom-left, with var(--space-6) padding

CONTENT (bottom-left):
- Project type tag: "Commercial · Ajman · 2015"
  → Jost 400, var(--text-xs), letter-spacing 0.16em, uppercase, rgba(255,255,255,0.45)
- Project title: "Ajman Bank\nHeadquarters" (line break after "Bank")
  → Cormorant Garamond 300, clamp(48px, 7vw, 96px), color #fff, letter-spacing 0.02em
  → max-width: 10ch (forces the dramatic short line breaks)
- Location line: "Al-Ittihad Street, Ajman — 73,071 sq ft"
  → Jost 300, var(--text-sm), letter-spacing 0.12em, rgba(255,255,255,0.4)
  → margin-top: var(--space-3)

SCROLL INDICATOR (bottom-right):
- "Scroll" text: Jost 300, 9px, letter-spacing 0.2em, uppercase, rgba(255,255,255,0.3)
  writing-mode: vertical-rl
- Below text: thin vertical line (1px × 48px, rgba(255,255,255,0.15))
  with a repeating downward pulse animation (subtle)

ACCENT DETAIL:
- Thin vertical copper line on the left: 1px wide, bottom 40% of the hero
  linear-gradient(180deg, transparent 0%, rgba(139,32,16,0.3) 40%, rgba(139,32,16,0.7) 100%)
  position absolute, bottom 0, left var(--space-5)
```

**NO slider dots. NO arrows. NO carousel. NO auto-rotate.**
If the client later wants to rotate the hero image, use a slow crossfade (8-10 second
interval, opacity transition only) — but don't build that now.

---

### SECTION 2: SELECTED WORKS (replaces the current project card grid dump)

**Show only 8 curated projects in an asymmetric editorial grid. NOT all 40+.**

```
HEADER:
- Flex row: "SELECTED WORKS" label (left) + "View All Projects" link (right)
- Label: section-label style (Jost 400, var(--text-xs), uppercase, tracking 0.18em, #888)
- "View All Projects" link: Jost 400, 11px, tracking 0.18em, uppercase, #888
  → 0.5px underline, hover: color #111, underline color → copper
- Border-bottom: 0.5px solid #e0e0e0 on the header row
- Margin-bottom: var(--space-6)

GRID LAYOUT (3 rows, asymmetric):

ROW 1 — grid-template-columns: 61.8% 1fr, gap: 4px
  Card 1 (LARGE): R Holding Head Office — aspect-ratio 16/10
  Card 2 (TALL):  City University — aspect-ratio 3/4

ROW 2 — grid-template-columns: 1fr 1fr 1fr, gap: 4px
  Card 3: Woodlem Park School — aspect-ratio 1/1
  Card 4: CityLife Al-Khor — aspect-ratio 1/1
  Card 5: The BlackSquare — aspect-ratio 1/1

ROW 3 — grid-template-columns: 1fr 61.8%, gap: 4px
  Card 6 (TALL):  FrontLine School — aspect-ratio 3/4
  Card 7 (LARGE): CityLife Al-Tallah — aspect-ratio 16/10

Gap between rows: 4px

EACH CARD:
- position relative, overflow hidden, cursor pointer
- Image: width 100%, object-fit cover, filter: saturate(0.88) contrast(1.05)
  → On hover: transform scale(1.03), filter: saturate(1) contrast(1)
  → transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease
- Overlay: absolute inset 0, gradient from transparent 40% to rgba(0,0,0,0.65) 100%
  → opacity 0 at rest, opacity 1 on hover, transition 0.5s ease
- Project name (inside overlay): Cormorant Garamond 300, var(--text-lg), white
  → transform translateY(8px) at rest, translateY(0) on hover
- Project meta (inside overlay): Jost 300, 11px, tracking 0.12em, uppercase,
  rgba(255,255,255,0.55)
  → Same translateY animation with 0.05s delay

IMAGE SOURCES: Use the existing thumbnail images from each project.
Look in: images/folio/thumbs/ for older projects, 
or images/folio/projects/ for detail images.
Each project has images — use the best exterior shot for each card.

CONTAINER: max-width 1400px (not 1240 — slightly wider for the editorial grid),
centered, padding 0 var(--space-5)
Section padding: var(--space-7) top, var(--space-6) bottom

"View All Projects" links to v2A/portfolio.html
```

---

### SECTION 3: MANIFESTO (replaces the old "about preview" section)

**Two-column layout: ghost numbers left, firm voice right. Black background.**

```
LAYOUT:
- Background: #000
- Padding: var(--space-7) vertical, var(--space-5) horizontal
- Inner: max-width 1400px, centered
- Grid: grid-template-columns: 1fr 61.8%, gap: var(--space-6), align-items center

LEFT COLUMN — Ghost numbers:
- "20" in Cormorant Garamond 300, 120px, rgba(255,255,255,0.06), line-height 0.85
  Below: "Years shaping the UAE skyline" — Jost 300, var(--text-sm), tracking 0.14em,
  uppercase, rgba(255,255,255,0.35)
- Gap: var(--space-4)
- "40+" in Cormorant Garamond 300, 120px, rgba(139,32,16,0.08), line-height 0.85
  Below: "Projects delivered across 7 emirates" — same label style

RIGHT COLUMN — The voice:
- Label: "The Practice" — section-label style but rgba(255,255,255,0.4)
  → margin-bottom var(--space-4)
- Text: Cormorant Garamond 300 italic, clamp(28px, 3.5vw, var(--text-xl)),
  line-height 1.45, rgba(255,255,255,0.85)
  → "Since 2006, Proarc has shaped Ajman's emerging skyline — from corporate
     landmarks and university campuses to mixed-use developments that redefine
     how communities live, work, and learn."
- 34px copper divider line below: 1px height, rgba(139,32,16,0.3)
  → margin-top var(--space-4)
- CTA link: "About the Firm →" — Jost 400, 11px, tracking 0.2em, uppercase,
  rgba(255,255,255,0.5)
  → On hover: color rgba(255,255,255,0.9), copper underline animation (width 0→100%)
  → Links to v2A/about.html
```

---

### SECTION 4: APPROACH (three principles)

**Clean horizontal layout with numbering and vertical dividers.**

```
HEADER:
- "APPROACH" section label
- Border-bottom: 0.5px solid #e0e0e0, padding-bottom var(--space-3)
- Margin-bottom: var(--space-6)

GRID: 3 columns, no gap (borders create separation)

EACH PRINCIPLE:
- Padding: var(--space-5) vertical, var(--space-4) horizontal
- Border-left: 0.5px solid #e0e0e0
- First item: border-left 1px solid rgba(139,32,16,0.3)
- Number: Cormorant Garamond 300, 48px, color #eee, margin-bottom var(--space-3)
  → "01", "02", "03"
- Title: Jost 500, var(--text-sm), tracking 0.12em, uppercase, #111
- Description: Jost 300, 14px, line-height 1.75, #666, max-width 36ch

Content:
01 — "Context First" / "Every project begins with a deep reading of site,
     climate, and community. Architecture without context is sculpture."
02 — "Material Integrity" / "We select materials for longevity, beauty, and
     environmental responsibility. Honesty in construction is honesty in design."
03 — "Lasting Impact" / "We design for decades, not trends. Buildings that age
     with dignity, serve with generosity, and outlast their architects."

CONTAINER: max-width 1400px, centered
Section padding: var(--space-7) vertical
Background: white
```

---

### SECTION 5: JOURNAL TEASER

**Two latest articles in a 2-column editorial layout. Warm background.**

```
CONTAINER:
- Background: #f8f7f5
- Padding: var(--space-7) vertical
- Inner: max-width 1400px, centered

HEADER:
- "FROM THE JOURNAL" (left) + "All Articles" link (right)
- Same header pattern as Selected Works
- Border-bottom: 0.5px solid #ddd

GRID: 2 columns, gap var(--space-5)

EACH ARTICLE CARD:
- Featured image: aspect-ratio 16/9, overflow hidden
  → Use the placeholder blocks (#e8e6e1 background) since journal images don't exist yet
  → Hover: inner element scale(1.03), transition 0.6s
- Category: Jost 400, var(--text-xs), tracking 0.16em, uppercase, rgba(139,32,16,0.7)
- Title: Cormorant Garamond 400, 24px, line-height 1.3, #111
  → Hover: color transitions to rgba(139,32,16,0.8)
- Excerpt: Jost 300, 14px, line-height 1.65, #666, max-width 50ch
- Date: Jost 300, 11px, #aaa

Article 1: "Design Philosophy" / "Designing for the Desert: Architecture in
           Ajman's Climate" / January 2026
Article 2: "Project Story" / "Becoming a Landmark: The Making of Ajman Bank HQ"
           / December 2025

Cards link to: v2A/journal-climate-design.html and v2A/journal-landmark-buildings.html
"All Articles" links to: v2A/journal.html
```

---

## PART 2 — ABOUT PAGE FIX (v2A/about.html)

Keep the nav, footer, and `<head>` exactly as they are. Replace the main content
with the following sections. Preserve ALL existing text content — just reorganize
the composition.

### SECTION 1: HERO QUOTE (refine, don't replace)

The founder quote hero is fine conceptually. Refine it:

```
- Background: #0e0e0e (slightly lighter than pure black for depth)
- Min-height: 70vh (increased from current)
- Flexbox centered, text-align center
- Quote: Cormorant Garamond 300 italic, clamp(28px, 4vw, var(--text-xl)),
  line-height 1.5, rgba(255,255,255,0.85), max-width: 18ch
  → The narrow max-width creates elegant line breaks — this is intentional
- Attribution: "— Founding Principal" — Jost 300, var(--text-sm), tracking 0.12em,
  rgba(255,255,255,0.3), margin-top var(--space-5)
- Subtle accent: 1px vertical copper line (120px tall) behind the text,
  centered, using ::before pseudo-element,
  linear-gradient(180deg, transparent, rgba(139,32,16,0.3), transparent), opacity 0.5
- data-placeholder="true" on quote and attribution (same as current)
```

---

### SECTION 2: NUMBERS (more breathing room)

**Same 4 numbers but with proper spacing and interaction.**

```
LAYOUT: 4 columns, no gap
Container: max-width 1400px, centered, padding var(--space-7) horizontal var(--space-5)

EACH NUMBER ITEM:
- Border-top: 0.5px solid #e0e0e0
- Padding: var(--space-5) top, var(--space-4) horizontal
- Number: Cormorant Garamond 300, clamp(40px, 5vw, 64px), line-height 1, #111
  → margin-bottom var(--space-2)
- Label: Jost 300, 11px, tracking 0.16em, uppercase, #888

HOVER INTERACTION:
- On hover, a copper line (1.5px height) grows from left to right across the
  top of the item (over the gray border), using ::before pseudo-element
  → width: 0 at rest, width: 100% on hover
  → transition: width 0.6s cubic-bezier(0.25,0.46,0.45,0.94)
  → background: rgba(139,32,16,0.7)

GSAP: Keep the count-up animation from the current build.

Values: "20" / "Years of Practice", "40+" / "Projects Delivered",
"2M+" / "Sq Ft Built" (data-placeholder), "7" / "Emirates Served" (data-placeholder)
```

---

### SECTION 3: FIRM STORY (golden split, more breathing room)

```
LAYOUT: Grid, 61.8% image / 38.2% text, gap var(--space-5)
Container: max-width 1400px, centered
Padding: var(--space-6) top, var(--space-7) bottom

LEFT — IMAGE:
- Use the existing office photo (same image as current about page)
- Aspect-ratio 4/3, object-fit cover
- Thin inset frame: ::after pseudo-element, inset var(--space-3),
  border 0.5px solid rgba(255,255,255,0.2), pointer-events none

RIGHT — TEXT:
- Label: "The Practice" — section-label style, margin-bottom var(--space-3)
- Heading: "Proarc" — Cormorant Garamond 300, var(--text-xl), tracking 0.06em,
  margin-bottom var(--space-4)
- Body: USE THE EXISTING PARAGRAPH TEXT from the current about page, but
  break it into 3 shorter paragraphs at natural sentence breaks.
  → Jost 300, var(--text-base), line-height 1.75, #444, max-width 48ch
  → Paragraph spacing: margin-top var(--space-3)
- "Our Projects" CTA button → links to v2A/portfolio.html
  → Same button style as current

DO NOT REWRITE THE BODY TEXT — just reformat the existing 3 paragraphs.
```

---

### SECTION 4: TIMELINE — VERTICAL (replaces the horizontal scrollbar)

**THIS IS THE CRITICAL FIX. Kill the horizontal scrollbar. Replace with vertical.**

```
LAYOUT: max-width 1400px, centered
Padding: var(--space-7) vertical

HEADER:
- "LANDMARK PROJECTS" section label
- Border-bottom: 0.5px solid #e0e0e0, padding-bottom var(--space-3)
- Margin-bottom: var(--space-6)

TIMELINE STRUCTURE:
- Container has padding-left: 140px (room for years)
- Vertical line: 0.5px solid #e0e0e0, position absolute, left 120px, top 0 to bottom

EACH MILESTONE:
- Position relative
- Padding: var(--space-4) vertical, var(--space-5) left
- Border-bottom: 0.5px solid #f0f0f0 (except last item)

- Year: POSITIONED ABSOLUTE, left -140px, top var(--space-4)
  → Cormorant Garamond 300, 32px, color #ccc, width 100px, text-align right
  → On item hover: color transitions to #111

- Dot on the line: ::before pseudo-element
  → 5px × 5px square (NOT circular — architecture = rectilinear)
  → border-radius: 0
  → background: rgba(139,32,16,0.3)
  → position absolute, left calc(-1 × var(--space-5) - 2px)
  → On item hover: background transitions to rgba(139,32,16,0.8)

- Project name: Jost 500, var(--text-sm), tracking 0.1em, uppercase, #111
- Note: Jost 300, 13px, #888, margin-top 4px

MILESTONES (use the real data from current site):
  2013 — Habitat Al Tallah — "Educational landmark in Al Tallah"
  2015 — Ajman Bank HQ — "Inclined-glass corporate headquarters — 73,071 sq ft"
  2017 — City University — "62,000 sqm campus in Ajman"
  2017 — Delhi Private School — "31,000 sqm learning environment"
  2020 — Crown British School — "British-curriculum campus"
  2021 — Woodlem Park Hamidiya — "26,000 sqm school campus"
  2024 — North Gate British School — "Newest educational delivery"

GSAP ANIMATION:
- Each item: opacity 0, translateX(-12px) at start
- Stagger: 0.1s per item
- Trigger: when timeline section enters viewport at 85%

RESPONSIVE (< 768px):
- Padding-left reduces to 80px
- Year font-size: 24px, width 60px, left -80px
- Vertical line moves to left 65px
```

---

### SECTION 5: EXPERTISE (cleaner grid, keep current content)

```
LAYOUT: 3×2 grid on #f8f7f5 background
Keep the EXACT same content as the current 6 expertise items.

REFINEMENTS:
- Each item: border-left 1px solid rgba(139,32,16,0.3), padding-left var(--space-4)
  → On hover: border-left-color transitions to rgba(139,32,16,0.8)
- Remove any background color or box shadow on individual items
- Name: Jost 500, var(--text-sm), tracking 0.1em, uppercase, #111
- Description: Jost 300, 14px, #666, line-height 1.6
- Section header: "EXPERTISE" label with 0.5px border-bottom, same pattern as others
```

---

### SECTION 6: APPROACH (keep as-is or match homepage version)

If the approach section exists on the current about page, keep it.
If it matches the homepage version, that's fine — it can appear in both places.
Use the same 3-column layout with "01/02/03" numbering as described in the
homepage section above.

---

## GSAP ADJUSTMENTS

Update the GSAP animations in the site's JS to work with the new structure:

1. **Remove** any slider/carousel JS from the homepage
2. **Add** staggered entrance for the work cards (each row triggers independently,
   cards within each row stagger at 0.12s intervals)
3. **Add** vertical timeline item stagger (0.1s per item, fade + translateX)
4. **Keep** number count-up animation
5. **Keep** nav scroll background transition
6. **Keep** all other existing GSAP animations on other pages

---

## RESPONSIVE BREAKPOINTS

Apply these to the new homepage and about page:

```
@media (max-width: 1024px):
- Works rows 1 & 3: single column (stacked)
- Works row 2: 2 columns (drop 3rd to next row or hide)
- Manifesto: single column (numbers above text)
- Approach: single column, vertical stack with copper left-border on each
- Firm story: single column (image above text)
- Expertise: 2 columns
- Numbers: 2×2 grid
- Journal: single column

@media (max-width: 768px):
- Nav links: hidden (hamburger menu handles it — keep existing mobile nav)
- Hero title: font-size 40px
- Works row 2: single column
- Expertise: single column
- Timeline: reduced left padding (80px), smaller year font
- All section horizontal padding: var(--space-4) instead of var(--space-5)
```

---

## WHAT NOT TO CHANGE

- Journal pages (journal.html and all 6 article pages) — untouched
- Portfolio page (portfolio.html) — untouched
- Services page — untouched
- Contact page — untouched
- ALL project detail pages — untouched
- CSS custom properties (--space-*, --text-*) — keep exactly as defined
- Color palette — keep exactly as is
- Font imports — keep exactly as is
- Meta tags, JSON-LD, OG tags — keep on both pages
- Nav HTML structure — keep (just the main content between nav and footer changes)
- Footer HTML structure — keep
- sitemap.xml — untouched
- "← Current Site" nav link — keep

---

## VERIFICATION AFTER IMPLEMENTATION

- [ ] Homepage hero: single image, no slider, no dots, no arrows
- [ ] Homepage works grid: exactly 8 projects in asymmetric layout (large/tall/square mix)
- [ ] Homepage manifesto: ghost numbers left, text right, black background
- [ ] Homepage approach: 3 columns with "01/02/03", vertical border separation
- [ ] Homepage journal: 2 articles in editorial layout
- [ ] All homepage project cards link to correct v2A/ project detail pages
- [ ] About page hero: refined quote, 70vh, copper accent line
- [ ] About page numbers: 4-across with hover copper line, count-up animation
- [ ] About page firm story: golden split, existing text in 3 paragraphs
- [ ] About page timeline: VERTICAL (no horizontal scrollbar anywhere)
- [ ] About page expertise: clean grid with copper left borders
- [ ] All images load correctly
- [ ] GSAP animations work (scroll reveals, stagger entrances, number count-up)
- [ ] Nav background transitions on scroll
- [ ] Responsive: test 375px, 768px, 1024px, 1440px
- [ ] No horizontal scrollbar on any section of any page
- [ ] No console errors
- [ ] All other v2A pages (journal, portfolio, services, contact, project details) unchanged

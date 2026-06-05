# Claude Code Prompt — Proarc v2A: Homepage Refinement + Portfolio + Services Redesign

## CONTEXT

The v2A site is live at: https://pixelbrahma-design-studio.github.io/proarc-website/v2A/
The recent homepage redesign improved the layout significantly but needs refinement.
The portfolio and services pages were carried over from Phase 1 without redesign and
now look weak compared to the new homepage and about page.

This prompt covers THREE pages:
1. **v2A/index.html** — Homepage hero refinement + polish
2. **v2A/portfolio.html** — Complete portfolio page redesign
3. **v2A/services.html** — Complete services page overhaul with new content

The design system is already in place. Use the existing CSS custom properties:
- Fonts: Cormorant Garamond (display) + Jost (UI)
- Type scale: --text-xs (10px) through --text-2xl (68px)
- Spacing: --space-1 (8px) through --space-7 (144px)
- Colors: #000, #fff, #f8f7f5, #111, #333, #444, #666, #888, #aaa
- Accent: #8B2010 (copper) and its rgba variants
- Golden ratio: 61.8% / 38.2% splits everywhere

---

## PART 1 — HOMEPAGE HERO REFINEMENT

The current hero is just a full-bleed image with text floating on it. It's a wallpaper,
not a composition. The golden ratio isn't applied to the hero structure itself.

### REPLACE the current hero with a GOLDEN-RATIO SPLIT HERO:

```
STRUCTURE: 100vh height, display grid, grid-template-columns: 61.8% 38.2%

LEFT PANEL (61.8%) — THE IMAGE:
- Ajman Bank HQ exterior photo (keep current hero image)
- Full height of the hero (100vh), object-fit cover
- Subtle dark gradient overlay from bottom:
  linear-gradient(180deg, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)
- Thin vertical copper line on the right edge:
  1px solid rgba(139,32,16,0.15) separating the two panels

RIGHT PANEL (38.2%) — THE INFO PANEL:
- Background: #0a0a0a (near-black, not pure black — creates depth)
- Display: flex, flex-direction: column, justify-content: space-between
- Padding: var(--space-6) vertical, var(--space-5) horizontal

TOP AREA of right panel:
- Firm tagline: "Architecture & Engineering"
  → Jost 300, 11px, letter-spacing 0.2em, uppercase, rgba(255,255,255,0.3)
- Below (margin-top var(--space-2)):
  "Since 2006, Ajman, UAE"
  → Jost 300, 11px, letter-spacing 0.14em, rgba(255,255,255,0.2)

MIDDLE AREA of right panel (featured project info):
- "FEATURED PROJECT" label:
  → Jost 400, 10px, letter-spacing 0.18em, uppercase, rgba(139,32,16,0.6)
  → margin-bottom var(--space-3)
- Project name: "Ajman Bank\nHeadquarters"
  → Cormorant Garamond 300, clamp(36px, 4vw, 52px), white, line-height 1.15
  → letter-spacing 0.02em
- Thin copper rule: 34px wide, 1px height, rgba(139,32,16,0.4)
  → margin: var(--space-3) 0
- Project type: "Commercial · Ajman · 2015"
  → Jost 300, var(--text-sm), letter-spacing 0.1em, rgba(255,255,255,0.4)
- Project stat: "73,071 sq ft · G+M+7 Stories"
  → Jost 300, 12px, rgba(255,255,255,0.25), margin-top var(--space-1)

BOTTOM AREA of right panel:
- "View Project →" link:
  → Jost 400, 11px, letter-spacing 0.18em, uppercase, rgba(255,255,255,0.4)
  → hover: color white, copper underline animation
  → Links to v2A/ajmanbank.html (or whichever is the Ajman Bank detail page)
- Small scroll indicator below:
  → thin vertical line (1px × 32px, rgba(255,255,255,0.1)) with downward pulse animation
  → "Scroll" text, Jost 300, 8px, letter-spacing 0.2em, rgba(255,255,255,0.15),
    writing-mode vertical-rl, margin-top var(--space-2)

RESPONSIVE:
- Below 1024px: stack vertically — image 60vh on top, info panel below as horizontal strip
- Below 768px: image 50vh, info panel with reduced padding var(--space-4)
```

### ALSO FIX in the Selected Works section below the hero:

- The card overlay text (project name + meta) should be HIDDEN by default and
  REVEALED on hover — currently it appears to be always visible on some cards.
  Ensure: .work-card-overlay { opacity: 0; } and .work-card:hover .work-card-overlay { opacity: 1; }
- Ensure the section container uses max-width: 1400px consistently
- The "SELECTED WORKS" header and "View All Projects" link should use the section-label
  styling (Jost 400, 10px, uppercase, tracking 0.18em, #888)

### Homepage overall check:
- Verify EVERY section uses golden-ratio splits where applicable
- Ensure 100vh hero (no footer peeking above the fold)
- All GSAP scroll animations still work after the hero change

---

## PART 2 — PORTFOLIO PAGE REDESIGN (v2A/portfolio.html)

The current portfolio is a flat 4-column uniform grid. Every project gets identical
treatment. No hierarchy, no page introduction, no visual rhythm. Redesign it completely.

### PAGE STRUCTURE:

**SECTION 1: PAGE HERO** (NEW — currently missing)

```
- Background: #f8f7f5
- Padding: var(--space-7) top (accounts for fixed nav), var(--space-6) bottom
- Inner: max-width 1400px, centered

- Label: "PORTFOLIO" — section-label style (Jost 400, 10px, uppercase, tracking 0.18em, #888)
  → margin-bottom var(--space-3)
- Heading: "40+ Projects Across the UAE"
  → Cormorant Garamond 300, var(--text-xl) (42px), #111, letter-spacing 0.04em
- Subtitle: "Commercial, educational, residential, and mixed-use architecture
  shaping the emirates since 2006."
  → Jost 300, var(--text-base), #666, line-height 1.7, max-width 56ch
  → margin-top var(--space-2)
```

**SECTION 2: FILTER TABS** (refined from current)

```
- Sticky below nav when scrolling (position sticky, top 64px, z-index 50,
  background #fff with 0.5px border-bottom #e0e0e0)
- Container: max-width 1400px, centered, padding var(--space-3) var(--space-5)

TABS: ALL · COMMERCIAL · EDUCATIONAL · RESIDENTIAL · MIXED-USE · MALLS

Style:
- Jost 400, 11px, letter-spacing 0.16em, uppercase, color #888
- Active tab: color #111, border-bottom 1.5px solid #111
- Hover: color #111
- Padding-bottom: var(--space-2) on each tab
- Gap: var(--space-4) between tabs
- Transition: color 0.25s ease, border-color 0.25s ease

Project count next to active tab (optional):
- "(12)" in Jost 300, 10px, rgba(139,32,16,0.5) next to active tab name
```

**SECTION 3: FEATURED PROJECTS** (NEW — top 2 projects get premium treatment)

```
- Max-width 1400px, centered
- Grid: 2 columns, 61.8% / 38.2%, gap 4px
- Margin-bottom: var(--space-5)

LEFT (61.8%): FEATURED PROJECT 1
- Image: aspect-ratio 16/10, full width, object-fit cover
- Overlay on hover: gradient + project info (same pattern as homepage cards)
  → Project name in Cormorant Garamond 300, var(--text-lg)
  → Location + sector below
- Use the best project photo (Ajman Bank exterior or R Holding)

RIGHT (38.2%): FEATURED PROJECT 2
- Image: aspect-ratio matching the left image height (same height, narrower)
- Same hover overlay pattern
- Use City University or another strong project

Both link to their respective v2A project detail pages.
```

**SECTION 4: PROJECT GRID** (redesigned from the current 4-column uniform grid)

```
LAYOUT: 3-column grid (NOT 4 — gives each card more presence)
- Max-width 1400px, centered
- Gap: 4px horizontal, var(--space-4) vertical (more vertical breathing room)
- Padding: 0 var(--space-5)

EACH PROJECT CARD:
- Image: aspect-ratio 4/3, object-fit cover, width 100%
  → filter: saturate(0.9) contrast(1.05) at rest
  → hover: scale(1.02), saturate(1), transition 0.6s
- Below image:
  → Project name: Jost 500, 12px, tracking 0.12em, uppercase, #111
    margin-top var(--space-2)
  → Location: Jost 300, 11px, tracking 0.08em, #888
    margin-top 3px
  → Sector tag (NEW): Jost 400, 9px, tracking 0.14em, uppercase,
    rgba(139,32,16,0.5), margin-top var(--space-1)
    → e.g. "COMMERCIAL" or "EDUCATIONAL"
- Card hover: subtle copper left-border reveal
  → border-left: 2px solid transparent → rgba(139,32,16,0.6) on hover
  → transition 0.3s ease

CATEGORY FILTERING:
- When a filter tab is clicked, cards not in that category should fade out
  and the grid should reflow
- Use the existing category data from the current portfolio.html
  (each card already has data-category or class for filtering)
- Animate with opacity transition (0.3s) and display toggle
- "ALL" shows everything

GSAP ENTRANCE:
- Cards stagger in with translateY(20px) + opacity, 0.06s per card
- Trigger when grid enters viewport at 85%
```

**SECTION 5: PORTFOLIO CTA** (bottom, before footer)

```
- Full-width, background #000
- Padding: var(--space-6) vertical
- Centered content:
  → "Have a project in mind?" — Cormorant Garamond 300 italic,
    var(--text-lg), rgba(255,255,255,0.7)
  → "Get in Touch" button below — Jost 400, 11px, uppercase,
    tracking 0.2em, color white, padding 16px 34px
  → On hover: copper underline animation
  → Links to v2A/contact.html
```

---

## PART 3 — SERVICES PAGE COMPLETE OVERHAUL (v2A/services.html)

The current services page has thin content, no page header, sub-services are just
text labels with no descriptions, the image/text splits are NOT golden ratio (they're
roughly 50/50), and "Skyscrapper" is misspelled. Rebuild it entirely.

### IMPORTANT — NEW CONTENT STRUCTURE:

Proarc's services should be presented as 6 core disciplines (expanded from the
current 3). All new descriptions are placeholder — tag with data-placeholder="true".

### PAGE STRUCTURE:

**SECTION 1: PAGE HERO** (NEW — currently missing)

```
- Background: #0e0e0e (dark hero like about page)
- Min-height: 50vh
- Display: flex, align-items: center
- Padding: var(--space-7) horizontal var(--space-5)
- Inner: max-width 1400px, centered

LEFT (38.2%) — META:
- "SERVICES" label — Jost 400, 10px, tracking 0.18em, uppercase, rgba(255,255,255,0.35)
- "6" — Cormorant Garamond 300, 96px, rgba(255,255,255,0.06), line-height 0.85
- "Core Disciplines" — Jost 300, 12px, tracking 0.14em, rgba(255,255,255,0.25)

RIGHT (61.8%) — STATEMENT:
- "From first sketch to final handover — architecture, engineering,
  and management as a single integrated practice."
  → Cormorant Garamond 300 italic, clamp(24px, 3vw, var(--text-lg)),
    rgba(255,255,255,0.8), line-height 1.5, max-width 32ch
  → data-placeholder="true"
```

**SECTION 2: SERVICES NAVIGATION** (NEW — quick-jump links)

```
- Background: #fff
- Padding: var(--space-4) var(--space-5)
- Border-bottom: 0.5px solid #e0e0e0
- Sticky below nav (position sticky, top 64px, z-index 50, background #fff)

6 links in a flex row, gap var(--space-4):
  01 Architecture Design
  02 Structural Engineering
  03 Interior Design
  04 MEP Engineering
  05 Project Management
  06 Urban Planning

Each: Jost 400, 11px, tracking 0.14em, uppercase, #888
- Number: rgba(139,32,16,0.5)
- Hover: color #111
- Active (scrolled to that section): color #111, copper underline

These are anchor links — clicking scrolls smoothly to the respective service section.
```

**SECTION 3-8: THE SIX SERVICES**

Each service follows the SAME template but ALTERNATES direction:
- Odd services (1, 3, 5): Image LEFT 61.8% / Text RIGHT 38.2%
- Even services (2, 4, 6): Text LEFT 38.2% / Image RIGHT 61.8%

This creates visual rhythm as you scroll.

```
EACH SERVICE SECTION:

CONTAINER:
- Max-width 1400px, centered
- Padding: var(--space-7) top, var(--space-6) bottom, var(--space-5) horizontal
- Border-top: 0.5px solid #e0e0e0 (subtle section divider)
- id attribute for anchor linking (e.g. id="architecture-design")

IMAGE SIDE (61.8%):
- Image fills 100% of its column
- Aspect-ratio: 4/3 for landscape images, auto for others
- object-fit: cover
- filter: saturate(0.9) contrast(1.05)
- Use the existing service images from the current page
- For new services without images, add a placeholder div:
  background #e8e6e1 with data-placeholder="true"

TEXT SIDE (38.2%):
- Padding: var(--space-5) on the inner side (away from image)

- Service number: "01" — Cormorant Garamond 300, 48px, #eee
  → margin-bottom var(--space-3)
- Service name: Cormorant Garamond 300, var(--text-xl) (42px), #111
  → letter-spacing 0.04em, line-height 1.15
  → margin-bottom var(--space-3)
- Thin copper rule: 34px wide, 1px height, rgba(139,32,16,0.3)
  → margin-bottom var(--space-4)
- Description: 2-3 paragraphs
  → Jost 300, var(--text-base), line-height 1.75, #444, max-width 48ch
  → Paragraph spacing: margin-top var(--space-3)
  → data-placeholder="true" on new content

- Sub-disciplines header: "DISCIPLINES" label
  → Jost 400, 10px, tracking 0.16em, uppercase, #888
  → margin-top var(--space-5), margin-bottom var(--space-3)
- Sub-discipline list: 3-5 items
  → Each: border-top 0.5px solid #e8e6e1, padding var(--space-2) 0
  → Name: Jost 400, 13px, #333
  → Brief description: Jost 300, 12px, #888, margin-top 2px
  → On hover: border-top-color transitions to rgba(139,32,16,0.5),
    name color #111
  → Last item: border-bottom 0.5px solid #e8e6e1

RESPONSIVE (below 1024px):
- Stack vertically: image on top (full width, aspect-ratio 16/9), text below
- Text padding: var(--space-4) all sides
- All services stack in the same direction (no alternating)
```

### THE SIX SERVICES — CONTENT:

**SERVICE 1: Architecture Design** (id="architecture-design")
Image: Keep the existing villa render (current services page, first image)
Number: 01

Description (keep existing first paragraph, add new ones with data-placeholder="true"):
Paragraph 1: "Proarc is driven by a belief that the quality of our surroundings
has a direct influence on the quality of our lives, whether at home, in the
workplace, the cultural building or the public realm." (EXISTING — keep as-is)

Paragraph 2 (NEW, data-placeholder="true"): "Our architectural design process
begins with an immersive understanding of site, climate, and community. Every
project — from a single villa to a university campus — receives the same
rigour of analysis, the same ambition of expression, and the same commitment
to delivering spaces that endure."

Paragraph 3 (NEW, data-placeholder="true"): "Across 40+ projects spanning
commercial, educational, residential, and institutional sectors, we have
developed a design methodology that balances bold formal expression with the
practical demands of the UAE's climate and cultural context."

Sub-disciplines:
- Concept Design — "Translating vision into form through iterative design exploration"
- Schematic Design — "Developing spatial relationships, massing, and material strategies"
- Design Development — "Refining every detail from facade systems to interior finishes"
- Construction Documentation — "Comprehensive drawing sets for precise execution"
(All sub-discipline descriptions: data-placeholder="true")


**SERVICE 2: Structural Engineering** (id="structural-engineering")
Image: Use a construction/structural image if available, or the tower image
from current "Skyscraper Design" section
Number: 02

Description (ALL NEW, data-placeholder="true"):
Paragraph 1: "Our structural engineering team works in direct collaboration
with the design studio, ensuring that every architectural ambition is matched
by engineering precision. From reinforced concrete frames to post-tensioned
slabs, we design structures that are efficient, economical, and elegant."

Paragraph 2: "With particular expertise in high-rise and educational
structures across the UAE, we understand the seismic, wind, and thermal
forces that shape building design in the Gulf region. Our engineers bring
both analytical rigour and creative problem-solving to every structural
challenge."

Sub-disciplines:
- Reinforced Concrete Design — "Frame structures, foundations, and retaining systems"
- Steel & Composite Structures — "Long-span roofs, canopies, and hybrid systems"
- High-Rise Engineering — "Towers optimised for lateral loads and vertical efficiency"
- Structural Rehabilitation — "Assessment and strengthening of existing buildings"
(All data-placeholder="true")


**SERVICE 3: Interior Design** (id="interior-design")
Image: Use an interior shot if available from any project, or placeholder
Number: 03

Description (ALL NEW, data-placeholder="true"):
Paragraph 1: "Interior design at Proarc is not a separate discipline — it is
the natural continuation of the architectural idea into the human-scale spaces
where people live, work, and learn. We design interiors that carry the same
spatial logic, material honesty, and climatic awareness as the building envelope."

Paragraph 2: "From corporate lobbies that establish institutional identity
to school interiors that foster curiosity and collaboration, our interiors
are designed to perform — acoustically, thermally, and experientially."

Sub-disciplines:
- Workplace Interiors — "Offices, lobbies, and collaborative environments"
- Educational Interiors — "Classrooms, libraries, and learning commons"
- Residential Interiors — "Apartments, villas, and common areas"
- Hospitality & Retail — "Retail spaces, restaurants, and public amenities"
(All data-placeholder="true")


**SERVICE 4: MEP Engineering** (id="mep-engineering")
Image: Use a technical/mechanical image or building systems image, or placeholder
Number: 04

Description (ALL NEW, data-placeholder="true"):
Paragraph 1: "Mechanical, electrical, and plumbing systems are the invisible
infrastructure that makes architecture habitable. Our in-house MEP team
designs systems that prioritise energy efficiency, occupant comfort, and
long-term maintainability — critical considerations in the UAE's demanding
climate."

Paragraph 2: "By integrating MEP design from the earliest stages of the
architectural process, we avoid the costly clashes and compromises that
result from treating engineering as an afterthought. Every ceiling void,
every riser, every plant room is coordinated with the architectural vision."

Sub-disciplines:
- HVAC Systems — "Climate control optimised for Gulf conditions"
- Electrical Engineering — "Power distribution, lighting design, and smart systems"
- Plumbing & Fire Protection — "Water systems, drainage, and life safety"
- Energy & Sustainability — "Load reduction strategies and green building compliance"
(All data-placeholder="true")


**SERVICE 5: Project Management** (id="project-management")
Image: Keep the existing project management image (current services page, second image — the street-level render)
Number: 05

Description (keep existing paragraph, add new ones):
Paragraph 1: KEEP the existing Project Management description from current page.

Paragraph 2 (NEW, data-placeholder="true"): "Our project managers sit between
the design studio and the construction site, ensuring that design intent survives
the translation into built reality. From procurement strategy and contractor
coordination to quality assurance and programme management, we protect the
client's interests at every stage."

Paragraph 3 (NEW, data-placeholder="true"): "With experience managing projects
ranging from single-building schools to multi-phase mixed-use developments,
our team brings the organisational discipline and communication skills that
complex projects demand."

Sub-disciplines:
- Pre-Construction Planning — "Budgeting, scheduling, and procurement strategy"
- Construction Supervision — "Quality control and on-site coordination"
- Contract Administration — "Tender management, variation assessment, and claims"
- Handover & Close-Out — "Defect management, commissioning, and documentation"
(All data-placeholder="true")


**SERVICE 6: Urban Planning & Sustainability** (id="urban-planning")
Image: Use an aerial/masterplan image if available, or placeholder
(This REPLACES the old "Skyscraper Design" section and corrects the typo)
Number: 06

Description (ALL NEW, data-placeholder="true"):
Paragraph 1: "Architecture does not exist in isolation. Every building shapes
its street, every street shapes its neighbourhood, and every neighbourhood
shapes the city. Our urban planning work operates at these larger scales —
designing the frameworks within which individual buildings become communities."

Paragraph 2: "As the UAE's northern emirates continue their rapid
urbanisation, Proarc brings a sustainability-first approach to masterplanning.
Walkability, mixed-use density, green infrastructure, and climate-responsive
orientation are not additions to our plans — they are the starting point."

Sub-disciplines:
- Masterplanning — "Large-scale site planning and phased development strategies"
- Sustainable Design — "Green building compliance, passive design, and energy modelling"
- Urban Design — "Streetscapes, public spaces, and community infrastructure"
- Feasibility Studies — "Site analysis, market assessment, and development appraisal"
(All data-placeholder="true")


**SECTION 9: SERVICES CTA** (bottom, before footer)

```
- Full-width, background #000
- Padding: var(--space-6) vertical
- Display: grid, grid-template-columns: 61.8% 38.2%, max-width 1400px, centered

LEFT:
- "Every project is an integrated effort — architecture, engineering,
  and management working as one."
  → Cormorant Garamond 300 italic, var(--text-lg), rgba(255,255,255,0.7),
    max-width 28ch
  → data-placeholder="true"

RIGHT:
- "Start a Conversation" — Jost 400, 11px, uppercase, tracking 0.2em
  → Color: rgba(255,255,255,0.5)
  → Hover: white, copper underline
  → Links to v2A/contact.html
- Contact details below:
  → "info@proarc.ae" — Jost 300, 13px, rgba(255,255,255,0.35)
  → "+971 6 744 6633" — Jost 300, 13px, rgba(255,255,255,0.25)
```

---

## GSAP ANIMATIONS FOR ALL THREE PAGES

### Homepage:
- Hero: the right panel content fades in with stagger (0.15s intervals,
  power2.out) after a 0.3s delay
- Image subtle parallax on scroll (moves at 0.95x rate — barely perceptible)
- Everything else keeps existing animations

### Portfolio:
- Page hero text: fade-up on load (0.8s, translateY 20px)
- Featured projects: fade-in + scale from 1.02 (0.7s)
- Grid cards: stagger entrance, 0.06s per card, translateY(20px)
- When filter is clicked: cards animate out (opacity 0, 0.2s),
  grid reflows, new cards animate in (opacity 1, 0.3s, stagger 0.04s)

### Services:
- Page hero: text fades in with stagger (0.2s intervals)
- Each service section: image fades in from the image side (translateX ±30px),
  text content staggers from the text side
- Sub-disciplines list items: stagger from top, 0.08s each
- ScrollTrigger: start "top 80%", play once

---

## CRITICAL CHECKS

- [ ] Homepage hero uses golden-ratio split (61.8% image / 38.2% panel)
- [ ] Homepage hero is exactly 100vh (no footer peeking)
- [ ] Homepage card overlays HIDDEN by default, REVEALED on hover only
- [ ] Portfolio has page hero section with heading and subtitle
- [ ] Portfolio filter tabs are functional (clicking filters the grid)
- [ ] Portfolio grid is 3 columns (not 4)
- [ ] Portfolio has 2 featured projects at top in 61.8/38.2 split
- [ ] Services has dark page hero with "6 Core Disciplines"
- [ ] Services has sticky quick-jump navigation
- [ ] ALL 6 services use golden-ratio split (61.8% image / 38.2% text)
- [ ] Services ALTERNATE direction (odd: image-left, even: image-right)
- [ ] "Skyscrapper" is corrected to "Skyscraper" (or replaced by "Urban Planning")
- [ ] Every new paragraph tagged with data-placeholder="true"
- [ ] Every service has numbered sub-disciplines with descriptions
- [ ] All pages responsive at 375px, 768px, 1024px, 1440px
- [ ] All GSAP animations work
- [ ] No horizontal scrollbar on any page
- [ ] No console errors
- [ ] All internal links point to v2A/ pages

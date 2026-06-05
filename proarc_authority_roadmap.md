# Proarc Website — Authority Platform + Immersive Portfolio
## Full Implementation Roadmap with Claude Code Prompts

**Repo**: pixelbrahma-design-studio/proarc-website (GitHub Pages)
**Live**: https://pixelbrahma-design-studio.github.io/proarc-website/
**Status**: Phase 1 (Aesthetic Refresh) complete — Cormorant Garamond + Jost applied,
golden ratio type scale and spacing live, project detail template updated.

---

## PHASE 2 — PROJECT DETAIL CASE STUDY TEMPLATE
**Priority: HIGHEST** — This is 70% of the authority value.
**Branch**: `phase-2-case-study-template`

### Claude Code Prompt:

```
Read the full codebase of this site. The aesthetic system (Cormorant Garamond + Jost,
golden ratio spacing with --space-1 through --space-7, type scale --text-xs through
--text-2xl) is already implemented.

Create a new project detail case study template that replaces the current simple
project detail layout. Build it as a reusable HTML template, then apply it to
ALL existing project pages (every .html file that is a project detail page).

The template must use golden ratio proportions throughout:

## CASE STUDY PAGE STRUCTURE (top to bottom):

### 1. HERO SECTION (full-width)
- Full-bleed hero image, 75vh height
- Project title overlay: Cormorant Garamond 300, --text-2xl (68px), white, 
  bottom-left positioned with var(--space-6) padding
- Below title: one-line project type tag (e.g. "Educational · Ajman · 2017")
  in Jost 300, --text-sm, letter-spacing 0.14em, uppercase, rgba(255,255,255,0.7)
- Subtle dark gradient overlay from bottom (for text legibility)

### 2. PROJECT OVERVIEW (two-column, golden split)
- Left column: 61.8% width
  - Section label: "Overview" — Jost 400, --text-xs, uppercase, letter-spacing 0.16em,
    color #888, margin-bottom var(--space-2)
  - Description: Cormorant Garamond 300, --text-md (19px), line-height 1.8, color #333
  - Max-width 62ch for optimal reading
  - If no real content exists yet, use this placeholder:
    "This project represents Proarc's commitment to [sector] architecture in the
    [location] region. The design responds to the unique climatic and cultural context
    of the UAE, balancing functionality with an ambitious formal expression. Working
    closely with the client, the team developed a solution that addresses both
    immediate programmatic needs and long-term sustainability goals."
    (Tag placeholder text with data-placeholder="true" attribute for easy replacement)

- Right column: 38.2% width — structured metadata sidebar
  - "Project Data" label: same style as "Overview"
  - Each data row: label (Jost 400, 10px, uppercase, tracking 0.16em, color #888)
    and value (Jost 300, 14px, color #111) separated by 0.5px border-bottom
  - Fields (use existing data where available, otherwise placeholder with
    data-placeholder="true"):
    - CLIENT: [from existing data or "—"]
    - LOCATION: [from existing data]
    - SECTOR: [Educational / Commercial / Residential / Mixed-Use / Retail / Institutional]
    - TOTAL BUILT-UP AREA: [from existing data or "— sqm"]
    - START DATE: [from existing data or "—"]
    - COMPLETION: [from existing data or "—"]
    - STRUCTURAL TYPE: [placeholder: "Reinforced concrete frame"]
    - STORIES: [placeholder: "G + — floors"]
    - STATUS: [Completed / Under Construction — from existing data]

  - Spacing: var(--space-3) between each row, var(--space-5) padding around sidebar

### 3. DESIGN INTENT SECTION (full-width content block)
- Section label: "Design Intent" — same label style
- Two paragraphs of body text: Jost 300, --text-base (16px), line-height 1.75,
  max-width 72ch, centered
- Use placeholder:
  "The architectural concept emerged from a careful reading of the site's orientation,
  prevailing wind patterns, and the client's vision for a landmark that would serve the
  community for decades. The massing strategy creates a dialogue between solid and void,
  allowing natural light to penetrate deep into the floor plates while maintaining
  thermal comfort in the UAE's demanding climate."
  
  "Material selections — [placeholder: exposed concrete, glass curtain wall, perforated
  metal screens] — were chosen for their durability, low maintenance, and aesthetic
  contribution to the neighbourhood's evolving urban fabric."
- Tag all placeholder text with data-placeholder="true"
- Margin: var(--space-6) top and bottom

### 4. IMAGE GALLERY (masonry or grid)
- Use the existing project images (each project page already has 2-5 images)
- Layout: 2-column grid for the first 2 images (equal width), then any remaining
  images in a 3-column grid below
- All images: aspect-ratio auto, object-fit cover, 0 border-radius
- Gap: 4px (architectural precision, not chunky gaps)
- On hover: slight desaturation lift (filter transition)
- Below each image: optional caption area (Jost 300, 11px, color #888,
  padding-top 8px) — leave empty for now but include the HTML element
  with data-placeholder="true"

### 5. RELATED PROJECTS STRIP (bottom)
- Section label: "Related Projects"
- Show 3 project cards in a row (pull from the same sector/category if possible,
  otherwise just show 3 random other projects)
- Each card: thumbnail image (aspect-ratio 4/3), project name (Jost 500, 12px,
  uppercase, tracking 0.12em), location (Jost 300, 11px, color #888)
- Link each card to its project page
- Margin: var(--space-7) top, var(--space-6) bottom

### 6. BACK NAVIGATION
- Above the footer: "← Back to Projects" link
  Jost 400, 12px, uppercase, tracking 0.14em, color #888
  On hover: color #111, slight padding-left transition (indent effect)

## IMPLEMENTATION RULES:
- Preserve ALL existing data (titles, descriptions, images, metadata) from current
  project pages — do NOT delete any existing content
- Where a project page has content for a field, use it. Where it doesn't, insert
  the placeholder with data-placeholder="true"
- The hero image should be the FIRST image from the existing project page
- Apply this template to EVERY project detail page in the codebase
- Keep the existing CSS custom properties (--space-*, --text-*) — do not redefine them
- All new CSS goes in the existing stylesheet, not inline
- Ensure the page is responsive: on mobile (<768px), the 61.8/38.2 split stacks
  vertically (overview on top, metadata sidebar below), hero drops to 50vh,
  gallery goes single column

After implementing, list every project page and confirm the template was applied.
Also fix the Google Maps embed on contact.html — it's currently broken and showing
"Sorry! Something went wrong." Replace it with a static map image or an OpenStreetMap
embed that doesn't require an API key.
```

---

## PHASE 3 — ABOUT PAGE AUTHORITY REBUILD
**Priority: HIGH**
**Branch**: `phase-3-about-rebuild`

### Claude Code Prompt:

```
Rebuild about.html while keeping the existing aesthetic system (Cormorant Garamond +
Jost, golden ratio spacing). The current About page is a single paragraph with one
office photo. Transform it into an authority-grade firm profile.

Keep the nav and footer exactly as they are. Replace only the main content area.

## PAGE STRUCTURE (top to bottom):

### 1. HERO STATEMENT (full-width, dark background #111)
- Pull quote / founder statement in Cormorant Garamond 300 italic, --text-xl (42px),
  white, centered, max-width 48ch
- Placeholder text:
  "We believe architecture is the most visible expression of a society's ambitions.
  Every line we draw carries that responsibility."
  data-placeholder="true"
- Attribution below: "— [Principal Architect Name]" in Jost 300, --text-sm,
  rgba(255,255,255,0.5), letter-spacing 0.1em
  Use placeholder: "— Founding Principal" with data-placeholder="true"
- Section height: 50vh, display flex, center aligned
- Padding: var(--space-7) horizontal

### 2. NUMBERS STRIP (full-width, white background)
- 4 metrics in a row, golden-ratio spaced
- Each metric:
  - Number: Cormorant Garamond 300, 56px, color #111
  - Label: Jost 300, 11px, uppercase, tracking 0.16em, color #888
  - Thin 0.5px top border on each, padding-top var(--space-3)
- Metrics (use data-placeholder="true" on numbers that need real data):
  - "20" / "Years of Practice" (2006 to present — this is real)
  - "40+" / "Projects Delivered" (real — counted from portfolio)
  - "2M+" / "Sq Ft Built" (placeholder — data-placeholder="true")
  - "7" / "Emirates Served" (placeholder — data-placeholder="true")
- Container max-width 1240px, centered
- Margin: var(--space-6) vertical

### 3. FIRM STORY (two-column, golden split 61.8/38.2)
- LEFT (61.8%): The existing office interior photo, full-height of this section
- RIGHT (38.2%): 
  - Section label: "The Practice" — standard label style
  - Heading: "Proarc" — Cormorant Garamond 300, --text-xl
  - Body text: Use the existing About paragraph text BUT reformat it into
    3 shorter paragraphs instead of one wall. Keep all existing words,
    just add paragraph breaks at natural points.
  - Jost 300, --text-base, line-height 1.75, max-width 52ch
  - "Our Projects" button — keep existing CTA

### 4. EXPERTISE SECTORS (full-width, background #f8f7f5)
- Section label: "Expertise" — centered
- 6 sector cards in a 3×2 grid:
  - Educational
  - Commercial
  - Residential
  - Mixed-Use & Retail
  - Institutional & Healthcare
  - Urban Masterplanning
- Each card:
  - Sector name: Jost 500, 13px, uppercase, tracking 0.12em
  - One-line description: Jost 300, 14px, color #666 (placeholder with
    data-placeholder="true", e.g. "Schools, universities, and learning environments")
  - Thin left border accent: 1px solid rgba(139,32,16,0.3)
  - Padding-left var(--space-3)
  - On hover: border-color rgba(139,32,16,0.8)
- Grid gap: var(--space-4)
- Section padding: var(--space-6) vertical

### 5. PROJECT TIMELINE (horizontal scroll or vertical)
- Section label: "Landmark Projects" — centered
- A horizontal timeline showing 6-8 key projects with year markers
- For each milestone:
  - Year: Cormorant Garamond 300, 28px
  - Project name: Jost 400, 13px, uppercase, tracking 0.1em
  - One-line note: Jost 300, 12px, color #888
- Pull real projects from the portfolio with their real completion years
  (Ajman Bank HQ 2015, City University 2017, etc.)
- Use real data where available; fill gaps with data-placeholder="true"
- Connected by a thin horizontal line (0.5px, color #ddd)
- Scrollable on mobile, full-width on desktop

### 6. APPROACH / PHILOSOPHY (full-width content, centered)
- Section label: "Approach"
- 3 principles in a row:
  - Each: icon-free, just a short title (Jost 500, 14px, uppercase) +
    2-line description (Jost 300, 14px, color #666)
  - Placeholder titles: "Context First" / "Material Integrity" / "Lasting Impact"
  - Placeholder descriptions (data-placeholder="true"):
    "Every project begins with a deep reading of site, climate, and community."
    "We select materials for longevity, beauty, and environmental responsibility."
    "We design for decades, not trends — buildings that age with dignity."
- Separated by thin vertical 0.5px borders between columns
- Max-width: 1000px, centered

## RESPONSIVE:
- Numbers strip: 2×2 grid on tablet, stacked on mobile
- Firm Story: stacks vertically on mobile (image on top)
- Expertise: 2-column on tablet, single column on mobile
- Timeline: horizontal scroll on all sizes
```

---

## PHASE 4 — JOURNAL / INSIGHTS SECTION
**Priority: HIGH** — This is the authority differentiator.
**Branch**: `phase-4-journal`

### Claude Code Prompt:

```
Add a new "Journal" section to the Proarc website. This is a thought leadership /
insights section that positions Proarc as an intellectual authority in UAE architecture.

## CHANGES REQUIRED:

### 1. Add "Journal" to navigation
- In ALL HTML files, add "Journal" to the nav menu between "Services" and "Contact"
- Link to journal.html
- Same nav styling as other links

### 2. Create journal.html — Journal listing page

Layout:
- Page header: "Journal" — Cormorant Garamond 300, --text-xl, centered
- Subtitle: "Perspectives on architecture, design, and the built environment"
  Jost 300, --text-base, color #888, centered
- Below: grid of article cards

Article card layout (2-column grid on desktop, single on mobile):
- Featured image area: aspect-ratio 16/9, object-fit cover, 0 border-radius
  Use placeholder: solid color block (#e8e6e1) with data-placeholder="true"
- Category tag: Jost 400, 10px, uppercase, tracking 0.16em, color #888
- Title: Cormorant Garamond 400, 24px, line-height 1.3, color #111
- Excerpt: Jost 300, 14px, color #666, line-height 1.6, max 3 lines
- Date: Jost 300, 11px, color #aaa
- Card has no background/border — just content with var(--space-5) bottom margin
- On hover: title color transitions to rgba(139,32,16,0.8)

### 3. Create 6 seed article pages

Each article uses this template:
- Hero: either a featured image (full-width, 50vh) or a solid dark background
  with the title overlaid (same style as project hero)
- Category + Date above title
- Title: Cormorant Garamond 300, --text-xl (42px)
- Article body: Jost 300, --text-base (16px), line-height 1.85, max-width 68ch,
  centered on page
- Pull quotes within article: Cormorant Garamond 300 italic, --text-lg (26px),
  color rgba(139,32,16,0.7), border-left 2px solid rgba(139,32,16,0.3),
  padding-left var(--space-4)
- "Related Articles" strip at bottom (same pattern as Related Projects)
- "Back to Journal" link above footer

### THE 6 ARTICLES (all content is placeholder — tag everything with data-placeholder="true"):

**Article 1**: journal-climate-design.html
- Category: "Design Philosophy"
- Title: "Designing for the Desert: Architecture in Ajman's Climate"
- 4-5 paragraphs about climate-responsive architecture in the UAE — how extreme
  heat, humidity, and sandstorms influence facade design, orientation, material
  choices, and ventilation strategy. Reference Proarc's experience across 40+
  projects. Placeholder but write it as realistic, authoritative prose that
  Proarc could edit and publish. Include one pull quote.

**Article 2**: journal-educational-architecture.html
- Category: "Sector Insight"
- Title: "The Architecture of Learning: How School Design Shapes Education"
- 4-5 paragraphs about educational architecture — Proarc has designed 10+
  schools (Woodlem Park, Delhi Private, Frontline, Habitat, City American,
  Crown British, North Gate, Metropolitan, City School, Ajman American).
  Discuss how spatial design affects learning outcomes, the balance between
  open and enclosed spaces, playground integration, security considerations
  in UAE school design. Include one pull quote.

**Article 3**: journal-mixed-use.html
- Category: "Urban Thinking"
- Title: "The Rise of Mixed-Use: Rethinking Urban Fabric in the Northern Emirates"
- 4-5 paragraphs about mixed-use development in Ajman, UAQ, and surrounding
  emirates. Reference City Life projects and retail-residential combinations.
  Discuss walkability, community building, economic sustainability. Include
  one pull quote.

**Article 4**: journal-material-innovation.html
- Category: "Design Philosophy"
- Title: "Material Honesty: Concrete, Glass, and the UAE Vernacular"
- 4-5 paragraphs about material selection in Gulf architecture — the tension
  between international modernism and regional identity. How Proarc uses
  glass curtain walls, perforated screens (mashrabiya-inspired), exposed
  concrete, and stone cladding. Include one pull quote.

**Article 5**: journal-landmark-buildings.html
- Category: "Project Story"
- Title: "Becoming a Landmark: The Making of Ajman Bank Headquarters"
- 4-5 paragraphs — a deeper case study narrative about the Ajman Bank HQ
  project. The inclined glass facade, the G+M+7 structure, the challenge
  of creating an urban landmark on Al-Ittihad Street. Reference the real
  project data (73,071 sq ft, completed 2015). Include one pull quote.

**Article 6**: journal-future-ajman.html
- Category: "Urban Thinking"
- Title: "Ajman 2030: Architecture's Role in the Emirate's Transformation"
- 4-5 paragraphs — forward-looking piece about Ajman's urban development,
  infrastructure growth, and how architecture firms like Proarc contribute
  to the emirate's vision. Discuss sustainability mandates, smart city
  initiatives, and the evolving skyline. Include one pull quote.

## IMPORTANT:
- Every paragraph of placeholder content must have data-placeholder="true" on
  its parent element
- Write the placeholder content as genuinely good architectural prose —
  Proarc should be able to review and lightly edit these, not rewrite from scratch
- Use the same CSS custom properties throughout
- The journal listing page should show articles in reverse chronological order
- Add dates spanning the last 6 months (one per month roughly)
- Ensure all articles link back to journal.html and have related articles at bottom
```

---

## PHASE 5 — IMMERSIVE LAYER (GSAP + Scroll Animations)
**Priority: MEDIUM** — Polish layer after content structure is in place.
**Branch**: `phase-5-immersive`

### Claude Code Prompt:

```
Add an immersive interaction layer to the Proarc website using GSAP (GreenSock)
and ScrollTrigger. Load from CDN:

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

Apply animations across ALL pages. Keep them subtle and architectural — 
no bouncy or playful motion. Everything should feel like precise mechanical movement.

## GLOBAL ANIMATIONS:

### 1. Page Load Reveal
On every page, elements enter with a staggered fade-up:
- Nav: immediate (no animation, always visible)
- Hero/first section: fade in over 0.8s, translateY from 20px
- Subsequent elements: staggered 0.15s delay each
- Ease: "power2.out" — smooth deceleration

### 2. Nav Scroll Behavior
- On scroll down past 80px: nav background transitions from transparent to 
  rgba(0,0,0,0.95), add border-bottom 0.5px solid rgba(255,255,255,0.1)
- On scroll to top: revert to transparent
- Transition: 0.3s ease
- Apply to ALL pages

### 3. Scroll-Triggered Content Reveals
For these elements on ALL pages:
- Section labels ("Overview", "Design Intent", etc.): fade-in + translateX from -20px
- Body text paragraphs: fade-in + translateY from 16px
- Images: fade-in + scale from 1.02 to 1.0 (subtle zoom-settle)
- Metadata rows (project sidebar): stagger in from right, 0.1s apart
- Numbers on About page: count-up animation from 0 to final value over 1.5s

ScrollTrigger settings for all:
- start: "top 85%"
- toggleActions: "play none none none" (play once, don't reverse)
- No scrub — triggered animations, not scroll-linked

### 4. HOME PAGE — Hero Slider Enhancement
- Current slider: add a subtle parallax to the background image
  (image moves at 0.7x scroll speed)
- Project name overlay: slides in from bottom with 0.6s delay after image
- Slide transitions: crossfade (opacity) rather than hard cut if possible

### 5. PORTFOLIO GRID — Staggered Card Entrance
- Cards enter in a wave pattern: each card fades in with translateY(24px)
- Stagger: 0.08s per card, reading order (left to right, top to bottom)
- Trigger: when the grid section enters viewport
- Card hover: scale(1.015) with box-shadow: 0 4px 20px rgba(0,0,0,0.08)
  transition 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)

### 6. PROJECT DETAIL — Hero Parallax
- Hero image: parallax scroll (moves up at 0.6x rate)
- Title overlay: slight counter-parallax (moves at 1.1x rate) — creates depth
- As user scrolls past hero, title fades out (opacity 0 by 80% scroll of hero)

### 7. PROJECT DETAIL — Image Gallery Reveal
- Images reveal on scroll with a subtle clip-path animation:
  clip-path from inset(0 0 100% 0) to inset(0 0 0% 0) — wipe from top
- Duration: 0.8s per image
- Stagger: 0.2s between images

### 8. JOURNAL ARTICLES — Reading Progress
- Thin progress bar at very top of viewport (2px height, color rgba(139,32,16,0.8))
- Width: 0% to 100% as user scrolls through article body
- position: fixed, top: 0, left: 0, z-index: 9999

### 9. SMOOTH SCROLL
- Add smooth scrolling behavior:
  html { scroll-behavior: smooth; }
- For anchor links and "Back to Projects" / "Back to Journal" links

## PERFORMANCE RULES:
- Use will-change: transform on parallax elements
- Use transform and opacity ONLY for animations (never animate width, height,
  top, left, margin, padding)
- Wrap all GSAP code in a DOMContentLoaded listener
- Use gsap.matchMedia() to disable parallax on mobile (< 768px) — too janky
  on phones
- Keep total JS under 5KB (excluding GSAP CDN)
- No animation should last longer than 1.2s
- No animation should delay more than 0.5s from its trigger point

## DO NOT:
- Add page transition animations (Barba.js) yet — that's a separate phase
- Change any existing HTML structure
- Override existing CSS — only ADD animation-related properties
- Use any library other than GSAP + ScrollTrigger
```

---

## PHASE 6 — SEO & STRUCTURED DATA
**Priority: MEDIUM** — Makes the authority content findable.
**Branch**: `phase-6-seo`

### Claude Code Prompt:

```
Add comprehensive SEO and structured data to every page of the Proarc website.

## 1. META TAGS — Add to <head> of EVERY page:

### Homepage (index.html):
<meta name="description" content="Proarc is a leading architectural practice in the UAE, 
shaping Ajman's skyline since 2006. Design, engineering, and project management across 
commercial, educational, residential, and mixed-use sectors.">
<meta property="og:title" content="Proarc — Architecture & Engineering, UAE">
<meta property="og:description" content="Leading architectural practice shaping Ajman's 
skyline since 2006. 40+ projects across the UAE.">
<meta property="og:image" content="[URL to hero image or logo]">
<meta property="og:url" content="https://pixelbrahma-design-studio.github.io/proarc-website/">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">

### About page:
<meta name="description" content="About Proarc — 20 years of architectural practice in 
Ajman, UAE. Our team of architects, engineers, and project managers has delivered 40+ 
landmark projects across 7 emirates.">

### Portfolio page:
<meta name="description" content="Proarc's portfolio of 40+ architectural projects across 
the UAE — commercial headquarters, educational institutions, residential towers, retail 
complexes, and mixed-use developments.">

### Each project detail page:
Generate a unique meta description for EACH project page using existing data:
"[Project Name] — [sector] project by Proarc in [location]. [built-up area] sq ft, 
completed [year]. [One sentence from existing description]."

### Services page:
<meta name="description" content="Proarc's architectural services — concept design, 
structural engineering, interior design, MEP engineering, project management, and urban 
planning across the UAE.">

### Contact page:
<meta name="description" content="Contact Proarc — architecture and engineering 
consultancy in Ajman, UAE. Phone: +971 6 744 6633. Email: info@proarc.ae">

### Each journal article:
Generate unique meta descriptions from the article content.

## 2. STRUCTURED DATA (JSON-LD) — Add before closing </head>:

### Homepage — Organization schema:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ArchitectureFirm",
  "name": "Proarc",
  "url": "https://proarc.ae",
  "logo": "[logo URL]",
  "description": "Leading architectural practice in the UAE since 2006",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "13003",
    "addressLocality": "Ajman",
    "addressCountry": "AE"
  },
  "telephone": "+97167446633",
  "email": "info@proarc.ae",
  "foundingDate": "2006",
  "areaServed": "United Arab Emirates"
}
</script>

### Each project detail page — CreativeWork schema:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "[Project Name]",
  "description": "[First paragraph of description]",
  "creator": {
    "@type": "Organization",
    "name": "Proarc"
  },
  "locationCreated": {
    "@type": "Place",
    "name": "[Location]",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "[City]",
      "addressCountry": "AE"
    }
  },
  "dateCreated": "[Completion year]",
  "image": "[Hero image URL]"
}
</script>

### Each journal article — Article schema:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Article title]",
  "description": "[Article excerpt]",
  "author": {
    "@type": "Organization",
    "name": "Proarc"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Proarc"
  },
  "datePublished": "[Article date]",
  "image": "[Featured image URL]"
}
</script>

## 3. TECHNICAL SEO:

### Canonical URLs — add to every page:
<link rel="canonical" href="[full page URL]">

### Sitemap — create sitemap.xml in root:
List every page with lastmod dates. Group by:
- Main pages (index, about, portfolio, services, contact, journal)
- Project detail pages (all ~40)
- Journal articles (all 6)

### robots.txt — create in root:
User-agent: *
Allow: /
Sitemap: https://pixelbrahma-design-studio.github.io/proarc-website/sitemap.xml

### Page titles — update <title> on every page to follow pattern:
"[Page/Project Name] — Proarc | Architecture & Engineering, UAE"

### Image alt text:
Add descriptive alt text to EVERY image across the site. For project images:
alt="[Project Name] — [brief description of what's visible: exterior view / 
interior / aerial / facade detail]"

## 4. PERFORMANCE:
- Add loading="lazy" to all images below the fold
- Add width and height attributes to all <img> tags to prevent layout shift
- Add <link rel="preconnect" href="https://fonts.googleapis.com"> and
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  before the Google Fonts import

After implementing, generate a checklist confirming:
- [ ] Every page has unique <title> and meta description
- [ ] Every page has OG tags
- [ ] Every project page has CreativeWork JSON-LD
- [ ] Every journal page has Article JSON-LD
- [ ] Homepage has Organization JSON-LD
- [ ] sitemap.xml exists and lists all pages
- [ ] robots.txt exists
- [ ] All images have alt text
- [ ] All images have loading="lazy" (except hero/above-fold)
- [ ] Canonical URLs on every page
```

---

## PHASE 7 — PAGE TRANSITIONS (Optional Polish)
**Priority: LOW** — Only after all content phases are solid.
**Branch**: `phase-7-transitions`

This phase adds Barba.js for smooth page-to-page transitions.
Only implement after Phases 2-6 are merged and stable.
Scope: crossfade transitions between pages, persistent nav during transition.
Keep it minimal — architecture sites should feel like turning pages in a monograph,
not like a motion graphics reel.

---

## EXECUTION ORDER SUMMARY

| Phase | What | Branch | Depends On |
|-------|------|--------|------------|
| 1 | Aesthetic Refresh | ✅ DONE (main) | — |
| 2 | Case Study Template | phase-2-case-study-template | Phase 1 |
| 3 | About Page Rebuild | phase-3-about-rebuild | Phase 1 |
| 4 | Journal Section | phase-4-journal | Phase 1 |
| 5 | Immersive Layer | phase-5-immersive | Phases 2+3+4 merged |
| 6 | SEO & Schema | phase-6-seo | Phases 2+3+4 merged |
| 7 | Page Transitions | phase-7-transitions | Phase 5 merged |

Phases 2, 3, and 4 can run in PARALLEL — they touch different pages.
Phase 5 needs all content pages finalized first (it adds animations to elements
that must exist). Phase 6 needs final page titles and descriptions.

---

## PLACEHOLDER STRATEGY

Every placeholder uses `data-placeholder="true"` on its HTML element.
This means Proarc can later:
1. Search the codebase: `grep -r 'data-placeholder="true"' *.html`
2. See exactly what needs real content
3. Replace incrementally without breaking layout

The journal articles are written as realistic architectural prose — Proarc should
be able to review, fact-check, add project-specific details, and publish with
moderate editing rather than rewriting from scratch.

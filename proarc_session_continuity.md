# Proarc Website Project — Session Continuity Brief

## WHO
- **Client**: Proarc — UAE architecture firm based in Ajman, founded 2006
- **Builder**: PixleBrahma (Mahesh's agency) — building this for Proarc
- **Repo**: pixelbrahma-design-studio/proarc-website (GitHub Pages)
- **Live current**: https://pixelbrahma-design-studio.github.io/proarc-website/
- **Live v2A**: https://pixelbrahma-design-studio.github.io/proarc-website/v2A/

## PROJECT GOALS
1. **Primary**: Authority Platform — thought leadership, deep case studies, journal section
2. **Secondary**: Immersive Portfolio — GSAP scroll animations, parallax, page polish

## WHAT'S BEEN DONE

### Phase 1 — Aesthetic Refresh ✅ COMPLETE (deployed to root)
- Font pairing: **Cormorant Garamond** (display/headers, weight 300) + **Jost** (UI/body, weights 300/400/500)
- Golden Ratio type scale: 10 → 13 → 16 → 19 → 26 → 42 → 68px
- Golden Ratio spacing: 8 → 13 → 21 → 34 → 55 → 89 → 144px (--space-1 through --space-7)
- Golden Ratio layout splits: 61.8% / 38.2% on About page and project detail sidebars
- Color palette preserved: black (#000), white (#fff), copper accent (#8B2010)
- No border-radius anywhere (architecture = rectilinear)
- Project detail pages got structured metadata sidebar (location, area, dates)
- Services page got alternating image-text layout

### Phase 2 — v2A Authority Build (STATUS: CHECK LIVE SITE)
The v2A build was prompted to Claude Code with two spec files:
- `proarc_authority_roadmap.md` — detailed design specs (the source of truth)
- `proarc_v2A_full_prompt.md` — execution plan (subdirectory structure, build order)

**What v2A should contain when complete:**

**A. Case Study Template** (applied to all 40+ project detail pages):
- 75vh hero with title overlay + project type tag
- Two-column overview: 61.8% description / 38.2% metadata sidebar
- 9 metadata fields (client, location, sector, area, start, completion, structure, stories, status)
- "Design Intent" full-width section with placeholder prose
- Image gallery (2-col then 3-col grid, 4px gap)
- Related Projects strip (3 cards)
- Back navigation to portfolio

**B. About Page Rebuild** (6 sections):
- Founder statement hero (dark bg, Cormorant italic quote)
- Numbers strip (20 years, 40+ projects, 2M+ sq ft, 7 emirates)
- Firm Story (golden split, office photo + text in 3 paragraphs)
- Expertise Sectors (3×2 grid: Educational, Commercial, Residential, Mixed-Use, Institutional, Urban)
- Project Timeline (horizontal, 6-8 landmarks with real years)
- Approach (3 principles: Context First / Material Integrity / Lasting Impact)

**C. Journal Section** (6 seed articles):
- journal.html listing page (2-column card grid)
- journal-climate-design.html — "Designing for the Desert"
- journal-educational-architecture.html — "The Architecture of Learning"
- journal-mixed-use.html — "The Rise of Mixed-Use"
- journal-material-innovation.html — "Material Honesty"
- journal-landmark-buildings.html — "Becoming a Landmark: Ajman Bank HQ"
- journal-future-ajman.html — "Ajman 2030"
- All content is placeholder tagged with data-placeholder="true"

**D. GSAP Immersive Layer:**
- GSAP 3.12.5 + ScrollTrigger from CDN
- Page load staggered fade-up
- Nav transparent → solid on scroll
- Scroll-triggered reveals (labels, paragraphs, images, metadata)
- Home hero parallax (0.7x)
- Portfolio grid wave stagger
- Project detail hero parallax + gallery clip-path wipe
- About page number count-up
- Journal reading progress bar
- Smooth scroll CSS
- Disabled parallax on mobile via gsap.matchMedia()

**E. SEO & Structured Data:**
- Unique <title> and meta description per page
- OG tags and Twitter cards on all pages
- JSON-LD: ArchitectureFirm (homepage), CreativeWork (projects), Article (journal)
- Canonical URLs, sitemap.xml, robots.txt
- Image alt text, loading="lazy", width/height attributes
- Google Fonts preconnect hints

**F. Contact Page Fix:**
- Broken Google Maps → OpenStreetMap embed (no API key)

## NAVIGATION STRUCTURE (v2A)
Home → About → Projects → Services → Journal → Contact → ← Current Site

## DESIGN SYSTEM REFERENCE

### Fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
```
- Display/Hero: Cormorant Garamond 300
- All UI: Jost 300/400/500

### Type Scale (Golden Ratio, base 16px)
--text-xs: 10px | --text-sm: 13px | --text-base: 16px | --text-md: 19px
--text-lg: 26px | --text-xl: 42px | --text-2xl: 68px

### Spacing Scale (Golden Ratio, base 8px)
--space-1: 8px | --space-2: 13px | --space-3: 21px | --space-4: 34px
--space-5: 55px | --space-6: 89px | --space-7: 144px

### Colors
- Background: #000 (nav/footer), #fff (content), #f8f7f5 (section bg)
- Text: #111 (headings), #333 (body dark), #444 (body), #666 (secondary), #888 (labels/meta), #aaa (dates)
- Accent: #8B2010 (copper — logo, hover states, borders, pull quotes)
- Accent as rgba: rgba(139, 32, 16, 0.3) borders, rgba(139, 32, 16, 0.7) text, rgba(139, 32, 16, 0.8) hover

### Layout Constants
- Content max-width: 1240px
- Reading width: 62ch (body), 52ch (sidebar), 68ch (journal articles), 72ch (design intent)
- Golden split: 61.8% / 38.2%
- Image gap: 4px
- Border-radius: 0 everywhere (rectilinear)
- Borders: 0.5px solid (standard), 1px solid (accent left borders), 2px solid (pull quote borders)

### Typography Patterns
- Nav links: Jost 300, 13px, tracking 0.18em, uppercase
- Section labels: Jost 400, 10-11px, tracking 0.16em, uppercase, #888
- Headings: Cormorant 300, tracking 0.06em
- Body: Jost 300, 16px, line-height 1.75
- Project names (grid): Jost 500, 12-14px, tracking 0.12em, uppercase
- Locations: Jost 300, 11-12px, #888, tracking 0.08em
- Footer: Jost 300, 11px, tracking 0.14em, uppercase
- Buttons: Jost 400, 11px, tracking 0.2em, uppercase

## PLACEHOLDER STRATEGY
- Every placeholder element has `data-placeholder="true"` attribute
- Find all: `grep -r 'data-placeholder="true"' v2A/*.html | wc -l`
- Journal articles written as realistic architectural prose — Proarc can edit, not rewrite
- Metadata fields use "—" as placeholder value

## SITE STRUCTURE (all pages)
Root (current site — Phase 1 only):
├── index.html (home + hero slider)
├── about.html
├── portfolio.html (project grid with category filters: All/Commercial/Educational/Malls/Residential)
├── services.html (3 services: Architecture Design, Project Management, Skyscraper Design)
├── contact.html
├── [40+ project detail pages: ajmanbank.html, rholding.html, woodlem.html, etc.]
├── [newer project pages: edu-cityuniversity.html, edu-woodlemparkaljurf.html, etc.]
└── images/

v2A/ (authority platform build):
├── index.html
├── about.html (rebuilt with 6 sections)
├── portfolio.html
├── services.html
├── journal.html (NEW — article listing)
├── contact.html (map fixed)
├── journal-climate-design.html (NEW)
├── journal-educational-architecture.html (NEW)
├── journal-mixed-use.html (NEW)
├── journal-material-innovation.html (NEW)
├── journal-landmark-buildings.html (NEW)
├── journal-future-ajman.html (NEW)
├── [40+ project detail pages with case study template]
├── sitemap.xml (NEW)
└── images/

## KNOWN ISSUES TO CHECK
- Contact page Google Maps was broken — should be replaced with OpenStreetMap in v2A
- Some project pages have minimal content (1 sentence + 2 photos) — placeholders fill the gaps
- Original project pages use two image path patterns: `images/folio/thumbs/` (grid thumbnails)
  and `images/folio/projects/` (detail page images)
- Newer project pages (edu-*.html, marksave*.html, etc.) use .webp format
- Older project pages use .jpg
- The portfolio.html has subcategories that may need updating (Under Construction,
  Villas & Townhouses, Apartment Building, High Rise Residential Towers appear as
  sub-filters under some categories)

## WHAT COMES NEXT (not yet built)

### Phase 7 — Page Transitions (Barba.js)
- Crossfade between pages, persistent nav during transition
- Keep minimal — like turning pages in a monograph
- Only after v2A is stable

### Content Handoff to Proarc
- Generate placeholder report from data-placeholder grep
- Provide Proarc a spreadsheet listing every placeholder by page and field
- Priority content: project descriptions, design intent, client names, structural data
- Journal articles need fact-checking and firm-specific details added

### Production Migration
- When v2A is approved: copy v2A contents to root, remove comparison nav links
- Update sitemap.xml URLs to root paths
- Update canonical URLs
- Consider moving to proarc.ae domain (currently on GitHub Pages subdomain)

### Future Enhancements
- CMS integration (if Proarc wants to publish journal articles themselves)
- Arabic language support (bilingual site for UAE market)
- Project location map (interactive map showing all projects across emirates)
- Team/People page (if Proarc wants to showcase architects)
- Awards/Recognition section
- Client testimonials
- Video integration (project walkthroughs, drone footage)

## HOW TO CONTINUE

Paste this document at the start of a new session, then:

"I'm continuing work on the Proarc website project. [Context brief above].
The v2A build should be live at the URL above. Please check the current state
of the site, identify what's been completed vs what's still missing from the
spec, and let's pick up from there."

Or if starting a specific task:

"I'm continuing the Proarc project. [Context brief above].
I need to [specific task — e.g. generate the content handoff spreadsheet /
add Barba.js transitions / fix a specific issue on the v2A site]."

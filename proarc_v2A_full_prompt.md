# Claude Code Prompt — Proarc v2A Authority Platform Build

## CRITICAL SETUP INSTRUCTION — READ FIRST

This entire build goes into a `/v2A/` subdirectory within the existing repo.
The current site at the repo root stays UNTOUCHED — nothing in the root changes
except adding one menu link.

Final URLs:
- Current site: https://pixelbrahma-design-studio.github.io/proarc-website/
- New version:  https://pixelbrahma-design-studio.github.io/proarc-website/v2A/

Both must work simultaneously for side-by-side comparison.

---

## STEP 1 — SCAFFOLD v2A

1. Create a `v2A/` directory in the repo root
2. Copy ALL files from the root into `v2A/` — every .html, the CSS, JS, and the
   `images/` folder. This is your working copy. Every change from here on happens
   ONLY inside `v2A/`.
3. Fix ALL internal links inside `v2A/` — every `href`, every `src`, every URL must
   resolve correctly from the `/proarc-website/v2A/` base path:
   - Nav links: `href="about.html"` stays relative (same folder) — this is fine
   - Image paths: `src="images/..."` stays relative — fine
   - Logo link: should point to `index.html` (the v2A homepage, not the root)
   - If any path uses absolute `/proarc-website/images/...` patterns, update to
     relative `images/...` or `../images/...` as needed
   - Add `<base href="/proarc-website/v2A/">` to every page's <head> if relative
     paths get complicated — but only if needed
4. Test: every page inside v2A/ should link to other v2A/ pages, NOT to root pages.
   The v2A version is a self-contained parallel site.

## STEP 2 — ADD v2A LINK TO THE CURRENT SITE MENU

In the ROOT site (NOT v2A), edit EVERY .html file's navigation menu.
Add a new link after "Contact":

```html
<li><a href="v2A/index.html">v2A Preview</a></li>
```

Style it distinctly from other nav links — add a small visual indicator that this
is a preview/beta link:
- Same font (Jost 300, uppercase, tracking) but with a subtle accent:
  `color: rgba(139, 32, 16, 0.7)` instead of the standard white/gray
- Or append a small "→" arrow after the text
- It should be visible but clearly secondary to the main nav items

Do NOT modify anything else in the root site files.

## STEP 3 — ADD "BACK TO CURRENT SITE" LINK IN v2A

In every v2A page's nav, add a link that goes back to the root version:

```html
<li><a href="/proarc-website/index.html">← Current Site</a></li>
```

Same accent styling as above — makes it easy to toggle between versions for comparison.

---

## STEP 4 — APPLY ALL AUTHORITY PLATFORM CHANGES INSIDE v2A

Now apply the following changes to the v2A files only. The existing aesthetic system
(Cormorant Garamond + Jost, golden ratio spacing --space-1 through --space-7, type
scale --text-xs through --text-2xl) is already in place from Phase 1. Build on top of it.

---

### 4A — PROJECT DETAIL CASE STUDY TEMPLATE

Transform every project detail page inside v2A/ into a full case study layout.

**PAGE STRUCTURE (top to bottom):**

**1. HERO SECTION** (full-width)
- Full-bleed hero image, 75vh height, from the project's first existing image
- Project title: Cormorant Garamond 300, --text-2xl (68px), white, bottom-left,
  padding var(--space-6)
- Project type tag below title: "Educational · Ajman · 2017" — Jost 300, --text-sm,
  letter-spacing 0.14em, uppercase, rgba(255,255,255,0.7)
- Dark gradient overlay from bottom for legibility

**2. PROJECT OVERVIEW** (two-column, 61.8% / 38.2% golden split)
- LEFT (61.8%):
  - Label: "Overview" — Jost 400, --text-xs, uppercase, tracking 0.16em, color #888
  - Description: Cormorant Garamond 300, --text-md (19px), line-height 1.8
  - Use existing description. If too short, keep as-is and add placeholder paragraph:
    "This project represents Proarc's commitment to [sector] architecture in the
    [location] region. The design responds to the unique climatic and cultural context
    of the UAE, balancing functionality with an ambitious formal expression."
    Tag with data-placeholder="true"

- RIGHT (38.2%) — Metadata sidebar:
  - Label: "Project Data"
  - Each row: label (Jost 400, 10px, uppercase, tracking 0.16em, #888) / value
    (Jost 300, 14px, #111), separated by 0.5px border-bottom
  - Fields: CLIENT, LOCATION, SECTOR, TOTAL BUILT-UP AREA, START DATE, COMPLETION,
    STRUCTURAL TYPE, STORIES, STATUS
  - Use existing data where available, placeholder "—" with data-placeholder="true" where not

**3. DESIGN INTENT** (full-width centered)
- Label: "Design Intent"
- Two paragraphs, Jost 300, --text-base, line-height 1.75, max-width 72ch, centered
- Placeholder text (data-placeholder="true"):
  "The architectural concept emerged from a careful reading of the site's orientation,
  prevailing wind patterns, and the client's vision for a landmark that would serve
  the community for decades. The massing strategy creates a dialogue between solid
  and void, allowing natural light to penetrate deep into the floor plates while
  maintaining thermal comfort in the UAE's demanding climate."
  
  "Material selections were chosen for their durability, low maintenance, and aesthetic
  contribution to the neighbourhood's evolving urban fabric."

**4. IMAGE GALLERY**
- Use existing project images
- 2-column grid for first 2, then 3-column for remaining
- Gap: 4px, no border-radius
- Empty caption element under each image (data-placeholder="true")

**5. RELATED PROJECTS** strip
- Label: "Related Projects"
- 3 cards from same sector or random — thumbnail (4/3), name, location
- Link to v2A versions of those project pages

**6. BACK NAVIGATION**
- "← Back to Projects" above footer, links to v2A/portfolio.html

Apply this template to EVERY project detail page in v2A/.

---

### 4B — ABOUT PAGE REBUILD

Replace main content of v2A/about.html:

**1. HERO STATEMENT** (dark bg #111, 50vh, centered)
- Cormorant Garamond 300 italic, --text-xl (42px), white, max-width 48ch
- Placeholder: "We believe architecture is the most visible expression of a society's
  ambitions. Every line we draw carries that responsibility."
  data-placeholder="true"
- Attribution: "— Founding Principal" (data-placeholder="true")

**2. NUMBERS STRIP** (white bg, 4 metrics in a row)
- Each: number in Cormorant 300 56px + label in Jost 300 11px uppercase
- "20" / "Years of Practice" — real
- "40+" / "Projects Delivered" — real
- "2M+" / "Sq Ft Built" — data-placeholder="true"
- "7" / "Emirates Served" — data-placeholder="true"
- 0.5px top border on each, padding-top var(--space-3)

**3. FIRM STORY** (golden split 61.8/38.2)
- LEFT: existing office photo
- RIGHT: "The Practice" label, "Proarc" heading, existing paragraph text broken
  into 3 shorter paragraphs, "Our Projects" CTA linking to v2A/portfolio.html

**4. EXPERTISE SECTORS** (bg #f8f7f5, 3×2 grid)
- Educational, Commercial, Residential, Mixed-Use & Retail, Institutional &
  Healthcare, Urban Masterplanning
- Each: name (Jost 500 13px uppercase) + one-line description (data-placeholder="true")
- Left border accent: 1px solid rgba(139,32,16,0.3), hover to 0.8

**5. PROJECT TIMELINE** (horizontal, 6-8 key projects)
- Year (Cormorant 300, 28px) + project name (Jost 400, 13px uppercase) + note
- Connected by 0.5px horizontal line
- Use real completion years from portfolio data

**6. APPROACH** (3 principles in a row)
- "Context First" / "Material Integrity" / "Lasting Impact"
- Each: title (Jost 500 14px uppercase) + 2-line description (data-placeholder="true")
- Separated by 0.5px vertical borders

---

### 4C — JOURNAL SECTION

**1. Add "Journal" to v2A nav** (between Services and Contact) on ALL v2A pages.

**2. Create v2A/journal.html** — listing page:
- Header: "Journal" — Cormorant 300, --text-xl, centered
- Subtitle: "Perspectives on architecture, design, and the built environment"
- 2-column article card grid:
  - Featured image area (16/9, placeholder solid #e8e6e1 block)
  - Category tag, title (Cormorant 400, 24px), excerpt, date
  - Hover: title color → rgba(139,32,16,0.8)

**3. Create 6 article pages** inside v2A/:

All content is placeholder (data-placeholder="true") but written as realistic,
publishable architectural prose that Proarc can edit lightly:

**v2A/journal-climate-design.html**
- Category: "Design Philosophy"
- Title: "Designing for the Desert: Architecture in Ajman's Climate"
- 4-5 paragraphs on climate-responsive architecture in the UAE — extreme heat,
  humidity, facade design, orientation, material choices, ventilation.
  Reference Proarc's 40+ projects. Include one pull quote.

**v2A/journal-educational-architecture.html**
- Category: "Sector Insight"
- Title: "The Architecture of Learning: How School Design Shapes Education"
- 4-5 paragraphs — Proarc has 10+ schools. Discuss spatial design and learning
  outcomes, open vs enclosed, playground integration, UAE school security.

**v2A/journal-mixed-use.html**
- Category: "Urban Thinking"
- Title: "The Rise of Mixed-Use: Rethinking Urban Fabric in the Northern Emirates"
- 4-5 paragraphs — mixed-use in Ajman/UAQ. Reference City Life projects.
  Walkability, community, economic sustainability.

**v2A/journal-material-innovation.html**
- Category: "Design Philosophy"
- Title: "Material Honesty: Concrete, Glass, and the UAE Vernacular"
- 4-5 paragraphs — material selection in Gulf architecture, mashrabiya-inspired
  screens, glass curtain walls, exposed concrete, stone cladding.

**v2A/journal-landmark-buildings.html**
- Category: "Project Story"
- Title: "Becoming a Landmark: The Making of Ajman Bank Headquarters"
- 4-5 paragraphs — deeper case study of Ajman Bank HQ. Inclined glass facade,
  G+M+7 structure, 73,071 sq ft, completed 2015, urban landmark on Al-Ittihad Street.

**v2A/journal-future-ajman.html**
- Category: "Urban Thinking"
- Title: "Ajman 2030: Architecture's Role in the Emirate's Transformation"
- 4-5 paragraphs — Ajman's urban development, sustainability mandates, smart city.

Article template:
- Hero: dark background with title overlay (same as project hero pattern)
- Category + date above title
- Body: Jost 300, --text-base, line-height 1.85, max-width 68ch, centered
- Pull quotes: Cormorant 300 italic, --text-lg, rgba(139,32,16,0.7),
  border-left 2px solid rgba(139,32,16,0.3)
- "Related Articles" at bottom, "← Back to Journal" above footer
- Dates spanning last 6 months, reverse chronological on listing page

---

### 4D — GSAP IMMERSIVE LAYER

Add GSAP + ScrollTrigger to ALL v2A pages:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**Global animations (all v2A pages):**
- Page load: staggered fade-up (0.8s, translateY 20px, power2.out, 0.15s stagger)
- Nav: transparent → rgba(0,0,0,0.95) on scroll past 80px, with 0.5px border-bottom
- Scroll reveals: section labels fade + translateX(-20px), paragraphs fade + translateY(16px),
  images fade + scale(1.02→1.0), metadata rows stagger from right
- ScrollTrigger: start "top 85%", play once

**Home hero:** subtle parallax (0.7x scroll rate), project name slides in with 0.6s delay
**Portfolio grid:** wave stagger entrance (0.08s per card, translateY 24px)
**Project detail:** hero parallax (0.6x), title counter-parallax (1.1x) + fade on scroll,
  gallery images clip-path wipe reveal (inset 0 0 100% 0 → 0 0 0% 0, 0.8s)
**About page:** number count-up animation (0 → final value, 1.5s)
**Journal articles:** 2px reading progress bar at top (fixed, rgba(139,32,16,0.8))

**Performance:**
- will-change: transform on parallax elements
- Only animate transform and opacity
- gsap.matchMedia() — disable parallax on mobile (<768px)
- Total custom JS under 5KB (excluding GSAP CDN)
- No animation > 1.2s, no delay > 0.5s

---

### 4E — SEO & STRUCTURED DATA

Apply to ALL v2A pages:

**Meta tags:** unique <title> and <meta name="description"> per page following pattern:
"[Page Name] — Proarc | Architecture & Engineering, UAE"
OG tags (og:title, og:description, og:image, og:url) on every page.
Twitter card tags on every page.

**JSON-LD structured data:**
- Homepage: ArchitectureFirm schema (name, address 13003 Ajman, phone +97167446633,
  email info@proarc.ae, foundingDate 2006)
- Each project page: CreativeWork schema (name, description, location, dateCreated, image)
- Each journal page: Article schema (headline, description, author, datePublished)

**Technical:**
- Canonical URLs on every page (pointing to v2A versions)
- Create v2A/sitemap.xml listing all v2A pages
- Alt text on every image: "[Project Name] — [exterior/interior/aerial/detail]"
- loading="lazy" on all below-fold images
- width/height attributes on all <img> to prevent layout shift
- Preconnect hints for Google Fonts

---

### 4F — FIX CONTACT PAGE

The Google Maps embed is broken. Replace with:
- An OpenStreetMap embed (no API key needed) centered on Ajman, UAE (25.4052, 55.5136)
- Or a static styled map placeholder with the address text overlaid
- Keep the contact details (address, phone, fax, email) exactly as they are
- Fix the layout so map and contact info sit side by side properly

---

## FINAL VERIFICATION CHECKLIST

After completing all steps, verify:

- [ ] Root site is COMPLETELY untouched except for the "v2A Preview" nav link
- [ ] All v2A/ pages link to other v2A/ pages (no links back to root except the
      "← Current Site" nav link)
- [ ] All images load correctly in v2A/ (paths resolve)
- [ ] Logo in v2A/ links to v2A/index.html, not root index.html
- [ ] Every project detail page has the case study template applied
- [ ] About page has all 6 sections (hero statement, numbers, firm story,
      expertise, timeline, approach)
- [ ] Journal listing page shows all 6 articles
- [ ] All 6 journal article pages exist and render correctly
- [ ] "Journal" appears in nav on all v2A pages
- [ ] GSAP animations work on all pages (test scroll triggers)
- [ ] Nav background transitions on scroll across all pages
- [ ] All placeholder content tagged with data-placeholder="true"
- [ ] Every page has unique <title> and meta description
- [ ] JSON-LD structured data on homepage, projects, and journal articles
- [ ] Contact page map is working (not broken)
- [ ] Site is responsive — test 375px, 768px, 1440px widths
- [ ] No console errors on any page

Run: grep -r 'data-placeholder="true"' v2A/*.html | wc -l
Report the total count of placeholder items that Proarc needs to fill.

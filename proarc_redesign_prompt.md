# Claude Frontend Design Prompt — Proarc Website Aesthetic Upgrade

## CONTEXT

You are refining the existing Proarc architecture firm website (proarc.ae). 
The goal is a **contemporary aesthetic lift** — NOT a layout overhaul.
Preserve all existing structure, navigation, sections, and content as-is.
Apply typography, spacing, border, and image treatment refinements only.

Before making any changes, **create a Git branch called `design-backup-original`** 
and commit the current state of all HTML/CSS/JS files to it. Then make all 
changes on a new branch called `design-refresh-golden`.

---

## PHASE OBJECTIVE

Make the site feel **refined, contemporary, and intentional** — like a 2024-era 
Gulf architecture firm that has won international awards. The current site is 
solid in structure but typographically generic and spatially undisciplined.

Do NOT redesign. Do NOT reorder sections. Do NOT add new sections.
Only change: fonts, type scale, spacing rhythm, image borders/margins.

---

## DESIGN SYSTEM TO IMPLEMENT

### 1. COLOUR PALETTE (Keep existing — do not change)
- Background: `#000000` (pure black nav/footer), `#ffffff` (content areas)
- Text: `#111111` (headings), `#444444` (body), `#ffffff` (reversed on black)
- Accent: Existing deep red/copper `#8B2010` (from the diamond logo marks)
- Do not introduce new colours. The site's restraint is a strength.

---

### 2. TYPOGRAPHY — Consolidate and Elevate

**CRITICAL**: The current site uses inconsistent font weights and sizes. 
Consolidate to a single, disciplined system using the **Golden Ratio type scale**.

**Font Pairing — import from Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Jost:wght@300;400;500&display=swap');
```

- **Display / Hero text**: `Cormorant Garamond`, weight 300 — for the site name, 
  hero overlays, project names on hover. Elegant, architectural, editorial.
- **All UI text**: `Jost`, weight 300/400/500 — nav links, body copy, captions, 
  labels, footer. Clean, geometric, contemporary.

**Golden Ratio Type Scale** (base 16px, ratio 1.618):
```
--text-xs:    10px   /* captions, copyright */
--text-sm:    13px   /* nav links, labels, metadata */
--text-base:  16px   /* body paragraphs */
--text-md:    19px   /* subheadings, callouts */  /* 16 × 1.2 */
--text-lg:    26px   /* section sub-headers */    /* 16 × 1.618 */
--text-xl:    42px   /* section headers (PROARC, etc) */  /* 26 × 1.618 */
--text-2xl:   68px   /* hero / display text */    /* 42 × 1.618 */
```

**Letter-spacing rules:**
```css
/* ALL CAPS labels (nav, categories): */
letter-spacing: 0.18em;
text-transform: uppercase;
font-weight: 300;

/* Section headings: */
letter-spacing: 0.06em;

/* Body: */
letter-spacing: 0.01em;
line-height: 1.75;
```

**Specific elements:**
- `nav a` → Jost 300, 13px, letter-spacing 0.18em, uppercase
- `.site-title / logo area` → no change to logo SVG, but if text exists: Cormorant 300
- `h1, h2` (PROARC About heading) → Cormorant Garamond 300, 42px, tracking 0.06em
- `h3, h4` (project names, sub-labels) → Jost 400, 19px, tracking 0.04em
- `p` (body copy) → Jost 300, 16px, line-height 1.75, max-width: 62ch
- `.project-title` (under grid cards) → Jost 500, 14px, uppercase, tracking 0.12em
- `.project-location` → Jost 300, 12px, color #888888, tracking 0.08em
- Footer text → Jost 300, 11px, tracking 0.14em, uppercase

---

### 3. SPACING — Golden Ratio Spatial System

Define a spacing scale using the Golden Ratio (base unit 8px):
```css
--space-1:   8px
--space-2:  13px    /* 8 × 1.618 */
--space-3:  21px    /* 13 × 1.618 */
--space-4:  34px    /* 21 × 1.618 */
--space-5:  55px    /* 34 × 1.618 */
--space-6:  89px    /* 55 × 1.618 */
--space-7: 144px    /* 89 × 1.618 */
```

**Apply as:**
- Section vertical padding: `var(--space-6)` top and bottom (89px)
- Content container max-width: `1240px`, margin: `0 auto`
- Content container horizontal padding: `var(--space-5)` (55px) desktop, 
  `var(--space-4)` (34px) tablet, `var(--space-3)` (21px) mobile
- Nav height: `64px`, nav horizontal padding: `var(--space-5)`
- Footer padding: `var(--space-5)` vertical
- Paragraph max-width: `62ch` (optimal reading width, derived from golden mean)
- About section: left image block and right text block → split at `61.8% / 38.2%`
  (pure golden ratio split). Image = 61.8% width, text = 38.2% with `var(--space-5)` padding.

---

### 4. IMAGE BORDERS & MARGINS — Architectural Precision

The current project grid images have no spatial discipline. Apply:

**Project Grid Cards:**
```css
.project-card {
  position: relative;
  overflow: hidden;
  /* NO border-radius — architecture is rectilinear */
  border-radius: 0;
  /* Thin accent border on one side only — not a box */
  border-left: 1px solid rgba(139, 32, 16, 0.0); /* invisible at rest */
  transition: border-color 0.4s ease;
}

.project-card:hover {
  border-left-color: rgba(139, 32, 16, 0.8); /* copper accent on hover */
}

.project-card img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;   /* enforce consistent card proportions */
  object-fit: cover;
  filter: saturate(0.9) contrast(1.05); /* slight desaturation for editorial feel */
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              filter 0.4s ease;
}

.project-card:hover img {
  transform: scale(1.04);
  filter: saturate(1.0) contrast(1.02);
}
```

**Hero / Slider Images:**
```css
.hero-slide img,
.hero-slide .slide-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center 40%;
  filter: brightness(0.88) contrast(1.08);
}
/* No border-radius on hero — full bleed only */
```

**About Section — Left Image:**
```css
.about-image {
  width: 61.8%;           /* Golden ratio split */
  position: relative;
}

.about-image::after {
  /* Thin inset frame — subtle architectural detail */
  content: '';
  position: absolute;
  inset: var(--space-3);   /* 21px inset */
  border: 0.5px solid rgba(255, 255, 255, 0.15);
  pointer-events: none;
}

.about-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85);
}
```

**Project Detail Page — Large Image:**
```css
.project-detail-image {
  width: 100%;
  max-height: 85vh;
  object-fit: cover;
  /* Thin top border in accent colour — like an architectural section line */
  border-top: 2px solid rgba(139, 32, 16, 0.6);
}
```

**Nav / Logo area:**
- Keep logo exactly as-is
- Add `border-bottom: 0.5px solid rgba(255,255,255,0.12)` to nav on scroll 
  (add class `scrolled` via JS)

---

### 5. CATEGORY FILTER TABS (Projects page)

Current: plain text tabs with underline. Refine to:
```css
.filter-tabs {
  display: flex;
  gap: var(--space-3);          /* 21px */
  border-bottom: 0.5px solid #cccccc;
  padding-bottom: 0;
  margin-bottom: var(--space-5);  /* 55px */
}

.filter-tab {
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #888888;
  padding-bottom: var(--space-2);   /* 13px */
  border-bottom: 1.5px solid transparent;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;
}

.filter-tab.active,
.filter-tab:hover {
  color: #111111;
  border-bottom-color: #111111;
}
```

---

### 6. BUTTON STYLE

Current "OUR PROJECTS" CTA button — refine to:
```css
.btn-primary {
  display: inline-block;
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #ffffff;
  background: #111111;
  padding: 16px 34px;   /* var(--space-3) × 1.618 horizontal */
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 0.3s ease;
}

.btn-primary::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 1.5px;
  background: rgba(139, 32, 16, 0.8);
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-primary:hover::after {
  width: 100%;
}
```

---

### 7. PROJECT DETAIL — Left Panel Typography

```css
.project-detail-sidebar {
  width: 38.2%;   /* Golden ratio — narrow panel */
  padding: var(--space-6) var(--space-5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.project-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 38px;
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: 0.02em;
  color: #111111;
  margin-bottom: var(--space-3);
}

.project-title + hr {
  width: 34px;           /* var(--space-4) */
  height: 1px;
  background: #111111;
  border: none;
  margin: var(--space-3) 0 var(--space-4);
}

.project-description {
  font-family: 'Jost', sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.8;
  color: #444444;
  max-width: 52ch;
}

.project-info-label {
  font-family: 'Jost', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #888888;
}

.project-info-value {
  font-family: 'Jost', sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: #111111;
  margin-top: 2px;
}
```

---

### 8. FOOTER

```css
footer {
  background: #000000;
  padding: var(--space-5) 0;
  border-top: 0.5px solid rgba(255,255,255,0.1);
}

footer p, footer a {
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}

footer a:hover {
  color: rgba(255,255,255,0.9);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 var(--space-5);
}
```

---

### 9. NAV SLIDE-OUT MENU

Current: left drawer with nav links. Refine:
```css
.nav-menu {
  width: 220px;   /* 1240 × 0.177 ≈ golden proportion of the page */
  background: #000000;
  border-right: 0.5px solid rgba(255,255,255,0.08);
}

.nav-menu a {
  font-family: 'Jost', sans-serif;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  display: block;
  padding: var(--space-3) 0;     /* 21px vertical */
  border-bottom: 0.5px solid rgba(255,255,255,0.06);
  transition: color 0.25s ease, padding-left 0.25s ease;
}

.nav-menu a:hover,
.nav-menu a.active {
  color: #ffffff;
  padding-left: var(--space-2);  /* 13px — subtle indent on hover */
}
```

---

### 10. SCROLL BEHAVIOUR

Add this JS snippet (no library needed):
```javascript
// Nav border on scroll
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 20);
});

// Fade-in on scroll for project cards and content sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .section-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
```

---

## IMPLEMENTATION CHECKLIST

When implementing, confirm each of the following:

- [ ] `design-backup-original` branch created with full current codebase committed
- [ ] `design-refresh-golden` branch created for all new changes  
- [ ] Google Fonts import (Cormorant Garamond + Jost) added to `<head>`
- [ ] CSS custom properties (--text-*, --space-*) declared in `:root`
- [ ] All nav links updated to Jost 300, uppercase, 0.18em tracking
- [ ] Hero images unchanged in position, height, content
- [ ] About section split to 61.8% / 38.2% using flex or grid
- [ ] Project grid cards: aspect-ratio 4/3, hover scale, copper hover border
- [ ] Project detail sidebar: Cormorant title, Jost body, golden ratio width
- [ ] Filter tabs: 11px uppercase tracking, active underline  
- [ ] Buttons: refined padding, accent underline animation on hover
- [ ] Footer: Jost 300, 11px, tracking, 0.5px top border
- [ ] Scroll fade-in JS added
- [ ] Nav `scrolled` border JS added
- [ ] No border-radius on ANY image or card (architecture = rectilinear)
- [ ] No new colours introduced — existing palette only
- [ ] Mobile responsive spacing applied (scale down by one --space step)

---

## WHAT NOT TO CHANGE

- Logo SVG or wordmark
- Navigation structure (Home / About / Projects / Services / Contact)
- Page layout or section order
- Project photography or hero images
- Social media links in footer
- Any content / copy
- Color palette (black/white/copper — do not add blues, greens, gradients)
- Copyright text

---

## AESTHETIC NORTH STAR

The finished site should feel like: **Zaha Hadid Architects meets Koolhaas OMA's 
editorial restraint** — not cold or sterile, but architecturally rigorous. 
Every spacing decision should feel intentional, like a floor plan. 
Typography should feel like a beautifully typeset monograph, not a website template.

The golden ratio isn't a gimmick here — it's the invisible geometry that makes 
architectural drawings feel balanced. Apply it everywhere it makes sense, 
but never at the expense of readability.

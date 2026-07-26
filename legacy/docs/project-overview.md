# Project Overview — ProArc

## Executive Summary

ProArc is the portfolio website for **ProArc Architects**, one of the leading architectural practices in the UAE. Established in Ajman since 2006, the firm delivers design, engineering, and project management consultancy across commercial, educational, residential, mixed-use, and institutional project types.

The website serves as a public-facing marketing and portfolio platform: it showcases completed projects with full-screen photography, describes the firm's services, and provides a contact mechanism for prospective clients. The site is deployed at [proarc.ae](https://www.proarc.ae).

---

## Project Identity

| Field | Value |
|---|---|
| **Project Name** | proarc |
| **Domain** | proarc.ae |
| **Client / Owner** | ProArc Architects, Ajman, UAE |
| **Founded / Online Since** | 2006 (firm), 2018 (site copyright) |
| **Contact** | info@proarc.ae · +97167446633 |
| **Social** | Facebook: proarcarchitects · Twitter: aneesmoideen · Instagram: proarchitects |

---

## Tech Stack Summary

| Category | Technology | Notes |
|---|---|---|
| Markup | HTML5 | Hand-authored, no template engine |
| Styling | CSS3 | reset.css, plugins.css, style.css, yourstyle.css |
| Scripting | JavaScript / jQuery 1.x | Vanilla DOM + jQuery plugins |
| Backend | PHP (Apache `mail()`) | Contact form only — no database |
| Server | Apache | .htaccess handles HTTPS redirect |
| Fonts | FontAwesome 4.x, FuturaPT | Self-hosted web fonts |
| Maps | Google Maps JS API | Used on contact page |
| Build System | None | Static files served directly |
| Package Manager | None | No npm, composer, or similar |

---

## Architecture Type Classification

**Multi-Page Application (MPA) with AJAX page transitions**

All pages share a common shell (`<header>`, `<footer>`, `#wrapper`). Navigation links carry the `class="ajax"` attribute, which triggers the `$.coretemp()` plugin in `js/core.js` to load page content into `#wrapper` via AJAX — avoiding full page reloads while preserving normal URL navigation fallback.

---

## Repository Structure

**Monolith** — single flat root directory; no build output, no subproject separation.

```
proarc/           ← Apache document root
├── *.html        ← All pages (22 files)
├── css/          ← Stylesheets (4 files)
├── js/           ← JavaScript (5 files)
├── php/          ← Server-side PHP (1 file)
├── images/       ← All images (organized by section)
├── fonts/        ← Self-hosted web fonts
├── docs/         ← BMad project knowledge base (this file)
└── _bmad/        ← BMad tooling configuration
```

---

## Pages Inventory

### Core Navigation Pages (5)

| File | Title | Purpose |
|---|---|---|
| index.html | Home | Full-screen Owl Carousel slider of 9 featured projects |
| about.html | About | Company description and philosophy |
| portfolio.html | Projects | Isotope-filtered masonry grid of all projects |
| services.html | Services | Three service areas with imagery |
| contact.html | Contact | Address/phone + AJAX contact form + Google Maps |

### Project Detail Pages (17+)

Each project has its own HTML file with a full-screen image gallery:

| File | Project Name | Category |
|---|---|---|
| ajmanbank.html | Ajman Bank Head Office | Commercial |
| rholding.html | R Holding Head Office | Commercial |
| blacksquare.html | The Black Square | Commercial |
| citymalluaq.html | City Mall, Umm al-Quwain | Commercial / Mall |
| citylifejurf.html | City Life Mall (Jurf, Hamidiya, Al-Zohrah) | Commercial / Mall |
| citylifekhor.html | City Life (Al-Khor) | Commercial / Mall |
| citylifetallah.html | City Life (Al-Tallah) | Commercial / Mall |
| souksalah.html | Souk Salah | Commercial / Mall |
| frontlineschool.html | Frontline School | Educational |
| cityschool.html | City School | Educational |
| habitatschool.html | Habitat School | Educational |
| cityuniversity.html | City University | Educational |
| woodlem.html | Woodlem Park Private School | Educational |
| ajmanoxford.html | Ajman Oxford / City Mall UAQ | Mixed |
| jeddahheights.html | Jeddah Heights | Residential |
| emiratescity.html | Emirates City D1 Tower | Residential |
| alghalamosque.html | Al Ghala Mosque | Civic/Religious |
| aliatower.html | Alia Tower | Commercial |
| majestic.html | Majestic | Commercial |
| 20villa.html | 20 Villa | Residential |

### Utility / Misc Pages

| File | Purpose |
|---|---|
| portfolio-single.html | Template skeleton for project detail pages |
| index-withdescription.html | Alternate homepage variant with text overlays |
| godaddy.html | GoDaddy domain verification page |

---

## Services Offered

1. **Architecture Design** — Concept Design, Structural Design, Interior Design
2. **Project Management** — Research & Analysis, MEP Engineering/Consultancy, Project Management
3. **Skyscraper Design** — Urban Planning, Sustainable Design, Social Responsibility

---

## Links to Detailed Documentation

- [Architecture](./architecture.md) — System design, patterns, component structure
- [Source Tree Analysis](./source-tree-analysis.md) — Annotated directory tree
- [Component Inventory](./component-inventory.md) — HTML/CSS/JS components
- [Development Guide](./development-guide.md) — Setup, local dev, adding content
- [API Contracts](./api-contracts.md) — contact.php endpoint
- [Master Index](./index.md) — Navigation hub

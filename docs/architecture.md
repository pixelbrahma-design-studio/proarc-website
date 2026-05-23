# Architecture — ProArc Website

## Executive Summary

The ProArc website is a **static Multi-Page Application (MPA)** with AJAX-enhanced navigation. There is no server-side rendering framework, no database, and no build pipeline. Content is hand-authored HTML, styled with CSS, animated/interacted via jQuery plugins, and deployed as flat files on an Apache web server. The sole dynamic server component is a PHP contact-form mailer.

---

## Technology Stack

| Layer | Technology | Version / Notes |
|---|---|---|
| **Markup** | HTML5 | Semantic, hand-authored |
| **Styling** | CSS3 | 4-file cascade: reset → plugins → style → yourstyle |
| **Scripting** | JavaScript | jQuery 1.x + bundled plugins |
| **AJAX Navigation** | `$.coretemp()` | `js/core.js` — custom AJAX loader for `#wrapper` |
| **Gallery / Filter** | Isotope | Masonry grid with category filtering |
| **Carousels** | Owl Carousel | Home slider, project image galleries |
| **Lightbox** | Magnific Popup | Image and YouTube popup overlays |
| **Scrollbar** | NiceScroll | Custom scrollbars for nav and wrapper |
| **Maps** | Google Maps JS API v3 + gmap3 jQuery plugin | Contact page |
| **Video BG** | YTPlayer | YouTube background video support |
| **Social Share** | jQuery Share | Facebook, Twitter, LinkedIn, Google+ sharing |
| **Icons** | FontAwesome 4.x | Self-hosted (fonts/fontawesome-webfont.*) |
| **Typography** | FuturaPT | Self-hosted (fonts/FuturaPT-Book_gdi.*, futurastd-bold.*) |
| **Backend** | PHP (Apache `mail()`) | Contact form only — `php/contact.php` |
| **Server** | Apache (cPanel shared hosting) | `.htaccess` redirect; hosted at proarc.ae |

---

## Architecture Pattern

### MPA with AJAX Content Swap

All pages share a **persistent shell** that is never unloaded:

```
<div id="main">
  <header>                  ← logo, nav button, title — always visible
  <div id="wrapper">        ← AJAX reload target
    <div class="content-holder">
      <div class="nav-inner">  ← slide-out navigation menu
      <div class="content">    ← page-specific content
    </div>
  </div>
  <footer>                  ← social links, copyright — always visible
</div>
```

When a user clicks a link with `class="ajax"`, the `$.coretemp()` plugin intercepts the click, fetches the target HTML, extracts the content within `#wrapper`, and injects it — avoiding a full page reload. This gives SPA-like transitions (scale/fade animations via `.scale-bg2`) while keeping standard HTML files as the source of truth.

**Fallback behavior:** Without JavaScript, all pages are fully functional static HTML. The `class="ajax"` attribute is purely a JS hook — removing it causes normal browser navigation.

---

## Page Structure (Shared Template)

Every page follows the same skeleton:

```html
<body>
  <div class="loader">          <!-- spinner shown on load -->
  <div id="main">
    <header>                    <!-- logo + hamburger nav button -->
    <div id="wrapper">
      <div class="content-holder elem scale-bg2">
        <div class="nav-inner isDown">
          <nav>…</nav>          <!-- slide-out full nav menu -->
        </div>
        <div class="content">
          …page-specific content…
        </div>
        <div class="share-inner">  <!-- social share panel -->
      </div>
    </div>
    <footer>                    <!-- social icons, copyright -->
  </div>
  <!-- scripts loaded at bottom -->
  <script src="js/jquery.min.js">
  <script src="js/plugins.js">
  <script src="js/core.js">
  <script src="js/scripts.js">
</body>
```

The `elem scale-bg2` CSS class drives the entry animation (scale + background transition). On load, `contanimshow()` removes `scale-bg2` after 450ms.

---

## JavaScript Architecture

### Initialization Chain

```
$(window).load → fadeOut(".loader") → animate("#main" opacity) → contanimshow()

$(function) → $.coretemp() initialization → readyFunctions()
  └── readyFunctions()
        ├── initDogma()     — all UI plugins + event bindings
        └── initvideo()     — mobile detection, remove bg video on touch

document.ksctbCallback → readyFunctions()  — fires on every AJAX page load
```

### JS Files

| File | Role |
|---|---|
| `js/jquery.min.js` | jQuery 1.x core |
| `js/plugins.js` | All third-party plugins bundled: Isotope, Owl Carousel, Magnific Popup, NiceScroll, YTPlayer, gmap3, Share, Intense viewer, imagesLoaded |
| `js/core.js` | `$.coretemp()` AJAX navigation plugin — intercepts `.ajax` link clicks, swaps `#wrapper` content |
| `js/scripts.js` | Site-specific initialization (`initDogma`, `initvideo`, `readyFunctions`) |

### `initDogma()` responsibilities

- **magnificPopup** — image lightbox, gallery lightbox, YouTube iframe popup
- **YTPlayer** — YouTube background video (desktop only)
- **Isotope** — portfolio masonry grid with filter buttons
- **Intense** — full-screen image viewer
- **Owl Carousel** — hero slider, full-width slider, sync slider, custom slider, slideshow, horizontal gallery
- **NiceScroll** — custom scrollbars on `.nav-inner` and `#wrapper`
- **gmap3** — Google Maps initialization with custom marker + info window
- **Contact form** — AJAX POST to `php/contact.php` via `$.post()`
- **Navigation** — hamburger menu show/hide, submenu hover, overlay dismiss
- **Social share** — share panel show/hide
- **Filter panel** — show/hide filter column
- **Layout sizing** — `ac()` recalculates element heights on load and resize

---

## CSS Architecture

### File Load Order

```html
<link href="css/reset.css">       <!-- CSS reset / normalize -->
<link href="css/plugins.css">     <!-- Third-party plugin styles -->
<link href="css/style.css">       <!-- Main theme styles -->
<link href="css/yourstyle.css">   <!-- Custom overrides (currently empty) -->
```

`yourstyle.css` is the designated customization point — override any theme styles here without touching `style.css`.

---

## Data Architecture

**No database.** All content is static HTML. There is no CMS, no database, and no server-side templating.

| Data Type | Storage | How Updated |
|---|---|---|
| Project content | Hand-authored HTML files | Edit the `.html` file directly |
| Project photography | `images/folio/` directory | Upload via FTP |
| Contact messages | Email (via `mail()`) | Sent to info@proarc.ae |

---

## Backend — PHP Contact Form

The only server-side component is `php/contact.php`.

**Request:** HTTP POST from `#contactform` (AJAX via `$.post()`)

**Fields:** `name`, `email`, `comments`

**Processing:**
1. Validate: name not empty, email not empty, email format valid, comments not empty
2. Compose email with `wordwrap()`, set `From:` and `Reply-To:` headers to submitter's email
3. Call `mail("info@proarc.ae", subject, body, headers)`
4. Return success HTML or error HTML as response body

**Security notes:**
- Input is not sanitized beyond `get_magic_quotes_gpc()` stripslashes (deprecated in PHP 7.4+)
- The `$phone` variable on line 57 of contact.php is referenced but never populated from `$_POST` — produces a PHP notice and blank field in the email
- No CSRF protection, no rate limiting, no honeypot

---

## Deployment Architecture

| Property | Value |
|---|---|
| **Hosting** | Apache shared hosting (cPanel — evidenced by `.ftpquota`) |
| **Domain** | proarc.ae |
| **HTTPS** | Enforced via `.htaccess` RewriteRule (HTTP → HTTPS redirect) |
| **Deploy method** | FTP upload (evidenced by `.ftpquota` file) |
| **PHP version** | Unknown (shared host) — contact.php uses deprecated `get_magic_quotes_gpc()` suggesting PHP < 7.4 |

### `.htaccess` redirect rule

```apache
RewriteEngine On
RewriteCond %{SERVER_PORT} 80
RewriteCond %{HTTP_HOST} ^(www\.)?proarc\.ae
RewriteRule ^(.*)$ https://www.proarc.ae/$1 [R,L]
```

---

## External Integrations

| Service | Usage | Location |
|---|---|---|
| Google Maps JS API | Interactive map on contact page | `contact.html` (API key visible in source) |
| Google Maps (gmap3) | jQuery wrapper for Maps API | `js/plugins.js` |
| Social sharing | Facebook, Twitter, LinkedIn, Google+ share buttons | All pages |
| YouTube (YTPlayer) | Background video support (if used) | `js/scripts.js` |

---

## Testing Strategy

**No automated tests exist.** This is a static site with no test runner, no test files, and no CI/CD pipeline. Testing is manual (browser-based visual QA).

Recommended testing approach for changes:
1. Open in Chrome/Firefox/Safari/Edge
2. Test AJAX navigation (click all nav links)
3. Verify portfolio filter buttons (All, Commercial, Educational, Malls, Residential)
4. Test contact form (valid submission, empty fields, invalid email)
5. Check mobile layout (viewport meta disables user zoom)
6. Verify Google Maps loads on contact page

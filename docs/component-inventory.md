# Component Inventory — ProArc

## Overview

This site has no component framework (no React, Vue, Angular). "Components" are recurring HTML/CSS/JS patterns that appear across pages. The shared shell (header, footer, navigation) is duplicated verbatim in every HTML file — there is no server-side include or template mechanism.

---

## Layout Components

### Page Shell (repeated on every page)

Every HTML page contains this structure:

```html
<div class="loader">              <!-- Pre-loader spinner -->
<div id="main">
  <header>                        <!-- Fixed top/bottom bar -->
  <div id="wrapper">              <!-- AJAX reload zone -->
    <div class="content-holder elem scale-bg2 transition3">
      <div class="nav-inner isDown">   <!-- Slide-out nav menu -->
      <div class="content">            <!-- Page-specific content -->
      <div class="share-inner">        <!-- Social share panel -->
    </div>
  </div>
  <footer>                        <!-- Social icons + copyright -->
</div>
```

**State classes:**
- `scale-bg2` → entry animation (removed after 450ms by `contanimshow()`)
- `isDown` on `.nav-inner` → nav hidden; removed when menu opens
- `vismen` on `.nav-inner` → nav fully visible

---

## Navigation Component

```html
<header>
  <div class="nav-button">        <!-- Hamburger toggle (3 spans) -->
  <div class="logo-holder">       <!-- Logo image link -->
  <div class="header-title">      <!-- Dynamic page title (set by JS) -->
</header>

<div class="nav-inner isDown">
  <nav>
    <ul>
      <li><a href="*.html" class="ajax">Page Name</a></li>
      <!-- active link gets class="ajax active" -->
    </ul>
  </nav>
</div>
```

**Behaviour:** Clicking `.nav-button` toggles `vismen`/`isDown` on `.nav-inner`. Clicking `.nav-overlay` or `.close-share` closes both nav and share panels.

---

## Content Layout Variants

### Full-Height Split Layout (About, Contact)

```html
<div class="content full-height">
  <div class="fixed-column">     <!-- Right panel: fixed bg image or map -->
  <div class="wrapper-inner">    <!-- Left panel: scrollable text content -->
    <div class="align-content">  <!-- Vertically centered block -->
```

### Standard Scrollable Layout (Services)

```html
<div class="content">
  <section>
    <div class="container">
```

### Gallery Layout (Portfolio)

```html
<div class="content">
  <section class="no-padding no-border no-bg">
    <div class="filter-holder filter-vis-line">
      <div class="gallery-filters">  <!-- Isotope filter buttons -->
    </div>
    <div class="gallery-items hid-port-info grid-small-pad">
      <div class="gallery-item [category]">  <!-- Isotope item -->
```

### Full-Screen Slider Layout (Home)

```html
<div class="content full-height">
  <div class="full-height-wrap">
    <div class="full-width-slider-holder">
      <div class="full-width-slider owl_carousel">
        <div class="item">           <!-- One slide per project -->
          <div class="bg bg-slider"> <!-- CSS background-image -->
          <div class="overlay">
          <div class="show-info">    <!-- Project link on hover -->
```

---

## UI Components

### Portfolio Gallery Grid

- **Plugin:** Isotope (masonry layout)
- **Filter buttons:** `.gallery-filter` elements trigger `isotope({ filter: ".category" })`
- **Categories:** `*` (All), `.commercial`, `.educational`, `.mall`, `.residential`
- **Item template:**

```html
<div class="gallery-item [category]">
  <div class="grid-item-holder">
    <div class="box-item"><a href="project.html"><img src="images/folio/thumbs/project.jpg"></a></div>
    <div class="grid-item">
      <h3><a href="project.html" class="ajax portfolio-link">Project Name</a></h3>
      <span>Location</span>
    </div>
  </div>
</div>
```

### Contact Form

```html
<form method="post" action="php/contact.php" name="contactform" id="contactform">
  <input name="name" type="text" id="name">
  <input name="email" type="text" id="email">
  <textarea name="comments" id="comments"></textarea>
  <button type="submit" id="submit"><span>Send</span></button>
</form>
<div id="message"></div>  <!-- AJAX response rendered here -->
```

Submitted via `$.post()` in `initDogma()`. The form panel slides in/out via `.showform` / `.close-contact` buttons.

### Services Item

```html
<div class="services-item">
  <div class="serv-img [lft-img|rft-img]">
    <div class="bg" style="background-image:url(images/services/image.jpg)"></div>
  </div>
  <div class="services-box-info [rft-info|lft-info]">
    <h4>Service Title</h4>
    <p>Description…</p>
    <ul><li><span>Sub-service</span></li>…</ul>
  </div>
</div>
```

Alternates image left/right using `lft-img`/`rft-img` and `lft-info`/`rft-info` classes.

### Social Share Panel

```html
<div class="share-inner">
  <div class="share-container isShare" data-share="['facebook','googleplus','twitter','linkedin']"></div>
  <div class="close-share"></div>
</div>
```

Activated by `.show-share` button. Uses jQuery Share plugin configured via `data-share` attribute.

### Google Maps

```html
<div id="map-canvas"></div>
```

Initialized in `initDogma()` via `gmap3()` with:
- Marker at coordinates [25.392760, 55.436931] (ProArc Ajman office)
- Custom marker icon: `images/marker.png`
- Hover info window: "Our office - Ajman"
- Greyscale custom map style

---

## JavaScript Plugin Reference

| Plugin | Initialization | Used In |
|---|---|---|
| `$.coretemp()` | `$(function)` in scripts.js | All pages — AJAX navigation |
| `$.fn.owlCarousel` | `initDogma()` | Home slider, project galleries |
| `$.fn.magnificPopup` | `initDogma()` | Image lightbox, YouTube popups |
| `$.fn.isotope` | `initDogma()` | Portfolio filter grid |
| `$.fn.niceScroll` | `initDogma()` | `.nav-inner`, `#wrapper` scrollbars |
| `$.fn.YTPlayer` | `initDogma()` | Background video (if enabled per page) |
| `$.fn.gmap3` | `initDogma()` | Contact page map |
| `$.fn.share` | `initDogma()` | Social share panel |
| `Intense()` | `initDogma()` | Full-screen image viewer |

---

## CSS Component Classes Reference

| Class | Purpose |
|---|---|
| `.content-holder` | Main page wrapper with animation |
| `.full-height` | Content fills viewport height |
| `.fixed-column` | Fixed right/left panel (about, contact pages) |
| `.wrapper-inner` | Scrollable inner content area |
| `.align-content` | Vertically centered block |
| `.gallery-items` | Isotope container |
| `.gallery-item` | Isotope item; add category class for filtering |
| `.gallery-filter` | Filter button; `.gallery-filter-active` = selected |
| `.services-holder` | Services layout container |
| `.services-item` | Individual service block |
| `.nav-inner` | Slide-out navigation panel |
| `.nav-button` | Hamburger icon with 3 span elements |
| `.share-inner` | Social share slide-out panel |
| `.contact-form-holder` | Contact form overlay panel |
| `.loader` | Pre-loader overlay |
| `.bg` | Element that uses CSS `background-image` |
| `.bg-slider` | Carousel slide background image |
| `.overlay` | Dark overlay on slide images |
| `.show-info` | Caption/link shown on slide |
| `.ajax` | Marks links for AJAX navigation interception |
| `.anim-button` | Animated CTA button style |
| `.dec-text` | Decorative oversized heading |
| `.small-container` | Narrower content container variant |

# Development Guide — ProArc

## Prerequisites

| Tool | Purpose | Required? |
|---|---|---|
| Text editor | Edit HTML/CSS/JS | Yes |
| FTP client (FileZilla, etc.) | Deploy to live server | Yes (for live deploys) |
| Web browser | Local preview + testing | Yes |
| PHP-capable local server | Test contact form | Optional |
| Git (or similar VCS) | Version control | Recommended |

There is **no Node.js, npm, composer, or build step** — no installation required. Open the project folder and you're ready.

---

## Local Development

### Option A: Simple file preview (no PHP)

Open any `.html` file directly in a browser. All pages render correctly. The only limitation is that the contact form (`php/contact.php`) will not work (PHP requires a server runtime).

Note: AJAX navigation (`$.coretemp()`) may not function correctly with `file://` URLs due to browser cross-origin restrictions. Use Option B or C for full AJAX nav testing.

### Option B: Python local server (recommended)

```bash
# From the proarc/ directory
python -m http.server 8000
# Open http://localhost:8000
```

AJAX navigation works. Contact form still requires PHP runtime.

### Option C: WAMP / XAMPP / Laragon (Windows)

Place the `proarc/` folder inside your server's document root (e.g., `C:/xampp/htdocs/proarc/`). Access at `http://localhost/proarc/`. Both AJAX navigation and the PHP contact form will work.

---

## Adding a New Project Page

1. **Copy** an existing project page as a template:
   ```
   cp woodlem.html newproject.html
   ```

2. **Edit** `newproject.html`:
   - Update `<title>ProArc | New Project Name</title>`
   - Replace content in `<div class="content">` with project-specific HTML
   - Update image paths to reference new project images

3. **Add project images:**
   - Thumbnail: `images/folio/thumbs/newproject.jpg` (consistent naming)
   - Project photos: `images/folio/projects/newproject1.jpg`, `newproject2.jpg`, `newproject3.jpg`

4. **Add to portfolio grid** in `portfolio.html`:
   ```html
   <div class="gallery-item [commercial|educational|mall|residential]">
     <div class="grid-item-holder">
       <div class="box-item">
         <a href="newproject.html"><img src="images/folio/thumbs/newproject.jpg" alt=""></a>
       </div>
       <div class="grid-item">
         <h3><a href="newproject.html" class="ajax portfolio-link">New Project Name</a></h3>
         <span>Location, U.A.E</span>
       </div>
     </div>
   </div>
   ```

5. **Optionally add to homepage carousel** in `index.html`:
   ```html
   <div class="item">
     <div class="bg bg-slider" style="background-image:url(images/home/home-N.jpg)"></div>
     <div class="overlay"></div>
     <div class="show-info">
       <a href="newproject.html"><span>New Project Name</span></a>
     </div>
   </div>
   ```
   Add corresponding image at `images/home/home-N.jpg`.

---

## Editing Existing Content

### Update About page text
Edit the `<p>` inside `<div class="align-content"><section>` in `about.html`.

### Update Services
Each service is a `.services-item` block in `services.html`. Change the `<h4>`, `<p>`, and `<li>` text, and update the `background-image` URL for the service image.

### Update Contact details
Edit the `.contact-list` in `contact.html`. The Google Maps marker position is set in `js/scripts.js` at the `gmap3` initialization (`latLng: [25.392760, 55.436931]`).

### Update Contact email recipient
Edit line 41 in `php/contact.php`:
```php
$address = "info@proarc.ae";  // ← change to desired recipient
```

### Add custom CSS
Add styles to `css/yourstyle.css` — it loads last and overrides `style.css` without touching the theme.

---

## Deployment

The site is deployed via **FTP** to an Apache shared hosting server.

### Deploy steps

1. Edit files locally
2. Test in browser (use Option B or C above)
3. Connect to server via FTP (credentials from cPanel)
4. Upload changed files, maintaining the same folder structure
5. Clear browser cache and verify at https://www.proarc.ae

### Files to never overwrite on server without local copy

- `php/error_log` — auto-generated PHP error log on server
- `.ftpquota` — auto-managed by cPanel; leave it alone

---

## Google Maps API Key

The contact page uses a Google Maps API key that is **visible in the HTML source** of `contact.html`:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA76EfFsJCz1FdRHZSSc1hkJUAnQYFPAtI">
```

Other pages use a placeholder `key=YOUR_API_KEY`. If you need maps on other pages, replace that placeholder with the real key.

**Important:** Restrict this API key in Google Cloud Console to only the proarc.ae domain to prevent unauthorized usage charges.

---

## Known Issues / Technical Debt

| Issue | Location | Impact | Fix |
|---|---|---|---|
| `$phone` variable used but never populated | `php/contact.php:57` | Phone field blank in contact emails; PHP notice | Add `$phone = $_POST['phone'] ?? '';` and a phone input to the form |
| `get_magic_quotes_gpc()` deprecated | `php/contact.php:31` | PHP warning on PHP 7.4+; may break on PHP 8+ | Remove the if-block entirely |
| No CSRF protection on contact form | `php/contact.php` | Form can be submitted by any origin (spam risk) | Add a token field or honeypot |
| `YOUR_API_KEY` placeholder on most pages | All pages except contact.html | Maps API not initialized on those pages | Replace with actual key or remove the script tag |
| No `alt` text on portfolio thumbnails | `portfolio.html` | Accessibility / SEO | Add descriptive `alt` attributes to all `<img>` |
| `user-scalable=no` in viewport meta | All pages | Accessibility violation — prevents zoom | Remove `maximum-scale=1.0, user-scalable=no` |
| No `<meta description>` or `<meta keywords>` | All pages | Poor SEO | Fill in per-page meta descriptions |

---

## File Naming Conventions

| Asset type | Convention | Example |
|---|---|---|
| Project HTML | `projectslug.html` (lowercase, no spaces) | `woodlem.html` |
| Portfolio thumbnail | `images/folio/thumbs/projectslug.jpg` | `images/folio/thumbs/woodlem.jpg` |
| Project photos | `images/folio/projects/projectslugN.jpg` | `images/folio/projects/woodlem1.jpg` |
| Home carousel | `images/home/home-N.jpg` | `images/home/home-1.jpg` |
| Service images | `images/services/servicename.jpg` | `images/services/residential.jpg` |

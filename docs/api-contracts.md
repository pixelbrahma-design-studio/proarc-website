# API Contracts — ProArc

## Overview

The ProArc website has **one server-side API endpoint**: the contact form handler. All other pages are static HTML served directly by Apache.

---

## POST /php/contact.php

**Purpose:** Receives the contact form submission, validates input, and sends an email to the ProArc inbox.

**Protocol:** HTTP POST (form-encoded); called via `$.post()` (AJAX) in `js/scripts.js`

---

### Request

| Property | Value |
|---|---|
| Method | `POST` |
| URL | `/php/contact.php` |
| Content-Type | `application/x-www-form-urlencoded` |
| Caller | `#contactform` submit handler in `initDogma()` |

#### Request Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Sender's full name |
| `email` | string | Yes | Sender's email address (validated by regex) |
| `comments` | string | Yes | Message body |

#### Example AJAX call (from scripts.js)

```javascript
$.post("php/contact.php", {
  name: $("#name").val(),
  email: $("#email").val(),
  comments: $("#comments").val()
}, function(response) {
  document.getElementById("message").innerHTML = response;
  $("#message").slideDown("slow");
  $("#submit").removeAttr("disabled");
});
```

---

### Response

The endpoint returns **HTML markup** (not JSON). The caller inserts it directly into `#message` via `innerHTML`.

#### Success Response

```html
<fieldset>
  <div id="success_page">
    <h3>Email Sent Successfully.</h3>
    <p>Thank you <strong>{name}</strong>, your message has been submitted to us.</p>
  </div>
</fieldset>
```

The client-side JS checks for the string `"success"` in the response to determine if the form should slide down:
```javascript
if (null != a.match("success")) $("#contactform").slideDown("slow");
```

#### Validation Error Responses

| Condition | Response HTML |
|---|---|
| `name` is empty | `<div class="error_message">Enter your name.</div>` |
| `email` is empty | `<div class="error_message">Enter a valid email address.</div>` |
| `email` format invalid | `<div class="error_message">You have enter an invalid e-mail address, try again.</div>` |
| `comments` is empty | `<div class="error_message">Enter your message.</div>` |

#### Server Error Response

```
ERROR!
```

Plain text returned when `mail()` returns false.

---

### Email Generated

| Property | Value |
|---|---|
| To | `info@proarc.ae` (hardcoded in contact.php:41) |
| Subject | `You've been contacted by {name}.` |
| From | `{email}` (submitter's address) |
| Reply-To | `{email}` |
| Content-Type | `text/plain; charset=utf-8` |
| Body | "You have been contacted by: {name}\n\nMessage:\n{comments}\n\nE-mail: {email}\nPhone: " |

**Note:** The `Phone` line in the email body is always blank — `$phone` variable is referenced but never assigned from `$_POST`.

---

### Validation Logic

```php
// Pseudocode
if name == '' → error
else if email == '' → error
else if !isEmail(email) → error  // custom regex validation
else if comments == '' → error
else → send mail
```

The `isEmail()` function validates via regex against a large list of TLDs. It does NOT:
- Check if the email domain actually exists (no MX lookup)
- Prevent HTML injection in the message body
- Apply rate limiting

---

## No Other API Endpoints

The following are **not** server-side APIs — they are static HTML files:

- All `*.html` files in root
- All files in `css/`, `js/`, `images/`, `fonts/`

The `cgi-bin/` directory exists (standard cPanel default) but contains no custom scripts.

/**
 * Contact form: client-side validation matching the spec (Full Name,
 * Email, Phone optional, Subject, Message min 20 chars), then POSTs to
 * php/contact.php — which only reads `name` / `email` / `comments`, so
 * phone + subject are folded into the comments body before sending.
 */
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(message, kind) {
    statusEl.textContent = message;
    statusEl.className = "form-status" + (kind ? " is-" + kind : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.elements["fullName"].value.trim();
    var email = form.elements["email"].value.trim();
    var phone = form.elements["phone"].value.trim();
    var subject = form.elements["subject"].value.trim();
    var message = form.elements["message"].value.trim();

    if (!name) return setStatus("Please enter your name.", "error");
    if (!email || !EMAIL_RE.test(email)) return setStatus("Please enter a valid email address.", "error");
    if (!subject) return setStatus("Please enter a subject.", "error");
    if (message.length < 20) return setStatus("Your message should be at least 20 characters.", "error");

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    setStatus("Sending…");

    var comments = "Subject: " + subject + "\n" + (phone ? "Phone: " + phone + "\n" : "") + "\n" + message;

    var body = new URLSearchParams({ name: name, email: email, comments: comments });

    fetch(form.action, { method: "POST", body: body })
      .then(function (res) { return res.text(); })
      .then(function (text) {
        if (/success/i.test(text)) {
          setStatus("Thank you, " + name + " — your message has been sent.", "success");
          form.reset();
        } else {
          setStatus("Something went wrong sending your message — please email info@proarc.ae directly.", "error");
        }
      })
      .catch(function () {
        setStatus("Something went wrong sending your message — please email info@proarc.ae directly.", "error");
      })
      .finally(function () { submitBtn.disabled = false; });
  });
})();

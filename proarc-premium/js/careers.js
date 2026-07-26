/**
 * Careers application form: client-side validation, then POSTs the text
 * fields to php/contact.php (which only reads `name` / `email` / `comments`,
 * same endpoint the Contact page uses) — phone, country, position and cover
 * letter are folded into the comments body. The CV file input is not sent
 * via this endpoint (see the note in the form itself).
 */
(function () {
  var form = document.getElementById("careers-form");
  if (!form) return;

  var statusEl = document.getElementById("careers-form-status");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(message, kind) {
    statusEl.textContent = message;
    statusEl.className = "form-status" + (kind ? " is-" + kind : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.elements["careerName"].value.trim();
    var email = form.elements["careerEmail"].value.trim();
    var phone = form.elements["careerPhone"].value.trim();
    var country = form.elements["careerCountry"].value.trim();
    var position = form.elements["careerPosition"].value.trim();
    var cover = form.elements["careerCover"].value.trim();

    if (!name) return setStatus("Please enter your name.", "error");
    if (!email || !EMAIL_RE.test(email)) return setStatus("Please enter a valid email address.", "error");
    if (!phone) return setStatus("Please enter a phone number.", "error");
    if (!country) return setStatus("Please select your country of origin.", "error");
    if (!position) return setStatus("Please enter the position you're applying for.", "error");

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    setStatus("Sending…");

    var comments =
      "Position: " + position + "\n" +
      "Phone: " + phone + "\n" +
      "Country of origin: " + country + "\n\n" +
      (cover ? "Cover letter:\n" + cover : "No cover letter provided.");

    var body = new URLSearchParams({ name: name, email: email, comments: comments });

    fetch(form.action, { method: "POST", body: body })
      .then(function (res) { return res.text(); })
      .then(function (text) {
        if (/success/i.test(text)) {
          setStatus("Thank you, " + name + " — your application has been received.", "success");
          form.reset();
        } else {
          setStatus("Something went wrong sending your application — please email info@proarc.ae directly.", "error");
        }
      })
      .catch(function () {
        setStatus("Something went wrong sending your application — please email info@proarc.ae directly.", "error");
      })
      .finally(function () { submitBtn.disabled = false; });
  });
})();

/* Kennedy Mwansa - ICT251 Activity 3 - js/script.js
   Features:
   1. Contact form validation and preview (compulsory)
   2. Gallery viewer (Previous / Next)
   3. Theme switch (light / dark)
   4. Mobile navigation menu
*/

// Tell the CSS that JavaScript is running (the phone menu only folds away if it is)
document.documentElement.classList.add('js');


/* ======================================================
   FEATURE 1: Contact form validation and preview
   ====================================================== */

// Returns an error message, or "" when the name is fine
function checkName(value) {
  if (value.trim() === '') {
    return 'Please enter your name (spaces alone are not allowed).';
  }
  return '';
}

// Returns an error message, or "" when the email looks valid (name@site.ext)
function checkEmail(value) {
  const email = value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (email === '') {
    return 'Please enter your email address.';
  }
  if (!pattern.test(email)) {
    return 'Please enter a valid email, for example name@example.com.';
  }
  return '';
}

// Returns an error message, or "" when the message has real text
function checkMessage(value) {
  if (value.trim() === '') {
    return 'Please write a message (spaces alone are not allowed).';
  }
  return '';
}

// Shows or clears the error text under one field
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorBox = document.getElementById(fieldId + '-error');
  errorBox.textContent = message;
  if (message) {
    field.setAttribute('aria-invalid', 'true');
  } else {
    field.removeAttribute('aria-invalid');
  }
}

// Builds the preview using textContent only, so typed text is never run as HTML
function showPreview(data) {
  const preview = document.getElementById('form-preview');
  const note = document.getElementById('preview-note');
  const list = document.getElementById('preview-list');

  note.textContent = 'Your details were validated in this browser. No message has been sent.';
  list.textContent = ''; // clear any older preview

  const rows = [
    ['Name', data.name],
    ['Email', data.email],
    ['Topic', data.topic],
    ['Message', data.message]
  ];

  rows.forEach(function (row) {
    const term = document.createElement('dt');
    const detail = document.createElement('dd');
    term.textContent = row[0];
    detail.textContent = row[1];
    list.appendChild(term);
    list.appendChild(detail);
  });

  preview.hidden = false;
}

// Runs when the form is submitted: validate, then show errors or the preview
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const preview = document.getElementById('form-preview');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // keep everything local, no page reload

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const topic = document.getElementById('topic').value;
    const message = document.getElementById('message').value;

    const problems = [
      { id: 'name', text: checkName(name) },
      { id: 'email', text: checkEmail(email) },
      { id: 'message', text: checkMessage(message) }
    ];

    let firstBadField = null;
    problems.forEach(function (problem) {
      showFieldError(problem.id, problem.text);
      if (problem.text && !firstBadField) {
        firstBadField = problem.id;
      }
    });

    if (firstBadField) {
      preview.hidden = true;
      status.textContent = 'Please fix the problems shown above.';
      status.classList.add('is-error');
      document.getElementById(firstBadField).focus();
      return;
    }

    status.textContent = 'Form checked. See the preview below.';
    status.classList.remove('is-error');
    showPreview({
      name: name.trim(),
      email: email.trim(),
      topic: topic,
      message: message.trim()
    });
  });
}


/* ======================================================
   FEATURE 2: Gallery viewer (Previous / Next)
   ====================================================== */

// All photos live in one array: path, alt text and caption
const photos = [
  { src: 'images/photo1.jpg', alt: 'Kennedy Mwansa at home', caption: 'Me at home.' },
  { src: 'images/photo2.jpg', alt: 'Kennedy Mwansa at the lecture hall', caption: 'Me at the lecture hall.' },
  { src: 'images/photo3.jpg', alt: 'Kennedy Mwansa in town', caption: 'Me in town.' }
];

// Sets up the buttons and shows the chosen photo, caption and counter
function setupGallery() {
  const image = document.getElementById('gallery-image');
  const caption = document.getElementById('gallery-caption');
  const count = document.getElementById('gallery-count');
  const prevButton = document.getElementById('prev-photo');
  const nextButton = document.getElementById('next-photo');
  if (!image || !prevButton || !nextButton) return;

  let current = 0;

  function showPhoto(index) {
    current = index;
    image.src = photos[current].src;
    image.alt = photos[current].alt;
    caption.textContent = photos[current].caption;
    count.textContent = 'Photo ' + (current + 1) + ' of ' + photos.length;

    // First photo: no Previous. Last photo: no Next.
    prevButton.disabled = current === 0;
    nextButton.disabled = current === photos.length - 1;
  }

  prevButton.addEventListener('click', function () {
    if (current > 0) showPhoto(current - 1);
  });

  nextButton.addEventListener('click', function () {
    if (current < photos.length - 1) showPhoto(current + 1);
  });

  showPhoto(0);
}


/* ======================================================
   FEATURE 3: Theme switch (light / dark)
   ====================================================== */

// Sets up the theme button and remembers the visitor's choice
function setupThemeSwitch() {
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  // Applies a theme and updates the button text and state
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    button.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  let saved = null;
  try {
    saved = localStorage.getItem('portfolio-theme');
  } catch (error) {
    saved = null; // storage blocked: just use the default
  }
  applyTheme(saved === 'dark' ? 'dark' : 'light');

  button.addEventListener('click', function () {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch (error) {
      // saving is optional, so ignore the error
    }
  });
}


/* ======================================================
   FEATURE 4: Mobile navigation menu
   ====================================================== */

// Sets up the Menu button that opens and closes the links on narrow screens
function setupMobileNav() {
  const button = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  if (!button || !nav) return;

  // Opens or closes the menu and keeps the button label and state in step
  function setMenu(open) {
    nav.classList.toggle('open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.textContent = open ? 'Close' : 'Menu';
  }

  button.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });

  // Close the menu after a link is chosen
  nav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') setMenu(false);
  });

  // Escape closes the menu and returns focus to the button
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      button.focus();
    }
  });

  // If the window becomes wide again, reset the menu
  window.matchMedia('(min-width: 701px)').addEventListener('change', function (event) {
    if (event.matches) setMenu(false);
  });
}


/* ======================================================
   Start everything
   ====================================================== */
setupContactForm();
setupGallery();
setupThemeSwitch();
setupMobileNav();

/* ==========================================================
   Michael Ouyang Portfolio - script.js
   Sections: Mobile Menu, Scroll Progress, Scroll Reveal,
   Typing Effect, Animated Counters, Active Nav, Navbar Scroll,
   Theme Switch, Floating Particles, Project Filter,
   Contact Validation, Character Counter, EmailJS, Back to Top
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile Hamburger Menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll Progress Bar ---------- */
  const progressBar = document.getElementById('scroll-progress');

  function updateProgressBar() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ---------- Navbar Scroll Effect ---------- */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  /* ---------- Back to Top Button ---------- */
  const backToTop = document.getElementById('back-to-top');

  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Active Nav Highlight on Scroll ---------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (a) {
      const href = a.getAttribute('href').replace('#', '');
      a.classList.toggle('active', href === currentId);
    });
  }

  /* ---------- Combined scroll handler ---------- */
  function onScroll() {
    updateProgressBar();
    updateNavbar();
    updateBackToTop();
    updateActiveNav();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Theme Switch (Dark / Light) ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme === 'light') {
    root.classList.add('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      root.classList.toggle('light');
      const mode = root.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', mode);
    });
  }

  /* ---------- Floating Background Particles ---------- */
  const particleContainer = document.getElementById('particles');

  if (particleContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const particleCount = window.innerWidth < 760 ? 14 : 28;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 14 + 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      particleContainer.appendChild(p);
    }
  }

  /* ---------- Typing Effect (Hero) ---------- */
  const typingTarget = document.getElementById('typing-target');
  const typingPhrases = [
    'Computer Science Student',
    'Python Beginner',
    'C Language Learner',
    'Future Web Developer'
  ];

  if (typingTarget && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const currentPhrase = typingPhrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typingTarget.textContent = currentPhrase.slice(0, charIndex);
        if (charIndex === currentPhrase.length) {
          deleting = true;
          setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        charIndex--;
        typingTarget.textContent = currentPhrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        }
      }

      setTimeout(typeLoop, deleting ? 40 : 80);
    }

    typeLoop();
  } else if (typingTarget) {
    typingTarget.classList.add('typing-done');
  }

  /* ---------- Scroll Reveal + Animated Counters + Progress Bars ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        const counter = entry.target.querySelector('[data-count]');
        if (counter) animateCounter(counter);

        const bar = entry.target.querySelector('.progress-fill');
        if (bar) {
          requestAnimationFrame(function () {
            bar.style.width = bar.getAttribute('data-width') + '%';
          });
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    if (target === 0) {
      el.textContent = '0' + suffix;
      return;
    }

    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  /* ---------- Project Filter ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const noResults = document.getElementById('no-results');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      projectCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.classList.toggle('hidden-card', !show);
        if (show) visibleCount++;
      });

      if (noResults) noResults.hidden = visibleCount !== 0;
    });
  });

  /* ---------- Contact Form: Validation, Char Counter, EmailJS ---------- */
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('char-count');
  const submitBtn = document.getElementById('submit-btn');
  const toastWrap = document.getElementById('toast-wrap');

  /* EmailJS setup: replace the placeholders below with your own
     Public Key, Service ID and Template ID from emailjs.com before
     this form will actually send email. It fails safely until then. */
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  if (messageInput && charCount) {
    messageInput.addEventListener('input', function () {
      charCount.textContent = messageInput.value.length;
    });
  }

  function showToast(message, type) {
    if (!toastWrap) return;
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    toastWrap.appendChild(toast);

    setTimeout(function () {
      toast.classList.add('leaving');
      setTimeout(function () { toast.remove(); }, 300);
    }, 4000);
  }

  function setFieldError(input, errorEl, message) {
    if (message) {
      input.classList.add('invalid');
      errorEl.textContent = message;
    } else {
      input.classList.remove('invalid');
      errorEl.textContent = '';
    }
  }

  function validateForm() {
    let valid = true;

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    if (!nameInput.value.trim()) {
      setFieldError(nameInput, nameError, 'Please enter your name.');
      valid = false;
    } else {
      setFieldError(nameInput, nameError, '');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      setFieldError(emailInput, emailError, 'Please enter your email.');
      valid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address.');
      valid = false;
    } else {
      setFieldError(emailInput, emailError, '');
    }

    if (!messageInput.value.trim()) {
      setFieldError(messageInput, messageError, 'Please write a short message.');
      valid = false;
    } else if (messageInput.value.trim().length < 10) {
      setFieldError(messageInput, messageError, 'Message should be at least 10 characters.');
      valid = false;
    } else {
      setFieldError(messageInput, messageError, '');
    }

    return valid;
  }

  function setSubmitting(isSubmitting) {
    if (!submitBtn) return;
    const label = submitBtn.querySelector('.btn-label');
    const spinner = submitBtn.querySelector('.btn-spinner');
    submitBtn.disabled = isSubmitting;
    if (label) label.style.opacity = isSubmitting ? '0' : '1';
    if (spinner) spinner.hidden = !isSubmitting;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) {
        showToast('Please fix the highlighted fields.', 'error');
        return;
      }

      setSubmitting(true);

      const canSendReal = window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

      if (canSendReal) {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: nameInput.value.trim(),
          from_email: emailInput.value.trim(),
          message: messageInput.value.trim()
        }).then(function () {
          setSubmitting(false);
          showToast('Message sent, thanks for reaching out.', 'success');
          form.reset();
          if (charCount) charCount.textContent = '0';
        }).catch(function () {
          setSubmitting(false);
          showToast('Something went wrong, please try again.', 'error');
        });
      } else {
        /* No EmailJS keys configured yet, simulate the send so the
           interaction still feels complete during development. */
        setTimeout(function () {
          setSubmitting(false);
          showToast('Message ready to send, add your EmailJS keys in script.js to go live.', 'success');
          form.reset();
          if (charCount) charCount.textContent = '0';
        }, 900);
      }
    });
  }

});

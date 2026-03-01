/* ===========================
   HEADER SCROLL EFFECT
   =========================== */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===========================
   MOBILE MENU
   =========================== */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
});

// Close menu on link click
document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

/* ===========================
   SMOOTH SCROLL
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===========================
   SCROLL REVEAL
   =========================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ===========================
   FAQ ACCORDION
   =========================== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.faq-answer').classList.remove('open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ===========================
   LEAD FORM
   =========================== */
const form = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');

function showToast(msg, type = 'success') {
  toast.textContent = msg;
  toast.style.background = type === 'success' ? '#16a34a' : '#dc2626';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(inputId, errorId, show) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.classList.toggle('error', show);
  error.classList.toggle('show', show);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    let hasError = false;

    if (!name) { setError('name', 'nameError', true); hasError = true; }
    else { setError('name', 'nameError', false); }

    if (!email || !validateEmail(email)) { setError('email', 'emailError', true); hasError = true; }
    else { setError('email', 'emailError', false); }

    if (!phone) { setError('phone', 'phoneError', true); hasError = true; }
    else { setError('phone', 'phoneError', false); }

    if (hasError) return;

    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    showToast('Inscrição recebida! Entraremos em contato em breve.');
    form.reset();
    submitBtn.textContent = 'Quero me Inscrever Agora';
    submitBtn.disabled = false;
  });

  // Live validation clear
  ['name', 'email', 'phone'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
      const errorId = id === 'name' ? 'nameError' : id === 'email' ? 'emailError' : 'phoneError';
      setError(id, errorId, false);
    });
  });
}

/* ===========================
   PHONE MASK
   =========================== */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 7) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    else if (v.length > 0) v = `(${v}`;
    e.target.value = v;
  });
}

/* ===========================
   FOOTER YEAR
   =========================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===========================
   HERO PARALLAX (subtle)
   =========================== */
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}

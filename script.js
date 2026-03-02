/* =============================================
   FRAMES DATA
   ============================================= */
const FRAMES = [
  "https://i.ibb.co/3m1PjNFJ/ezgif-frame-043.jpg",
  "https://i.ibb.co/Hfykh52r/ezgif-frame-044.jpg",
  "https://i.ibb.co/Q36NSDpH/ezgif-frame-045.jpg",
  "https://i.ibb.co/b50b2PdS/ezgif-frame-046.jpg",
  "https://i.ibb.co/Xr6BnLCP/ezgif-frame-047.jpg",
  "https://i.ibb.co/0VQyf1rd/ezgif-frame-048.jpg",
  "https://i.ibb.co/p6DH4N8P/ezgif-frame-049.jpg",
  "https://i.ibb.co/WvDTYmR0/ezgif-frame-050.jpg",
  "https://i.ibb.co/nsyLmXst/ezgif-frame-051.jpg",
  "https://i.ibb.co/ksKGvvLY/ezgif-frame-052.jpg",
  "https://i.ibb.co/JjVxVJLh/ezgif-frame-053.jpg",
  "https://i.ibb.co/YTh7nXVL/ezgif-frame-054.jpg",
  "https://i.ibb.co/ymGLRns1/ezgif-frame-055.jpg"
];

/* =============================================
   HERO CANVAS SCROLL ANIMATION
   ============================================= */
(function initHero() {
  const canvas = document.getElementById('heroCanvas');
  const heroContainer = document.getElementById('hero');
  if (!canvas || !heroContainer) return;

  const ctx = canvas.getContext('2d');
  const images = [];
  let loadedCount = 0;
  let isReady = false;

  function drawImageCover(img) {
    const w = canvas.width;
    const h = canvas.height;
    const iRatio = img.width / img.height;
    const cRatio = w / h;
    let sw, sh, sx, sy;
    if (cRatio > iRatio) {
      sw = img.width;
      sh = img.width / cRatio;
    } else {
      sh = img.height;
      sw = img.height * cRatio;
    }
    sx = (img.width - sw) / 2;
    sy = (img.height - sh) / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  }

  function updateSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (isReady && images[0]) drawImageCover(images[0]);
  }

  function handleScroll() {
    if (!isReady) return;
    const scrollHeight = heroContainer.scrollHeight - window.innerHeight;
    const start = heroContainer.offsetTop;
    let progress = (window.scrollY - start) / scrollHeight;
    progress = Math.max(0, Math.min(1, progress));
    const frameIndex = Math.floor(progress * (FRAMES.length - 1));
    const img = images[frameIndex];
    if (img && img.complete) drawImageCover(img);
  }

  // Preload all images
  FRAMES.forEach((src, i) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      loadedCount++;
      if (loadedCount === FRAMES.length) {
        isReady = true;
        updateSize();
        handleScroll();
      }
      // Draw first frame as soon as it's loaded
      if (i === 0) {
        updateSize();
        drawImageCover(img);
      }
    };
    img.src = src;
    images.push(img);
  });

  updateSize();
  window.addEventListener('resize', updateSize);
  window.addEventListener('scroll', handleScroll, { passive: true });
})();

/* =============================================
   NAVBAR – scroll state & mobile menu
   ============================================= */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function updateNavbar() {
    const heroContainer = document.getElementById('hero');
    // The hero animation ends when the user has scrolled past the entire hero container
    const heroEnd = heroContainer ? heroContainer.offsetTop + heroContainer.offsetHeight : 0;
    navbar.classList.toggle('scrolled', window.scrollY >= heroEnd);
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  toggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', open);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
    });
  });
})();

/* =============================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================= */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

/* =============================================
   METHODOLOGY IMAGES – wrap inner div
   ============================================= */
(function initMethodImgs() {
  document.querySelectorAll('.method-img').forEach(wrap => {
    const img = wrap.querySelector('img');
    if (!img) return;
    const inner = document.createElement('div');
    inner.className = 'method-img-inner';
    wrap.appendChild(inner);
    inner.appendChild(img);
  });
})();

/* =============================================
   FOOTER YEAR
   ============================================= */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

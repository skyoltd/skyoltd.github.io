document.addEventListener('DOMContentLoaded', () => {

  // ---- footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- header scroll state ----
  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');
  const progressBar = document.getElementById('progressBar');

  function onScroll() {
    const y = window.scrollY;

    header.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('visible', y > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- hero background slideshow ----
  const heroSlides = document.querySelector('.hero-media');
  if (heroSlides) {
    const SLIDE_DELAY = 6000; // ms each image is shown
    let current = 0;
    let timer;

    function showSlide(step) {
      // query each time so images removed by onerror drop out of the rotation
      const slides = heroSlides.querySelectorAll('.hero-bg-img');
      if (slides.length < 2) return;
      slides.forEach(s => s.classList.remove('active'));
      current = (current + step + slides.length) % slides.length;
      slides[current].classList.add('active');
    }

    function restartTimer() {
      clearInterval(timer);
      timer = setInterval(() => showSlide(1), SLIDE_DELAY);
    }

    document.getElementById('heroPrev')?.addEventListener('click', () => { showSlide(-1); restartTimer(); });
    document.getElementById('heroNext')?.addEventListener('click', () => { showSlide(1); restartTimer(); });
    restartTimer();
  }

  // ---- mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- reveal on scroll ----
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

});

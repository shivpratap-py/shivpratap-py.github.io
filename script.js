document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Navbar active-section detection ---------- */
/* ---------- Navbar active-section detection ---------- */

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');

const setActive = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.dataset.section === id
    );
  });
};

const updateActiveSection = () => {
  const scrollPosition = window.scrollY + 150;

  let currentSection = 'home';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (scrollPosition >= sectionTop) {
      currentSection = section.id;
    }
  });

  setActive(currentSection);
};

window.addEventListener('scroll', updateActiveSection, {
  passive: true
});

updateActiveSection();
  /* ---------- Scroll down button ---------- */
  const scrollDownBtn = document.getElementById('scrollDown');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Resume download (placeholder link) ---------- */
  const resumeBtn = document.getElementById('resumeBtn');
  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Add your resume file link here (e.g. resume.pdf) to enable downloads.');
  });

  /* ---------- Skill bar fill on scroll ---------- */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.fill + '%';
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  /* ---------- Animated stat counters ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const statObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statObserver.observe(el));

  /* ---------- Navbar background on scroll ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.style.background = 'rgba(2, 9, 20, 0.85)';
      navbar.style.borderBottomColor = 'rgba(96, 165, 250, 0.18)';
    } else {
      navbar.style.background = 'rgba(2, 9, 20, 0.65)';
      navbar.style.borderBottomColor = 'rgba(96, 165, 250, 0.10)';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

});

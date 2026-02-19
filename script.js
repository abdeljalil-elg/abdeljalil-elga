/* ===========================
   PORTFOLIO — script.js
   Professional interactions
=========================== */

// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  const followerEl = document.getElementById('cursor-follower');
  if (followerEl) {
    followerEl.style.left = followerX + 'px';
    followerEl.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effects on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-category, .tool');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    document.getElementById('cursor-follower').classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    document.getElementById('cursor-follower').classList.remove('hover');
  });
});

// ===========================
// NAVIGATION — SCROLL EFFECT
// ===========================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===========================
// MOBILE MENU
// ===========================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  
  const spans = menuToggle.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  });
});

// ===========================
// REVEAL ON SCROLL
// ===========================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay for sibling elements
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sibling, index) => {
        if (sibling === entry.target) {
          delay = index * 80;
        }
      });
      
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===========================
// SKILL BARS ANIMATION
// ===========================
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const targetWidth = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = targetWidth + '%';
      }, 200);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));

// ===========================
// COUNTER ANIMATION
// ===========================
const statNumbers = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      animateCounter(el, 0, target, 1500);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(num => counterObserver.observe(num));

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = Math.floor(start + (end - start) * eased);
    el.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = end;
    }
  }
  
  requestAnimationFrame(update);
}

// ===========================
// PROJECT FILTER
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach((card, index) => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = `fadeIn 0.4s ease ${index * 60}ms both`;
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// CONTACT FORM
// ===========================
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const btn = form.querySelector('.btn-primary');
  const btnText = btn.querySelector('.btn-text');
  const btnIcon = btn.querySelector('.btn-icon');
  
  // Loading state
  btnText.textContent = 'Envoi en cours...';
  btnIcon.textContent = '⋯';
  btn.disabled = true;
  btn.style.opacity = '0.7';
  
  // Simulate sending
  setTimeout(() => {
    btnText.textContent = 'Envoyer le message';
    btnIcon.textContent = '→';
    btn.disabled = false;
    btn.style.opacity = '1';
    form.reset();
    formSuccess.classList.add('show');
    
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);
  }, 1800);
});

// Input label animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.closest('.form-group').classList.add('focused');
  });
  input.addEventListener('blur', function() {
    this.closest('.form-group').classList.remove('focused');
  });
});

// ===========================
// PARALLAX HERO ORBS
// ===========================
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  
  if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, {
  rootMargin: '-50% 0px -50% 0px'
});

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// TYPEWRITER EFFECT (subtitle)
// ===========================
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const originalText = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.opacity = '1';
  
  let i = 0;
  function typeWriter() {
    if (i < originalText.length) {
      subtitle.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  
  // Start after hero reveals
  setTimeout(typeWriter, 800);
}

// ===========================
// CSS INJECTION — fadeIn keyframe
// ===========================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ===========================
// PAGE LOAD — stagger hero reveal
// ===========================
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero .reveal');
  heroElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 150);
  });
});
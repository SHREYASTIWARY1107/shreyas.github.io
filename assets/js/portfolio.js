/* ==========================================
   SHREYAS TIWARY PORTFOLIO JS
   ========================================== */

// ---- Floating Navbar: slide in after brief delay ----
const nav = document.getElementById('floatingNav');
setTimeout(() => {
  nav.classList.add('visible');
}, 300);

// Active nav link highlight on scroll
const sectionIds = ['about', 'projects', 'experience', 'research', 'contact'];
const navLinks = nav.querySelectorAll('a');

const setActiveLink = () => {
  let current = '';
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 200) current = id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#CBACF9' : '';
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });

// ---- Word reveal animation on hero ----
const wordReveal = document.getElementById('wordReveal');
if (wordReveal) {
  const words = wordReveal.querySelectorAll('span');
  words.forEach((w, i) => {
    setTimeout(() => w.classList.add('revealed'), 200 + i * 120);
  });
}

// ---- Canvas card hover (approach section) ----
document.querySelectorAll('.canvas-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('group'));
  card.addEventListener('mouseleave', () => {
    // keep group class to allow CSS transitions to complete
  });
});

// ---- Copy email ----
function copyEmail() {
  const email = 'shreyastiwary@gmail.com';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(showCopyToast);
  } else {
    const el = document.createElement('textarea');
    el.value = email;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showCopyToast();
  }
}

function showCopyToast() {
  document.querySelectorAll('.copy-toast').forEach(t => {
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  });
}

window.copyEmail = copyEmail;

// ---- Smooth scroll for nav anchors ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Pin cards: subtle 3D tilt on mouse move ----
document.querySelectorAll('.pin-wrap').forEach(wrap => {
  const box = wrap.querySelector('.pin-box');
  if (!box) return;

  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    box.style.transform = `translate(-50%, -50%) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
  });

  wrap.addEventListener('mouseleave', () => {
    box.style.transform = 'translate(-50%, -50%) rotateX(0deg) rotateY(0deg)';
    box.style.transition = 'transform 0.5s ease';
    setTimeout(() => { box.style.transition = ''; }, 500);
  });
});

// ---- Spotlight parallax on hero ----
document.addEventListener('mousemove', e => {
  const pct = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
  const sp = document.querySelector('.spotlight-white');
  if (sp) {
    sp.style.transform = `translate(${pct.x * 20}px, ${pct.y * 20}px)`;
  }
});

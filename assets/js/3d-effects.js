/**
 * 3D Effects and Interactions
 */

(function() {
  'use strict';

  // Don't run heavy 3D effects on mobile
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

  // 3D Card Tilt Effect
  const cards = document.querySelectorAll('.card-3d, .portfolio-item, .icon-box, .services .icon-box');
  
  if (!isMobile) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // Magnetic Effect (only on desktop)
  if (!isMobile) {
    const magneticElements = document.querySelectorAll('.magnetic, a, button, .social-links a');
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.2;
        const moveY = y * 0.2;
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Scroll Reveal
  const revealElements = document.querySelectorAll('.reveal, .animate-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

})();


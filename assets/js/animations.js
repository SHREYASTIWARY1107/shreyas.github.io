/**
 * Modern Animations and Interactive Features
 * Portfolio Website Redesign
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  //--------------------------------------------------------------
  // Scroll to Top Button
  //--------------------------------------------------------------
  function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  //--------------------------------------------------------------
  // Scroll-triggered Animations
  //--------------------------------------------------------------
  function initScrollAnimations() {
    if (prefersReducedMotion) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          // Add animation class based on data attribute
          const animationType = entry.target.dataset.animation || 'fadeInUp';
          entry.target.classList.add(animationType);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  //--------------------------------------------------------------
  // Stagger Animation for Lists
  //--------------------------------------------------------------
  function initStaggerAnimations() {
    if (prefersReducedMotion) return;

    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.dataset.animation = 'fadeInUp';
        item.style.opacity = '0';
        item.classList.add(`stagger-${Math.min(index + 1, 8)}`);
      });
    });
  }

  //--------------------------------------------------------------
  // Active Section Indicator
  //--------------------------------------------------------------
  function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
      let current = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  //--------------------------------------------------------------
  // Smooth Scroll Enhancement
  //--------------------------------------------------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#header') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  //--------------------------------------------------------------
  // Parallax Effect (Subtle)
  //--------------------------------------------------------------
  function initParallax() {
    if (prefersReducedMotion) return;

    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  //--------------------------------------------------------------
  // Card Tilt Effect (3D)
  //--------------------------------------------------------------
  function initCardTilt() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  //--------------------------------------------------------------
  // Page Loader
  //--------------------------------------------------------------
  function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        // Initialize animations after page load
        initScrollAnimations();
        initStaggerAnimations();
      }, 500);
    });
  }

  //--------------------------------------------------------------
  // Typed Text Enhancement
  //--------------------------------------------------------------
  function enhanceTypedText() {
    const typedElement = document.querySelector('.typing');
    if (!typedElement) return;

    // Add cursor animation
    typedElement.style.position = 'relative';
  }

  //--------------------------------------------------------------
  // Skills Logo Animation
  //--------------------------------------------------------------
  function initSkillsAnimation() {
    const skillLogos = document.querySelectorAll('.skills img');
    
    skillLogos.forEach((logo, index) => {
      logo.style.transitionDelay = `${index * 0.05}s`;
      logo.classList.add('animate-on-scroll');
      logo.dataset.animation = 'scaleIn';
    });
  }

  //--------------------------------------------------------------
  // Counter Animation (if counters exist)
  //--------------------------------------------------------------
  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(counter);
    });
  }

  //--------------------------------------------------------------
  // Initialize All Features
  //--------------------------------------------------------------
  function init() {
    // Create scroll to top button if it doesn't exist
    if (!document.querySelector('.scroll-to-top')) {
      const scrollBtn = document.createElement('button');
      scrollBtn.className = 'scroll-to-top';
      scrollBtn.setAttribute('aria-label', 'Scroll to top');
      scrollBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
      document.body.appendChild(scrollBtn);
    }

    // Initialize all features
    initScrollToTop();
    initScrollAnimations();
    initStaggerAnimations();
    initActiveSection();
    initSmoothScroll();
    initParallax();
    initCardTilt();
    initPageLoader();
    enhanceTypedText();
    initSkillsAnimation();
    initCounterAnimation();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


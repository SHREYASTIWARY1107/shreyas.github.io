/**
 * Particle System
 */

(function() {
  'use strict';

  // Don't run on mobile for performance
  if (window.innerWidth <= 768 || 'ontouchstart' in window) {
    return;
  }

  const particleCount = 50;
  const particles = [];

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    const colors = ['#12d640', '#8b5cf6', '#06b6d4', '#35e888'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    const duration = Math.random() * 10 + 10;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    document.body.appendChild(particle);
    particles.push(particle);
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  // Create animated blobs
  const blob1 = document.createElement('div');
  blob1.className = 'animated-blob blob-1';
  document.body.appendChild(blob1);

  const blob2 = document.createElement('div');
  blob2.className = 'animated-blob blob-2';
  document.body.appendChild(blob2);

  const blob3 = document.createElement('div');
  blob3.className = 'animated-blob blob-3';
  document.body.appendChild(blob3);

})();


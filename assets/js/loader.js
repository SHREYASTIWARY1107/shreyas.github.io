/**
 * Premium Loading Screen
 * Entrepreneur-Focused Loading Experience
 */

(function() {
  'use strict';

  // Create loader HTML structure
  function createLoaderHTML() {
    const loader = document.createElement('div');
    loader.className = 'loader-screen';
    loader.id = 'loaderScreen';
    
    loader.innerHTML = `
      <div class="loader-particles" id="loaderParticles"></div>
      <div class="loader-content">
        <div class="loader-name">
          <span class="name-part">SHREYAS TIWARY</span>
        </div>
        <div class="loader-tagline">
          <span class="tagline-text">Transforming Vision Into Reality</span>
        </div>
        <div class="loader-progress-container">
          <div class="loader-progress-circle">
            <svg viewBox="0 0 100 100">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#12d640;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
                </linearGradient>
              </defs>
              <circle class="progress-ring progress-ring-bg" cx="50" cy="50" r="45"></circle>
              <circle class="progress-ring progress-ring-fill" cx="50" cy="50" r="45" id="progressRing"></circle>
            </svg>
            <div class="loader-progress-text" id="progressText">0%</div>
          </div>
          <div class="loader-message">
            Loading Innovation<span class="loader-dots"><span></span><span></span><span></span></span>
          </div>
        </div>
      </div>
      <button class="loader-skip" id="loaderSkip" style="display: none;">Skip</button>
    `;
    
    document.body.insertBefore(loader, document.body.firstChild);
    return loader;
  }

  // Create floating particles
  function createParticles() {
    const particlesContainer = document.getElementById('loaderParticles');
    if (!particlesContainer) return;
    
    const particleCount = 20;
    const colors = ['#12d640', '#8b5cf6', '#06b6d4'];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'loader-particle';
      
      const size = Math.random() * 3 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
      
      particlesContainer.appendChild(particle);
    }
  }

  // Update progress
  function updateProgress(percentage) {
    const progressRing = document.getElementById('progressRing');
    const progressText = document.getElementById('progressText');
    
    if (progressRing && progressText) {
      const circumference = 2 * Math.PI * 45; // radius = 45
      const offset = circumference - (percentage / 100) * circumference;
      
      progressRing.style.strokeDashoffset = offset;
      progressText.textContent = Math.round(percentage) + '%';
    }
  }

  // Simulate loading progress
  function simulateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 95) {
        progress = 95;
        clearInterval(interval);
      }
      updateProgress(progress);
    }, 200);
    
    return interval;
  }

  // Check if assets are loaded
  function checkAssetsLoaded() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
        return;
      }
      
      window.addEventListener('load', resolve);
      
      // Fallback timeout
      setTimeout(resolve, 5000);
    });
  }

  // Hide loader
  function hideLoader() {
    const loader = document.getElementById('loaderScreen');
    if (loader) {
      loader.classList.add('hidden');
      
      // Remove loading class to show main content
      document.body.classList.remove('loading');
      
      setTimeout(() => {
        loader.remove();
        // Show main content
        document.body.style.overflow = '';
      }, 800);
    }
  }

  // Initialize loader
  function initLoader() {
    // Don't show loader on mobile if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth <= 768) {
      document.body.classList.remove('loading');
      return;
    }

    // Mark body as loading
    document.body.classList.add('loading');
    
    // Create loader
    const loader = createLoaderHTML();
    document.body.style.overflow = 'hidden';
    
    // Create particles
    createParticles();
    
    // Start progress simulation
    const progressInterval = simulateProgress();
    
    // Show skip button after 3 seconds
    setTimeout(() => {
      const skipBtn = document.getElementById('loaderSkip');
      if (skipBtn) {
        skipBtn.style.display = 'block';
        skipBtn.addEventListener('click', () => {
          clearInterval(progressInterval);
          updateProgress(100);
          setTimeout(hideLoader, 500);
        });
      }
    }, 3000);
    
    // Wait for assets and minimum display time
    const minDisplayTime = 2500; // 2.5 seconds minimum
    const startTime = Date.now();
    
    Promise.all([
      checkAssetsLoaded(),
      new Promise(resolve => setTimeout(resolve, minDisplayTime))
    ]).then(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);
      
      setTimeout(() => {
        clearInterval(progressInterval);
        updateProgress(100);
        setTimeout(hideLoader, 500);
      }, remaining);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoader);
  } else {
    initLoader();
  }

})();


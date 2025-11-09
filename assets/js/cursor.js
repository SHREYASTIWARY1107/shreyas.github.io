/**
 * Custom Interactive Cursor System
 */

(function() {
  'use strict';

  // Don't run on mobile devices
  if (window.innerWidth <= 768 || 'ontouchstart' in window) {
    return;
  }

  // Create custom cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // Create cursor trail
  const trails = [];
  const trailCount = 10;
  
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = (trailCount - i) / trailCount * 0.3;
    document.body.appendChild(trail);
    trails.push({
      element: trail,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    });
  }

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // Update cursor position
  function updateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Update trail
    trails.forEach((trail, index) => {
      if (index === 0) {
        trail.targetX = mouseX;
        trail.targetY = mouseY;
      } else {
        trail.targetX = trails[index - 1].x;
        trail.targetY = trails[index - 1].y;
      }

      trail.x += (trail.targetX - trail.x) * 0.2;
      trail.y += (trail.targetY - trail.y) * 0.2;

      trail.element.style.left = trail.x + 'px';
      trail.element.style.top = trail.y + 'px';
    });

    requestAnimationFrame(updateCursor);
  }

  // Mouse move event
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .icon-box, .card-3d');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });

  // Click effect
  document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
  });

  // Hide cursor on mobile
  function checkMobile() {
    if (window.innerWidth <= 768) {
      cursor.style.display = 'none';
      trails.forEach(trail => trail.element.style.display = 'none');
      document.body.style.cursor = 'auto';
    } else {
      cursor.style.display = 'block';
      trails.forEach(trail => trail.element.style.display = 'block');
    }
  }
  
  checkMobile();
  window.addEventListener('resize', checkMobile);

  // Start animation loop
  updateCursor();

})();


import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Dot follows instantly (no lerp) for low latency
      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Animation loop for the main cursor effect (smooth following)
    let animationId;
    const animate = () => {
      // Main cursor follows with smooth lerp
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }

      animationId = requestAnimationFrame(animate);
    };

    // Detect hoverable elements
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll(
        'a, button, .project, .tab-button, .contact-details, .btn-resume, .theme-toggle, .blob-wrapper'
      );
      
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    animate();
    
    // Set up hover detection after DOM is ready
    const timeoutId = setTimeout(addHoverListeners, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Main cursor effect - the flashlight/shadow */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
      />
      {/* Dot cursor - follows instantly */}
      <div
        ref={dotRef}
        className={`cursor-dot ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
      />
    </>
  );
}

export default CustomCursor;

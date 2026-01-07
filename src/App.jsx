import React, { useEffect, useRef } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS file
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import ReactGA from 'react-ga4';
import Experience from './Experience';
import Nav from './Nav';
import Welcome from './Welcome';
import Project from './Project';
import Contact from './Contact';
import CustomCursor from './components/CustomCursor';

// Initialize Google Analytics
ReactGA.initialize('G-2YLYZ2F5T2');

function App() {
  const lenisRef = useRef(null);

  // Track page view on mount
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,           // Scroll duration (higher = smoother but slower)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      orientation: 'vertical', // Scroll direction
      gestureOrientation: 'vertical',
      smoothWheel: true,       // Enable smooth wheel scrolling
      wheelMultiplier: 1,      // Wheel scroll speed
      touchMultiplier: 2,      // Touch scroll speed
      infinite: false,         // Infinite scroll
    });

    lenisRef.current = lenis;

    // Animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to AOS scroll events
    lenis.on('scroll', () => {
      AOS.refresh();
    });

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
      offset: 120,
      delay: 0,
      duration: 400,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  return (
    <>
      <CustomCursor />
      <Nav />
      <Welcome />
      <Experience />
      <Project  />
      <Contact />
    </>
  );
}

export default App;
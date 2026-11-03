import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './App.css';
import Nav from './Nav';
import Welcome from './Welcome';
import Experience from './Experience';
import Project from './Project';
import Contact from './Contact';
import CustomCursor from './components/CustomCursor';
import { prefersReducedMotion, setLenis } from './lib/scroll';
import { profile } from './data/content';

function App() {
  // App is the single owner of smooth scrolling and scroll-reveal animations.
  useEffect(() => {
    const reduced = prefersReducedMotion();

    AOS.init({ disable: reduced, offset: 120, duration: 500, easing: 'ease', once: true });

    // AOS caches trigger positions; recompute them whenever the page height changes
    // (switching experience tabs, fonts or images loading) or later sections never reveal.
    let refreshFrame = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => AOS.refresh());
    });
    resizeObserver.observe(document.body);
    const stopObserving = () => {
      cancelAnimationFrame(refreshFrame);
      resizeObserver.disconnect();
    };

    if (reduced) return stopObserving;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    setLenis(lenis);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      stopObserving();
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <Welcome />
        <Experience />
        <Project />
        <Contact />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </footer>
    </>
  );
}

export default App;

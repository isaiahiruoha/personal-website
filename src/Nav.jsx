import React, { useState, useEffect } from 'react';
import './App.css';
import ThemeToggle from './components/ThemeToggle';
import PacmanTransition from './components/PacmanTransition';

function Nav() {
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [pacmanActive, setPacmanActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY) {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const sections = ['welcome-section', 'experience', 'projects', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id || entry.target.className;
          if (id.includes('welcome')) {
            setActiveSection('about');
          } else {
            setActiveSection(entry.target.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId) || 
                      document.querySelector(`.${sectionId}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    if (pacmanActive) return;
    setPacmanActive(true);
  };
  
  const handlePacmanComplete = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.dispatchEvent(new CustomEvent('resetTypingText'));
    setTimeout(() => {
      setPacmanActive(false);
    }, 1000);
  };

  return (
    <>
      <PacmanTransition isActive={pacmanActive} onComplete={handlePacmanComplete} />
      
      <nav id="navbar" className={`nav ${isHidden ? 'nav-hidden' : ''}`}>
        <a id="logo" href="/" onClick={scrollToTop}>
          <span className="logo-bracket logo-bracket-left">&lt;</span>
          <span className="logo-text">II</span>
          <span className="logo-bracket logo-bracket-right">/&gt;</span>
        </a>
      <ul className="nav-list">
        <li className="nav-item">
          <a 
            href="#welcome-section" 
            onClick={(e) => handleNavClick(e, '#welcome-section')}
            className={activeSection === 'about' ? 'active' : ''}
          >
            <span className="nav-text">About</span>
            <span className="nav-underline"></span>
          </a>
        </li>
        <li className="nav-item">
          <a 
            href="#experience" 
            onClick={(e) => handleNavClick(e, '#experience')}
            className={activeSection === 'experience' ? 'active' : ''}
          >
            <span className="nav-text">Experience</span>
            <span className="nav-underline"></span>
          </a>
        </li>
        <li className="nav-item">
          <a 
            href="#projects" 
            onClick={(e) => handleNavClick(e, '#projects')}
            className={activeSection === 'projects' ? 'active' : ''}
          >
            <span className="nav-text">Projects</span>
            <span className="nav-underline"></span>
          </a>
        </li>
        <li className="nav-item">
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className={activeSection === 'contact' ? 'active' : ''}
          >
            <span className="nav-text">Contact</span>
            <span className="nav-underline"></span>
          </a>
        </li>
        <li className="theme-toggle-container">
          <ThemeToggle />
        </li>
      </ul>
      </nav>
    </>
  );
}

export default Nav;

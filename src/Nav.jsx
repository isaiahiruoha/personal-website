import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import { isProgrammaticScroll, scrollToSection } from './lib/scroll';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

// The section whose top has passed a line a third of the way down the viewport is the active one.
// At the very bottom of the page the last section wins, since it may be too short to reach that line.
function currentSection() {
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (atBottom) return SECTIONS[SECTIONS.length - 1].id;

  const line = window.innerHeight / 3;
  let active = SECTIONS[0].id;
  for (const { id } of SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) active = id;
  }
  return active;
}

function Nav() {
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const navRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      const navHasFocus = navRef.current?.contains(document.activeElement);

      if (y < 120 || navHasFocus) {
        setIsHidden(false);
      } else if (delta > 4 && !isProgrammaticScroll()) {
        setIsHidden(true);
      } else if (delta < -4) {
        setIsHidden(false);
      }
      if (Math.abs(delta) > 4) lastY = y;
      setActiveSection(currentSection());
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    setIsHidden(false);
    setActiveSection(id);
    scrollToSection(id);
  };

  return (
    <header>
      <nav
        id="navbar"
        ref={navRef}
        aria-label="Primary"
        className={`nav ${isHidden ? 'nav-hidden' : ''}`}
        onFocus={() => setIsHidden(false)}
      >
        <a
          id="logo"
          href="#about"
          aria-label="II, Isaiah Iruoha, back to top"
          data-event="nav_click"
          data-event-section="logo"
          onClick={(e) => handleNavClick(e, 'about')}
        >
          <span className="logo-bracket logo-bracket-left" aria-hidden="true">&lt;</span>
          <span className="logo-text" aria-hidden="true">II</span>
          <span className="logo-bracket logo-bracket-right" aria-hidden="true">/&gt;</span>
        </a>
        <ul className="nav-list">
          {SECTIONS.map(({ id, label }) => (
            <li key={id} className="nav-item">
              <a
                href={`#${id}`}
                data-event="nav_click"
                data-event-section={id}
                onClick={(e) => handleNavClick(e, id)}
                className={activeSection === id ? 'active' : undefined}
                aria-current={activeSection === id ? 'location' : undefined}
              >
                <span className="nav-text">{label}</span>
                <span className="nav-underline" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Nav;

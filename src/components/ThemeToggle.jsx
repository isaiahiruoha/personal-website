import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { track } from '../lib/analytics';

const STORAGE_KEY = 'theme';

// index.html sets data-theme before first paint, so React starts from whatever the page already shows.
const currentTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

function readStoredTheme() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function applyTheme(theme, { persist, animate }) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 350);
  }
  root.dataset.theme = theme;
  if (persist) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked (private mode, strict cookie settings); the theme still applies for this visit.
    }
  }
}

function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  // Follow OS theme changes until the visitor picks a theme themselves.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => {
      if (readStoredTheme()) return;
      const next = event.matches ? 'dark' : 'light';
      applyTheme(next, { persist: false, animate: true });
      setTheme(next);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next, { persist: true, animate: true });
    setTheme(next);
    track('theme_change', { theme: next });
  };

  const isDark = theme === 'dark';
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Dark mode" aria-pressed={isDark}>
      {isDark ? <Sun size={20} strokeWidth={2} aria-hidden="true" /> : <Moon size={20} strokeWidth={2} aria-hidden="true" />}
    </button>
  );
}

export default ThemeToggle;

// Shared smooth-scroll state so navigation and the Lenis instance stay in sync.

let lenis = null;
let programmaticScroll = false;
let programmaticTimer;

export function setLenis(instance) {
  lenis = instance;
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// True while a scroll started by a nav click is in flight, so the nav does not hide itself mid-jump.
export function isProgrammaticScroll() {
  return programmaticScroll;
}

function finish() {
  window.clearTimeout(programmaticTimer);
  programmaticScroll = false;
}

export function scrollToSection(id) {
  const target = id === 'about' ? 0 : document.getElementById(id);
  if (target === null) return;

  const navHeight = document.getElementById('navbar')?.offsetHeight ?? 0;
  const immediate = prefersReducedMotion();
  programmaticScroll = true;
  // Safety net in case the scroll is interrupted and never reports completion.
  programmaticTimer = window.setTimeout(finish, 2000);

  if (lenis) {
    lenis.scrollTo(target, { offset: target === 0 ? 0 : -navHeight, immediate, onComplete: finish });
  } else {
    const top = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
    window.setTimeout(finish, immediate ? 0 : 900);
  }

  if (window.location.hash !== `#${id}`) {
    window.history.replaceState(null, '', id === 'about' ? window.location.pathname : `#${id}`);
  }
}

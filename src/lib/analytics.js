// GA4 event tracking. index.html only defines window.gtag on the production domain, so every call
// here is a no-op in local development and tests unless gtag is stubbed.

const sentOnce = new Set();

export function track(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

// For interactions worth counting once per page view (first erase, first drag, a section coming into view).
export function trackOnce(name, params = {}) {
  const key = `${name}:${JSON.stringify(params)}`;
  if (sentOnce.has(key)) return;
  sentOnce.add(key);
  track(name, params);
}

const toSnakeCase = (key) => key.replace(/[A-Z]/g, (char, index) => (index ? '_' : '') + char.toLowerCase());

// Links declare their event in markup: data-event="project_click" data-event-project="ReceiptVault"
// sends project_click with { project: 'ReceiptVault' }. One delegated listener covers the whole page,
// including middle and modifier clicks that open a new tab.
export function installClickTracking() {
  const onClick = (event) => {
    if (event.type === 'auxclick' && event.button !== 1) return;
    const el = event.target.closest?.('[data-event]');
    if (!el) return;
    const params = {};
    for (const [key, value] of Object.entries(el.dataset)) {
      if (key.startsWith('event') && key !== 'event') params[toSnakeCase(key.slice('event'.length))] = value;
    }
    track(el.dataset.event, params);
  };
  document.addEventListener('click', onClick, { capture: true });
  document.addEventListener('auxclick', onClick, { capture: true });
  return () => {
    document.removeEventListener('click', onClick, { capture: true });
    document.removeEventListener('auxclick', onClick, { capture: true });
  };
}

// Reports how far visitors get: one section_view per section, the first time it reaches the upper 60% of
// the viewport. A margin rather than a visibility ratio, so sections taller than the screen still count.
export function installSectionTracking(ids) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          trackOnce('section_view', { section: entry.target.id });
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -40% 0px' }
  );
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
  return () => observer.disconnect();
}

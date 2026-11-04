import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { track } from './lib/analytics';

describe('analytics events', () => {
  let gtag;

  beforeEach(() => {
    gtag = vi.fn();
    window.gtag = gtag;
  });

  afterEach(() => {
    delete window.gtag;
  });

  const events = () => gtag.mock.calls.filter(([type]) => type === 'event').map(([, name, params]) => [name, params]);

  it('reports resume, contact and project clicks with their details', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: /resume/i }));
    fireEvent.click(screen.getByRole('link', { name: 'LinkedIn' }));
    fireEvent.click(screen.getByRole('heading', { level: 3, name: 'ReceiptVault' }).closest('a'));

    expect(events()).toEqual(
      expect.arrayContaining([
        ['resume_click', {}],
        ['contact_click', { method: 'linkedin' }],
        ['project_click', { project: 'ReceiptVault' }],
      ])
    );
  });

  it('counts middle clicks that open a link in a new tab', () => {
    render(<App />);

    fireEvent(screen.getByRole('link', { name: 'GitHub' }), new MouseEvent('auxclick', { bubbles: true, button: 1 }));

    expect(events()).toContainEqual(['contact_click', { method: 'github' }]);
  });

  it('reports experience tab changes from clicks and the keyboard, but not re-selecting the open tab', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('tab', { name: 'Work Experience' }));
    fireEvent.click(screen.getByRole('tab', { name: 'Education' }));
    fireEvent.keyDown(screen.getByRole('tab', { name: 'Education' }), { key: 'ArrowRight' });

    expect(events().filter(([name]) => name === 'experience_tab')).toEqual([
      ['experience_tab', { tab: 'education' }],
      ['experience_tab', { tab: 'extracurriculars' }],
    ]);
  });

  it('reports nav clicks and theme changes', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('navigation', { name: 'Primary' }).querySelector('a[href="#projects"]'));
    fireEvent.click(screen.getByRole('button', { name: 'Dark mode' }));

    expect(events()).toEqual(
      expect.arrayContaining([
        ['nav_click', { section: 'projects' }],
        ['theme_change', { theme: 'dark' }],
      ])
    );
  });

  it('does nothing when analytics is not loaded (local development)', () => {
    delete window.gtag;
    expect(() => track('resume_click')).not.toThrow();
  });
});

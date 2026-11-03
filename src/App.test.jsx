import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { projects } from './data/content';

describe('App', () => {
  it('renders every main section', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Isaiah Iruoha' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Skills' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /resume/i })).toBeInTheDocument();
  });

  it('links to the main contact channels and nothing personal', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', expect.stringContaining('github.com'));
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', expect.stringContaining('linkedin.com'));
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', 'mailto:isaiahiruoha@gmail.com');
    expect(screen.queryByRole('link', { name: 'Instagram' })).not.toBeInTheDocument();
  });

  it('shows current experience and no stale copy', () => {
    render(<App />);

    expect(screen.getAllByText('Software Development Engineering Intern')).toHaveLength(2);
    expect(screen.getByText('Sep 2025 - Jun 2026')).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/eventually/i);
    expect(document.body.textContent).toContain(`© ${new Date().getFullYear()} Isaiah Iruoha`);
  });

  it('lists every extracurricular when its tab is opened', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('tab', { name: 'Extracurriculars' }));
    expect(screen.getByRole('tab', { name: 'Extracurriculars' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Senior Project Manager')).toBeInTheDocument();
    expect(screen.getByText("Queen's Hyperloop Design Team")).toBeInTheDocument();
  });

  it('moves between experience tabs with the arrow keys', () => {
    render(<App />);

    const work = screen.getByRole('tab', { name: 'Work Experience' });
    fireEvent.keyDown(work, { key: 'ArrowRight' });
    const educationTab = screen.getByRole('tab', { name: 'Education' });
    expect(educationTab).toHaveAttribute('aria-selected', 'true');
    expect(educationTab).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Bachelor of Applied Science');

    fireEvent.keyDown(educationTab, { key: 'End' });
    expect(screen.getByRole('tab', { name: 'Extracurriculars' })).toHaveFocus();
  });

  it('has a navigation link for every section', () => {
    render(<App />);

    const nav = screen.getByRole('navigation', { name: 'Primary' });
    for (const id of ['experience', 'projects', 'contact']) {
      expect(document.getElementById(id)).not.toBeNull();
      expect(nav.querySelector(`a[href="#${id}"]`)).not.toBeNull();
    }
  });

  it('features every project as a clean linked card', () => {
    render(<App />);

    for (const project of projects) {
      const title = screen.getByRole('heading', { level: 3, name: project.title });
      const card = title.closest('a');
      expect(card).toHaveAttribute('href', project.link);
    }
    expect(document.body.textContent).not.toMatch(/Buyonic|Excel-Lite/);
  });
});

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
    expect(screen.getByRole('heading', { name: 'Skills' })).toBeInTheDocument();
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

    fireEvent.click(screen.getByRole('button', { name: 'Extracurriculars' }));
    expect(screen.getByText('Senior Project Manager')).toBeInTheDocument();
    expect(screen.getByText("Queen's Hyperloop Design Team")).toBeInTheDocument();
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

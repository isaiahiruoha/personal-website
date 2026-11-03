import { Cpu, Mail } from 'lucide-react';
import {
  siApple,
  siCplusplus,
  siD3,
  siGithub,
  siJupyter,
  siOpencv,
  siPandas,
  siPython,
  siPytorch,
  siQt,
  siReact,
  siSwift,
} from 'simple-icons';

const brandIcons = {
  Python: siPython,
  Jupyter: siJupyter,
  pandas: siPandas,
  React: siReact,
  'D3.js': siD3,
  Swift: siSwift,
  CoreML: siApple,
  'C++': siCplusplus,
  Qt: siQt,
  PyTorch: siPytorch,
  OpenCV: siOpencv,
};

// Relative luminance per WCAG, used to swap brand colours that would vanish against a theme's card colour.
function luminance(hex) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [a, b].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const LIGHT_SURFACE = luminance('ffffff');
const DARK_SURFACE = luminance('262626');

function BrandSvg({ icon, size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  );
}

export function TechIcon({ name }) {
  const brand = brandIcons[name];
  const lum = brand ? luminance(brand.hex) : null;
  const style = brand
    ? {
        '--brand-light': contrast(lum, LIGHT_SURFACE) < 2 ? 'var(--text)' : `#${brand.hex}`,
        '--brand-dark': contrast(lum, DARK_SURFACE) < 2.5 ? 'var(--text)' : `#${brand.hex}`,
      }
    : undefined;

  return (
    <span className="tech-icon" title={name} style={style}>
      {brand ? <BrandSvg icon={brand} /> : <Cpu size={20} strokeWidth={2} aria-hidden="true" />}
      <span className="visually-hidden">{name}</span>
    </span>
  );
}

function LinkedInGlyph({ size }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.35h-4v-4.75c0-1.13-.02-2.59-1.58-2.59-1.58 0-1.82 1.23-1.82 2.5v4.84h-4v-11Z" />
    </svg>
  );
}

export function ContactIcon({ name, size = 26 }) {
  if (name === 'github') return <BrandSvg icon={siGithub} size={size} />;
  if (name === 'linkedin') return <LinkedInGlyph size={size} />;
  return <Mail size={size} strokeWidth={2} aria-hidden="true" />;
}

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/scroll';

const HOVER_TARGETS = 'a, button, [role="tab"], .blob-wrapper';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

function CustomCursor() {
  const [enabled] = useState(() => typeof window !== 'undefined' && window.matchMedia(FINE_POINTER).matches);
  const blobRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const root = document.documentElement;
    const blob = blobRef.current;
    const dot = dotRef.current;
    // With reduced motion the trailing blob tracks the pointer exactly instead of easing behind it.
    const ease = prefersReducedMotion() ? 1 : 0.12;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let seen = false;

    root.classList.add('has-custom-cursor');

    const place = (el, px, py) => {
      el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    };

    const step = () => {
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      place(blob, x, y);
      frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.2 ? requestAnimationFrame(step) : 0;
    };

    const setVisible = (visible) => {
      blob.classList.toggle('visible', visible);
      dot.classList.toggle('visible', visible);
    };

    const onMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!seen) {
        // Start the blob where the pointer first appears instead of sweeping in from the corner.
        x = targetX;
        y = targetY;
        seen = true;
      }
      place(dot, targetX, targetY);
      setVisible(true);
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onOver = (event) => {
      const hovering = Boolean(event.target.closest?.(HOVER_TARGETS));
      blob.classList.toggle('hovering', hovering);
      dot.classList.toggle('hovering', hovering);
    };

    const onOut = (event) => {
      if (!event.relatedTarget) setVisible(false);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove('has-custom-cursor');
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={blobRef} className="custom-cursor" aria-hidden="true">
        <div className="custom-cursor-blob" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

export default CustomCursor;

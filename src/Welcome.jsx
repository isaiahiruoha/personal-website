import { useEffect, useMemo, useRef, useState } from 'react';
import { LazyMotion, m } from 'motion/react';
import { profile } from './data/content';
import { prefersReducedMotion } from './lib/scroll';

const ERASE_RADIUS = 35;
const ERASE_MARGIN = 40;
const RESTORE_DELAY_MS = 1500;
const RESTORE_DURATION_MS = 2000;
const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default);

// Matches the blob's CSS width: clamp(240px, 32vw, 360px).
const PORTRAIT_SIZES = '(max-width: 750px) 240px, (max-width: 1125px) 32vw, 360px';

// Types the bio out, then lets the visitor rub it away with the pointer; it reappears shortly after.
// Every character is laid out from the start and only changes colour as it is typed, so nothing moves
// (no layout shift); screen readers and crawlers get the full bio from a visually hidden copy.
function TypingText({ text, delay, startDelay = 0 }) {
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? text.length : 0));
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const isComplete = typed >= text.length;
  const characters = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    if (isComplete) return undefined;
    let intervalId;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setTyped((count) => {
          if (count + 1 >= text.length) window.clearInterval(intervalId);
          return count + 1;
        });
      }, delay);
    }, startDelay);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
    // Typing runs once; isComplete only flips when it finishes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, startDelay]);

  // Erasing paints background-coloured circles on a canvas laid over the text. Restoring redraws the
  // remaining circles each frame, oldest first, so nothing is re-encoded per pointer move.
  useEffect(() => {
    if (!isComplete) return undefined;
    const textEl = textRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let points = [];
    let restoreTimer = 0;
    let restoreFrame = 0;
    let width = 0;
    let height = 0;

    // Read the token rather than body's computed colour, which lags behind while the theme crossfades.
    const background = () => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();

    const draw = (list) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = background();
      for (const { x, y } of list) {
        ctx.beginPath();
        ctx.arc(x, y, ERASE_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = textEl.offsetWidth;
      height = textEl.offsetHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(points);
    };

    const restore = () => {
      const snapshot = points;
      const start = performance.now();
      const frame = (now) => {
        const progress = Math.min((now - start) / RESTORE_DURATION_MS, 1);
        points = snapshot.slice(Math.floor(progress * snapshot.length));
        draw(points);
        restoreFrame = progress < 1 ? requestAnimationFrame(frame) : 0;
      };
      restoreFrame = requestAnimationFrame(frame);
    };

    const onMove = (event) => {
      const rect = textEl.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < -ERASE_MARGIN || x > rect.width + ERASE_MARGIN || y < -ERASE_MARGIN || y > rect.height + ERASE_MARGIN) {
        return;
      }
      cancelAnimationFrame(restoreFrame);
      window.clearTimeout(restoreTimer);
      points.push({ x, y });
      draw(points);
      restoreTimer = window.setTimeout(restore, RESTORE_DELAY_MS);
    };

    // Repaint with the new background colour when the theme changes mid-erase.
    const themeObserver = new MutationObserver(() => draw(points));
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(textEl);
    resize();
    document.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      document.removeEventListener('pointermove', onMove);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.clearTimeout(restoreTimer);
      cancelAnimationFrame(restoreFrame);
    };
  }, [isComplete]);

  return (
    <div className="blurb-wrap">
      <p ref={textRef} id="blurb" className={isComplete ? 'erasing' : undefined}>
        <span className="visually-hidden">{text}</span>
        <span aria-hidden="true">
          {characters.map((char, index) => (
            <span key={index} className={index < typed ? undefined : 'blurb-untyped'}>
              {char}
            </span>
          ))}
        </span>
      </p>
      {isComplete && <canvas ref={canvasRef} className="blurb-eraser" aria-hidden="true" />}
    </div>
  );
}

function Welcome() {
  return (
    <section className="welcome-section" id="about" aria-labelledby="hero-name">
      <h1 id="hero-name">{profile.name}</h1>
      <p id="sentence">{profile.tagline}</p>
      <LazyMotion features={loadMotionFeatures} strict>
        <m.div
          className="blob-container"
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.8}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
          whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
          style={{ cursor: 'grab' }}
        >
          <div className="blob-wrapper">
            <picture>
              <source type="image/avif" srcSet="/assets/profile-480.avif 480w, /assets/profile-960.avif 960w" sizes={PORTRAIT_SIZES} />
              <source type="image/webp" srcSet="/assets/profile-480.webp 480w, /assets/profile-960.webp 960w" sizes={PORTRAIT_SIZES} />
              <img
                src="/assets/profile-960.jpg"
                srcSet="/assets/profile-480.jpg 480w, /assets/profile-960.jpg 960w"
                sizes={PORTRAIT_SIZES}
                width="960"
                height="960"
                alt={`Portrait of ${profile.name}`}
                className="blob-image"
                draggable="false"
                fetchPriority="high"
              />
            </picture>
          </div>
          <div className="blob-shadow" />
        </m.div>
      </LazyMotion>
      <TypingText text={profile.bio} delay={25} startDelay={1500} />
    </section>
  );
}

export default Welcome;

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import './App.css';
import { profile } from './data/content';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}

function TypingText({ text, delay, startDelay = 0 }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [maskUrl, setMaskUrl] = useState(null);
  const [canvasReady, setCanvasReady] = useState(false);
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const fadeTimeoutRef = useRef(null);
  const fadeAnimationRef = useRef(null);
  const eraseHistoryRef = useRef([]);

  useEffect(() => {
    let currentIndex = 0;
    let intervalId;
    
    const startTyping = () => {
      intervalId = setInterval(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === text.length) {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, delay);
    };

    const timeoutId = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, startDelay]);

  useEffect(() => {
    if (!isComplete) return;
    
    const textEl = textRef.current;
    const canvas = canvasRef.current;
    if (!textEl || !canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = textEl.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setMaskUrl(canvas.toDataURL());
      setCanvasReady(true);
      eraseHistoryRef.current = [];
    };

    const startFadeBack = () => {
      if (fadeAnimationRef.current) cancelAnimationFrame(fadeAnimationRef.current);
      
      const history = [...eraseHistoryRef.current];
      if (history.length === 0) return;
      
      const totalDuration = 2000; // 2 seconds to restore all
      const startTime = Date.now();
      
      const animateFade = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        
        // Calculate how many points to restore based on progress
        const pointsToRestore = Math.floor(progress * history.length);
        
        // Reset composite operation and clear canvas to white
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Re-erase only the points that haven't been restored yet
        if (pointsToRestore < history.length) {
          ctx.globalCompositeOperation = 'destination-out';
          for (let i = pointsToRestore; i < history.length; i++) {
            const point = history[i];
            ctx.beginPath();
            ctx.arc(point.x, point.y, 35, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        
        setMaskUrl(canvas.toDataURL());
        
        if (progress < 1) {
          fadeAnimationRef.current = requestAnimationFrame(animateFade);
        } else {
          eraseHistoryRef.current = [];
          ctx.globalCompositeOperation = 'source-over';
        }
      };
      
      fadeAnimationRef.current = requestAnimationFrame(animateFade);
    };

    const scheduleFadeBack = () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (fadeAnimationRef.current) cancelAnimationFrame(fadeAnimationRef.current);
      
      fadeTimeoutRef.current = setTimeout(() => {
        startFadeBack();
      }, 1500);
    };

    // Small delay to ensure text is fully rendered
    setTimeout(resize, 100);
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      if (!canvasReady) return;
      const rect = textEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= -40 && x <= rect.width + 40 && y >= -40 && y <= rect.height + 40) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, Math.PI * 2);
        ctx.fill();
        setMaskUrl(canvas.toDataURL());
        
        // Store erase position in history
        eraseHistoryRef.current.push({ x, y });
        scheduleFadeBack();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (fadeAnimationRef.current) cancelAnimationFrame(fadeAnimationRef.current);
    };
  }, [isComplete, canvasReady]);

  return (
    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <p 
        ref={textRef}
        id="blurb"
        className={isComplete && canvasReady ? 'erasing' : ''}
        style={isComplete && canvasReady && maskUrl ? {
          WebkitMaskImage: `url(${maskUrl})`,
          maskImage: `url(${maskUrl})`,
        } : {}}
      >
        {displayText}
      </p>
      {isComplete && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            opacity: 0,
          }}
        />
      )}
    </div>
  );
}

function Welcome() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <section className="welcome-section">
        <h1 id="welcome-section">{profile.name}</h1>
        <p id="sentence">{profile.tagline}</p>
        <motion.div 
          className="blob-container"
          data-lenis-prevent
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6,
            ease: [0.34, 1.56, 0.64, 1]
          }}
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.8}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
          whileDrag={{ scale: 1.05 }}
          whileHover={{ cursor: 'grab' }}
          style={{ cursor: 'grab' }}
        >
          <div className="blob-wrapper">
            {!imageLoaded && <LoadingSpinner />}
            <picture>
              <source type="image/avif" srcSet="/assets/profile-480.avif 480w, /assets/profile-960.avif 960w" sizes="(max-width: 600px) 80vw, 400px" />
              <source type="image/webp" srcSet="/assets/profile-480.webp 480w, /assets/profile-960.webp 960w" sizes="(max-width: 600px) 80vw, 400px" />
              <img
                src="/assets/profile-960.jpg"
                srcSet="/assets/profile-480.jpg 480w, /assets/profile-960.jpg 960w"
                sizes="(max-width: 600px) 80vw, 400px"
                width="960"
                height="960"
                alt={`Portrait of ${profile.name}`}
                className="blob-image"
                draggable="false"
                style={{ opacity: imageLoaded ? 1 : 0, userSelect: 'none' }}
                onLoad={() => setImageLoaded(true)}
              />
            </picture>
          </div>
          <div className="blob-shadow"></div>
        </motion.div>
        <TypingText
          text={profile.bio}
          delay={25}
          startDelay={1500}
        />
      </section>
    </>
  );
}

export default Welcome;
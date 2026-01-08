import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
}

function TypingText({ text, delay, startDelay = 0 }) {
  const [displayText, setDisplayText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);
  const [maskUrl, setMaskUrl] = React.useState(null);
  const [canvasReady, setCanvasReady] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);
  const textRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const handleReset = () => {
      setDisplayText('');
      setIsComplete(false);
      setMaskUrl(null);
      setCanvasReady(false);
      setResetKey(k => k + 1);
    };

    window.addEventListener('resetTypingText', handleReset);
    return () => window.removeEventListener('resetTypingText', handleReset);
  }, []);

  React.useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    
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
  }, [text, delay, startDelay, resetKey]);

  React.useEffect(() => {
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
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
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
            top: textRef.current?.offsetTop || 0,
            left: textRef.current?.offsetLeft || 0,
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
  const [animKey, setAnimKey] = useState(0);

  React.useEffect(() => {
    const handleReset = () => {
      setAnimKey(k => k + 1);
    };
    window.addEventListener('resetTypingText', handleReset);
    return () => window.removeEventListener('resetTypingText', handleReset);
  }, []);

  return (
    <>
      <section className="welcome-section" key={animKey}>
        <h1 id="welcome-section">Isaiah Iruoha</h1>
        <p id="sentence">Computer Engineering Student at Queen's University</p>
        <motion.div 
          className="blob-container"
          drag
          dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
          dragElastic={0.8}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
          whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
          style={{ cursor: 'grab' }}
        >
          <div className="blob-wrapper">
            {!imageLoaded && <LoadingSpinner />}
            <img 
              src={process.env.PUBLIC_URL + '/assets/profile.png'} 
              alt="about" 
              className="blob-image"
              draggable="false"
              style={{ opacity: imageLoaded ? 1 : 0, userSelect: 'none' }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="blob-shadow"></div>
        </motion.div>
        <TypingText
          text="I'm Isaiah, a Computer Engineering student at Queen's University with interests in software development, artificial intelligence, and quantitative trading. As I continue learning, this site will eventually... be updated with past and current projects along with my contact information, skills, and resume. Feel free to reach out!"
          delay={25}
          startDelay={1500}
        />
      </section>
    </>
  );
}

export default Welcome;
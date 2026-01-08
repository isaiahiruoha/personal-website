import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROWS = 4;
const ROW_DURATION = 1.875;

function Pacman({ size, isOpen, facingLeft }) {
  // Using arc paths to create proper pie-slice Pacman with transparent mouth
  const mouthAngle = isOpen ? 40 : 10;
  const angleRad = mouthAngle * (Math.PI / 180);
  
  let pathD, eyeCx, eyeCy, eyeHighlightCx, eyeHighlightCy;
  
  if (facingLeft) {
    // Mouth opens to the left
    const x1 = 50 - 45 * Math.cos(angleRad);
    const y1 = 50 - 45 * Math.sin(angleRad);
    const x2 = 50 - 45 * Math.cos(angleRad);
    const y2 = 50 + 45 * Math.sin(angleRad);
    pathD = `M 50 50 L ${x1} ${y1} A 45 45 0 1 1 ${x2} ${y2} Z`;
    eyeCx = 45;
    eyeCy = 25;
    eyeHighlightCx = 43;
    eyeHighlightCy = 23;
  } else {
    // Mouth opens to the right
    const x1 = 50 + 45 * Math.cos(angleRad);
    const y1 = 50 - 45 * Math.sin(angleRad);
    const x2 = 50 + 45 * Math.cos(angleRad);
    const y2 = 50 + 45 * Math.sin(angleRad);
    pathD = `M 50 50 L ${x1} ${y1} A 45 45 0 1 0 ${x2} ${y2} Z`;
    eyeCx = 55;
    eyeCy = 25;
    eyeHighlightCx = 57;
    eyeHighlightCy = 23;
  }
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100"
      style={{
        filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
      }}
    >
      <path
        d={pathD}
        fill="#FFD700"
      />
      <circle cx={eyeCx} cy={eyeCy} r="8" fill="#000" />
      <circle cx={eyeHighlightCx} cy={eyeHighlightCy} r="3" fill="#FFF" />
    </svg>
  );
}

function PacmanTransition({ isActive, onComplete }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [eatenRows, setEatenRows] = useState([]);
  const [currentRow, setCurrentRow] = useState(-1);
  const [mouthOpen, setMouthOpen] = useState(true);
  const [pacmanX, setPacmanX] = useState(-20);
  const [goingRight, setGoingRight] = useState(true);
  const animationRef = useRef(null);
  const chompRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      setShowOverlay(false);
      setEatenRows([]);
      setCurrentRow(-1);
      setPacmanX(-30);
      setGoingRight(true);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (chompRef.current) clearInterval(chompRef.current);
      return;
    }

    setShowOverlay(true);
    setEatenRows([]);
    setCurrentRow(0);
    setGoingRight(true);
    setPacmanX(-30);

    chompRef.current = setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 120);

    return () => {
      if (chompRef.current) clearInterval(chompRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive || currentRow < 0 || currentRow >= ROWS) return;

    const startTime = Date.now();
    const duration = ROW_DURATION * 1000;
    const startX = goingRight ? -30 : 130;
    const endX = goingRight ? 130 : -30;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const newX = startX + (progress * (endX - startX));
      setPacmanX(newX);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setEatenRows(prev => [...prev, currentRow]);
        
        if (currentRow < ROWS - 1) {
          const nextGoingRight = !goingRight;
          setGoingRight(nextGoingRight);
          setPacmanX(nextGoingRight ? -30 : 130);
          setCurrentRow(prev => prev + 1);
        } else {
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 300);
          
          setTimeout(() => {
            setShowOverlay(false);
          }, 1000);
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [currentRow, isActive, onComplete, goingRight]);

  const rowHeight = 100 / ROWS;
  const pacmanSize = Math.max(rowHeight * 1.6, 14);

  const getTrailStyle = () => {
    if (goingRight) {
      return {
        left: 0,
        width: `${Math.max(0, Math.min(100, pacmanX + 12))}%`,
      };
    } else {
      return {
        right: 0,
        width: `${Math.max(0, Math.min(100, 100 - pacmanX - 13))}%`,
      };
    }
  };

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            pointerEvents: 'none',
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
        >
          {eatenRows.map((row) => (
            <div
              key={`eaten-${row}`}
              style={{
                position: 'absolute',
                top: `${row * rowHeight}vh`,
                left: 0,
                width: '100%',
                height: `${rowHeight + 0.5}vh`,
                backgroundColor: '#000',
              }}
            />
          ))}

          {currentRow >= 0 && currentRow < ROWS && (
            <div
              style={{
                position: 'absolute',
                top: `${currentRow * rowHeight}vh`,
                height: `${rowHeight + 0.5}vh`,
                backgroundColor: '#000',
                ...getTrailStyle(),
              }}
            />
          )}

          {currentRow >= 0 && currentRow < ROWS && (
            <div
              style={{
                position: 'absolute',
                top: `${currentRow * rowHeight}vh`,
                left: 0,
                width: '100%',
                height: `${rowHeight}vh`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                padding: '0 3%',
              }}
            >
              {Array.from({ length: 25 }).map((_, i) => {
                const dotPosition = 3 + (i / 24) * 94;
                const pacmanMouth = goingRight ? pacmanX + 22 : pacmanX - 6;
                const isEaten = goingRight 
                  ? dotPosition < pacmanMouth
                  : dotPosition > pacmanMouth;
                
                return (
                  <div
                    key={i}
                    style={{
                      width: '1.2vh',
                      height: '1.2vh',
                      backgroundColor: isEaten ? 'transparent' : '#FFB8C6',
                      borderRadius: '50%',
                      boxShadow: isEaten ? 'none' : '0 0 8px rgba(255, 184, 198, 0.6)',
                    }}
                  />
                );
              })}
            </div>
          )}

          {currentRow >= 0 && currentRow < ROWS && (
            <div
              style={{
                position: 'absolute',
                top: `${currentRow * rowHeight + (rowHeight / 2)}vh`,
                left: `${pacmanX}%`,
                transform: 'translateY(-50%)',
                width: `${pacmanSize}vh`,
                height: `${pacmanSize}vh`,
                zIndex: 10,
              }}
            >
              <Pacman size="100%" isOpen={mouthOpen} facingLeft={!goingRight} />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PacmanTransition;

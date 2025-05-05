import React, { useEffect, useRef } from 'react';
import logo from '../../assets/elements/mzco.png';

function Layer7() {
  const tilt = useRef({ beta: 0, gamma: 0 });
  const prevTilt = useRef({ beta: 0, gamma: 0 });
  const logoRef = useRef(null);
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (event) => {
      tilt.current = { beta: event.beta, gamma: event.gamma };
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  useEffect(() => {
    let animationId;

    const updatePosition = () => {
      const deltaX = (tilt.current.gamma - prevTilt.current.gamma) * 0.1;
      const deltaY = (tilt.current.beta - prevTilt.current.beta) * 0.1;

      position.current.x -= deltaX;
      position.current.y -= deltaY;

      if (logoRef.current) {
        logoRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) scale(0.6)`;
      }

      prevTilt.current = { ...tilt.current };
      animationId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className='pointer-events-none'>
      <div className="absolute top-[63vw] left-[20vw] z-[60] w-[60vw] h-[60vw] flex items-center justify-center">
        <svg width="60vw" height="60vw" viewBox="0 0 600 600" className="absolute">
          <circle
            cx="300"
            cy="300"
            r="299.75"
            stroke="black"
            strokeWidth="0.9"
            fill="none"
          />
        </svg>
        <img
          ref={logoRef}
          src={logo}
          className="w-[75vw] h-[21vw]"
          style={{ transition: 'transform 0.1s ease-out' }}
          alt=""
        />
      </div>
    </div>
  );
}

export default Layer7;

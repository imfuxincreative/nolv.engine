import React, { useEffect, useRef } from 'react';
import flatShapes from '../../assets/elements/Vector.svg';

function Layer6() {
  const tilt = useRef({ beta: 0, gamma: 0 });
  const prevTilt = useRef({ beta: 0, gamma: 0 });
  const imageRef = useRef(null);
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
      const deltaX = (tilt.current.gamma - prevTilt.current.gamma) * 0.4;
      const deltaY = (tilt.current.beta - prevTilt.current.beta) * 0.4;

      position.current.x += deltaX;
      position.current.y += deltaY;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) scale(1)`;
      }

      prevTilt.current = { ...tilt.current };
      animationId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div>
      <img
        ref={imageRef}
        className="z-[50] absolute top-[63vw] left-[10vw]"
        style={{ transition: 'transform 0.1s ease-out' }}
        src={flatShapes}
        alt=""
      />
    </div>
  );
}

export default Layer6;

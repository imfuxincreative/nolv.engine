import React, { useEffect, useRef } from 'react';
import beach from '../assets/images/meeza2.jpg'
function PixelBg() {
  const pixels = Array.from({ length: 100 });
  const pixLine = Array.from({ length: 40 });

  // Reference to store tilt values and background position
  const tilt = useRef({ beta: 0, gamma: 0 });
  const bgPosition = useRef({ x: 0, y: 0 });
  const prevTilt = useRef({ beta: 0, gamma: 0 });

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
    const updateBgPosition = () => {
      // Calculate the change in tilt (deltaX and deltaY)

      const deltaX = (tilt.current.gamma - prevTilt.current.gamma) * 1; // Smooth multiplier
      const deltaY = (tilt.current.beta - prevTilt.current.beta) * 1;  // Smooth multiplier

      // Update background position with smoothness factor
      bgPosition.current.x += deltaX;
      bgPosition.current.y += deltaY;

      // Apply translation directly to avoid unnecessary state changes and re-renders
      const transformStyle = `translate3d(${bgPosition.current.x}px, ${bgPosition.current.y}px, 0)`;
      const bgElement = document.getElementById('bg-element');
      if (bgElement) {
        bgElement.style.transform = transformStyle;
      }

      // Store current tilt for the next frame
      prevTilt.current = { beta: tilt.current.beta, gamma: tilt.current.gamma };

      // Continue the animation
      requestAnimationFrame(updateBgPosition);
    };

    // Start the animation on component mount
    updateBgPosition();

    return () => cancelAnimationFrame(updateBgPosition);
  }, []);

  return (
    <div className=" fixed top-0 z-[0]  pointer-events-none">
      <div
        id="bg-element"
        className="flex -translate-y-[4vw] "
        style={{ transition: 'transform 0.1s ease-out' }} // Smooth transition
      >
        <img className=' h-screen w-screen object-cover' src={beach} alt="" />
      </div>
    </div>
  );
}

export default PixelBg;
 
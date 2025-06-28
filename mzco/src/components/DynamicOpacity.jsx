import React, { useContext, useEffect, useRef } from 'react';
import { BlurContext } from '../context/BlurContext';
import { IsAboutContext } from '../context/IsAbout';

function DynamicOpacity() {
  const { blurValue, setBlurValue } = useContext(BlurContext);
  const { isAbout, setIsAbout } = useContext(IsAboutContext);

  const animationFrameId = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }

      animationFrameId.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const newBlur = Math.min(7, scrollY / 10);
        setBlurValue(newBlur);
       
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [setBlurValue]);

  return (
    <div
      className="h-screen bg-white w-screen pointer-events-none z-[500] fixed top-0 transition-all duration-300"
      style={{
        opacity: `0.${Math.floor(blurValue)}`
      }}
    ></div>
  );
}

export default DynamicOpacity;

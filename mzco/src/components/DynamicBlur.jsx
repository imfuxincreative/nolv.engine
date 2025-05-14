import React, { useContext, useEffect } from 'react';
import { BlurContext } from '../context/BlurContext';

function DynamicBlur() {
  const { blurValue, setBlurValue } = useContext(BlurContext); // ✅ useContext, not function call

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newBlur = Math.min(30, scrollY / 10); // optional clamp
      setBlurValue(newBlur);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setBlurValue]);

  return (
    <div
      className="h-screen w-screen pointer-events-none z-[500] fixed top-0 transition-all duration-300"
      style={{
        backdropFilter: `blur(${blurValue}px)`,
        WebkitBackdropFilter: `blur(${blurValue}px)`, // for Safari support
      }}
    ></div>
  );
}

export default DynamicBlur;

import React, { createContext, useRef, useContext, useEffect, ReactNode, RefObject } from 'react';
import Lenis from '@studio-freight/lenis';

const LenisContext = createContext<RefObject<Lenis | null> | undefined>(undefined);

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    } as any);

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
};

export const useSmoothScroll = () => {
  const context = useContext(LenisContext);
  if (context === undefined) {
    throw new Error('useSmoothScroll must be used within a LenisProvider');
  }
  return context;
};
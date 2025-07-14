import React, { createContext, useEffect, useState } from 'react';

export const IsMobileContext = createContext();

export const IsMobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Run on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <IsMobileContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </IsMobileContext.Provider>
  );
};

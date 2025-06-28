import React, { createContext, useState } from 'react';

export const IsAboutContext = createContext();

export const IsAboutProvider = ({ children }) => {
  const [isAbout, setIsAbout] = useState(false);

  return (
    <IsAboutContext.Provider value={{ isAbout  , setIsAbout }}>
      {children}
    </IsAboutContext.Provider>
  );
};

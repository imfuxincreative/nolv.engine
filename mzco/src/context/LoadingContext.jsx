import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

export const LoadProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
    const [showMessage , setShowMessage ] = useState(false)
  

  return (
    <LoadingContext.Provider value={{ isLoading ,setIsLoading  , showMessage , setShowMessage}}>
      {children}
    </LoadingContext.Provider>
  );
};

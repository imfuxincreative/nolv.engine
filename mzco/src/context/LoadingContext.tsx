import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  showMessage: boolean;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
}

// Initialized with dummy functions as defaults so useContext consumers don't need undefined checks
export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
  showMessage: false,
  setShowMessage: () => {},
});

export const LoadProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, showMessage, setShowMessage }}>
      {children}
    </LoadingContext.Provider>
  );
};

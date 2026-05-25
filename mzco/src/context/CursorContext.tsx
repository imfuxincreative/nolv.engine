import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface CursorContextType {
  cursorAnimation: string;
  setCursorAnimation: Dispatch<SetStateAction<string>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorAnimation, setCursorAnimation] = useState('no-animation');

  return (
    <CursorContext.Provider value={{ cursorAnimation, setCursorAnimation }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};

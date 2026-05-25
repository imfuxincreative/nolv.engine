import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface LayoutContextType {
  is2DMode: boolean;
  setIs2DMode: Dispatch<SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [is2DMode, setIs2DMode] = useState(false);
  return (
    <LayoutContext.Provider value={{ is2DMode, setIs2DMode }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutMode() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayoutMode must be used within a LayoutProvider');
  }
  return context;
}

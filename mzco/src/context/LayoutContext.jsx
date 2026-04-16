import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [is2DMode, setIs2DMode] = useState(false);
  return (
    <LayoutContext.Provider value={{ is2DMode, setIs2DMode }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutMode() {
  return useContext(LayoutContext);
}

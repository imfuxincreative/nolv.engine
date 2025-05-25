import React, { createContext, useState } from 'react';

export const MenuBgContext = createContext();

export const MenuBgProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState('close');

  return (
    <MenuBgContext.Provider value={{ menuOpen ,setMenuOpen }}>
      {children}
    </MenuBgContext.Provider>
  );
};

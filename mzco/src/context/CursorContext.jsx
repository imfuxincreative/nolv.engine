import {useEffect ,  createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
  const [cursorAnimation, setCursorAnimation] = useState('no-animation');

  return (
    <CursorContext.Provider value={{ cursorAnimation, setCursorAnimation }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);

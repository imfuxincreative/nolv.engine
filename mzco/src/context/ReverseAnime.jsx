import React, { createContext, useState } from 'react';

export const ReverseAnimeContext = createContext();

export const ReverseAnimeProvider = ({ children }) => {
  const [reverseAnime,  setReverseAnime] = useState(false);

  return (
    <ReverseAnimeContext.Provider value={{ reverseAnime, setReverseAnime }}>
      {children}
    </ReverseAnimeContext.Provider>
  );
};

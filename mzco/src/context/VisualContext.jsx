import React, { createContext, useContext } from 'react';

const VisualContext = createContext();

export function VisualProvider({ children }) {
  const visuals = [
    '/Visuals/flower.jpg', '/Visuals/rain.jpg', '/Visuals/serenity.jpg', '/Visuals/building.jpg',
    '/Visuals/abundance.webp', '/Visuals/monster.webp', '/Visuals/wanted.webp', '/Visuals/cyber.png',
    '/Visuals/wanted.webp', '/Visuals/flying.png', '/Visuals/pre1.png', '/Visuals/architecture.webp',
    '/Visuals/starlight.webp', '/Visuals/fire.jpg', '/Visuals/black.jpg', '/Visuals/white.jpg',
    '/Visuals/ar.jpg', '/Visuals/vai.webp', '/Visuals/insane.jpg', '/Visuals/air.jpg'
  ];

  return (
    <VisualContext.Provider value={{ visuals }}>
      {children}
    </VisualContext.Provider>
  );
}

export function useVisual() {
  return useContext(VisualContext);
}

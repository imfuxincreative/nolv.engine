import React, { createContext, useContext, ReactNode } from 'react';

export interface VisualContextType {
  visuals: string[];
}

const VisualContext = createContext<VisualContextType | undefined>(undefined);

export function VisualProvider({ children }: { children: ReactNode }) {
  const visuals = [
    '/Visuals/flower.jpg', '/Visuals/rain.jpg', '/Visuals/serenity.jpg', '/Visuals/building.jpg',
    '/Visuals/abundance.webp', '/Visuals/monster.webp', '/Visuals/wanted.webp', '/Visuals/cyber.png',
    '/Visuals/wanted.webp', '/Visuals/flying.png', '/Visuals/pv2.jpg', '/Visuals/architecture.webp',
    '/Visuals/starlight.webp', '/Visuals/fire.jpg', '/Visuals/black.jpg', '/Visuals/white.jpg',
    '/Visuals/ar.jpg', '/Visuals/pv1.jpg', '/Visuals/insane.jpg', '/Visuals/air.jpg'
  ];

  return (
    <VisualContext.Provider value={{ visuals }}>
      {children}
    </VisualContext.Provider>
  );
}

export function useVisual() {
  const context = useContext(VisualContext);
  if (context === undefined) {
    throw new Error('useVisual must be used within a VisualProvider');
  }
  return context;
}

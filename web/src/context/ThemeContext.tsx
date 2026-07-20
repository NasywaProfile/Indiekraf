import React, { createContext, useContext, useState, useEffect } from 'react';

export type OrnamentStyle = 'dots' | 'mesh' | 'glow' | 'clean';
export type AccentColor = 'blue' | 'indigo' | 'emerald' | 'amber';

interface ThemeContextType {
  style: OrnamentStyle;
  accent: AccentColor;
  setStyle: (style: OrnamentStyle) => void;
  setAccent: (accent: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyleState] = useState<OrnamentStyle>(() => {
    const saved = localStorage.getItem('indiekraf-ornament-style');
    return (saved as OrnamentStyle) || 'glow';
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('indiekraf-accent-color');
    return (saved as AccentColor) || 'blue';
  });

  const setStyle = (newStyle: OrnamentStyle) => {
    setStyleState(newStyle);
    localStorage.setItem('indiekraf-ornament-style', newStyle);
  };

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
    localStorage.setItem('indiekraf-accent-color', newAccent);
  };

  return (
    <ThemeContext.Provider value={{ style, accent, setStyle, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/* eslint-disable react-refresh/only-export-components */

// ===================================================
// FILE: src/context/ThemeContext.tsx
// ===================================================

import { createContext, useContext, useEffect, useState } from 'react';
import { themeService } from '@/services/theme/theme.service';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => themeService.getTheme());

  useEffect(() => {
    themeService.initialize();
  }, []);

  function setTheme(newTheme: Theme) {
    setThemeState(newTheme);
    themeService.setTheme(newTheme);
  }

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
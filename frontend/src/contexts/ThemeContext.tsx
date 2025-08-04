import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Get initial theme from localStorage or system preference
const getInitialTheme = (): ThemeMode => {
  // Check localStorage first
  const stored = localStorage.getItem('theme-mode');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  
  // Fall back to system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'dark';
};

export function ThemeContextProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(getInitialTheme);

  // Save to localStorage whenever mode changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      const stored = localStorage.getItem('theme-mode');
      if (!stored) {
        setModeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleMode = () => {
    setModeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
  };

  const value: ThemeContextType = {
    mode,
    toggleMode,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
}
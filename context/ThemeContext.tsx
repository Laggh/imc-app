import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeType = 'light' | 'green' | 'dark' | 'blue' | 'red' | 'high-contrast';

export interface Theme {
  name: ThemeType;
  label: string;
  colors: {
    background: string;
    text: string;
    primary: string;
    primaryDark: string;
    primaryLight: string;
    icon: string;
    divider: string;
  };
}

const THEMES: Record<ThemeType, Theme> = {
  light: {
    name: 'light',
    label: 'Branco',
    colors: {
      background: '#FFFFFF',
      text: '#1F2937',
      primary: '#000000',
      primaryDark: '#374151',
      primaryLight: '#F3F4F6',
      icon: '#9CA3AF',
      divider: '#E5E7EB',
    },
  },
  green: {
    name: 'green',
    label: 'Verde',
    colors: {
      background: '#F0FDF4',
      text: '#1F2937',
      primary: '#10B981',
      primaryDark: '#059669',
      primaryLight: '#D1FAE5',
      icon: '#6B7280',
      divider: '#E5E7EB',
    },
  },
  dark: {
    name: 'dark',
    label: 'Escuro',
    colors: {
      background: '#1F2937',
      text: '#F3F4F6',
      primary: '#10B981',
      primaryDark: '#059669',
      primaryLight: '#065F46',
      icon: '#D1D5DB',
      divider: '#374151',
    },
  },
  blue: {
    name: 'blue',
    label: 'Azul',
    colors: {
      background: '#EFF6FF',
      text: '#0C2340',
      primary: '#0369A1',
      primaryDark: '#003D82',
      primaryLight: '#BAE6FD',
      icon: '#475569',
      divider: '#E0E7FF',
    },
  },
  red: {
    name: 'red',
    label: 'Vermelho',
    colors: {
      background: '#FEF2F2',
      text: '#7F1D1D',
      primary: '#DC2626',
      primaryDark: '#991B1B',
      primaryLight: '#FCA5A5',
      icon: '#6B7280',
      divider: '#FEE2E2',
    },
  },
  'high-contrast': {
    name: 'high-contrast',
    label: 'Alto Contraste',
    colors: {
      background: '#FFFFFF',
      text: '#000000',
      primary: '#000000',
      primaryDark: '#000000',
      primaryLight: '#000000',
      icon: '#000000',
      divider: '#000000',
    },
  },
};

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  theme: Theme;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');

  // Carrega o tema salvo ao inicializar
  useEffect(() => {
    try {
      const saved = localStorage.getItem('app_theme');
      if (saved && Object.keys(THEMES).includes(saved)) {
        setCurrentTheme(saved as ThemeType);
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    }
  }, []);

  const handleSetTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    try {
      localStorage.setItem('app_theme', theme);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme: handleSetTheme,
    theme: THEMES[currentTheme],
    availableThemes: Object.values(THEMES),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};

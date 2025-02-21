import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme doit être utilisé dans un ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const darkTheme = {
    background: '#121212',
    text: '#ffffff',
    primary: '#1976d2',
    border: 'rgba(255, 255, 255, 0.12)'
  };

  const lightTheme = {
    background: '#ffffff',
    text: '#121212',
    primary: '#1976d2',
    border: 'rgba(0, 0, 0, 0.12)'
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    isDarkMode,
    toggleTheme,
    theme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 
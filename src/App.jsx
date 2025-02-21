import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Router from './routes/Router';
import './App.css';
import './styles/theme.css';
import { useEffect } from 'react';
import { Box } from '@mui/material';
const ThemedApp = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--text-color', theme.text);
    document.documentElement.style.setProperty('--background-color', theme.background);
    document.documentElement.style.setProperty('--border-color', theme.border);
  }, [theme]);

  return (
    <Box
      className="App"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        transition: 'all 0.1s ease'
      }}
    >
      <Navbar />
      <main>
        <Router />
      </main>
    </Box>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ThemedApp />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

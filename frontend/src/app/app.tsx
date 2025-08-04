import { Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import StockDetail from './StockDetail';
import Layout from './components/Layout';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import { getTheme } from '../theme';
import { ThemeContextProvider, useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import ErrorBoundary from '../components/ErrorBoundary';
import NotFound from '../pages/NotFound';
import '../services/cacheCleanup'; // Initialize cache cleanup service

function AppContent() {
  const { mode } = useTheme();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggle />
      
      <Routes>
        <Route element={<Layout />}>
          <Route 
            path="/" 
            element={
              <ErrorBoundary>
                <Portfolio />
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/stock/:symbol" 
            element={
              <ErrorBoundary>
                <StockDetail />
              </ErrorBoundary>
            } 
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <AppContent />
      </ThemeContextProvider>
    </ErrorBoundary>
  );
}

export default App;

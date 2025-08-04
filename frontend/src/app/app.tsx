import { Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import StockDetail from './StockDetail';
import Layout from './components/Layout';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import { getTheme } from '../theme';
import { ThemeContextProvider, useTheme } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import '../services/cacheCleanup'; // Initialize cache cleanup service

function AppContent() {
  const { mode } = useTheme();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <Portfolio />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/stock/:symbol" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <StockDetail />
                </ErrorBoundary>
              </ProtectedRoute>
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
      <AuthProvider>
        <ThemeContextProvider>
          <AppContent />
        </ThemeContextProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

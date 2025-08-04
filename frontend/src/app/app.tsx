import { Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import RouteErrorBoundary from '../components/RouteErrorBoundary';

// Create router with error boundaries
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <Portfolio />
          </ErrorBoundary>
        ),
      },
      {
        path: "stock/:symbol",
        element: (
          <ErrorBoundary>
            <StockDetail />
          </ErrorBoundary>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function AppContent() {
  const { mode } = useTheme();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggle />
      <RouterProvider router={router} />
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

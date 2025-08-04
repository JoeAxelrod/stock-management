import React from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Paper,
  Stack,
} from '@mui/material';
import {
  Refresh,
  Home,
  Warning,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  title?: string;
  message?: string;
  showDetails?: boolean;
  variant?: 'page' | 'component' | 'inline';
}

export default function ErrorFallback({
  error,
  resetError,
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  showDetails = false,
  variant = 'component',
}: ErrorFallbackProps) {
  const handleReload = () => {
    window.location.reload();
  };

  // Inline variant for small components
  if (variant === 'inline') {
    return (
      <Alert
        severity="error"
        action={
          resetError && (
            <Button color="inherit" size="small" onClick={resetError}>
              Retry
            </Button>
          )
        }
      >
        {message}
      </Alert>
    );
  }

  // Component variant for component-level errors
  if (variant === 'component') {
    return (
      <Paper
        sx={{
          p: 3,
          textAlign: 'center',
          border: (theme) => `1px solid ${theme.palette.error.light}`,
        }}
      >
        <Warning sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {message}
        </Typography>

        {showDetails && error && (
          <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
            <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem' }}>
              {error.message}
            </Typography>
          </Alert>
        )}

        <Stack direction="row" spacing={1} justifyContent="center">
          {resetError && (
            <Button variant="contained" size="small" onClick={resetError}>
              Try Again
            </Button>
          )}
          <Button variant="outlined" size="small" onClick={handleReload}>
            Reload
          </Button>
        </Stack>
      </Paper>
    );
  }

  // Page variant for full page errors
  return (
    <Box
      sx={{
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper sx={{ maxWidth: 500, width: '100%', p: 4, textAlign: 'center' }}>
        <Warning sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {message}
        </Typography>

        {showDetails && error && (
          <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="subtitle2" gutterBottom>
              Error Details:
            </Typography>
            <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem' }}>
              {error.message}
            </Typography>
          </Alert>
        )}

        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
          {resetError && (
            <Button variant="contained" startIcon={<Refresh />} onClick={resetError}>
              Try Again
            </Button>
          )}
          
          <Button
            variant="outlined"
            component={Link}
            to="/"
            startIcon={<Home />}
          >
            Go Home
          </Button>
          
          <Button variant="text" onClick={handleReload}>
            Reload Page
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

// Specialized error fallbacks for specific use cases
export function NetworkErrorFallback({ resetError }: { resetError?: () => void }) {
  return (
    <ErrorFallback
      title="Connection Problem"
      message="Unable to connect to the server. Please check your internet connection and try again."
      resetError={resetError}
      variant="component"
    />
  );
}

export function DataErrorFallback({ resetError }: { resetError?: () => void }) {
  return (
    <ErrorFallback
      title="Data Loading Error"
      message="Failed to load data. This might be a temporary issue."
      resetError={resetError}
      variant="component"
    />
  );
}

export function ComponentErrorFallback({ error, resetError }: { error?: Error; resetError?: () => void }) {
  return (
    <ErrorFallback
      title="Component Error"
      message="This component encountered an error and couldn't render properly."
      error={error}
      resetError={resetError}
      showDetails={process.env.NODE_ENV === 'development'}
      variant="component"
    />
  );
}
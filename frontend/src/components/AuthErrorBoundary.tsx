import React from 'react';
import { Box, Alert, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

interface AuthErrorBoundaryProps {
  children: React.ReactNode;
  error?: Error | null;
}

export default function AuthErrorBoundary({ children, error }: AuthErrorBoundaryProps) {
  const { isAuthenticated, logout } = useAuth();

  // Check if error is auth-related
  const isAuthError = error?.message?.includes('401') || 
                     error?.message?.includes('Unauthorized') ||
                     error?.message?.includes('Authentication');

  if (isAuthError && isAuthenticated) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Authentication Issue
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Your session may have expired or your token is invalid.
          </Typography>
          <Button 
            variant="contained" 
            onClick={logout}
            size="small"
          >
            Login Again
          </Button>
        </Alert>
      </Box>
    );
  }

  return <>{children}</>;
}
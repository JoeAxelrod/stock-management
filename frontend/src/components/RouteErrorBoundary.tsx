import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Home,
  ArrowBack,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

export default function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorMessage = error.statusText || error.data?.message || 'An error occurred';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    errorMessage = 'Unknown error occurred';
  }

  // Handle specific error types
  if (errorStatus === 404) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          bgcolor: 'background.default',
        }}
      >
        <Paper sx={{ maxWidth: 500, width: '100%', p: 4, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '6rem',
              fontWeight: 700,
              color: 'primary.main',
              lineHeight: 1,
              mb: 1,
            }}
          >
            404
          </Typography>
          
          <Typography variant="h4" gutterBottom>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              component={Link}
              to="/"
              startIcon={<Home />}
            >
              Go Home
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleGoBack}
              startIcon={<ArrowBack />}
            >
              Go Back
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  // Handle other route errors
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        bgcolor: 'background.default',
      }}
    >
      <Paper sx={{ maxWidth: 600, width: '100%', p: 4, textAlign: 'center' }}>
        <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
        
        <Typography variant="h4" gutterBottom>
          {errorStatus ? `Error ${errorStatus}` : 'Route Error'}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {errorMessage}
        </Typography>

        {process.env.NODE_ENV === 'development' && (
          <Paper
            sx={{
              p: 2,
              mb: 3,
              bgcolor: 'background.default',
              textAlign: 'left',
            }}
          >
            <Typography variant="subtitle2" gutterBottom>
              Error Details:
            </Typography>
            <Typography
              variant="body2"
              component="pre"
              sx={{ fontSize: '0.75rem', overflow: 'auto' }}
            >
              {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
            </Typography>
          </Paper>
        )}

        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<Home />}
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            onClick={handleGoBack}
            startIcon={<ArrowBack />}
          >
            Go Back
          </Button>
          
          <Button
            variant="text"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
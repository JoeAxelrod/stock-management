import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import {
  ErrorOutline,
  Refresh,
  Home,
  BugReport,
} from '@mui/icons-material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

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
          <Paper
            sx={{
              maxWidth: 600,
              width: '100%',
              p: 4,
              textAlign: 'center',
            }}
          >
            <ErrorOutline
              sx={{
                fontSize: 64,
                color: 'error.main',
                mb: 2,
              }}
            />
            
            <Typography variant="h4" gutterBottom>
              Oops! Something went wrong
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We're sorry, but something unexpected happened. Don't worry, our team has been notified.
            </Typography>

            <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
              <Typography variant="subtitle2" gutterBottom>
                Error Details:
              </Typography>
              <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem' }}>
                {this.state.error?.message}
              </Typography>
            </Alert>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={this.handleRetry}
              >
                Try Again
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<Home />}
                onClick={this.handleGoHome}
              >
                Go Home
              </Button>
              
              <Button
                variant="text"
                startIcon={<Refresh />}
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
            </Stack>

            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <>
                <Divider sx={{ my: 3 }} />
                <Alert severity="info" sx={{ textAlign: 'left' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    <BugReport sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Development Info:
                  </Typography>
                  <Typography
                    variant="body2"
                    component="pre"
                    sx={{
                      fontSize: '0.7rem',
                      maxHeight: 200,
                      overflow: 'auto',
                      bgcolor: 'background.paper',
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    {this.state.errorInfo.componentStack}
                  </Typography>
                </Alert>
              </>
            )}
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
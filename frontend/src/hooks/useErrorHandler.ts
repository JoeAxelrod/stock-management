import { useCallback } from 'react';

interface ErrorInfo {
  error: Error;
  context?: string;
  userId?: string;
  timestamp?: Date;
  url?: string;
  userAgent?: string;
}

export function useErrorHandler() {
  const logError = useCallback((errorInfo: ErrorInfo) => {
    const enhancedError = {
      ...errorInfo,
      timestamp: errorInfo.timestamp || new Date(),
      url: errorInfo.url || window.location.href,
      userAgent: errorInfo.userAgent || navigator.userAgent,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Logged');
      console.error('Error:', enhancedError.error);
      console.log('Context:', enhancedError.context);
      console.log('URL:', enhancedError.url);
      console.log('Timestamp:', enhancedError.timestamp);
      console.groupEnd();
    }

    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, LogRocket, or custom service
      // Sentry.captureException(enhancedError.error, {
      //   contexts: {
      //     error_info: enhancedError,
      //   },
      // });
    }
  }, []);

  const handleAsyncError = useCallback((error: Error, context?: string) => {
    logError({ error, context });
  }, [logError]);

  const handleApiError = useCallback((error: any, endpoint?: string) => {
    const apiError = new Error(
      error?.response?.data?.message || 
      error?.message || 
      'API request failed'
    );

    logError({
      error: apiError,
      context: `API Error - ${endpoint || 'Unknown endpoint'}`,
    });

    return apiError;
  }, [logError]);

  const handleNetworkError = useCallback((error: Error) => {
    logError({
      error,
      context: 'Network Error',
    });
  }, [logError]);

  return {
    logError,
    handleAsyncError,
    handleApiError,
    handleNetworkError,
  };
}
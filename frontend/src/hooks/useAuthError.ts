// Auth error handling utilities
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook to handle auth errors in components
 * Automatically logs out user if auth errors occur
 */
export function useAuthError() {
  const { logout, isAuthenticated } = useAuth();

  const handleAuthError = (error: any) => {
    if (isAuthenticated && error?.response?.status === 401) {
      console.log('Auth error detected, logging out user');
      logout();
    }
  };

  return { handleAuthError };
}

/**
 * Higher-order function to wrap API calls with auth error handling
 */
export function withAuthErrorHandling<T extends (...args: any[]) => Promise<any>>(
  apiCall: T,
  onAuthError?: () => void
): T {
  return (async (...args: any[]) => {
    try {
      return await apiCall(...args);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        console.log('Auth error in API call:', error.message);
        onAuthError?.();
        
        // Clear auth data
        localStorage.removeItem('stock_auth_token');
        localStorage.removeItem('stock_auth_user');
      }
      throw error;
    }
  }) as T;
}
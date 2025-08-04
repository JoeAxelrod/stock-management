// Frontend Auth Integration
export { AuthProvider, useAuth, useHasRole } from '../contexts/AuthContext';
export { default as Login } from '../pages/Login';
export { default as ProtectedRoute } from '../components/ProtectedRoute';
export { default as AuthErrorBoundary } from '../components/AuthErrorBoundary';
export { authApi } from '../services/authApi';
export { useAuthError, withAuthErrorHandling } from '../hooks/useAuthError';
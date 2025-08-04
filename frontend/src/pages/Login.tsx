import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Chip,
  Stack,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const DEMO_USERS = [
  { email: 'admin@example.com', roles: ['admin', 'user'], description: 'Full access to all features' },
  { email: 'user@example.com', roles: ['user'], description: 'Basic user access' },
];

export default function Login() {
  const { login, isLoading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter an email');
      return;
    }

    const result = await login(email);
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
  };

  const handleDemoLogin = async (demoUser: typeof DEMO_USERS[0]) => {
    setError('');
    setEmail(demoUser.email);
    
    const result = await login(demoUser.email, demoUser.roles);
    if (!result.success) {
      setError(result.error || 'Demo login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Stock Manager Login
          </Typography>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Demo authentication for technical interview
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Custom Login Form */}
          <Box component="form" onSubmit={handleLogin} sx={{ mb: 4 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              placeholder="user@example.com"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>

          {/* Demo Users Section */}
          <Typography variant="h6" gutterBottom>
            Quick Demo Access
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose a demo user to see different access levels:
          </Typography>

          <Stack spacing={2}>
            {DEMO_USERS.map((user) => (
              <Card 
                key={user.email} 
                variant="outlined" 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                  transition: 'all 0.2s'
                }}
                onClick={() => handleDemoLogin(user)}
              >
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {user.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.description}
                      </Typography>
                    </Box>
                    <Box>
                      {user.roles.map((role) => (
                        <Chip 
                          key={role} 
                          label={role} 
                          size="small" 
                          sx={{ ml: 0.5 }}
                          color={role === 'admin' ? 'primary' : 'default'}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Typography variant="caption" display="block" sx={{ mt: 3, textAlign: 'center' }}>
            💡 This is a demo system. Tokens expire after 24 hours.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
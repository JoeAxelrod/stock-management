import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  useTheme,
} from '@mui/material';
import {
  SearchOff,
  Home,
  ArrowBack,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

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
          maxWidth: 500,
          width: '100%',
          p: 4,
          textAlign: 'center',
        }}
      >
        <SearchOff
          sx={{
            fontSize: 80,
            color: 'text.secondary',
            mb: 2,
          }}
        />
        
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
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Sorry, we couldn't find the page you're looking for. 
          The page might have been moved, deleted, or you entered the wrong URL.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<Home />}
            size="large"
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            onClick={handleGoBack}
            startIcon={<ArrowBack />}
            size="large"
          >
            Go Back
          </Button>
        </Stack>

        <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="body2" color="text.secondary">
            If you think this is a mistake, please{' '}
            <Button
              variant="text"
              size="small"
              sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
              onClick={() => window.location.href = 'mailto:support@example.com'}
            >
              contact support
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
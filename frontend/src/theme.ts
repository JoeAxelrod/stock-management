import { createTheme, ThemeOptions } from '@mui/material/styles';

// Custom color palette
const lightColors = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
  },
  secondary: {
    main: '#dc004e',
    light: '#ff5983',
    dark: '#9a0036',
  },
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
  success: {
    main: '#2e7d32',
  },
  warning: {
    main: '#ed6c02',
  },
  error: {
    main: '#d32f2f',
  },
};

const darkColors = {
  primary: {
    main: '#90caf9',
    light: '#e3f2fd',
    dark: '#42a5f5',
  },
  secondary: {
    main: '#f48fb1',
    light: '#fce4ec',
    dark: '#ad1457',
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  success: {
    main: '#66bb6a',
  },
  warning: {
    main: '#ffa726',
  },
  error: {
    main: '#f44336',
  },
};

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light' ? lightColors : darkColors),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0px 2px 8px rgba(0, 0, 0, 0.1)' 
            : '0px 2px 8px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0px 4px 16px rgba(0, 0, 0, 0.15)'
              : '0px 4px 16px rgba(0, 0, 0, 0.4)',
          },
          transition: 'box-shadow 0.3s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light'
            ? '0px 1px 4px rgba(0, 0, 0, 0.1)'
            : '0px 1px 4px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export const getTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode)); 
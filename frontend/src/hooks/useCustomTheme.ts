import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Custom hook that combines MUI theme with our theme context
 * Provides easy access to theme properties and mode controls
 */
export function useCustomTheme() {
  const { mode, toggleMode, setMode } = useTheme();
  const muiTheme = useMuiTheme();

  return {
    // Theme mode controls
    mode,
    toggleMode,
    setMode,
    isDark: mode === 'dark',
    isLight: mode === 'light',
    
    // MUI theme access
    theme: muiTheme,
    palette: muiTheme.palette,
    spacing: muiTheme.spacing,
    breakpoints: muiTheme.breakpoints,
    typography: muiTheme.typography,
    
    // Convenient color getters
    colors: {
      primary: muiTheme.palette.primary.main,
      secondary: muiTheme.palette.secondary.main,
      background: muiTheme.palette.background.default,
      paper: muiTheme.palette.background.paper,
      text: {
        primary: muiTheme.palette.text.primary,
        secondary: muiTheme.palette.text.secondary,
      },
      success: muiTheme.palette.success.main,
      warning: muiTheme.palette.warning.main,
      error: muiTheme.palette.error.main,
    },
    
    // Helper functions
    getSpacing: (multiplier: number) => muiTheme.spacing(multiplier),
    getShadow: (elevation: number) => muiTheme.shadows[elevation],
  };
}
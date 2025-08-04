import React from 'react';
import {
  IconButton,
  Tooltip,
  Fade,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'simple' | 'enhanced';
  size?: 'small' | 'medium' | 'large';
  position?: 'fixed' | 'relative';
}

export default function ThemeToggle({ 
  variant = 'enhanced', 
  size = 'medium',
  position = 'fixed' 
}: ThemeToggleProps) {
  const { mode, toggleMode } = useTheme();
  const muiTheme = useMuiTheme();

  const isLight = mode === 'light';
  const tooltipTitle = `Switch to ${isLight ? 'dark' : 'light'} mode`;

  const buttonSx = position === 'fixed' ? {
    position: 'fixed',
    top: 16,
    right: 16,
    zIndex: muiTheme.zIndex.tooltip + 1,
    backgroundColor: muiTheme.palette.background.paper,
    border: `1px solid ${muiTheme.palette.divider}`,
    boxShadow: muiTheme.shadows[2],
    '&:hover': {
      backgroundColor: muiTheme.palette.action.hover,
      boxShadow: muiTheme.shadows[4],
    },
    transition: 'all 0.3s ease-in-out',
  } : {};

  const getIcon = () => {
    if (variant === 'simple') {
      return isLight ? <Brightness4 /> : <Brightness7 />;
    }
    
    return isLight ? <DarkMode /> : <LightMode />;
  };

  return (
    <Tooltip title={tooltipTitle} arrow>
      <IconButton
        onClick={toggleMode}
        size={size}
        color="inherit"
        sx={buttonSx}
        aria-label={tooltipTitle}
      >
        <Fade in={true} timeout={300}>
          {getIcon()}
        </Fade>
      </IconButton>
    </Tooltip>
  );
}
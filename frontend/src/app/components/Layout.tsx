import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Container, 
  Chip,
  Menu,
  MenuItem,
  IconButton,
  Divider
} from '@mui/material';
import { AccountCircle, Logout, Person } from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

import logo from '../../assets/logo.png';

export default function Layout() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <Box>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              height: 32,
              width: 32,
              mr: 1.5,
              p: 0.5,
              bgcolor: 'background.paper',
              borderRadius: '50%',
              border: '2px solid #fff',
            }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: '#fff', textDecoration: 'none', flexGrow: 1 }}
          >
            Stock Manager
          </Typography>

          {/* Auth Section */}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* User Roles */}
              {user.roles.map((role) => (
                <Chip 
                  key={role}
                  label={role}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                />
              ))}
              
              {/* User Menu */}
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
              >
                <AccountCircle />
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <Person sx={{ mr: 1 }} />
                  {user.email}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </Container>
    </Box>
  );
} 
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import logo from '../../assets/logo.png';

export default function Layout() {
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
            sx={{ color: '#fff', textDecoration: 'none' }}
          >
            Stock Manager
          </Typography>
          {/* additional menu items could go here */}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Outlet />
      </Container>
    </Box>
  );
} 
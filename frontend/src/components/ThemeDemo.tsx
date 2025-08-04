import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  Chip,
  Paper,
  Stack,
} from '@mui/material';
import { useCustomTheme } from '../hooks/useCustomTheme';

/**
 * Demo component to showcase theme colors and components
 * Useful for development and testing theme changes
 */
export default function ThemeDemo() {
  const { colors, mode, spacing } = useCustomTheme();

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Theme Demo - {mode} mode
      </Typography>
      
      <Stack spacing={3}>
        {/* Colors */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Color Palette
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Chip label="Primary" sx={{ bgcolor: colors.primary, color: 'white' }} />
            <Chip label="Secondary" sx={{ bgcolor: colors.secondary, color: 'white' }} />
            <Chip label="Success" sx={{ bgcolor: colors.success, color: 'white' }} />
            <Chip label="Warning" sx={{ bgcolor: colors.warning, color: 'white' }} />
            <Chip label="Error" sx={{ bgcolor: colors.error, color: 'white' }} />
          </Stack>
        </Paper>

        {/* Buttons */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Buttons
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="contained" color="secondary">Secondary</Button>
          </Stack>
        </Paper>

        {/* Cards */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Cards
          </Typography>
          <Stack direction="row" spacing={2}>
            <Card sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography variant="h6">Sample Card</Typography>
                <Typography color="text.secondary">
                  This is a sample card with themed styling.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Paper>

        {/* Alerts */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Alerts
          </Typography>
          <Stack spacing={1}>
            <Alert severity="success">Success alert</Alert>
            <Alert severity="warning">Warning alert</Alert>
            <Alert severity="error">Error alert</Alert>
            <Alert severity="info">Info alert</Alert>
          </Stack>
        </Paper>

        {/* Typography */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Typography
          </Typography>
          <Stack spacing={1}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Typography variant="body1">Body 1 text</Typography>
            <Typography variant="body2">Body 2 text</Typography>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
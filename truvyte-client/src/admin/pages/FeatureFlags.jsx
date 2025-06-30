import React from 'react';
import {
  Box,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
} from '@mui/material';

export default function FeatureFlags() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Feature Flags & Settings
      </Typography>

      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <FormGroup>
          {/* TODO: map over flags */}
          <FormControlLabel
            control={<Switch />}
            label="Enable URL-based Auditor"
          />
        </FormGroup>
      </Paper>

      <Button variant="contained">Save Changes</Button>
    </Box>
  );
}

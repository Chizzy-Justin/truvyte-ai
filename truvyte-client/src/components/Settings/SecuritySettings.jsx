import { useState } from 'react';
import { Box, Typography, FormControlLabel, Switch, List, ListItem, ListItemText } from '@mui/material';

const mockHistory = [
  'Logged in from Chrome on Windows at 2025-06-20 10:23',
  'Password changed at 2025-05-15 14:02',
];

export default function SecuritySettings() {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Security
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={twoFA}
            onChange={(e) => setTwoFA(e.target.checked)}
          />
        }
        label="Enable Two-Factor Authentication"
      />
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Login History
      </Typography>
      <List dense>
        {mockHistory.map((entry, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={entry} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

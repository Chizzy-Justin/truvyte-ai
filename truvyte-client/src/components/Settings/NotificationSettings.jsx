import { useState } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    auditComplete: true,
    monthlySummary: false,
    systemUpdates: true,
  });

  const toggle = (field) => (e) => {
    setSettings((s) => ({ ...s, [field]: e.target.checked }));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={settings.auditComplete} onChange={toggle('auditComplete')} />}
          label="Email on audit completion"
        />
        <FormControlLabel
          control={<Switch checked={settings.monthlySummary} onChange={toggle('monthlySummary')} />}
          label="Monthly compliance summary"
        />
        <FormControlLabel
          control={<Switch checked={settings.systemUpdates} onChange={toggle('systemUpdates')} />}
          label="Product and system updates"
        />
      </FormGroup>
    </Box>
  );
}

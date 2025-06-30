// src/components/NewAudit/ModelDetailsForm.jsx
import { Box, TextField, Typography } from '@mui/material';

export default function ModelDetailsForm({ value, onChange }) {
  const handleField = (field) => (e) =>
    onChange({ ...value, [field]: e.target.value });

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography variant="h6" gutterBottom>
        Tell us about your AI model
      </Typography>
      <TextField
        label="Model Name"
        fullWidth
        margin="normal"
        value={value.name}
        onChange={handleField('name')}
      />
      <TextField
        label="Industry / Use Case"
        fullWidth
        margin="normal"
        value={value.industry}
        onChange={handleField('industry')}
      />
      <TextField
        label="Version / Release"
        fullWidth
        margin="normal"
        value={value.version}
        onChange={handleField('version')}
      />
    </Box>
  );
}

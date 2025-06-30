// src/components/NewAudit/SampleOutputUploader.jsx
import { Box, Typography, TextField } from '@mui/material';

export default function SampleOutputUploader({ value, onChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Provide a sample output
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Paste in a representative text output from your model for compliance analysis.
      </Typography>
      <TextField
        label="Sample Output"
        fullWidth
        multiline
        minRows={6}
        margin="normal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
}

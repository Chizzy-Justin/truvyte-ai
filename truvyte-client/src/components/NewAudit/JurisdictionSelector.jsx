// src/components/NewAudit/JurisdictionSelector.jsx
import { Box, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput, Typography } from '@mui/material';

const AVAILABLE = ['GDPR', 'CCPA', 'PIPEDA', 'UK DPA', 'EO 14110'];

export default function JurisdictionSelector({ value, onChange }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Which jurisdiction(s) apply?
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="jurisdiction-label">Jurisdictions</InputLabel>
        <Select
          labelId="jurisdiction-label"
          multiple
          value={value}
          onChange={(e) => onChange(e.target.value)}
          input={<OutlinedInput label="Jurisdictions" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {selected.map((val) => <Chip key={val} label={val} />)}
            </Box>
          )}
        >
          {AVAILABLE.map((jur) => (
            <MenuItem key={jur} value={jur}>
              {jur}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

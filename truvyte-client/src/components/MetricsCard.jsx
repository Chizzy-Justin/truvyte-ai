// src/components/MetricsCard.jsx
import { Paper, Typography, Box } from '@mui/material';

export default function MetricsCard({ title, value }) {
  return (
    <Paper>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Paper>
  );
}

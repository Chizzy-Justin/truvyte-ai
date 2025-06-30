// src/pages/Help.jsx
import { Typography, Box, Paper } from '@mui/material';
export default function Help() {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>Help & FAQ</Typography>
      <Paper sx={{ p: 3 }}>{/* FaqAccordion, SupportTicketForm */}</Paper>
    </Box>
  );
}
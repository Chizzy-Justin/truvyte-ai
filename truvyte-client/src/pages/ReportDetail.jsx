// src/pages/ReportDetail.jsx
import { Typography, Box, Paper } from '@mui/material';
export default function ReportDetail() {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>Report Details</Typography>
      <Paper sx={{ p: 3 }}>{/* SummaryCard, RuleAccordion … */}</Paper>
    </Box>
  );
}
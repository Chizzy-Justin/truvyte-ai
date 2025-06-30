import { Box, Typography } from '@mui/material';

export default function UsageChart() {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Usage This Month
      </Typography>
      {/* Placeholder for a chart */}
      <Box
        sx={{
          height: 200,
          bgcolor: 'grey.100',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary'
        }}
      >
        [Usage Chart]
      </Box>
      <Typography variant="caption" display="block" mt={1}>
        12 of 20 scans used
      </Typography>
    </Box>
  );
}

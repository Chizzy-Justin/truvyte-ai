// // src/components/Billing/UsageChart.jsx
// import { Box, Typography } from '@mui/material';

// export default function UsageChart() {
//   return (
//     <Box>
//       <Typography variant="h6" gutterBottom>
//         Usage This Month
//       </Typography>
//       {/* Placeholder for a chart */}
//       <Box
//         sx={{
//           height: 200,
//           bgcolor: 'grey.100',
//           borderRadius: 1,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: 'text.secondary'
//         }}
//       >
//         [Usage Chart]
//       </Box>
//       <Typography variant="caption" display="block" mt={1}>
//         12 of 20 scans used
//       </Typography>
//     </Box>
//   );
// }
import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Shows a simple usage bar: used vs allowed audits.
 * Expects user.recentAudits.length and user.plan.auditLimit
 */
export default function UsageChart({ user }) {
  const used  = user.recentAudits?.length || 0;
  const limit = user.planAuditLimit || 0; // ensure your userContext returns planAuditLimit

  const percent = limit ? Math.min(100, Math.round((used / limit) * 100)) : 0;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Usage This Period
      </Typography>
      <Box
        sx={{
          height: 16,
          width: '100%',
          bgcolor: 'grey.200',
          borderRadius: 1,
          overflow: 'hidden',
          mb: 1,
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${percent}%`,
            bgcolor: 'primary.main',
          }}
        />
      </Box>
      <Typography variant="body2" color="text.secondary">
        {used} of {limit} audits used ({percent}%)
      </Typography>
    </Box>
  );
}

// // src/components/Billing/CurrentPlanCard.jsx

// import { Box, Typography, Button } from '@mui/material';

// export default function CurrentPlanCard() {
//   // replace with real data
//   const plan = { name: 'TrustBuilder', price: '$49/mo', renewal: '2025-07-15' };

//   return (
//     <Box>
//       <Typography variant="h6" gutterBottom>
//         Current Plan
//       </Typography>
//       <Typography variant="body1">
//         <strong>{plan.name}</strong> — {plan.price}
//       </Typography>
//       <Typography variant="body2" color="text.secondary" gutterBottom>
//         Renews on {plan.renewal}
//       </Typography>
//       <Button variant="outlined">Change Plan</Button>
//     </Box>
//   );
// }
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CurrentPlanCard({ user }) {
  const { plan, planEndDate } = user;
  const renewal = planEndDate
    ? new Date(planEndDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : '—';

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Current Plan
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>{plan}</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {plan === 'Free'
          ? 'No payment required'
          : `Renews on ${renewal}`}
      </Typography>
      <Button
        component={Link}
        to="/dashboard/plans"
        variant="outlined"
      >
        Change Plan
      </Button>
    </Box>
  );
}

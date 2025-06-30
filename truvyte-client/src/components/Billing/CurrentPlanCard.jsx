import { Box, Typography, Button } from '@mui/material';

export default function CurrentPlanCard() {
  // replace with real data
  const plan = { name: 'TrustBuilder', price: '$49/mo', renewal: '2025-07-15' };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Current Plan
      </Typography>
      <Typography variant="body1">
        <strong>{plan.name}</strong> — {plan.price}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Renews on {plan.renewal}
      </Typography>
      <Button variant="outlined">Change Plan</Button>
    </Box>
  );
}

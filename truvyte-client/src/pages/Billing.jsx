// // src/pages/Billing.jsx
// import { Typography, Box, Paper } from '@mui/material';
// export default function Billing() {
//   return (
//     <Box>
//       <Typography variant="h2" gutterBottom>Billing & Subscription</Typography>
//       <Paper sx={{ p: 3 }}>{/* CurrentPlanCard, UsageChart, PlanSwitcher */}</Paper>
//     </Box>
//   );
// }

import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import CurrentPlanCard from '../components/Billing/CurrentPlanCard';
import UsageChart from '../components/Billing/UsageChart';
import PlanSwitcher from '../components/Billing/PlanSwitcher';
import PaymentMethodForm from '../components/Billing/PaymentMethodForm';
import InvoiceHistory from '../components/Billing/InvoiceHistory';

export default function Billing() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Billing & Subscription
      </Typography>
      <Grid container spacing={4}>
        {/* Current Plan & Usage */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <CurrentPlanCard />
          </Paper>
        </Grid>
        <Grid size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <UsageChart />
          </Paper>
        </Grid>

        {/* Plan Switcher */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <PlanSwitcher />
          </Paper>
        </Grid>

        {/* Payment Method */}
        <Grid  size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <PaymentMethodForm />
          </Paper>
        </Grid>

        {/* Invoice History */}
        <Grid size={{xs: 12}}>
          <Paper sx={{ p: 3 }}>
            <InvoiceHistory />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

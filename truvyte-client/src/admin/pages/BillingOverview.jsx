import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CurrentPlanCard from '../../components/Billing/CurrentPlanCard';
import PlanSwitcher from '../../components/Billing/PlanSwitcher';
import PaymentMethodForm from '../../components/Billing/PaymentMethodForm';
import InvoiceHistory from '../../components/Billing/InvoiceHistory';
import UsageChart from '../../components/Billing/UsageChart';

export default function BillingOverview() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Billing Overview
      </Typography>

      <Box mb={3}>
        <CurrentPlanCard />
      </Box>

      <Box mb={3}>
        <PlanSwitcher />
      </Box>

      <Box mb={3}>
        <PaymentMethodForm />
      </Box>

      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Usage
        </Typography>
        <UsageChart />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Invoice History
        </Typography>
        <InvoiceHistory />
      </Box>
    </Box>
  );
}

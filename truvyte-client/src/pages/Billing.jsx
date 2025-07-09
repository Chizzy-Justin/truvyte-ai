 // // src/pages/Billing.jsx

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import CurrentPlanCard from '../components/Billing/CurrentPlanCard';
import UsageChart from '../components/Billing/UsageChart';
import PaymentMethodForm from '../components/Billing/PaymentMethodForm';
import InvoiceHistory from '../components/Billing/InvoiceHistory';
import { useUser } from '../context/userContext';

export default function Billing() {
  const { user, loading: userLoading, error: userError } = useUser();
  const [invoices, setInvoices]       = useState([]);
  const [pmLoading,   setPmLoading]   = useState(true);
  const [pmError,     setPmError]     = useState('');
  const [loadingInv,  setLoadingInv]  = useState(true);
  const [invError,    setInvError]    = useState('');

  // Fetch invoices
  useEffect(() => {
    axios.get('/api/invoices')
      .then(({ data }) => setInvoices(data))
      .catch(() => setInvError('Failed to load invoices'))
      .finally(() => setLoadingInv(false));
  }, []);

  // Fetch payment methods (if you support storing them)
  const [methods, setMethods] = useState([]);
  useEffect(() => {
    axios.get('/api/payment-methods')
      .then(({ data }) => setMethods(data))
      .catch(() => setPmError('Failed to load payment methods'))
      .finally(() => setPmLoading(false));
  }, []);

  if (userLoading) return <CircularProgress />;
  if (userError)   return <Alert severity="error">{userError}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Billing & Subscription
      </Typography>

      <Grid container spacing={4}>
        {/* Current Plan */}
        <Grid  size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <CurrentPlanCard user={user} />
          </Paper>
        </Grid>

        {/* Usage Chart */}
        <Grid  size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <UsageChart user={user} />
          </Paper>
        </Grid>

        {/* Payment Methods */}
        <Grid  size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            {pmLoading ? (
              <CircularProgress />
            ) : pmError ? (
              <Alert severity="error">{pmError}</Alert>
            ) : (
              <PaymentMethodForm methods={methods} />
            )}
          </Paper>
        </Grid>

        {/* Invoice History */}
        <Grid size={{xs: 12}}>
          <Paper sx={{ p: 3 }}>
            {loadingInv ? (
              <CircularProgress />
            ) : invError ? (
              <Alert severity="error">{invError}</Alert>
            ) : (
              <InvoiceHistory invoices={invoices} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

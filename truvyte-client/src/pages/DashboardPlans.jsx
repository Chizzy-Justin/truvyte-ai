// src/pages/DashboardPlans.jsx
import React from 'react';
import { Box, Grid, Card, CardHeader, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useUser } from '../context/userContext';
import axios from 'axios';


const allPlans = [
  {
    name: 'Free',
    price: 'NGN0/month',
    features: [
      'Up to 5 audits per month',
      'Basic compliance questions',
      'Community support'
    ],
  },
  {
    name: 'Pro',
    price: 'NGN43,000/month',
    features: [
      'Up to 50 audits per month',
      'Full questionnaire access',
      'Email support',
      'Monthly compliance report'
    ],
  },
  {
    name: 'Enterprise',
    price: 'Contact us',
    features: [
      'Unlimited audits',
      'Dedicated questionnaire customizations',
      'Priority support',
      'Dedicated account manager'
    ],
  },
];



export default function DashboardPlans() {
  const { user } = useUser();
const handleChoosePlan = async (planName) => {
  try {
     if (planName === 'Free') {
      // Downgrade immediately without going through Paystack
      await axios.post('/api/payments/downgrade', {
        email: user.email,
      });
      // Refresh user context or reload page
      window.location.reload();
      return;
    }
    // Assume you have user.email in context
    const { data } = await axios.post('/api/payments/initialize', {
      planName,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
    });
    // Redirect browser to Paystack checkout page
    window.location.href = data.authorization_url;
  } catch (err) {
    console.error('Payment init failed', err);
    alert(err.response?.data?.error || 'Payment initialization failed.');
  }
};
  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Choose Your Plan
      </Typography>
      <Grid container spacing={4}>
        {allPlans.map((plan) => {
          const isCurrent = plan.name === user.plan;
          return (
            <Grid key={plan.name} size={{xs: 12, sm: 6, md: 6}}>
              <Card
                variant="outlined"
                sx={{
                    borderWidth: isCurrent ? 10: 2,
                  borderColor: isCurrent ? 'primary.main' : 'grey.300',
                  boxShadow: isCurrent ? 3 : 1,
                }}
              >
                <CardHeader
                  title={plan.name}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  subheader={plan.price}
                />
                <CardContent>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {plan.features.map((f) => (
                      <li key={f}>
                        <Typography variant="body2">{f}</Typography>
                      </li>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>

                  <Button
                        variant={isCurrent ? 'contained' : 'outlined'}
                        color={isCurrent ? 'primary' : 'inherit'}
                        disabled={isCurrent}
                        onClick={() => handleChoosePlan(plan.name)}
                        >
                        {isCurrent ? 'Current Plan' : 'Choose Plan'}
                        </Button>

                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

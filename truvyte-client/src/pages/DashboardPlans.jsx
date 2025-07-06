// src/pages/DashboardPlans.jsx
import React from 'react';
import { Box, Grid, Card, CardHeader, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useUser } from '../context/userContext';

const allPlans = [
  {
    name: 'Free',
    price: '$0/month',
    features: [
      'Up to 5 audits per month',
      'Basic compliance questions',
      'Community support'
    ],
  },
  {
    name: 'Pro',
    price: '$49/month',
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

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Choose Your Plan
      </Typography>
      <Grid container spacing={4}>
        {allPlans.map((plan) => {
          const isCurrent = plan.name === user.plan;
          return (
            <Grid item key={plan.name} xs={12} sm={6} md={4}>
              <Card
                variant="outlined"
                sx={{
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
                    onClick={() => {
                      if (!isCurrent) {
                        // TODO: redirect to payment / subscription endpoint
                        window.location.href = `/api/subscribe?plan=${plan.name}`;
                      }
                    }}
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

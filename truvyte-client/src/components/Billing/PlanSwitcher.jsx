// src/components/Billing/PlanSwitcher.jsx
import { useState } from 'react';
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const plans = [
  { id: 'foundations', label: 'Foundations (Free)', desc: '10-question audit, no badge' },
  { id: 'trustbuilder', label: 'TrustBuilder ($49/mo)', desc: 'Multi-jurisdiction, PDF badge' },
  { id: 'assure360', label: 'Assure360 (Custom)', desc: 'Enterprise features & SLA' },
];

export default function PlanSwitcher() {
  const [selected, setSelected] = useState('trustbuilder');

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Switch Plan
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {plans.map((plan) => (
            <FormControlLabel
              key={plan.id}
              value={plan.id}
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="subtitle1">{plan.label}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {plan.desc}
                  </Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button variant="contained" sx={{ mt: 2 }}>
        Confirm Change
      </Button>
    </Box>
  );
}

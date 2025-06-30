import React from 'react';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';

export default function PlansPricing() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Plans &amp; Pricing
      </Typography>

      <Box mb={2}>
        <Button variant="contained">+ Add New Plan</Button>
      </Box>

      <Grid container spacing={2}>
        {/* TODO: render a card per plan */}
        <Grid size={{xs: 12, sm: 6, md: 4}}>
          <Paper elevation={1}>
            <Box p={2}>
              <Typography variant="h6">Free</Typography>
              <Typography>— Features & limits —</Typography>
              <Box mt={2}>
                <Button size="small" variant="outlined">
                  Edit
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

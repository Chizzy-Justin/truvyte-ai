import React from 'react';
import { Grid, Box, Typography, Paper } from '@mui/material';
import MetricsCard from '../../components/MetricsCard'; // or your own card component
import RecentAuditsTable from '../../components/RecentAuditsTable';
import theme from '../../theme';

export default function AdminHome() {
    const drawerWidth = theme.custom.drawerWidth;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Home
      </Typography>

      <Grid container spacing={2} mb={4}>
        {/* Example metric cards */}
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Total Users" value="—" />
        </Grid>
        <Grid  size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Active Plans" value="—" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Audits Completed" value="—" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Pending Reviews" value="—" />
        </Grid>
      </Grid>

      <Paper elevation={1} sx={{ 
        width: {xs: '90vw', md: `calc(90vw - ${drawerWidth}px)`}, 
        overflowX: 'auto',
      }}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <RecentAuditsTable /> {/* Placeholder table component */}
        </Box>
      </Paper>
    </Box>
  );
}

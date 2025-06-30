// src/pages/DashboardHome.jsx
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MetricsCard from '../components/MetricsCard';
import RecentAuditsTable from '../components/RecentAuditsTable';

export default function DashboardHome() {
  return (
    <Box>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Welcome back, Jane 👋</Typography>
        <Button variant="contained" component={Link} to="/dashboard/audit/new">New Audit</Button>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Total Audits" value="12" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Avg. Risk Score" value="42%" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Active Plan" value="Trust Builder" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Badge Status" value="Valid until Jul 31" />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>Recent Audits</Typography>
        <RecentAuditsTable />
      </Paper>
    </Box>
  );
}

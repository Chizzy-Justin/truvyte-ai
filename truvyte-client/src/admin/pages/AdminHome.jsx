import React, {useState, useEffect} from 'react';
import { Grid, Box, Typography, Paper, CircularProgress, Alert, } from '@mui/material';
import axios from 'axios';
import MetricsCard from '../../components/MetricsCard'; // or your own card component
import RecentAuditsTable from '../../components/RecentAuditsTable';
import theme from '../../theme';

export default function AdminHome() {
    const drawerWidth = theme.custom.drawerWidth;
      const [metrics, setMetrics]   = useState({
    totalUsers:       null,
    activePlans:      null,
    auditsCompleted:  null,
    pendingReviews:   null,
  });
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    async function loadMetrics() {
      try {
        // 1. Fetch all users
        const usersRes = await axios.get('/api/users');
        const users = usersRes.data;

        // // 2. Fetch all audits
        // const auditsRes = await axios.get('/api/audits');
        // const audits = auditsRes.data;

        // 3. Compute metrics
        const totalUsers      = users.length;
        const activePlans     = users.filter(u => u.billingStatus === 'active').length;
        // const auditsCompleted = audits.filter(a => a.status === 'completed').length;
        // const pendingReviews  = audits.filter(a => a.pendingReview === true).length;

        setMetrics({ totalUsers, activePlans,
          //  auditsCompleted, pendingReviews
           });
      } catch (err) {
        console.error(err);
        setError('Failed to load metrics.');
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, []);

  if (loading) return <CircularProgress />;
  if (error)   return <Alert severity="error">{error}</Alert>;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Home
      </Typography>

      <Grid container spacing={2} mb={4}>
        {/* Example metric cards */}
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Total Users" value={metrics.totalUsers} />
        </Grid>
        <Grid  size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Active Plans" value={metrics.activePlans} />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Audits Completed" value={metrics.auditsCompleted || "--"} />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 3}}>
          <MetricsCard title="Pending Reviews" value={metrics.pendingReviews || "--"} />
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

// // src/pages/DashboardHome.jsx
// import { Grid, Paper, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
// import { Link } from 'react-router-dom';
// import MetricsCard from '../components/MetricsCard';
// import RecentAuditsTable from '../components/RecentAuditsTable';
// import { useUser } from '../context/userContext'

// export default function DashboardHome() {
//     const { user, loading, error } = useUser();

//   if (loading) return <CircularProgress />;
//   if (error)   return <Alert severity="error">Failed to load user</Alert>;

//   return (
//     <Box>
//       <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
//         <Typography variant="h2">Welcome back, {user.firstName}👋</Typography>
//         <Button variant="contained" component={Link} to="/dashboard/audit/new">New Audit</Button>
//       </Box>
//   {console.log(user)}
//       <Grid container spacing={3} mb={4}>
//         <Grid size={{xs: 12, sm: 6, md: 3}}>
//           <MetricsCard title="Total Audits" value="12" />
//         </Grid>
//         <Grid size={{xs: 12, sm: 6, md: 3}}>
//           <MetricsCard title="Avg. Risk Score" value={user.complianceScore + "%"} />
//         </Grid>
//         <Grid size={{xs: 12, sm: 6, md: 3}}>
//            <MetricsCard title="Active Plan" value={user.plan} /> 
//         </Grid>
//         <Grid size={{xs: 12, sm: 6, md: 3}}>
//           <MetricsCard title="Badge Status"   value={
//     user.planEndDate
//       ? "Valid Until " + new Date(user.planEndDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
//       : "N/A"
//   } />
//         </Grid>
//       </Grid>

//       <Paper sx={{ p: 3 }}>
//         <Typography variant="h3" gutterBottom>Recent Audits</Typography>
//         <RecentAuditsTable />
//       </Paper>
//     </Box>
//   );
// }
// src/pages/DashboardHome.jsx
import { Grid, Paper, Typography, Box, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import MetricsCard from '../components/MetricsCard';
import RecentAuditsTable from '../components/RecentAuditsTable';
import { useUser } from '../context/userContext';

export default function DashboardHome() {
  const { user, loading, error } = useUser();

  if (loading) return <CircularProgress />;
  if (error)   return <Alert severity="error">Failed to load user</Alert>;

  return (
    <Box>
      {/* Header with New Audit and Change Plan */}
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Welcome back, {user.firstName}! 👋</Typography>
        <Box>
          <Button
            component={Link}
            to="/dashboard/audit/new"
            variant="contained"
            sx={{ mr: 2, mt: 2 }}
          >
            New Audit
          </Button>
          <Button
            component={Link}
            to="/dashboard/plans"
            variant="outlined"
            sx={{ mr: 2, mt: 2 }}
          >
            Change Plan
          </Button>
        </Box>
      </Box>

      {/* Metrics */}
        <Grid container spacing={3} mb={4}>
           <Grid size={{xs: 12, sm: 6, md: 3}}>
             <MetricsCard title="Total Audits" value="12" />
           </Grid>
           <Grid size={{xs: 12, sm: 6, md: 3}}>
             <MetricsCard title="Avg. Risk Score" value={user.complianceScore + "%"} />
           </Grid>
           <Grid size={{xs: 12, sm: 6, md: 3}}>
              <MetricsCard title="Active Plan" value={user.plan} /> 
           </Grid>
           <Grid size={{xs: 12, sm: 6, md: 3}}>
              <MetricsCard
            title="Badge Status"
            value={
              user.planEndDate
                ? `Valid Until ${new Date(user.planEndDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}`
                : 'N/A'
            }
          />
           </Grid>
         </Grid>


      {/* Recent Audits */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          Recent Audits
        </Typography>
        <RecentAuditsTable />
      </Paper>
    </Box>
  );
}

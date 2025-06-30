// // src/pages/Settings.jsx
// import { Typography, Box, Paper } from '@mui/material';
// export default function Settings() {
//   return (
//     <Box>
//       <Typography variant="h2" gutterBottom>Settings</Typography>
//       <Paper sx={{ p: 3 }}>{/* ProfileForm, SocialLogins, Security, APIKeys */}</Paper>
//     </Box>
//   );
// }
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import ProfileForm from '../components/Settings/ProfileForm';
import SocialLogins from '../components/Settings/SocialLogins';
import SecuritySettings from '../components/Settings/SecuritySettings';
import ApiKeysManager from '../components/Settings/ApiKeysManager';
import NotificationSettings from '../components/Settings/NotificationSettings';

export default function Settings() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Grid container spacing={4}>
        {/* Profile */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <ProfileForm />
          </Paper>
        </Grid>

        {/* Social Logins */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <SocialLogins />
          </Paper>
        </Grid>

        {/* Security */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <SecuritySettings />
          </Paper>
        </Grid>

        {/* API Keys */}
        <Grid size={{xs: 12, md: 6}}>
          <Paper sx={{ p: 3 }}>
            <ApiKeysManager />
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid size={{xs: 12}}>
          <Paper sx={{ p: 3 }}>
            <NotificationSettings />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

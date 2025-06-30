import { Box, Typography, Button, Stack } from '@mui/material';
import { Google, GitHub } from '@mui/icons-material';

export default function SocialLogins() {
  const handleLink = (provider) => {
    // TODO: initiate OAuth for provider
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Social Logins
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          startIcon={<Google />}
          variant="outlined"
          onClick={() => handleLink('google')}
        >
          { /* dynamically change to "Link" or "Unlink" */ }
          Link Google
        </Button>
        <Button
          startIcon={<GitHub />}
          variant="outlined"
          onClick={() => handleLink('github')}
        >
          Link GitHub
        </Button>
      </Stack>
    </Box>
  );
}

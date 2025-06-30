import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function ProfileForm() {
  const [profile, setProfile] = useState({ name: '', email: '' });

  const handleChange = (field) => (e) =>
    setProfile((p) => ({ ...p, [field]: e.target.value }));

  const handleSave = () => {
    // TODO: save profile
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Profile
      </Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={profile.name}
        onChange={handleChange('name')}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={profile.email}
        onChange={handleChange('email')}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
        Save Profile
      </Button>
    </Box>
  );
}

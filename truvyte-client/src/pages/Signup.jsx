// src/pages/Signup.jsx
import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Divider, Box, Stack } from '@mui/material';
import { Google, GitHub } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: perform signup logic
    navigate('/dashboard');
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 8, mb: 8 }}
    >
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Create Your Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, mb: 1 }}
          >
            Sign Up
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>or continue with</Divider>

        <Stack spacing={2}>
          <Button
            startIcon={<Google />}
            variant="outlined"
            fullWidth
            // TODO: hook up Google OAuth
          >
            Sign up with Google
          </Button>
          <Button
            startIcon={<GitHub />}
            variant="outlined"
            fullWidth
            // TODO: hook up GitHub OAuth
          >
            Sign up with GitHub
          </Button>
        </Stack>

        <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: 'primary.main' }}>
            Log in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

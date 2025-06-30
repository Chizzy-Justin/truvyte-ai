// src/pages/Login.jsx
import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Divider, Box, Stack } from '@mui/material';
import { Google, GitHub } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: perform login logic
    navigate('/dashboard');
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mt: 8, mb: 8 }}
    >
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Welcome Back
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
            Log In
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
            Continue with Google
          </Button>
          <Button
            startIcon={<GitHub />}
            variant="outlined"
            fullWidth
            // TODO: hook up GitHub OAuth
          >
            Continue with GitHub
          </Button>
        </Stack>

        <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
          Don’t have an account?{' '}
          <Link to="/signup" style={{ textDecoration: 'none', color: 'primary.main' }}>
            Sign up
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

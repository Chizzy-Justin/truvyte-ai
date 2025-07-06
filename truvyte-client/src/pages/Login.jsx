// // src/pages/Login.jsx
// import { useState } from 'react';
// import { Container, Paper, Typography, TextField, Button, Divider, Box, Stack } from '@mui/material';
// import { Google, GitHub } from '@mui/icons-material';
// import { useNavigate, Link } from 'react-router-dom';

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: perform login logic
//     navigate('/dashboard');
//   };

//   return (
//     <Container
//       maxWidth="xs"
//       sx={{ mt: 8, mb: 8 }}
//     >
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//           Welcome Back
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             required
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             required
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2, mb: 1 }}
//           >
//             Log In
//           </Button>
//         </Box>

//         <Divider sx={{ my: 3 }}>or continue with</Divider>

//         <Stack spacing={2}>
//           <Button
//             startIcon={<Google />}
//             variant="outlined"
//             fullWidth
//             // TODO: hook up Google OAuth
//           >
//             Continue with Google
//           </Button>
//           <Button
//             startIcon={<GitHub />}
//             variant="outlined"
//             fullWidth
//             // TODO: hook up GitHub OAuth
//           >
//             Continue with GitHub
//           </Button>
//         </Stack>

//         <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
//           Don’t have an account?{' '}
//           <Link to="/signup" style={{ textDecoration: 'none', color: 'primary.main' }}>
//             Sign up
//           </Link>
//         </Typography>
//       </Paper>
//     </Container>
//   );
// }
// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Box,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Google, GitHub } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  // form state
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');

  // UI state
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      return setError('Please enter both email and password.');
    }

    setLoading(true);
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });

      // Save token (and optional user info) in localStorage
      localStorage.setItem('token', data.token);
      // Optionally save user data: localStorage.setItem('user', JSON.stringify(data.user));

      // Set default Authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      console.log('authorization stored')
      // Redirect to dashboard home
      navigate('/dashboard/home', { replace: true });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          'Login failed — please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign="center"
        >
          Welcome Back
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Log In'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }}>or continue with</Divider>

        <Stack spacing={2}>
          <Button
            startIcon={<Google />}
            variant="outlined"
            fullWidth
            disabled
          >
            Continue with Google
          </Button>
          <Button
            startIcon={<GitHub />}
            variant="outlined"
            fullWidth
            disabled
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

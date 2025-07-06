// // src/pages/Signup.jsx
// import { useState } from 'react';
// import { Container, Paper, Typography, TextField, Button, Divider, Box, Stack } from '@mui/material';
// import { Google, GitHub } from '@mui/icons-material';
// import { useNavigate, Link } from 'react-router-dom';

// export default function Signup() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: perform signup logic
//     navigate('/dashboard');
//   };

//   return (
//     <Container
//       maxWidth="xs"
//       sx={{ mt: 8, mb: 8 }}
//     >
//       <Paper sx={{ p: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom textAlign="center">
//           Create Your Account
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
//             Sign Up
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
//             Sign up with Google
//           </Button>
//           <Button
//             startIcon={<GitHub />}
//             variant="outlined"
//             fullWidth
//             // TODO: hook up GitHub OAuth
//           >
//             Sign up with GitHub
//           </Button>
//         </Stack>

//         <Typography variant="body2" textAlign="center" sx={{ mt: 3 }}>
//           Already have an account?{' '}
//           <Link to="/login" style={{ textDecoration: 'none', color: 'primary.main' }}>
//             Log in
//           </Link>
//         </Typography>
//       </Paper>
//     </Container>
//   );
// }
// src/pages/Signup.jsx
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
import PasswordField from '../components/PasswordField';



export default function Signup() {
  const navigate = useNavigate();

  // Step: 'form' | 'verify'
  const [step, setStep] = useState('form');

  // Form fields
  const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  // OTP field
  const [otp, setOtp] = useState('');

  // UX state
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: request OTP
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password || !confirmPwd) {
      return setError('Please fill in all fields.');
    }
    if (password !== confirmPwd) {
      return setError('Passwords do not match.');
    }
    setLoading(true);
    try {
      await axios.post('/auth/request-otp', {
        firstName,
        lastName,
        email,
        password,
      });
      setStep('verify');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to request OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: verify OTP & finalize signup
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!otp) return setError('Please enter the OTP.');

    setLoading(true);
    try {
      await axios.post('/auth/verify-otp', { email, otp });
      // on success, redirect to login or dashboard
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
      <Paper sx={{ p: 4 }}>
        {step === 'form' ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
              Create Your Account
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleFormSubmit} noValidate>
              <TextField
                label="First Name"
                fullWidth
                required
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
                 <TextField
                label="Last Name"
                fullWidth
                required
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <TextField
                label="Password"
                type="password"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
              <PasswordField password={password} setPassword={setPassword} />

              {/* <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                required
                margin="normal"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
              /> */}
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                required
                margin="normal"
                value={confirmPwd}
                error={confirmPwd && confirmPwd !== password}
                helperText={
                  confirmPwd && confirmPwd !== password
                    ? "Passwords don't match"
                    : ''
                }
                onChange={(e) => setConfirmPwd(e.target.value)}
              />


              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, mb: 1 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Send Verification Code'}
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
                Sign up with Google
              </Button>
              <Button
                startIcon={<GitHub />}
                variant="outlined"
                fullWidth
                disabled
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
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom textAlign="center">
              Enter Verification Code
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
              We sent a 6‑digit code to <strong>{email}</strong>. It expires in 1 hour.
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleVerifySubmit} noValidate>
              <TextField
                label="Verification Code"
                fullWidth
                required
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Verify & Create Account'}
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
}

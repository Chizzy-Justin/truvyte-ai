import React, { useState } from 'react';
import { TextField, FormHelperText, Box } from '@mui/material';

export default function PasswordField({ password, setPassword }) {
  // Validation rules
  const rules = [
    {
      test: (pw) => pw.length >= 8,
      label: 'At least 8 characters',
    },
    {
      test: (pw) => /[A-Z]/.test(pw),
      label: 'One uppercase letter',
    },
    {
      test: (pw) => /[a-z]/.test(pw),
      label: 'One lowercase letter',
    },
    {
      test: (pw) => /\d/.test(pw),
      label: 'One number',
    },
  {
  test: (pw) => /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?`~]/.test(pw),
  label: 'One special character (!@#$%^&*()-_=+[]{};:\'",.<>?/`~)',
},

  ];

  // Compute which rules are failing
  const failed = rules.filter((r) => !r.test(password));

  return (
    <Box>
      <TextField
        label="Password"
        type="password"
        fullWidth
        required
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={failed.length > 0}
      />
      {failed.length > 0 && (
        <FormHelperText error>
          {failed.map((r) => r.label).join(', ')}
        </FormHelperText>
      )}
    </Box>
  );
}

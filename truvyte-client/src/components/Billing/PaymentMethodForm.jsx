import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function PaymentMethodForm() {
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' });

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <TextField
        label="Card Number"
        fullWidth
        margin="normal"
        value={card.number}
        onChange={(e) => setCard({ ...card, number: e.target.value })}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Expiry"
          fullWidth
          margin="normal"
          value={card.expiry}
          onChange={(e) => setCard({ ...card, expiry: e.target.value })}
        />
        <TextField
          label="CVC"
          fullWidth
          margin="normal"
          value={card.cvc}
          onChange={(e) => setCard({ ...card, cvc: e.target.value })}
        />
      </Box>
      <Button variant="contained" sx={{ mt: 2 }}>
        Update Card
      </Button>
    </Box>
  );
}

// // src/components/Billing/PaymentMethodForm.jsx
// import { useState } from 'react';
// import { Box, Typography, TextField, Button } from '@mui/material';

// export default function PaymentMethodForm() {
//   const [card, setCard] = useState({ number: '', expiry: '', cvc: '' });

//   return (
//     <Box component="form" noValidate autoComplete="off">
//       <Typography variant="h6" gutterBottom>
//         Payment Method
//       </Typography>
//       <TextField
//         label="Card Number"
//         fullWidth
//         margin="normal"
//         value={card.number}
//         onChange={(e) => setCard({ ...card, number: e.target.value })}
//       />
//       <Box sx={{ display: 'flex', gap: 2 }}>
//         <TextField
//           label="Expiry"
//           fullWidth
//           margin="normal"
//           value={card.expiry}
//           onChange={(e) => setCard({ ...card, expiry: e.target.value })}
//         />
//         <TextField
//           label="CVC"
//           fullWidth
//           margin="normal"
//           value={card.cvc}
//           onChange={(e) => setCard({ ...card, cvc: e.target.value })}
//         />
//       </Box>
//       <Button variant="contained" sx={{ mt: 2 }}>
//         Update Card
//       </Button>
//     </Box>
//   );
// }
import React, { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';

/**
 * methods: array of { id, brand, last4, expMonth, expYear }
 */
export default function PaymentMethodForm({ methods }) {
  const [selected, setSelected] = useState(
    methods[0]?.id || ''
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="pm-select-label">Card on File</InputLabel>
        <Select
          labelId="pm-select-label"
          value={selected}
          label="Card on File"
          onChange={(e) => setSelected(e.target.value)}
        >
          {methods.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.brand.toUpperCase()} •••• {m.last4} (exp {m.expMonth}/{m.expYear})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" sx={{ mt: 2 }}>
        Update Payment Method
      </Button>
      <Box mt={1}>
        <Button size="small">Add New Card</Button>
      </Box>
    </Box>
  );
}

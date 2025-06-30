import { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Box,
  Typography
} from '@mui/material';

// mock data
const mockInvoices = [
  { id: 1, date: '2025-06-15', amount: '$49.00', status: 'Paid' },
  { id: 2, date: '2025-05-15', amount: '$49.00', status: 'Paid' },
  { id: 3, date: '2025-04-15', amount: '$49.00', status: 'Paid' },
];

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setInvoices(mockInvoices);
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Invoice History
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>{inv.date}</TableCell>
                <TableCell>{inv.amount}</TableCell>
                <TableCell>{inv.status}</TableCell>
                <TableCell align="right">
                  <Button size="small">PDF</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

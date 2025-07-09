
// src/components/Billing/InvoiceHistory.jsx
import React from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Stack,
} from '@mui/material';

/**
 * invoices: array of {
 *   _id,
 *   invoiceNumber,
 *   issuedAt,
 *   userFirstName,
 *   userLastName,
 *   customerEmail,
 *   amountCents,
 *   taxCents,
 *   discountCents,
 *   totalCents,
 *   currency,
 *   status,
 *   invoiceUrl
 * }
 */
export default function InvoiceHistory({ invoices }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Invoice History
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Invoice #</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Download</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {invoices.map((inv) => {
              const {
                _id,
                invoiceNumber,
                issuedAt,
                userFirstName,
                userLastName,
                customerEmail,
                amountCents,
                taxCents,
                discountCents,
                totalCents,
                currency,
                status,
                invoiceUrl,
              } = inv;

              const fmt = (value) =>
                (value / 100).toLocaleString(undefined, {
                  style: 'currency',
                  currency,
                });

              return (
                <TableRow key={_id}>
                  <TableCell>{invoiceNumber}</TableCell>
                  <TableCell>
                    {new Date(issuedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{`${userFirstName} ${userLastName}`}</TableCell>
                  <TableCell>{customerEmail}</TableCell>
                  <TableCell align="right">{fmt(amountCents)}</TableCell>
                  <TableCell align="right">{fmt(taxCents)}</TableCell>
                  <TableCell align="right">{fmt(discountCents)}</TableCell>
                  <TableCell align="right">{fmt(totalCents)}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={
                        status === 'paid' || status === 'success'
                          ? 'success.main'
                          : status === 'overdue' || status === 'failed'
                          ? 'error.main'
                          : 'text.secondary'
                      }
                    >
                      {status}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {invoiceUrl ? (
                      <Button
                        size="small"
                        component="a"
                        href={invoiceUrl}
                        target="_blank"
                      >
                        PDF
                      </Button>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

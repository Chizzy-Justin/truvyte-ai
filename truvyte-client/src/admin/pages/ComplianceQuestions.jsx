import React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import theme from '../../theme';

export default function ComplianceQuestions() {
    const drawerWidth = theme.custom.drawerWidth;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Compliance Questions
      </Typography>

      <Box mb={2}>
        <Button variant="contained">+ Add New Question</Button>
      </Box>

      <Paper elevation={1} sx={{ 
        width: {xs: '90vw', md: `calc(90vw - ${drawerWidth}px)`}, 
        overflowX: 'auto',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Text</TableCell>
              <TableCell>Jurisdictions</TableCell>
              <TableCell>Answer Type</TableCell>
              <TableCell>Plan Tier</TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* TODO: map over questions data */}
            <TableRow>
              <TableCell colSpan={7} align="center">
                No questions yet.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

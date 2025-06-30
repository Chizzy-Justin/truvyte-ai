import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../theme';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'plan', headerName: 'Plan', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    renderCell: () => (
      <Button size="small" variant="outlined">
        View
      </Button>
    ),
  },
];

const rows = []; // TODO: replace with real data

export default function UserManagement() {
    const drawerWidth = theme.custom.drawerWidth;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Paper elevation={1} sx={{ 
        width: {xs: '90vw', md: `calc(90vw - ${drawerWidth}px)`}, 
        overflowX: 'auto',
      }}>
        <Box height={500} p={2}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
          />
        </Box>
      </Paper>
    </Box>
  );
}

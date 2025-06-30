import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import theme from '../../theme';

const columns = [
  { field: 'id', headerName: 'Audit ID', width: 100 },
  { field: 'user', headerName: 'User', flex: 1 },
  { field: 'type', headerName: 'Type', width: 120 },
  { field: 'status', headerName: 'Status', width: 130 },
  { field: 'date', headerName: 'Date', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: () => <Button size="small">View</Button>,
  },
];

const rows = []; // TODO

export default function AuditManagement() {
    const drawerWidth = theme.custom.drawerWidth;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Audit Management
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

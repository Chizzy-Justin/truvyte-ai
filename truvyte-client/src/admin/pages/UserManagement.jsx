
// src/admin/pages/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import theme from '../../theme';

export default function UserManagement() {
  const drawerWidth = theme.custom.drawerWidth;

  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const { data } = await axios.get('/api/users');
        setUsers(data);
      } catch (err) {
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete user ${id}? This cannot be undone.`)) return;
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete user.');
    }
  };




const columns = [
  {
    field: '_id',
    headerName: 'Email (ID)',
    width: 200,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    // new signature: (value, row) => string
    valueGetter: ( _ , row) => {
      // value is row['name'] (undefined), so ignore it and build from row
      const first = row.firstName || '';
      const last  = row.lastName  || '';
      const full  = `${first} ${last}`.trim();
      return full || '—';
    },
  },
  {
    field: 'plan',
    headerName: 'Plan',
    width: 130,
    valueGetter: (value, row) => row.plan || '—',
  },
  {
    field: 'billingStatus',
    headerName: 'Billing Status',
    width: 140,
    valueGetter: (value, row) => row.billingStatus || '—',
  },
  {
    field: 'lastPayment',
    headerName: 'Last Payment',
    width: 160,
    valueGetter: (value, row) => {
      const pays = row.payments || [];
      if (pays.length === 0) return '—';
      const lastDate = pays[pays.length - 1].date;
      return lastDate ? lastDate.split('T')[0] : '—';
    },
  },
  {
    field: 'complianceScore',
    headerName: 'Compliance Score',
    width: 150,
    // new signature: (value) => string
    valueFormatter: (value) =>
      typeof value === 'number' ? `${value}%` : '—',
  },
  {
    field: 'complianceValidUntil',
    headerName: 'Valid Until',
    width: 140,
    valueFormatter: (value) =>
      value ? value.split('T')[0] : '—',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    sortable: false,
    // renderCell still receives params
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => window.alert(JSON.stringify(params.row, null, 2))}
        >
          View
        </Button>
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      </Stack>
    ),
  },
];
  if (loading) return <CircularProgress />;
  if (error)   return <Alert severity="error">{error}</Alert>;
    if (!loading && !error) { // Ensure data is loaded and no error
    console.log("Users array before DataGrid:", users);
    console.log("Type of first user:", users.length > 0 ? typeof users[0] : 'N/A');
    if (users.length > 0) {
      console.log("First user object:", users[0]);
      // Check for any null/undefined entries in the array itself
      const nullishEntries = users.filter(item => item === null || item === undefined);
      if (nullishEntries.length > 0) {
        console.error("Warning: Users array contains null or undefined entries!", nullishEntries);
      }
    }
  }

  return (
    <Box>
       {console.log('users:', users, 'columns:', columns)}
 
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Paper
        elevation={1}
        sx={{
          width: { xs: '90vw', md: `calc(90vw - ${drawerWidth}px)` },
          overflowX: 'auto',
        }}
      >
        <Box height={600} p={2}>
          <DataGrid
            rows={users}
            getRowId={(row) =>  row._id}
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

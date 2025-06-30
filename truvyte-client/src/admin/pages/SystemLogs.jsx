import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SystemLogs() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Logs
      </Typography>

      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Box display="flex" alignItems="center">
          <TextField
            placeholder="Filter logs..."
            variant="outlined"
            size="small"
            fullWidth
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      </Paper>

      <Paper elevation={1}>
        <List sx={{ maxHeight: 500, overflow: 'auto' }}>
          {/* TODO: map over log entries */}
          <ListItem>
            <ListItemText
              primary="— No logs available —"
              secondary=""
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

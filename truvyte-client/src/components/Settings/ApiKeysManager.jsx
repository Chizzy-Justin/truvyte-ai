import { useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { FileCopy, Delete } from '@mui/icons-material';

export default function ApiKeysManager() {
  const [keys, setKeys] = useState([{ id: 'abc123', name: 'Default Key' }]);

  const handleGenerate = () => {
    // TODO: call API to generate
    setKeys((prev) => [...prev, { id: 'newkey' + Date.now(), name: 'New Key' }]);
  };

  const handleRevoke = (id) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        API Keys
      </Typography>
      <Button variant="contained" onClick={handleGenerate}>
        Generate New Key
      </Button>
      <List dense sx={{ mt: 2 }}>
        {keys.map((key) => (
          <ListItem
            key={key.id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => navigator.clipboard.writeText(key.id)}>
                  <FileCopy />
                </IconButton>
                <IconButton edge="end" onClick={() => handleRevoke(key.id)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={key.name} secondary={key.id} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

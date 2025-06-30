// src/components/NewAudit/ReviewSubmit.jsx
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

export default function ReviewSubmit({ jurisdictions, modelDetails, sampleOutput }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Audit
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Jurisdictions"
            secondary={jurisdictions.join(', ')}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Model Name"
            secondary={modelDetails.name}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Industry / Use Case"
            secondary={modelDetails.industry}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Version"
            secondary={modelDetails.version}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Sample Output"
            secondary={
              <Box
                component="pre"
                sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
              >
                {sampleOutput}
              </Box>
            }
          />
        </ListItem>
      </List>
      <Box sx={{ textAlign: 'right', mt: 2 }}>
        <Button variant="contained" color="primary">
          Submit Audit
        </Button>
      </Box>
    </Box>
  );
}

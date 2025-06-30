// src/components/RecentAuditsTable.jsx
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';

const mockData = [
  { id: 1, name: 'Model v1.2', plan: 'Pro', regions: 'GDPR, CCPA', score: '78%', date: '2025-06-10', status: 'Complete' },
  // ...more rows
];

export default function RecentAuditsTable() {
  return (
    <TableContainer>
      <Table  sx={{ 
        width: '100%', 
        overflowX: 'auto',   // ← only horizontal scroll
        // optional: set a maxHeight and overflowY if vertical scrolling is needed
       //  maxHeight: 400, 
        // overflowY: 'auto', 
      }}>
        <TableHead>
          <TableRow>
            {['Name','Plan','Regions','Risk Score','Date','Status','Actions'].map(h => (
              <TableCell key={h}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {mockData.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.plan}</TableCell>
              <TableCell>{row.regions}</TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>
                <Chip label={row.status} color={row.status === 'Complete' ? 'success' : 'warning'} />
              </TableCell>
              <TableCell>
                <Button size="small">View</Button>
                <Button size="small">Re-scan</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

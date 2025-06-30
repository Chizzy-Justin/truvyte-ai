import { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Button,
  Chip,
  Box
} from '@mui/material';

// Mock data; replace with API call
const mockReports = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `Audit #${i + 1}`,
  plan: ['Foundations', 'TrustBuilder', 'Assure360'][i % 3],
  jurisdictions: ['GDPR', 'CCPA', 'PIPEDA'].slice(0, (i % 3) + 1).join(', '),
  risk: ['Low', 'Medium', 'High'][i % 3].toLowerCase(),
  date: new Date(2025, i % 12, (i * 3) % 28 + 1).toLocaleDateString(),
  status: ['Complete', 'Pending'][i % 2]
}));

export default function ReportsTable() {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Simulate fetch
  useEffect(() => {
    setReports(mockReports);
  }, []);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRows = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

return (
  <Box>
    {/* 1) Table container scrolls horizontally on its own */}
    <TableContainer 
      component={Paper} 
      sx={{ 
        width: '100%', 
        overflowX: 'auto',   // ← only horizontal scroll
        // optional: set a maxHeight and overflowY if vertical scrolling is needed
       //  maxHeight: 400, 
        // overflowY: 'auto', 
      }}
    >
      {/* 2) Give the table a minWidth so it can be wider than its container */}
      <Table sx={{ maxWidth: 800 }} aria-label="reports table">
        <TableHead>
          <TableRow>
            {['Name','Plan','Jurisdictions','Risk','Date','Status','Actions'].map(h => (
              <TableCell key={h} sx={{ whiteSpace: 'nowrap' }}>
                {h}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {reports
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.plan}</TableCell>
                <TableCell>{r.jurisdictions}</TableCell>
                <TableCell>
                  <Chip
                    label={r.risk}
                    color={
                      r.risk === 'low'
                        ? 'success'
                        : r.risk === 'medium'
                        ? 'warning'
                        : 'error'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell>
                  <Button size="small">View</Button>
                  <Button size="small">Download</Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>

    {/* 3) Pagination stays static below the table */}
    <TablePagination
      component="div"
      count={reports.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRows}
      rowsPerPageOptions={[5, 10, 25]}
    />
  </Box>
);

}

// // src/pages/Reports.jsx


// import { Container, Typography, Box, Paper } from '@mui/material';
// import ReportFilterBar from '../components/Reports/ReportFilterBar';
// import ReportsTable from '../components/Reports/ReportsTable';

// export default function Reports() {
//   return (
//     <Container sx={{ py: 4, width: '90vw' }}>
//       <Typography variant="h4" gutterBottom>
//         All Reports
//       </Typography>

//       {/* Flex wrapper for filter + table */}
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',       // stack on mobile
//           gap: 4,                       // spacing between items
//           // If you ever want them side-by-side on md+:
//           // flexDirection: { xs: 'column', md: 'row' },
//         }}
//       >
//         <Paper sx={{ p: 3 }}>
//           <ReportFilterBar />
//         </Paper>

//          <Paper sx={{ p: 3 }}>
//           <ReportsTable />
//         </Paper> 
//       </Box>
//     </Container>
//   );
// }
import { Container, Typography, Box, Paper } from '@mui/material';
import ReportFilterBar from '../components/Reports/ReportFilterBar';
import ReportsTable from '../components/Reports/ReportsTable';
import theme from '../theme';


// match this to whatever your sidebar actually is
const DRAWER_WIDTH = theme.custom.drawerWidth;

export default function Reports() {
  return (
    <Container
      disableGutters
      sx={{
        py: 4,
        // On mobile: 90vw. On md+ subtract the drawer width.
        width: {
          xs: '90vw',
          md: `calc(90vw - ${DRAWER_WIDTH}px)`,
        },
        // On md+ push over by the drawer width
        ml: {
          xs: 0,
        
        },
        // Optional: keep a little breathing room on mobile
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography variant="h4" gutterBottom>
        All Reports
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column' },
          gap: 4,
        }}
      >
        <Paper sx={{ p: 3, flex: { md: 1 } }}>
          <ReportFilterBar />
        </Paper>

        <Paper sx={{ p: 3, flex: { md: 2 } }}>
          <ReportsTable />
        </Paper>
      </Box>
    </Container>
  );
}

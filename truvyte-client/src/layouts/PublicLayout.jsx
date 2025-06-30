// // src/layouts/PublicLayout.jsx
// import { Box, Toolbar } from '@mui/material';
// import Navbar from '../components/Navbar';
// import { Outlet } from 'react-router-dom';
// import Footer from '../components/Footer';

// export default function PublicLayout() {
//   return (
//     <Box>
//       <Navbar />
//       <Toolbar />
//       {/* push content below the Navbar */}
//       <Box component="main" sx={{ mt: 8 }}>
//         <Outlet />
//       </Box>
//       <Footer />
//     </Box>
//   );
// }

// src/layouts/PublicLayout.jsx
import { Box, Toolbar, Container } from '@mui/material';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

export default function PublicLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <Navbar />

      {/* Spacer to push content below AppBar */}
      <Toolbar />

      {/* Main content in a centered container */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>

      {/* Full-width footer */}
      <Footer />
    </Box>
  );
}

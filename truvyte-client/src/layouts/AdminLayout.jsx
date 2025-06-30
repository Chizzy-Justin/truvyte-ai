// // src/layouts/AdminLayout.jsx
// import React from 'react';
// import AdminAppBar from '../admin/components/AdminAppBar';
// import Sidebar from '../admin/components/Sidebar';
// import ErrorBoundary from '../admin/components/ErrorBoundary';
// import { Box, Toolbar } from '@mui/material';
// import { Outlet } from 'react-router-dom';

// export default function AdminLayout() {
//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//       <AdminAppBar />
//       <Sidebar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <Toolbar /> {/* spacer */}
//         <ErrorBoundary>
//           <Outlet />
//         </ErrorBoundary>
//       </Box>
//     </Box>
//   );
// }
// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SidebarContent from '../admin/components/SidebarContent';
import AdminAppBar from '../admin/components/AdminAppBar';
import ErrorBoundary from '../admin/components/ErrorBoundary';
import Sidebar from '../admin/components/Sidebar';
import theme from '../theme';

const drawerWidth = theme.custom.drawerWidth;

export default function AdminLayout() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
      <CssBaseline />

      {/* AppBar with hamburger for mobile */}
      <AdminAppBar onMenuClick={handleDrawerToggle} /> 

      {/* Navigation drawers */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <SidebarContent/>
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Push content below AppBar */}
        <Toolbar />

        <Box
          sx={{
            flexGrow: 1,
            // Responsive padding
            p: { xs: 2, sm: 3, md: 4 },
            // Additional top padding if you need it
            pt: { xs: 10, md: 10 },
            // Adjust width to account for drawer on md+
            width: { xs: '100%' },
          }}
        >
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  );
}

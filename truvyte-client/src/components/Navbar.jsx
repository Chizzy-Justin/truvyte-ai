
// // src/components/Navbar.jsx
// import { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link, useLocation } from 'react-router-dom';

// const navLinks = [
//   { label: 'Home', path: '/' },
//   { label: 'Plans', path: '/plans' },
//   { label: 'Login', path: '/login' },
//   { label: 'Sign Up', path: '/signup' },
// ];

// export default function Navbar() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const { pathname } = useLocation();

//   const toggleDrawer = (open) => () => {
//     setDrawerOpen(open);
//   };

//   const drawer = (
//     <Box
//       onClick={toggleDrawer(false)}
//       sx={{ width: 250 }}
//       role="presentation"
//     >
//       <List>
//         {navLinks.map(({ label, path }) => (
//           <ListItem key={label} disablePadding>
//             <ListItemButton
//               component={Link}
//               to={path}
//               selected={pathname === path}
//             >
//               <ListItemText primary={label} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box>
//       <AppBar position="static" color="transparent" elevation={0}>
//         <Toolbar sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
//           {/* Logo / Brand */}
//           <Typography
//             variant="h6"
//             component={Link}
//             to="/"
//             sx={{
//               flexGrow: 1,
//               textDecoration: 'none',
//               color: 'primary.main',
//             }}
//           >
//             Truvyte
//           </Typography>

//           {/* Mobile: Hamburger */}
//           <IconButton
//             edge="end"
//             color="inherit"
//             aria-label="menu"
//             onClick={toggleDrawer(true)}
//             sx={{ display: { xs: 'block', sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* Desktop: Inline Links */}
//           <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
//             {navLinks.map(({ label, path }) => (
//               <Button
//                 key={label}
//                 component={Link}
//                 to={path}
//                 variant={pathname === path ? 'contained' : 'text'}
//                 color={pathname === path ? 'primary' : 'inherit'}
//                 sx={{ textTransform: 'none' }}
//               >
//                 {label}
//               </Button>
//             ))}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer for Mobile */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//         ModalProps={{ keepMounted: true }}
//       >
//         {drawer}
//       </Drawer>
//     </Box>
//   );
// }
// src/components/Navbar.jsx
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Plans', path: '/plans' },
  { label: 'Login', path: '/login' },
  { label: 'Sign Up', path: '/signup' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const drawer = (
    <Box onClick={toggleDrawer(false)} sx={{ width: 250 }} role="presentation">
      <List>
        {navLinks.map(({ label, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              component={Link}
              to={path}
              selected={pathname === path}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed"  sx={{ backgroundColor: 'background.paper', color: 'primary.main'}}  elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 64 }}>
            {/* Logo / Brand */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Truvyte
            </Typography>

            {/* Mobile: Hamburger */}
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop: Inline Links */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
              {navLinks.map(({ label, path }) => (
                <Button
                  key={label}
                  component={Link}
                  to={path}
                  variant={pathname === path ? 'contained' : 'text'}
                  color={pathname === path ? 'primary' : 'inherit'}
                  sx={{ textTransform: 'none' }}
                >
                  {label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

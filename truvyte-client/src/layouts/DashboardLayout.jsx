
// src/layouts/DashboardLayout.jsx
import { useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  AddCircleOutline,
  Description,
  Link as LinkIcon,
  CreditCard,
  Settings,
  HelpOutline,
  Notifications,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import theme from '../theme';
import axios from 'axios';
import { useUser } from '../context/userContext'; 




const drawerWidth = theme.custom.drawerWidth;
const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard/home' },
  { label: 'New Audit', icon: <AddCircleOutline />, path: '/dashboard/audit/new' },
  { label: 'Reports', icon: <Description />, path: '/dashboard/reports' },
  { label: 'URL Audit', icon: <LinkIcon />, path: '/dashboard/audit/url' },
  { label: 'Billing', icon: <CreditCard />, path: '/dashboard/billing' },
  { label: 'Settings', icon: <Settings />, path: '/dashboard/settings' },
  { label: 'Help', icon: <HelpOutline />, path: '/dashboard/help' },
];


export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

   const { setUser } = useUser();
  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);

    navigate('/', { replace: true });
  };

      const { user, loading, error } = useUser();
  
    if (loading) return <CircularProgress />;
    if (error)   return <Alert severity="error">Failed to load user</Alert>;

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar />
      <Typography variant='h2' color='primary.main' align="center">
        Truvyte
      </Typography>
      <Divider />
      <List sx={{
        flexGrow: 1,
        overflowY: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {navItems.map(item => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar sx={{ mx: 'auto', mb: 1 }}>{user.firstName[0]}</Avatar>
        <Typography variant="subtitle1">{user.firstName} {user.lastName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden',  }}>
      <CssBaseline />

      {/* --- Drawers --- */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* --- Main Content --- */}
      <Box component="main"
       sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
           }}>
        <AppBar
          position="fixed"
          elevation={1}
          sx={{
            zIndex: theme => theme.zIndex.drawer + 1,
            width: { md: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Tooltip title="Notifications">
              <IconButton color="inherit"><Notifications /></IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        {/* push content below AppBar */}
        <Toolbar />

        <Container
          disableGutters
          sx={{
            // vertical padding
            py: 4,
            // horizontal padding by breakpoint
            px: { xs: 2, sm: 3, md: 4 },
            paddingTop: 10,
            // mobile: 90vw, md+: account for drawer
            width: {
              xs: '100vw',
              md: `calc(100vw - ${drawerWidth}px)`
            },
            // shift right by drawer only on sm+
            ml: { xs: 0 },
            // allow inner horizontal scroll if child overflows
          
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

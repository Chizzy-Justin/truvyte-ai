// src/admin/components/SidebarContent.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import QuizIcon from '@mui/icons-material/Quiz';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
  { text: 'Home', icon: <HomeIcon />, path: 'home' },
  { text: 'Users', icon: <PeopleIcon />, path: 'users' },
  { text: 'Questions', icon: <QuizIcon />, path: 'questions' },
  { text: 'Plans', icon: <MonetizationOnIcon />, path: 'plans' },
  { text: 'Audits', icon: <AssessmentIcon />, path: 'audits' },
  { text: 'Billing', icon: <MonetizationOnIcon />, path: 'billing' },
  { text: 'Logs', icon: <SecurityIcon />, path: 'logs' },
  { text: 'Flags', icon: <SettingsIcon />, path: 'flags' },
];

export default function SidebarContent() {
  return (
    <Box sx={{ overflow: 'auto', mt: 8 }}>
      <List>
        {navItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={`/admin/${path}`}
              end={path === 'home'}
              sx={{ '&.active': { backgroundColor: 'action.selected' } }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

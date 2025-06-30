
// src/App.jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminRoutes from './admin/AdminRoutes';

import Home from './pages/Home';
import Plans from './pages/Plans';
import Login from './pages/Login';
import Signup from './pages/Signup';

import DashboardHome from './pages/DashboardHome';
import NewAudit from './pages/NewAudit';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import URLAudit from './pages/URLAudit';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import Help from './pages/Help';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Public routes with Navbar */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Redirect unknown public paths to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          {/* Dashboard routes without the public Navbar */}
          <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="home" element={<DashboardHome />} />
            <Route path="audit/new" element={<NewAudit />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/:id" element={<ReportDetail />} />
            <Route path="audit/url" element={<URLAudit />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />
            {/* Fallback within dashboard */}
            <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
          </Route>


                  {/* Admin Dashboard */}
        <Route path="admin/*" element={<AdminRoutes />} />
     

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

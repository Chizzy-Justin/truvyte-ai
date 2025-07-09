// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { UserProvider } from './context/userContext';
import AdminRoutes from './admin/AdminRoutes';
import theme from './theme'
import ScrollToTop from './components/ScrollToTop';


// Lazy‑load all page components
const Home           = lazy(() => import('./pages/Home'));
const Plans          = lazy(() => import('./pages/Plans'));
const Login          = lazy(() => import('./pages/Login'));
const Signup         = lazy(() => import('./pages/Signup'));

const DashboardHome  = lazy(() => import('./pages/DashboardHome'));
const NewAudit       = lazy(() => import('./pages/NewAudit'));
const Reports        = lazy(() => import('./pages/Reports'));
const ReportDetail   = lazy(() => import('./pages/ReportDetail'));
const URLAudit       = lazy(() => import('./pages/URLAudit'));
const Billing        = lazy(() => import('./pages/Billing'));
const Settings       = lazy(() => import('./pages/Settings'));
const Help           = lazy(() => import('./pages/Help'));
const DashboardPlans = lazy(() => import('./pages/DashboardPlans'));


const Spinner = () => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
    }}
  >
    <CircularProgress />
  </Box>
);

const LocationLogger = () => {
  const location = useLocation();
  console.log('Current URL Path (from LocationLogger):', location.pathname);
  // You can uncomment the above line if you want a persistent log of every path change.
  // For debugging the loop, the logs inside Layouts are often more direct.
  return null; // This component doesn't render anything visible
};
export default function App() {

   return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <LocationLogger />
      <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            {/* <Route path="/" element={
              <Suspense fallback={<Spinner />}><Home /></Suspense>
            }/> */}
              <Route index element={
              <Suspense fallback={<Spinner />}><Home /></Suspense>
            }/>
            <Route path="plans" element={
              <Suspense fallback={<Spinner />}><Plans /></Suspense>
            }/>
            <Route path="login" element={
              <Suspense fallback={<Spinner />}><Login /></Suspense>
            }/>
            <Route path="signup" element={
              <Suspense fallback={<Spinner />}><Signup /></Suspense>
            }/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          {/* Dashboard redirect */}
          {/* <Route path="dashboard" element={<Navigate to="dashboard/home" replace />} /> */}

          {/* Dashboard with per-page Suspense */}
          <Route
            path="dashboard"
            element={
              <UserProvider>
                <DashboardLayout />
              </UserProvider>
            }
          >
            <Route index element={<Navigate to="/dashboard/home" replace/>} />
            {/* <Route path="home" element={
              <Suspense fallback={<Spinner />}><DashboardHome /></Suspense>
            }/> */}
             {/* <Route index element={
              <Suspense fallback={<Spinner />}><DashboardHome /></Suspense>
            }/> */}
            <Route path="home" element={
              <Suspense fallback={<Spinner />}><DashboardHome /></Suspense>
            }/> 
            <Route path="audit/new" element={
              <Suspense fallback={<Spinner />}><NewAudit /></Suspense>
            }/>
            <Route path="reports" element={
              <Suspense fallback={<Spinner />}><Reports /></Suspense>
            }/>
            <Route path="reports/:id" element={
              <Suspense fallback={<Spinner />}><ReportDetail /></Suspense>
            }/>
            <Route path="audit/url" element={
              <Suspense fallback={<Spinner />}><URLAudit /></Suspense>
            }/>
            <Route path="billing" element={
              <Suspense fallback={<Spinner />}><Billing /></Suspense>
            }/>
            <Route path="settings" element={
              <Suspense fallback={<Spinner />}><Settings /></Suspense>
            }/>
            <Route path="help" element={
              <Suspense fallback={<Spinner />}><Help /></Suspense>
            }/>
            <Route path="plans" element={
              <Suspense fallback={<Spinner />}><DashboardPlans /></Suspense>
            }/>
            <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
          </Route>

          {/* Admin */}
          <Route path="admin/*" element={<AdminRoutes />} />
          
         {/* for top level routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}


// src/admin/AdminRoutes.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import AdminLayout from '../layouts/AdminLayout';

// Lazy imports for admin pages
const AdminHome           = lazy(() => import('./pages/AdminHome'));
const UserManagement      = lazy(() => import('./pages/UserManagement'));
const ComplianceQuestions = lazy(() => import('./pages/ComplianceQuestions'));
const PlansPricing        = lazy(() => import('./pages/PlansPricing'));
const AuditManagement     = lazy(() => import('./pages/AuditManagement'));
const BillingOverview     = lazy(() => import('./pages/BillingOverview'));
const SystemLogs          = lazy(() => import('./pages/SystemLogs'));
const FeatureFlags        = lazy(() => import('./pages/FeatureFlags'));

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <AdminLayout>
            <Suspense
              fallback={
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
              }
            >
              {/* Nested routes will render here */}
            </Suspense>
          </AdminLayout>
        }
      >
        {/* /admin → redirect to /admin/home */}
        <Route index element={<Navigate to="/admin/home" replace />} />
      {/* <Route
          index element={
            <Suspense fallback={<CircularProgress />}>
              <AdminHome />
            </Suspense>
          }
        /> */}
        <Route
          path="home"
          element={
            <Suspense fallback={<CircularProgress />}>
              <AdminHome />
            </Suspense>
          }
        />
        <Route
          path="users"
          element={
            <Suspense fallback={<CircularProgress />}>
              <UserManagement />
            </Suspense>
          }
        />
        <Route
          path="questions"
          element={
            <Suspense fallback={<CircularProgress />}>
              <ComplianceQuestions />
            </Suspense>
          }
        />
        <Route
          path="plans"
          element={
            <Suspense fallback={<CircularProgress />}>
              <PlansPricing />
            </Suspense>
          }
        />
        <Route
          path="audits"
          element={
            <Suspense fallback={<CircularProgress />}>
              <AuditManagement />
            </Suspense>
          }
        />
        <Route
          path="billing"
          element={
            <Suspense fallback={<CircularProgress />}>
              <BillingOverview />
            </Suspense>
          }
        />
        <Route
          path="logs"
          element={
            <Suspense fallback={<CircularProgress />}>
              <SystemLogs />
            </Suspense>
          }
        />
        <Route
          path="flags"
          element={
            <Suspense fallback={<CircularProgress />}>
              <FeatureFlags />
            </Suspense>
          }
        />

        {/* Catch-all: redirect unknown /admin paths back to home */}
        <Route path="*" element={<Navigate to="/admin/home" replace />} />
      </Route>
    </Routes>
  );
}

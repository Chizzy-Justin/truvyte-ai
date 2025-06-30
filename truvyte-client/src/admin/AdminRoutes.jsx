// src/admin/AdminRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout';

import AdminHome from './pages/AdminHome';
import UserManagement from './pages/UserManagement';
import ComplianceQuestions from './pages/ComplianceQuestions';
import PlansPricing from './pages/PlansPricing';
import AuditManagement from './pages/AuditManagement';
import BillingOverview from './pages/BillingOverview';
import SystemLogs from './pages/SystemLogs';
import FeatureFlags from './pages/FeatureFlags';

export default function AdminRoutes() {
  return (
    <Routes>
      {/* All /admin/* routes share the AdminLayout */}
      <Route path="" element={<AdminLayout />}>
        {/* /admin → redirect to /admin/home */}
        <Route index element={<Navigate to="home" replace />} />

        {/* /admin/home */}
        <Route path="home" element={<AdminHome />} />

        {/* /admin/users */}
        <Route path="users" element={<UserManagement />} />

        {/* /admin/questions */}
        <Route path="questions" element={<ComplianceQuestions />} />

        {/* /admin/plans */}
        <Route path="plans" element={<PlansPricing />} />

        {/* /admin/audits */}
        <Route path="audits" element={<AuditManagement />} />

        {/* /admin/billing */}
        <Route path="billing" element={<BillingOverview />} />

        {/* /admin/logs */}
        <Route path="logs" element={<SystemLogs />} />

        {/* /admin/flags */}
        <Route path="flags" element={<FeatureFlags />} />

        {/* Catch-all: redirect unknown /admin paths back to home */}
        <Route path="*" element={<Navigate to="home" replace />} />
      </Route>
    </Routes>
  );
}

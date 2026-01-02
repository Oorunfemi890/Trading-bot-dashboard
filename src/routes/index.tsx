// ===================================================
// FILE: src/routes/index.tsx
// ===================================================

import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '@/components/layout/AppLayout/AppLayout';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Admin Pages
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import InvitationsPage from '@/pages/admin/InvitationsPage';
import UsersPage from '@/pages/admin/UsersPage';

// User Pages
import DashboardPage from '@/pages/user/DashboardPage';
import TradesPage from '@/pages/user/TradesPage';

export const router = createBrowserRouter([
  // Auth routes
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

  // Admin routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute requireAdmin>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <AdminDashboardPage /> },
      { path: 'invitations', element: <InvitationsPage /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },

  // User routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'trades', element: <TradesPage /> },
      { path: '', element: <DashboardPage /> },
    ],
  },
]);
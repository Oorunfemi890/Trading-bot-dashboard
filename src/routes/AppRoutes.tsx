// ===================================================
// FILE: src/routes/AppRoutes.tsx (FIXED ROUTING)
// ===================================================
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '@/components/layout/AppLayout/AppLayout';
import { useAuth } from '@/hooks';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// Admin Pages
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import InvitationsPage from '@/pages/admin/InvitationsPage';
import UsersPage from '@/pages/admin/UsersPage';
import UserDetailsPage from '@/pages/admin/UserDetailsPage';
import AdminAnalyticsPage from '@/pages/admin/AnalyticsPage';
import AdminSystemPage from '@/pages/admin/SystemPage';
import AdminChannelsPage from '@/pages/admin/ChannelsPage';
import AdminProfilePage from '@/pages/admin/ProfilePage';
import AdminSettingsPage from '@/pages/admin/SettingsPage';

// User Pages
import DashboardPage from '@/pages/user/DashboardPage';
import TradesPage from '@/pages/user/TradesPage';
import SettingsPage from '@/pages/user/SettingsPage';

// Root redirect component
function RootRedirect() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on role
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
  return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Root - Redirect based on auth and role */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="invitations" element={<InvitationsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetailsPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="system" element={<AdminSystemPage />} />
        <Route path="channels" element={<AdminChannelsPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* User Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="trades" element={<TradesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch all - redirect to root which will handle routing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
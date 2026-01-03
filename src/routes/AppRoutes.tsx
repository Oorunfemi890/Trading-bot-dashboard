// ===================================================
// FILE: src/routes/AppRoutes.tsx
// ===================================================

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';

// User Pages
import { AppLayout } from '@/components/layout/AppLayout/AppLayout';
import DashboardPage from '@/pages/user/DashboardPage';
import TradesPage from '@/pages/user/TradesPage';
import SettingsPage from '@/pages/user/SettingsPage';

// Admin Pages (placeholder - add actual components)
const AdminDashboard = () => <div>Admin Dashboard</div>;

// Protected Route Component
function ProtectedRoute({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'admin' && user?.role !== 'super_admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// Public Route (redirect if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect based on role
    const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';
    return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      {/* User Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="trades" element={<TradesPage />} />
        <Route path="signals" element={<div>Signals Page - Coming Soon</div>} />
        <Route path="channels" element={<div>Channels Page - Coming Soon</div>} />
        <Route path="performance" element={<div>Performance Page - Coming Soon</div>} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<div>Profile Page - Coming Soon</div>} />
        <Route path="help" element={<div>Help Page - Coming Soon</div>} />
      </Route>

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
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="invitations" element={<div>Admin Invitations - Coming Soon</div>} />
        <Route path="users" element={<div>Admin Users - Coming Soon</div>} />
        <Route path="analytics" element={<div>Admin Analytics - Coming Soon</div>} />
        <Route path="channels" element={<div>Admin Channels - Coming Soon</div>} />
        <Route path="system" element={<div>Admin System - Coming Soon</div>} />
        <Route path="profile" element={<div>Admin Profile - Coming Soon</div>} />
        <Route path="settings" element={<div>Admin Settings - Coming Soon</div>} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
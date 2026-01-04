// ===================================================
// FILE: src/routes/AppRoutes.tsx (FIXED - ALL ADMIN PAGES)
// ===================================================

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Construction } from 'lucide-react';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';


// Layout
import { AppLayout } from '@/components/layout/AppLayout/AppLayout';

// User Pages
import DashboardPage from '@/pages/user/DashboardPage';
import TradesPage from '@/pages/user/TradesPage';
import SettingsPage from '@/pages/user/SettingsPage';
import UserChannelsPage from '@/pages/user/ChannelsPage';
import SignalsPage from '@/pages/user/SignalsPage';

// Admin Pages - ALL IMPORTED NOW
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import InvitationsPage from '@/pages/admin/InvitationsPage';
import UsersPage from '@/pages/admin/UsersPage';
import UserDetailsPage from '@/pages/admin/UserDetailsPage';
import AnalyticsPage from '@/pages/admin/AnalyticsPage';
import AdminChannelsPage from '@/pages/admin/ChannelsPage';
import SystemPage from '@/pages/admin/SystemPage';
import AdminProfilePage from '@/pages/admin/ProfilePage';
import AdminSettingsPage from '@/pages/admin/SettingsPage';

// Coming Soon Component
function ComingSoonPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-6">
            <Construction className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {description && (
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-500">
          This feature is currently under development and will be available soon.
        </p>
      </div>
    </div>
  );
}

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
      <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />


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
        <Route path="signals" element={<SignalsPage />} />
        <Route path="channels" element={<UserChannelsPage />} />
        <Route path="performance" element={<ComingSoonPage title="Performance Analytics" description="View detailed performance metrics and reports" />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="profile" element={<ComingSoonPage title="Profile" description="View and edit your profile information" />} />
        <Route path="help" element={<ComingSoonPage title="Help & Support" description="Get help and support for using the platform" />} />
      </Route>

      {/* Admin Routes - NOW WITH REAL COMPONENTS */}
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
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="channels" element={<AdminChannelsPage />} />
        <Route path="system" element={<SystemPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
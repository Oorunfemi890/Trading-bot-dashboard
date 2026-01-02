// ===================================================
// FILE: src/routes/ProtectedRoute.tsx
// ===================================================

import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Spinner } from '@/components/common/Spinner/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user?.role !== 'admin' && user?.role !== 'super_admin') {
  return <Navigate to="/unauthorized" replace />;
}

  return <>{children}</>;
}
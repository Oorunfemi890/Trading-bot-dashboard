/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/pages/admin/UserDetailsPage.tsx (NEW)
// ===================================================
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { SuperAdminControls } from '@/components/features/admin/SuperAdminControls';
import { adminService } from '@/services/api';
import { useAuth } from '@/hooks';
import { toast } from 'sonner';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { formatDate } from '@/utils';
import type { User, UserStatistics } from '@/types';

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  const isSuperAdmin = currentUser?.role === 'super_admin';

  useEffect(() => {
    if (id) {
      loadUserData();
    }
  }, [id]);

  async function loadUserData() {
    try {
      const [userData, statsData] = await Promise.all([
        adminService.getUserById(id!),
        adminService.getUserStatistics(id!),
      ]);

      setUser(userData);
      setStats(statsData);
    } catch (error) {
      toast.error('Failed to load user data');
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user || !stats) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/users')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold">{user.fullName}</h1>
        <p className="text-muted-foreground mt-2">{user.email}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Info */}
        <Card>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-semibold">{user.fullName}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Role</span>
                <Badge variant="info" className="capitalize">
                  {user.role.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant={user.status === 'active' ? 'success' : 'destructive'}
                  className="capitalize"
                >
                  {user.status}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tier</span>
                <Badge className="capitalize">{user.tier}</Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Joined</span>
                <span className="text-sm font-medium">
                  {formatDate(user.createdAt)}
                </span>
              </div>

              {user.lastLoginAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm font-medium">
                    {formatDate(user.lastLoginAt, 'MMM dd, yyyy HH:mm')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Trading Stats */}
        <Card>
          <div className="p-6 space-y-4">
            <h3 className="font-semibold">Trading Statistics</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Trades</span>
                <span className="text-sm font-medium">{stats.trading.totalTrades}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Win Rate</span>
                <span className="text-sm font-medium text-success">
                  {stats.trading.winRate.toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Net Profit</span>
                <span
                  className={`text-sm font-medium ${
                    stats.trading.netProfit > 0 ? 'text-success' : 'text-destructive'
                  }`}
                >
                  ${stats.trading.netProfit.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Winning Trades</span>
                <span className="text-sm font-medium text-success">
                  {stats.trading.winningTrades}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Losing Trades</span>
                <span className="text-sm font-medium text-destructive">
                  {stats.trading.losingTrades}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Subscription Info */}
        <Card>
          <div className="p-6 space-y-4">
            <h3 className="font-semibold">Subscription</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tier</span>
                <Badge className="capitalize">{stats.subscription.tier}</Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant={stats.subscription.isActive ? 'success' : 'warning'}
                >
                  {stats.subscription.isActive ? 'Active' : 'Expired'}
                </Badge>
              </div>

              {stats.subscription.expiresAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expires</span>
                  <span className="text-sm font-medium">
                    {formatDate(stats.subscription.expiresAt)}
                  </span>
                </div>
              )}

              {stats.subscription.daysRemaining !== null && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Days Remaining</span>
                  <span className="text-sm font-medium">
                    {stats.subscription.daysRemaining}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Super Admin Controls */}
        {isSuperAdmin && (
          <SuperAdminControls user={user} onUpdate={loadUserData} />
        )}
      </div>
    </div>
  );
}
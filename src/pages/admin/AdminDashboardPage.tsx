/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/pages/admin/AdminDashboardPage.tsx
// ===================================================
import { useEffect, useState } from 'react';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout/AppLayout';
import { StatsCard } from '@/components/features/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { adminService } from '@/services/api';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<any>(null);
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [metricsData, dashboardData] = await Promise.all([
        adminService.getSystemMetrics(),
        adminService.getRealTimeDashboard(),
      ]);

      setMetrics(metricsData);
      setDashboard(dashboardData);
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex h-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 overflow-x-auto">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and real-time metrics</p>
        </div>

        {/* Real-time Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Active Trades"
            value={dashboard?.activeTrades || 0}
            icon={Activity}
            change="+12% from yesterday"
            trend="up"
          />
          <StatsCard
            title="Total Users"
            value={metrics?.users?.total || 0}
            icon={Users}
            change="+5 new today"
            trend="up"
          />
          <StatsCard
            title="Today's Profit"
            value={`$${dashboard?.todayProfit?.toFixed(2) || '0.00'}`}
            icon={DollarSign}
            change="+18% from yesterday"
            trend="up"
          />
          <StatsCard
            title="Active Users"
            value={dashboard?.activeUsers || 0}
            icon={TrendingUp}
            change="+8% this week"
            trend="up"
          />
        </div>

        {/* System Overview */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Users</span>
                <span className="font-semibold">{metrics?.users?.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active</span>
                <span className="font-semibold text-success">{metrics?.users?.active || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">New Today</span>
                <span className="font-semibold">{metrics?.users?.newToday || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">New This Week</span>
                <span className="font-semibold">{metrics?.users?.newThisWeek || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trading Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Trades</span>
                <span className="font-semibold">{metrics?.trading?.total || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active</span>
                <span className="font-semibold text-warning">{metrics?.trading?.active || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Today</span>
                <span className="font-semibold">{metrics?.trading?.todayCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Profit This Week</span>
                <span className="font-semibold text-success">
                  ${metrics?.trading?.profitThisWeek?.toFixed(2) || '0.00'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold">{metrics?.performance?.winRate?.toFixed(1) || '0.0'}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Profit</p>
                <p className="text-2xl font-bold text-success">
                  ${metrics?.performance?.totalProfit?.toFixed(2) || '0.00'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Profit Factor</p>
                <p className="text-2xl font-bold">{metrics?.performance?.profitFactor?.toFixed(2) || '0.00'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Profit</p>
                <p className="text-2xl font-bold">
                  ${metrics?.performance?.averageProfit?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${metrics?.system?.database?.connected ? 'bg-success' : 'bg-destructive'}`} />
                  <span>Database</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {metrics?.system?.database?.responseTime || 0}ms
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${metrics?.system?.redis?.connected ? 'bg-success' : 'bg-destructive'}`} />
                  <span>Redis</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {metrics?.system?.redis?.memory ? `${metrics.system.redis.memory.toFixed(0)}MB` : 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Memory Usage</span>
                <span className="text-sm text-muted-foreground">
                  {metrics?.system?.memory?.used || 0}MB / {metrics?.system?.memory?.total || 0}MB
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Uptime</span>
                <span className="text-sm text-muted-foreground">
                  {Math.floor((metrics?.system?.uptime || 0) / 3600)}h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
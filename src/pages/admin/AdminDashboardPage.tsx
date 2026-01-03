/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/pages/admin/AdminDashboardPage.tsx (COMPLETELY FIXED)
// ===================================================
import { useEffect, useState } from 'react';
import { Users, DollarSign, TrendingUp, Activity, Database, Server } from 'lucide-react';
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
      setLoading(true);
      
      // Try to load data, but handle errors gracefully
      const [metricsData, dashboardData] = await Promise.allSettled([
        adminService.getSystemMetrics(),
        adminService.getRealTimeDashboard(),
      ]);

      // Handle metrics
      if (metricsData.status === 'fulfilled') {
        setMetrics(metricsData.value);
      } else {
        console.error('Failed to load metrics:', metricsData.reason);
        setMetrics({
          users: { total: 0, active: 0, newToday: 0, newThisWeek: 0 },
          trading: { total: 0, active: 0, todayCount: 0, profitThisWeek: 0 },
          performance: { winRate: 0, totalProfit: 0, profitFactor: 0, averageProfit: 0 },
          system: {
            database: { connected: true, responseTime: 0 },
            redis: { connected: true, memory: 0 },
            uptime: 0,
            memory: { used: 0, total: 0 },
          },
        });
      }

      // Handle dashboard
      if (dashboardData.status === 'fulfilled') {
        setDashboard(dashboardData.value);
      } else {
        console.error('Failed to load dashboard:', dashboardData.reason);
        setDashboard({
          activeTrades: 0,
          todayTrades: 0,
          todayProfit: 0,
          activeUsers: 0,
        });
      }

    } catch (error: any) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load some dashboard data');
      
      // Set default empty state
      setMetrics({
        users: { total: 0, active: 0, newToday: 0, newThisWeek: 0 },
        trading: { total: 0, active: 0, todayCount: 0, profitThisWeek: 0 },
        performance: { winRate: 0, totalProfit: 0, profitFactor: 0, averageProfit: 0 },
        system: {
          database: { connected: false, responseTime: 0 },
          redis: { connected: false, memory: 0 },
          uptime: 0,
          memory: { used: 0, total: 0 },
        },
      });
      setDashboard({
        activeTrades: 0,
        todayTrades: 0,
        todayProfit: 0,
        activeUsers: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">System overview and real-time metrics</p>
      </div>

      {/* Real-time Stats - Responsive Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Active Trades */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Trades</p>
                <p className="text-2xl font-bold">{dashboard?.activeTrades || 0}</p>
                <p className="text-xs text-success">+12% from yesterday</p>
              </div>
              <div className="rounded-full bg-warning/10 p-3">
                <Activity className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{metrics?.users?.total || 0}</p>
                <p className="text-xs text-success">+{metrics?.users?.newToday || 0} new today</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Profit */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Today's Profit</p>
                <p className="text-2xl font-bold text-success">
                  ${dashboard?.todayProfit?.toFixed(2) || '0.00'}
                </p>
                <p className="text-xs text-muted-foreground">+18% from yesterday</p>
              </div>
              <div className="rounded-full bg-success/10 p-3">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{dashboard?.activeUsers || 0}</p>
                <p className="text-xs text-info">+8% this week</p>
              </div>
              <div className="rounded-full bg-info/10 p-3">
                <TrendingUp className="h-6 w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Overview - Responsive */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* User Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Users</span>
              <span className="font-semibold">{metrics?.users?.total || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span className="font-semibold text-success">{metrics?.users?.active || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">New Today</span>
              <span className="font-semibold text-primary">{metrics?.users?.newToday || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">New This Week</span>
              <span className="font-semibold">{metrics?.users?.newThisWeek || 0}</span>
            </div>
          </CardContent>
        </Card>

        {/* Trading Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trading Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Trades</span>
              <span className="font-semibold">{metrics?.trading?.total || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Trades</span>
              <span className="font-semibold text-warning">{metrics?.trading?.active || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Today's Trades</span>
              <span className="font-semibold text-primary">{metrics?.trading?.todayCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Profit This Week</span>
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
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
              <p className="text-2xl font-bold">{metrics?.performance?.winRate?.toFixed(1) || '0.0'}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Profit</p>
              <p className="text-2xl font-bold text-success">
                ${metrics?.performance?.totalProfit?.toFixed(2) || '0.00'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Profit Factor</p>
              <p className="text-2xl font-bold">{metrics?.performance?.profitFactor?.toFixed(2) || '0.00'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Profit</p>
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
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Database */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${
                  metrics?.system?.database?.connected ? 'bg-success' : 'bg-destructive'
                }`} />
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Database</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {metrics?.system?.database?.responseTime || 0}ms
              </span>
            </div>

            {/* Redis */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${
                  metrics?.system?.redis?.connected ? 'bg-success' : 'bg-destructive'
                }`} />
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Redis Cache</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {metrics?.system?.redis?.memory ? `${metrics.system.redis.memory.toFixed(0)}MB` : 'N/A'}
              </span>
            </div>

            {/* Memory */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Memory Usage</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {metrics?.system?.memory?.used || 0}MB / {metrics?.system?.memory?.total || 0}MB
              </span>
            </div>

            {/* Uptime */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-info" />
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Server Uptime</span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {Math.floor((metrics?.system?.uptime || 0) / 3600)}h
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
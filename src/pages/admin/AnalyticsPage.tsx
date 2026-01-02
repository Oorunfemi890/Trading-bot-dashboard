// FILE: src/pages/admin/AnalyticsPage.tsx
// ===================================================
import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout/AppLayout';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import MetricCard from '@/components/features/analytics/MetricCard';
import { adminService } from '@/services/api';
import { SystemAnalytics } from '@/types';
import { toast } from 'sonner';
import Spinner from '@/components/common/Loader/Spinner';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<SystemAnalytics | null>(null);
  const [trends, setTrends] = useState<any[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);
      const [analyticsData, trendsData] = await Promise.all([
        adminService.getSystemAnalytics(),
        adminService.getPerformanceTrends(30),
      ]);

      setAnalytics(analyticsData);
      setTrends(trendsData);
    } catch (error: any) {
      toast.error('Failed to load analytics');
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive system performance metrics</p>
        </div>

        {/* Trading Metrics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Trading Performance</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Trades"
              value={analytics?.trading?.total || 0}
              change={12}
              description="All time"
            />
            <MetricCard
              title="Win Rate"
              value={`${analytics?.trading?.winRate?.toFixed(1) || 0}%`}
              change={5}
              description="Last 30 days"
            />
            <MetricCard
              title="Net Profit"
              value={`$${analytics?.trading?.netProfit?.toFixed(2) || '0.00'}`}
              change={18}
              description="Total earnings"
            />
            <MetricCard
              title="Profit Factor"
              value={analytics?.trading?.profitFactor?.toFixed(2) || '0.00'}
              change={8}
              description="Risk-reward ratio"
            />
          </div>
        </div>

        {/* Signal Metrics */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Signal Performance</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              title="Total Signals"
              value={analytics?.signals?.total || 0}
              description="All time"
            />
            <MetricCard
              title="Active Signals"
              value={analytics?.signals?.active || 0}
              description="Currently active"
            />
            <MetricCard
              title="Avg Trades/Signal"
              value={analytics?.signals?.averageTradesPerSignal?.toFixed(1) || '0.0'}
              description="Conversion rate"
            />
          </div>
        </div>

        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.channels?.slice(0, 5).map((channel) => (
                <div key={channel.channelId} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{channel.channelName}</p>
                    <p className="text-sm text-muted-foreground">
                      {channel.totalSignals} signals • {channel.tradesGenerated} trades
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">
                      ${channel.totalProfit.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {channel.winRate.toFixed(1)}% win rate
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <MetricCard
              title="Gross Profit"
              value={`$${analytics?.financial?.grossProfit?.toFixed(2) || '0.00'}`}
            />
            <MetricCard
              title="Gross Loss"
              value={`$${analytics?.financial?.grossLoss?.toFixed(2) || '0.00'}`}
            />
            <MetricCard
              title="Net Profit"
              value={`$${analytics?.financial?.netProfit?.toFixed(2) || '0.00'}`}
            />
            <MetricCard
              title="Total Commissions"
              value={`$${analytics?.financial?.totalCommissions?.toFixed(2) || '0.00'}`}
            />
          </div>
        </div>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Chart placeholder - integrate recharts here
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

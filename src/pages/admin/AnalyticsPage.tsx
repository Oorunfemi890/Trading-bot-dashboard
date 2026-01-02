// ===================================================
// FILE: src/pages/admin/AnalyticsPage.tsx (COMPLETE)
// ===================================================
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { StatsCard } from '@/components/features/dashboard/StatsCard';
import { adminService } from '@/services/api';
import { toast } from 'sonner';
import { TrendingUp, DollarSign, Activity, Users } from 'lucide-react';
import { Spinner } from '@/components/common/Spinner/Spinner';
import type { SystemAnalytics } from '@/types';

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<SystemAnalytics | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const data = await adminService.getSystemAnalytics();
      setAnalytics(data);
    } catch (error) {
      toast.error('Failed to load analytics');
      console.error(error);
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

  if (!analytics) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive system performance metrics
        </p>
      </div>

      {/* Trading Performance */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Trading Performance</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Trades"
            value={analytics.trading.total}
            icon={Activity}
            change={`${analytics.trading.winning} winning`}
            trend="up"
          />
          <StatsCard
            title="Win Rate"
            value={`${analytics.trading.winRate.toFixed(1)}%`}
            icon={TrendingUp}
            change="Last 30 days"
            trend="up"
          />
          <StatsCard
            title="Net Profit"
            value={`$${analytics.trading.netProfit.toFixed(2)}`}
            icon={DollarSign}
            change={`Profit Factor: ${analytics.trading.profitFactor.toFixed(2)}`}
            trend="up"
          />
          <StatsCard
            title="Active Trades"
            value={analytics.trading.open}
            icon={Activity}
            change={`${analytics.trading.closed} closed`}
          />
        </div>
      </div>

      {/* Signal Metrics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Signal Performance</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{analytics.signals.total}</p>
                <p className="text-sm text-muted-foreground">Total Signals</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-warning">{analytics.signals.active}</p>
                <p className="text-sm text-muted-foreground">Active Now</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-info">
                  {analytics.signals.averageTradesPerSignal.toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">Avg Trades/Signal</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Channels */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.channels.slice(0, 5).map((channel, index) => (
              <div
                key={channel.channelId}
                className="flex items-center justify-between pb-4 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{channel.channelName}</p>
                    <p className="text-sm text-muted-foreground">
                      {channel.totalSignals} signals • {channel.tradesGenerated} trades
                    </p>
                  </div>
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
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Gross Profit</p>
                <p className="text-2xl font-bold text-success">
                  ${analytics.financial.grossProfit.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Gross Loss</p>
                <p className="text-2xl font-bold text-destructive">
                  ${analytics.financial.grossLoss.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
                <p className="text-2xl font-bold">
                  ${analytics.financial.netProfit.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Profit Factor</p>
                <p className="text-2xl font-bold text-primary">
                  {analytics.financial.profitFactor.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold">{analytics.userActivity.totalUsers}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-3xl font-bold text-success">
                {analytics.userActivity.activeUsers}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Activity Rate</p>
              <p className="text-3xl font-bold">
                {analytics.userActivity.activityRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
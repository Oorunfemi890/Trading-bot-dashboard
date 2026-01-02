/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/pages/user/DashboardPage.tsx
// ===================================================

import { useEffect, useState } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { tradeService } from '@/services/api';
import { formatCurrency, formatNumber } from '@/utils';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const data = await tradeService.getTradeStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's your trading overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Trades</p>
              <p className="text-2xl font-bold">{formatNumber(stats?.total || 0, 0)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-success/10 p-3">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-2xl font-bold">{stats?.winRate.toFixed(1) || 0}%</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-info/10 p-3">
              <DollarSign className="h-6 w-6 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Profit</p>
              <p className="text-2xl font-bold">{formatCurrency(stats?.totalProfit || 0)}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-warning/10 p-3">
              <TrendingDown className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Profit</p>
              <p className="text-2xl font-bold">{formatCurrency(stats?.netProfit || 0)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Trades Card */}
      <Card title="Recent Trades" subtitle="Your latest trading activity">
        <p className="text-muted-foreground">No recent trades</p>
      </Card>
    </div>
  );
}
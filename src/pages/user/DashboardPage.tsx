/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/purity */
// ===================================================
// FILE: src/pages/user/DashboardPage.tsx
// ===================================================

import { useState, useEffect } from 'react';
import { useAuth, useWebSocket, useTrades } from '@/hooks';
import { StatsCard } from '@/components/features/dashboard/admin/StatsCard';
import { PerformanceChart } from '@/components/features/dashboard/PerformanceChart';
import { RecentTrades } from '@/components/features/dashboard/RecentTrades';
import { ActiveTrades } from '@/components/features/dashboard/ActiveTrades';
import { QuickActions } from '@/components/features/dashboard/QuickActions';
import { Loader } from '@/components/common/Loader';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target,
  DollarSign,
  BarChart3,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { socket, isConnected } = useWebSocket();
  const { stats, isLoading, fetchStats } = useTrades();
  const [realtimeData, setRealtimeData] = useState<any>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  // WebSocket real-time updates
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on('trade:opened', (data) => {
      console.log('New trade opened:', data);
      fetchStats(); // Refresh stats
    });

    socket.on('trade:completed', (data) => {
      console.log('Trade completed:', data);
      fetchStats();
    });

    return () => {
      socket.off('trade:opened');
      socket.off('trade:completed');
    };
  }, [socket, isConnected]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.fullName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your trading today
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Live
              </span>
            </>
          ) : (
            <>
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Offline
              </span>
            </>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Profit"
          value={`$${stats?.netProfit?.toFixed(2) || '0.00'}`}
          change={stats?.profitChange || 0}
          icon={DollarSign}
          trend={stats?.netProfit >= 0 ? 'up' : 'down'}
        />
        <StatsCard
          title="Win Rate"
          value={`${stats?.winRate?.toFixed(1) || '0'}%`}
          change={stats?.winRateChange || 0}
          icon={Target}
          trend="up"
        />
        <StatsCard
          title="Active Trades"
          value={stats?.activeTrades || 0}
          icon={Activity}
          trend="neutral"
        />
        <StatsCard
          title="Today's Trades"
          value={stats?.todayTrades || 0}
          change={stats?.todayChange || 0}
          icon={BarChart3}
          trend="neutral"
        />
      </div>

      {/* Warning Banner if subscription expiring */}
      {user?.subscriptionExpiresAt && 
       new Date(user.subscriptionExpiresAt) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
        <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                Subscription Expiring Soon
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Your subscription expires on{' '}
                {new Date(user.subscriptionExpiresAt).toLocaleDateString()}.
                Renew now to continue trading.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Performance Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Active and Recent Trades */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ActiveTrades />
        <RecentTrades />
      </div>
    </div>
  );
}
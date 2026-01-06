/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/pages/user/DashboardPage.tsx (PRODUCTION READY)
// ===================================================

import { useState, useEffect } from "react";
import { useAuth, useWebSocket, useTrades } from "@/hooks";
import { StatsCard } from "@/components/features/dashboard/user/StatsCard";
import { PerformanceChart } from "@/components/features/dashboard/PerformanceChart";
import { RecentTrades } from "@/components/features/dashboard/RecentTrades";
import { ActiveTrades } from "@/components/features/dashboard/ActiveTrades";
import { QuickActions } from "@/components/features/dashboard/QuickActions";
import { Loader } from "@/components/common/Loader";
import { EmptyState } from "@/components/common/EmptyState";
import {
  TrendingUp,
  DollarSign,
  Activity,
  Target,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import { toast } from 'sonner';

export default function DashboardPage() {
  const { user } = useAuth();
  const { socket, isConnected } = useWebSocket();
  const { stats, fetchStats } = useTrades();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  // ✅ WebSocket real-time updates
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on("trade:opened", (data) => {
      fetchStats();
      toast.success(`New trade opened: ${data.symbol}`);
    });

    socket.on("trade:completed", (data) => {
      fetchStats();
      const isProfit = data.netProfit > 0;
      if (isProfit) {
        toast.success(`Trade closed: +$${data.netProfit.toFixed(2)}`);
      } else {
        toast.error(`Trade closed: -$${Math.abs(data.netProfit).toFixed(2)}`);
      }
    });

    socket.on("tp:hit", (data) => {
      toast.info(`TP${data.tpLevel} hit on ${data.symbol}`);
      fetchStats();
    });

    socket.on("breakeven:activated", (data) => {
      toast.info(`Breakeven activated on ${data.symbol}`);
    });

    return () => {
      socket.off("trade:opened");
      socket.off("trade:completed");
      socket.off("tp:hit");
      socket.off("breakeven:activated");
    };
  }, [socket, isConnected]);

  async function loadDashboard() {
    try {
      await fetchStats();
    } catch (error) {
      console.error('Failed to load dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  // ✅ Safe stats with proper null checking
  const hasStats = stats && stats.totalTrades > 0;
  const safeStats = stats || {
    netProfit: 0,
    profitChange: 0,
    winRate: 0,
    winRateChange: 0,
    activeTrades: 0,
    todayTrades: 0,
    todayChange: 0,
    totalTrades: 0,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.fullName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {hasStats 
              ? "Here's what's happening with your trading today"
              : "Get started by subscribing to channels and receiving signals"
            }
          </p>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
            </>
          ) : (
            <>
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Offline</span>
            </>
          )}
        </div>
      </div>

      {/* Subscription Warning */}
      {user?.subscriptionExpiresAt &&
        new Date(user.subscriptionExpiresAt) <
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
          <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                  Subscription Expiring Soon
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Your subscription expires on{" "}
                  {new Date(user.subscriptionExpiresAt).toLocaleDateString()}.
                  Renew now to continue trading.
                </p>
              </div>
            </div>
          </div>
        )}

      {/* ✅ Show empty state if no trading activity */}
      {!hasStats ? (
        <EmptyState
          icon={BarChart3}
          title="No Trading Activity Yet"
          description="Start by subscribing to signal channels and let the system trade for you"
          action={
            <button
              onClick={() => window.location.href = '/channels'}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Channels
            </button>
          }
        />
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Profit"
              value={`$${safeStats.netProfit?.toFixed(2) || "0.00"}`}
              change={safeStats.profitChange || 0}
              icon={DollarSign}
              trend={safeStats.netProfit >= 0 ? "up" : "down"}
            />
            <StatsCard
              title="Win Rate"
              value={`${safeStats.winRate?.toFixed(1) || "0"}%`}
              change={safeStats.winRateChange || 0}
              icon={Target}
              trend="up"
            />
            <StatsCard
              title="Active Trades"
              value={safeStats.activeTrades || 0}
              icon={Activity}
              trend="neutral"
            />
            <StatsCard
              title="Today's Trades"
              value={safeStats.todayTrades || 0}
              change={safeStats.todayChange || 0}
              icon={BarChart3}
              trend="neutral"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PerformanceChart />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Active and Recent Trades */}
          <div className="grid gap-6 lg:grid-cols-2">
            <ActiveTrades />
            <RecentTrades />
          </div>
        </>
      )}
    </div>
  );
}
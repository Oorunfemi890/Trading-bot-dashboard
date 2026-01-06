/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/pages/user/DashboardPage.tsx
// COMPLETE REWRITE: Using real API data instead of fabricated figures
// ===================================================

import { useState, useEffect } from "react";
import { useAuth, useWebSocket } from "@/hooks";
import { StatsCard } from "@/components/features/dashboard/user/StatsCard";
import { PerformanceChart } from "@/components/features/dashboard/PerformanceChart";
import { RecentTrades } from "@/components/features/dashboard/RecentTrades";
import { ActiveTrades } from "@/components/features/dashboard/ActiveTrades";
import { QuickActions } from "@/components/features/dashboard/QuickActions";
import { Loader } from "@/components/common/Loader";
import { Modal } from "@/components/common/Modal/Modal";
import { TradeList } from "@/components/features/trades/TradeList";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  DollarSign,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { toast } from 'sonner';

interface DashboardStats {
  netProfit: number;
  profitChange: number;
  winRate: number;
  winRateChange: number;
  activeTrades: number;
  todayTrades: number;
  todayChange: number;
  totalTrades: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { socket, isConnected } = useWebSocket();
  
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showActiveTradesModal, setShowActiveTradesModal] = useState(false);
  const [activeTrades, setActiveTrades] = useState([]);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // ✅ WebSocket real-time updates
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on("trade:opened", (data) => {
      console.log("New trade opened:", data);
      fetchDashboardStats();
      toast.success(`New trade opened: ${data.symbol}`);
    });

    socket.on("trade:completed", (data) => {
      console.log("Trade completed:", data);
      fetchDashboardStats();
      
      const isProfit = data.netProfit > 0;
      if (isProfit) {
        toast.success(`Trade closed: +$${data.netProfit.toFixed(2)}`);
      } else {
        toast.error(`Trade closed: -$${Math.abs(data.netProfit).toFixed(2)}`);
      }
    });

    socket.on("tp:hit", (data) => {
      toast.info(`TP${data.tpLevel} hit on ${data.symbol}`);
      fetchDashboardStats();
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

  // ✅ Fetch real dashboard statistics from API
  async function fetchDashboardStats() {
    try {
      const response = await fetch('/api/v1/trades/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch stats');

      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }

  // ✅ Fetch active trades when modal opens
  async function fetchActiveTrades() {
    try {
      const response = await fetch('/api/v1/trades/active', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch active trades');

      const data = await response.json();
      
      if (data.success) {
        setActiveTrades(data.data);
        setShowActiveTradesModal(true);
      }
    } catch (error) {
      console.error('Failed to fetch active trades:', error);
      toast.error('Failed to load active trades');
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  // Provide default values if stats is null
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
        {/* ✅ CLICKABLE: Active Trades */}
        <button
          onClick={fetchActiveTrades}
          className="text-left hover:scale-105 transition-transform"
        >
          <StatsCard
            title="Active Trades"
            value={safeStats.activeTrades || 0}
            icon={Activity}
            trend="neutral"
          />
        </button>
        <StatsCard
          title="Today's Trades"
          value={safeStats.todayTrades || 0}
          change={safeStats.todayChange || 0}
          icon={BarChart3}
          trend="neutral"
        />
      </div>

      {/* Warning Banner if subscription expiring */}
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

      {/* ✅ Active Trades Modal */}
      <Modal
        isOpen={showActiveTradesModal}
        onClose={() => setShowActiveTradesModal(false)}
        title="Active Trades"
        size="xl"
      >
        <TradeList 
          trades={activeTrades} 
          onRefresh={fetchActiveTrades}
        />
      </Modal>
    </div>
  );
}
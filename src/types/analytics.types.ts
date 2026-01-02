// ===================================================
// FILE: src/types/analytics.types.ts
// ===================================================

import { ChannelPerformance } from './signal.types';

export interface SystemAnalytics {
  trading: TradingMetrics;
  signals: SignalMetrics;
  channels: ChannelPerformance[];
  financial: FinancialMetrics;
  userActivity: UserActivityMetrics;
  timestamp: Date;
}

export interface TradingMetrics {
  total: number;
  open: number;
  closed: number;
  winning: number;
  losing: number;
  winRate: number;
  totalProfit: number;
  totalLoss: number;
  netProfit: number;
  profitFactor: number;
  averageTradeDuration: number;
  breakevenActivations: number;
}

export interface SignalMetrics {
  total: number;
  active: number;
  expired: number;
  completed: number;
  averageTradesPerSignal: number;
  mostTradedSymbols: SymbolCount[];
}

export interface SymbolCount {
  symbol: string;
  count: number;
}

export interface FinancialMetrics {
  grossProfit: number;
  grossLoss: number;
  netProfit: number;
  totalCommissions: number;
  largestWin: number;
  largestLoss: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  expectancy: number;
}

export interface UserActivityMetrics {
  totalUsers: number;
  activeUsers: number;
  activityRate: number;
  newRegistrations: number;
}

export interface PerformanceTrend {
  date: string;
  trades: number;
  profit: number;
  winning: number;
  losing: number;
  winRate: number;
}

export interface RealTimeDashboard {
  activeTrades: number;
  todayTrades: number;
  todayProfit: number;
  activeUsers: number;
  pendingSignals: number;
  timestamp: Date;
}

export interface SystemMetrics {
  timestamp: Date;
  users: {
    total: number;
    active: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
    growthRate: number;
  };
  trading: {
    total: number;
    active: number;
    todayCount: number;
    profitToday: number;
    profitThisWeek: number;
    profitThisMonth: number;
  };
  signals: {
    total: number;
    active: number;
    todayCount: number;
    channels: {
      total: number;
      active: number;
    };
  };
  performance: {
    totalTrades: number;
    winRate: number;
    totalProfit: number;
    totalLoss: number;
    netProfit: number;
    profitFactor: number;
    averageProfit: number;
  };
  system: SystemHealth;
}

export interface SystemHealth {
  database: {
    connected: boolean;
    responseTime: number;
  };
  redis: {
    connected: boolean;
    memory: number | null;
  };
  uptime: number;
  memory: {
    used: number;
    total: number;
    external: number;
  };
  cpu: NodeJS.CpuUsage;
}

export interface QueueStatistics {
  available: boolean;
  queues?: {
    [queueName: string]: {
      waiting: number;
      active: number;
      completed: number;
      failed: number;
      total: number;
    };
  };
  message?: string;
  error?: string;
}
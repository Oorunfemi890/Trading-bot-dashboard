// ===================================================
// FILE: src/types/user.types.ts
// ===================================================

import { User, UserRole, UserStatus, SubscriptionTier } from './auth.types';

export interface UserProfile extends User {
  settings?: UserSettings;
  tradingAccounts?: TradingAccount[];
}

export interface UserSettings {
  id: string;
  user_id: string;
  // Risk Management
  balanceUsagePercentage: number;
  positionsPerTrade: number;
  maxConcurrentTrades: number;
  breakevenActivationPips: number;
  breakevenEnabled: boolean;
  // Take Profit Distribution
  takeProfitDistribution: TakeProfitLevel[];
  // Symbol Filtering
  allowedSymbols: string[];
  // Trading Hours
  tradingHoursStart: string | null;
  tradingHoursEnd: string | null;
  timezone: string;
  tradingEnabled: boolean;
  // Notification Preferences
  emailNotificationsEnabled: boolean;
  tradeOpenedNotification: boolean;
  breakevenNotification: boolean;
  takeProfitNotification: boolean;
  stopLossNotification: boolean;
  dailyReportEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TakeProfitLevel {
  level: number;
  positions: number;
  pips: number;
}

export interface TradingAccount {
  id: string;
  user_id: string;
  broker: string;
  accountNumber: string;
  balance: number;
  equity: number;
  freeMargin: number;
  currency: string;
  leverage: number;
  isPrimary: boolean;
  isActive: boolean;
  lastSyncAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUserData {
  fullName?: string;
  status?: UserStatus;
  role?: UserRole;
  tier?: SubscriptionTier;
  subscriptionExpiresAt?: Date | null;
  emailVerified?: boolean;
}

export interface UpdateUserSettingsData {
  balanceUsagePercentage?: number;
  positionsPerTrade?: number;
  maxConcurrentTrades?: number;
  breakevenActivationPips?: number;
  breakevenEnabled?: boolean;
  takeProfitDistribution?: TakeProfitLevel[];
  allowedSymbols?: string[];
  tradingHoursStart?: string | null;
  tradingHoursEnd?: string | null;
  timezone?: string;
  tradingEnabled?: boolean;
  emailNotificationsEnabled?: boolean;
  tradeOpenedNotification?: boolean;
  breakevenNotification?: boolean;
  takeProfitNotification?: boolean;
  stopLossNotification?: boolean;
  dailyReportEnabled?: boolean;
}

export interface UserFilters {
  status?: UserStatus;
  tier?: SubscriptionTier;
  role?: UserRole;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  hasActiveSubscription?: boolean;
}

export interface UserStatistics {
  user: {
    id: string;
    fullName: string;
    email: string;
    tier: SubscriptionTier;
    status: UserStatus;
    createdAt: Date;
    lastLoginAt: Date | null;
  };
  subscription: {
    tier: SubscriptionTier;
    expiresAt: Date | null;
    isActive: boolean;
    daysRemaining: number | null;
  };
  trading: {
    totalTrades: number;
    openTrades: number;
    closedTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalProfit: number;
    totalLoss: number;
    netProfit: number;
  };
}
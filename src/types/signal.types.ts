// ===================================================
// FILE: src/types/signal.types.ts
// ===================================================

import { TradeDirection } from './trade.types';

export enum SignalStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  INVALIDATED = 'invalidated',
  COMPLETED = 'completed',
}

export interface Signal {
  id: string;
  channel_id: string;
  messageId: string;
  rawText: string;
  symbol: string;
  direction: TradeDirection;
  entryMin: number;
  entryMax: number;
  stopLoss: number;
  takeProfits: SignalTakeProfit[];
  status: SignalStatus;
  signalTime: Date;
  expiresAt: Date;
  tradesGenerated: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignalTakeProfit {
  level: number;
  price: number;
}

export interface SignalWithChannel extends Signal {
  channel: {
    id: string;
    title: string;
    username: string | null;
  };
}

export interface SignalFilters {
  status?: SignalStatus;
  symbol?: string;
  direction?: TradeDirection;
  channelId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface TelegramChannel {
  id: string;
  channelId: string;
  username: string | null;
  title: string;
  description: string | null;
  isPublic: boolean;
  isActive: boolean;
  totalSignals: number;
  successfulSignals: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChannelPerformance {
  channelId: string;
  channelName: string;
  totalSignals: number;
  tradesGenerated: number;
  subscribers: number;
  winRate: number;
  totalProfit: number;
  averageProfitPerTrade: number;
}

export interface UserChannelSubscription {
  id: string;
  user_id: string;
  channel_id: string;
  isActive: boolean;
  subscribedAt: Date;
}
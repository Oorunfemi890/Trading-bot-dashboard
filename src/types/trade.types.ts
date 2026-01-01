// ===================================================
// FILE: src/types/trade.types.ts
// ===================================================

export enum TradeDirection {
  BUY = 'buy',
  SELL = 'sell',
}

export enum TradeStatus {
  PENDING = 'pending',
  OPEN = 'open',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export enum PositionStatus {
  PENDING = 'pending',
  OPEN = 'open',
  CLOSED = 'closed',
}

export enum CloseReason {
  TP1 = 'tp1',
  TP2 = 'tp2',
  TP3 = 'tp3',
  SL = 'sl',
  BREAKEVEN_SL = 'breakeven_sl',
  MANUAL = 'manual',
}

export enum OrderType {
  MARKET = 'market',
  LIMIT = 'limit',
}

export interface Trade {
  id: string;
  user_id: string;
  signal_id: string;
  trading_account_id: string;
  symbol: string;
  direction: TradeDirection;
  totalPositions: number;
  positionsFilled: number;
  entryPrices: EntryPrice[];
  stopLoss: number;
  takeProfits: TakeProfit[];
  lotSizePerPosition: number;
  totalRiskAmount: number;
  breakevenActivated: boolean;
  breakevenActivatedAt: Date | null;
  grossProfit: number;
  commissions: number;
  netProfit: number;
  status: TradeStatus;
  openedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EntryPrice {
  position: number;
  price: number;
}

export interface TakeProfit {
  level: number;
  price: number;
  positions: number;
}

export interface Position {
  id: string;
  trade_id: string;
  positionNumber: number;
  entryPrice: number;
  lotSize: number;
  currentStopLoss: number;
  currentTakeProfit: number;
  mtOrderTicket: string | null;
  orderType: OrderType;
  breakevenActivated: boolean;
  status: PositionStatus;
  closedPrice: number | null;
  profit: number;
  closeReason: CloseReason | null;
  openedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TradeWithPositions extends Trade {
  positions: Position[];
  signal?: {
    id: string;
    symbol: string;
    direction: TradeDirection;
    channel: {
      id: string;
      title: string;
    };
  };
}

export interface TradeFilters {
  status?: TradeStatus;
  symbol?: string;
  direction?: TradeDirection;
  dateFrom?: Date;
  dateTo?: Date;
  profitMin?: number;
  profitMax?: number;
}

export interface TradeStatistics {
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
// ===================================================
// FILE: src/components/features/trades/TradeCard.tsx
// ===================================================

import { Badge } from '@/components/common/Badge/Badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Shield, 
  Target,
  Activity
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/format.util';

interface TradeCardProps {
  trade: {
    id: string;
    symbol: string;
    direction: 'buy' | 'sell';
    status: string;
    totalPositions: number;
    positionsFilled: number;
    netProfit: number;
    grossProfit: number;
    breakevenActivated: boolean;
    openedAt: string;
    closedAt?: string;
    signal: {
      channel: {
        title: string;
      };
    };
  };
  onClick: () => void;
}

export function TradeCard({ trade, onClick }: TradeCardProps) {
  const isProfit = trade.netProfit > 0;
  const isLoss = trade.netProfit < 0;
  const isActive = trade.status === 'open';

  const statusColors = {
    open: 'blue',
    closed: isProfit ? 'green' : isLoss ? 'red' : 'gray',
    pending: 'yellow',
    cancelled: 'gray',
  } as const;

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {trade.direction === 'buy' ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {trade.symbol}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {trade.direction.toUpperCase()}
            </div>
          </div>
        </div>

        <Badge variant={statusColors[trade.status as keyof typeof statusColors]}>
          {trade.status}
        </Badge>
      </div>

      {/* Profit/Loss */}
      {trade.status === 'closed' && (
        <div className="mb-3">
          <div className={`text-2xl font-bold ${
            isProfit 
              ? 'text-green-600 dark:text-green-400' 
              : isLoss 
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {isProfit ? '+' : ''}{formatCurrency(trade.netProfit)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Net Profit
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="space-y-2">
        {/* Positions */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <Activity className="h-3 w-3" />
            Positions
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {trade.positionsFilled}/{trade.totalPositions}
          </span>
        </div>

        {/* Breakeven */}
        {trade.breakevenActivated && (
          <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
            <Shield className="h-3 w-3" />
            <span>Breakeven Active</span>
          </div>
        )}

        {/* Time */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {isActive ? 'Opened' : 'Closed'}
          </span>
          <span className="text-gray-900 dark:text-white text-xs">
            {formatDate(isActive ? trade.openedAt : trade.closedAt || trade.openedAt, 'short')}
          </span>
        </div>

        {/* Channel */}
        <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-gray-700">
          <Target className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {trade.signal.channel.title}
          </span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-lg border-2 border-blue-500 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/components/features/dashboard/ActiveTrades.tsx (FIXED)
// ===================================================

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { EmptyState } from '@/components/common/EmptyState/EmptyState';
import { Activity, TrendingUp, TrendingDown, Shield, ExternalLink } from 'lucide-react';
import { tradeService } from '@/services/api';
import { formatRelativeTime, formatCurrency } from '@/utils';

export function ActiveTrades() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveTrades();
  }, []);

  const fetchActiveTrades = async () => {
    try {
      const data = await tradeService.getActiveTrades();
      setTrades(data);
    } catch (error) {
      console.error('Failed to fetch active trades:', error);
      setTrades([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Active Trades
            </h3>
            <Badge variant="blue">{trades.length}</Badge>
          </div>
          {trades.length > 0 && (
            <button
              onClick={() => window.location.href = '/trades?filter=active'}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All
              <ExternalLink className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Trades List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
            ))}
          </div>
        ) : trades.length === 0 ? (
          <EmptyState
            icon={Activity}
            title="No active trades"
            description="Your active trades will appear here"
            compact
          />
        ) : (
          <div className="space-y-3">
            {trades.map((trade) => (
              <div
                key={trade.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
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

                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      trade.grossProfit >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {trade.grossProfit >= 0 ? '+' : ''}{formatCurrency(trade.grossProfit)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 dark:text-gray-400">
                      {trade.positionsFilled}/{trade.totalPositions} positions
                    </span>
                    {trade.breakevenActivated && (
                      <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                        <Shield className="h-3 w-3" />
                        <span className="text-xs">BE Active</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(trade.openedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
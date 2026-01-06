/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/components/features/dashboard/RecentTrades.tsx (FIXED)
// ===================================================

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { EmptyState } from '@/components/common/EmptyState/EmptyState';
import { History, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { tradeService } from '@/services/api';
import { formatCurrency, formatDate } from '@/utils';

export function RecentTrades() {
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentTrades();
  }, []);

  const fetchRecentTrades = async () => {
    try {
      const data = await tradeService.getRecentTrades(5);
      setTrades(data);
    } catch (error) {
      console.error('Failed to fetch recent trades:', error);
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
            <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Trades
            </h3>
          </div>
          {trades.length > 0 && (
            <button
              onClick={() => window.location.href = '/trades'}
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
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
            ))}
          </div>
        ) : trades.length === 0 ? (
          <EmptyState
            icon={History}
            title="No recent trades"
            description="Your completed trades will appear here"
            compact
          />
        ) : (
          <div className="space-y-2">
            {trades.map((trade) => {
              const isProfit = trade.netProfit > 0;

              return (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
                >
                  {/* Left: Symbol and Direction */}
                  <div className="flex items-center gap-3">
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
                        {formatDate(trade.closedAt, 'short')}
                      </div>
                    </div>
                  </div>

                  {/* Right: Profit */}
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      isProfit
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {isProfit ? '+' : ''}{formatCurrency(trade.netProfit)}
                    </div>
                    <Badge
                      variant={isProfit ? 'green' : 'red'}
                      size="sm"
                    >
                      {isProfit ? 'Win' : 'Loss'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
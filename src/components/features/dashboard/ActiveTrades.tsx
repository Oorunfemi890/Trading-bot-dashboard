/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/components/features/dashboard/ActiveTrades.tsx
// ===================================================

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { Button } from '@/components/common/Button/Button';
import { EmptyState } from '@/components/common/EmptyState/EmptyState';
import { Activity, TrendingUp, TrendingDown, Shield, ExternalLink } from 'lucide-react';
// import { Link } from 'react-router-dom';

interface ActiveTrade {
  id: string;
  symbol: string;
  direction: 'buy' | 'sell';
  positionsFilled: number;
  totalPositions: number;
  grossProfit: number;
  breakevenActivated: boolean;
  openedAt: string;
}

export function ActiveTrades() {
  const [trades, setTrades] = useState<ActiveTrade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveTrades();
  }, []);

  const fetchActiveTrades = async () => {
    try {
      // API call
      // Mock data
      const mockTrades: ActiveTrade[] = [
        {
          id: '1',
          symbol: 'XAUUSD',
          direction: 'buy',
          positionsFilled: 3,
          totalPositions: 5,
          grossProfit: 245.50,
          breakevenActivated: true,
          openedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: '2',
          symbol: 'EURUSD',
          direction: 'sell',
          positionsFilled: 5,
          totalPositions: 5,
          grossProfit: -32.10,
          breakevenActivated: false,
          openedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        },
      ];
      setTrades(mockTrades);
    } catch (error) {
      console.error('Failed to fetch active trades:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diff = now.getTime() - then.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m ago`;
    return `${minutes}m ago`;
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
          <button
            onClick={() => window.location.href = '/trades?filter=active'}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            View All
            <ExternalLink className="h-3 w-3" />
          </button>
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
                      {trade.grossProfit >= 0 ? '+' : ''}${trade.grossProfit.toFixed(2)}
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
                    {formatTimeAgo(trade.openedAt)}
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
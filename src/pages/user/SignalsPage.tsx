/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/pages/user/SignalsPage.tsx - PRODUCTION READY
// ===================================================

import { useState, useEffect } from 'react';
import { useSignals, useWebSocket } from '@/hooks';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { Button } from '@/components/common/Button/Button';
import { Select } from '@/components/common/Select/Select';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { EmptyState } from '@/components/common/EmptyState/EmptyState';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  XCircle,
  Radio,
} from 'lucide-react';
import { formatDate, formatRelativeTime } from '@/utils';

export default function SignalsPage() {
  const { signals, loading, filters, setFilters, fetchSignals } = useSignals();
  const { socket, isConnected } = useWebSocket();

  // Real-time updates
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on('signal:detected', (data) => {
      fetchSignals();
      console.log('New signal detected:', data);
    });

    socket.on('signal:expired', () => {
      fetchSignals();
    });

    return () => {
      socket.off('signal:detected');
      socket.off('signal:expired');
    };
  }, [socket, isConnected]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'expired':
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'blue' | 'green' | 'red' | 'gray'> = {
      active: 'blue',
      completed: 'green',
      expired: 'red',
      invalidated: 'gray',
    };

    return (
      <Badge variant={variants[status] || 'gray'} className="flex items-center gap-1">
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Trading Signals
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and track signals from your subscribed channels
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isConnected && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-4">
        <Select
          label="Status"
          value={filters.status || ''}
          onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
          options={[
            { value: '', label: 'All Status' },
            { value: 'active', label: 'Active' },
            { value: 'completed', label: 'Completed' },
            { value: 'expired', label: 'Expired' },
            { value: 'invalidated', label: 'Invalidated' },
          ]}
        />

        <Select
          label="Symbol"
          value={filters.symbol || ''}
          onChange={(e) => setFilters({ ...filters, symbol: e.target.value })}
          options={[
            { value: '', label: 'All Symbols' },
            { value: 'XAUUSD', label: 'Gold (XAUUSD)' },
            { value: 'EURUSD', label: 'EUR/USD' },
            { value: 'GBPUSD', label: 'GBP/USD' },
            { value: 'USDJPY', label: 'USD/JPY' },
            { value: 'BTCUSD', label: 'Bitcoin' },
          ]}
        />

        <Select
          label="Direction"
          value={filters.direction || ''}
          onChange={(e) => setFilters({ ...filters, direction: e.target.value as any })}
          options={[
            { value: '', label: 'All Directions' },
            { value: 'buy', label: 'Buy' },
            { value: 'sell', label: 'Sell' },
          ]}
        />

        <div className="flex items-end">
          <Button
            variant="outline"
            fullWidth
            onClick={() =>
              setFilters({ status: undefined, symbol: undefined, direction: undefined })
            }
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Signals List */}
      {signals.length === 0 ? (
        <EmptyState
          icon={Radio}
          title="No signals found"
          description="Signals from your subscribed channels will appear here"
        />
      ) : (
        <div className="space-y-4">
          {signals.map((signal) => (
            <Card key={signal.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {signal.direction === 'buy' ? (
                      <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                        <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-3">
                        <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {signal.symbol}
                        </h3>
                        <Badge
                          variant={signal.direction === 'buy' ? 'green' : 'red'}
                          size="sm"
                        >
                          {signal.direction.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {formatRelativeTime(signal.signalTime)}
                      </p>
                    </div>
                  </div>

                  {getStatusBadge(signal.status)}
                </div>

                {/* Price Levels */}
                <div className="grid gap-4 md:grid-cols-3 mb-4">
                  {/* Entry Range */}
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">
                      Entry Range
                    </p>
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                      {signal.entryMin.toFixed(5)} - {signal.entryMax.toFixed(5)}
                    </p>
                  </div>

                  {/* Stop Loss */}
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-xs text-red-700 dark:text-red-300 mb-1">
                      Stop Loss
                    </p>
                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                      {signal.stopLoss.toFixed(5)}
                    </p>
                  </div>

                  {/* Trades Generated */}
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                      Trades Generated
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {signal.tradesGenerated}
                    </p>
                  </div>
                </div>

                {/* Take Profit Levels */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Target className="h-4 w-4" />
                    Take Profit Levels
                  </div>
                  <div className="grid gap-2 md:grid-cols-3">
                    {signal.takeProfits.map((tp) => (
                      <div
                        key={tp.level}
                        className="p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      >
                        <p className="text-xs text-green-700 dark:text-green-300">
                          TP{tp.level}
                        </p>
                        <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                          {tp.price.toFixed(5)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    {signal.expiresAt && (
                      <span>Expires: {formatDate(signal.expiresAt, 'datetime')}</span>
                    )}
                  </div>

                  {signal.status === 'active' && (
                    <Badge variant="green" size="sm">
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
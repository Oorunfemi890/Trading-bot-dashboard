// ===================================================
// FILE: src/pages/user/TradesPage.tsx (FIXED)
// ===================================================

import { useState, useEffect } from 'react';
import { useTrades } from '@/hooks';
import { TradeList } from '@/components/features/trades/TradeList';
import { TradeFilters } from '@/components/features/trades/TradeFilters';
import { TradeStats } from '@/components/features/trades/TradeStats';
import { Button } from '@/components/common/Button/Button';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { Filter, Download, RefreshCw } from 'lucide-react';

export default function TradesPage() {
  const { 
    trades, 
    stats, 
    isLoading, 
    fetchTrades, 
    fetchStats 
  } = useTrades();

  const [filters, setFilters] = useState({
    status: 'all',
    dateFrom: '',
    dateTo: '',
    symbol: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTrades(filters);
    fetchStats();
  }, [filters]);

  const handleRefresh = () => {
    fetchTrades(filters);
    fetchStats();
  };

  const handleExport = () => {
    // Export trades to CSV
    if (!trades || trades.length === 0) {
      alert('No trades to export');
      return;
    }

    const csv = trades.map(trade => ({
      ID: trade.id,
      Symbol: trade.symbol,
      Direction: trade.direction,
      Status: trade.status,
      'Net Profit': trade.netProfit,
      'Opened At': new Date(trade.openedAt).toLocaleString(),
      'Closed At': trade.closedAt ? new Date(trade.closedAt).toLocaleString() : 'Open',
    }));

    const csvContent = [
      Object.keys(csv[0]).join(','),
      ...csv.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trades_${new Date().toISOString()}.csv`;
    a.click();
  };

  // Safe stats with default values
  const safeStats = stats || {
    total: 0,
    open: 0,
    closed: 0,
    winning: 0,
    losing: 0,
    winRate: 0,
    totalProfit: 0,
    totalLoss: 0,
    netProfit: 0,
    profitFactor: 0,
    averageTradeDuration: 0,
    breakevenActivations: 0,
    averageWin: 0,
    averageLoss: 0,
    largestWin: 0,
    largestLoss: 0,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Trades
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage your trading history
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            leftIcon={<Filter className="h-4 w-4" />}
          >
            Filters
          </Button>
          <Button
            variant="outline"
            onClick={handleRefresh}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            leftIcon={<Download className="h-4 w-4" />}
            disabled={!trades || trades.length === 0}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <TradeStats stats={safeStats} />

      {/* Filters */}
      {showFilters && (
        <TradeFilters
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Trades List */}
      {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading trades...</p>
          </div>
        </div>
      ) : (
        <TradeList trades={trades || []} onRefresh={handleRefresh} />
      )}
    </div>
  );
}
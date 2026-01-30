// FILE: src/pages/user/PerformancePage.tsx (FIXED - REAL DATA)
// =============================================

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { Button } from '@/components/common/Button/Button';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { 
  TrendingUp, TrendingDown, Target, DollarSign, BarChart3, 
  Award, Activity, Download, RefreshCw
} from 'lucide-react';
import axios from '@/lib/axios';
import { toast } from 'sonner';

interface PerformanceData {
  overview: {
    totalProfit: number;
    totalTrades: number;
    winRate: number;
    profitFactor: number;
    averageWin: number;
    averageLoss: number;
    largestWin: number;
    largestLoss: number;
  };
  bySymbol: Array<{
    symbol: string;
    trades: number;
    winRate: number;
    profit: number;
  }>;
  recentPerformance: Array<{
    date: string;
    profit: number;
    trades: number;
  }>;
}

export default function PerformanceAnalyticsPage() {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  useEffect(() => {
    fetchPerformanceData();
  }, [timeRange]);

  async function fetchPerformanceData() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/trades/performance?range=${timeRange}`);
      
      if (response.data.success) {
        setData(response.data.data);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error: any) {
      console.error('Failed to fetch performance data:', error);
      toast.error('Failed to load performance data');
      
      // Show empty state instead of mock data
      setData({
        overview: {
          totalProfit: 0,
          totalTrades: 0,
          winRate: 0,
          profitFactor: 0,
          averageWin: 0,
          averageLoss: 0,
          largestWin: 0,
          largestLoss: 0,
        },
        bySymbol: [],
        recentPerformance: [],
      });
    } finally {
      setLoading(false);
    }
  }

  function handleExport() {
    if (!data) return;
    
    const csv = `Performance Report - ${timeRange}\n\n` +
      `Total Profit,$${data.overview.totalProfit.toFixed(2)}\n` +
      `Total Trades,${data.overview.totalTrades}\n` +
      `Win Rate,${data.overview.winRate.toFixed(1)}%\n` +
      `Profit Factor,${data.overview.profitFactor.toFixed(2)}\n`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance_${timeRange}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Report exported successfully');
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">No performance data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Detailed analysis of your trading performance
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center gap-2 rounded-lg border p-1">
            {(['7d', '30d', '90d', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {range === 'all' ? 'All Time' : range.toUpperCase()}
              </button>
            ))}
          </div>
          
          <Button variant="outline" onClick={fetchPerformanceData} leftIcon={<RefreshCw className="h-4 w-4" />}>
            Refresh
          </Button>
          
          <Button variant="primary" onClick={handleExport} leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Show empty state if no trades */}
      {data.overview.totalTrades === 0 ? (
        <Card>
          <div className="p-8 text-center">
            <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">No trading data yet</p>
            <p className="text-sm text-gray-500">Your performance analytics will appear here once you start trading</p>
          </div>
        </Card>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Profit</p>
                <p className={`text-3xl font-bold ${data.overview.totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {data.overview.totalProfit >= 0 ? '+' : ''}${data.overview.totalProfit.toFixed(2)}
                </p>
              </div>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                    <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Win Rate</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {data.overview.winRate.toFixed(1)}%
                </p>
              </div>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
                    <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Profit Factor</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {data.overview.profitFactor.toFixed(2)}
                </p>
              </div>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="rounded-full bg-gray-100 dark:bg-gray-900/30 p-3">
                    <BarChart3 className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Trades</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {data.overview.totalTrades}
                </p>
              </div>
            </Card>
          </div>

          {/* Win/Loss Analysis */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Winning Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Average Win</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      +${data.overview.averageWin.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Largest Win</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      +${data.overview.largestWin.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                  Losing Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Average Loss</span>
                    <span className="font-bold text-red-600 dark:text-red-400">
                      -${data.overview.averageLoss.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Largest Loss</span>
                    <span className="font-bold text-red-600 dark:text-red-400">
                      -${data.overview.largestLoss.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Performance by Symbol */}
          {data.bySymbol.length > 0 && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Performance by Symbol</h3>
                <div className="space-y-4">
                  {data.bySymbol.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                      <div className="flex items-center gap-4">
                        <div className="font-semibold text-lg">{item.symbol}</div>
                        <Badge variant={item.winRate >= 60 ? 'green' : 'yellow'}>
                          {item.winRate.toFixed(0)}% Win Rate
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Trades</p>
                          <p className="font-semibold">{item.trades}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Profit</p>
                          <p className={`font-bold ${item.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {item.profit >= 0 ? '+' : ''}${item.profit.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Recent Performance Chart */}
          {data.recentPerformance.length > 0 && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Performance Trend
                </h3>
                <div className="h-64 flex items-end gap-1">
                  {data.recentPerformance.map((day, index) => {
                    const maxProfit = Math.max(...data.recentPerformance.map(d => Math.abs(d.profit)), 1);
                    const height = Math.abs(day.profit) / maxProfit * 100;
                    const isPositive = day.profit >= 0;

                    return (
                      <div key={index} className="flex-1 flex flex-col justify-end group relative">
                        <div 
                          className={`rounded-t transition-all ${
                            isPositive 
                              ? 'bg-green-500 hover:bg-green-600' 
                              : 'bg-red-500 hover:bg-red-600'
                          }`}
                          style={{ height: `${height}%` }}
                        />
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                            <div className="font-medium">${day.profit.toFixed(2)}</div>
                            <div className="text-gray-300">{day.date}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
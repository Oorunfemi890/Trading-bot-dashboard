/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// ===================================================
// FILE: src/components/features/dashboard/PerformanceChart.tsx (FIXED)
// ===================================================

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { TrendingUp } from 'lucide-react';
import { tradeService } from '@/services/api';

export function PerformanceChart() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceData(period);
  }, [period]);

  const fetchPerformanceData = async (period: string) => {
    setLoading(true);
    try {
      // ✅ Real API call - adjust endpoint as needed
      const response = await fetch(`/api/v1/trades/performance?range=${period}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        setData(result.data?.recentPerformance || []);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const totalProfit = data.reduce((sum, day) => sum + (day.profit || 0), 0);
  const totalTrades = data.reduce((sum, day) => sum + (day.trades || 0), 0);
  const avgProfit = totalTrades > 0 ? totalProfit / totalTrades : 0;

  return (
    <Card>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Performance Overview
            </h3>
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
            {(['7d', '30d', '90d'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                  period === p
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-400">Loading chart...</div>
          </div>
        ) : data.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No performance data available</p>
            </div>
          </div>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalProfit.toFixed(2)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Total Profit
                </div>
              </div>
              <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalTrades}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Total Trades
                </div>
              </div>
              <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${avgProfit.toFixed(2)}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Avg per Trade
                </div>
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="h-64 flex items-end gap-1">
              {data.map((day, index) => {
                const maxProfit = Math.max(...data.map(d => Math.abs(d.profit || 0)));
                const height = maxProfit > 0 ? (Math.abs(day.profit) / maxProfit * 100) : 0;
                const isPositive = day.profit >= 0;

                return (
                  <div key={index} className="flex-1 flex flex-col justify-end group relative">
                    <div 
                      className={`rounded-t transition-all ${
                        isPositive 
                          ? 'bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500' 
                          : 'bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-500'
                      }`}
                      style={{ height: `${height}%`, minHeight: height > 0 ? '2px' : '0' }}
                    />
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        <div className="font-medium">${(day.profit || 0).toFixed(2)}</div>
                        <div className="text-gray-300 dark:text-gray-400">{day.trades || 0} trades</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            {data.length > 0 && (
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>{data[0]?.date}</span>
                <span>{data[Math.floor(data.length / 2)]?.date}</span>
                <span>{data[data.length - 1]?.date}</span>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
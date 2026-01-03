/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
// ===================================================
// FILE: src/components/features/dashboard/PerformanceChart.tsx
// ===================================================

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { TrendingUp, Calendar } from 'lucide-react';

export function PerformanceChart() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch performance data
    fetchPerformanceData(period);
  }, [period]);

  const fetchPerformanceData = async (period: string) => {
    // API call to get performance data
    // Mock data for now
    const mockData = Array.from({ length: period === '7d' ? 7 : period === '30d' ? 30 : 90 }, (_, i) => ({
      date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      profit: Math.random() * 2000 - 500,
      trades: Math.floor(Math.random() * 10),
    })).reverse();
    
    setData(mockData);
  };

  const totalProfit = data.reduce((sum, day) => sum + day.profit, 0);
  const totalTrades = data.reduce((sum, day) => sum + day.trades, 0);
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
            const maxProfit = Math.max(...data.map(d => Math.abs(d.profit)));
            const height = Math.abs(day.profit) / maxProfit * 100;
            const isPositive = day.profit >= 0;

            return (
              <div key={index} className="flex-1 flex flex-col justify-end group relative">
                <div 
                  className={`rounded-t transition-all ${
                    isPositive 
                      ? 'bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500' 
                      : 'bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-500'
                  }`}
                  style={{ height: `${height}%` }}
                />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    <div className="font-medium">${day.profit.toFixed(2)}</div>
                    <div className="text-gray-300 dark:text-gray-400">{day.trades} trades</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* X-axis labels (simplified) */}
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{data[0]?.date}</span>
          <span>{data[Math.floor(data.length / 2)]?.date}</span>
          <span>{data[data.length - 1]?.date}</span>
        </div>
      </div>
    </Card>
  );
}
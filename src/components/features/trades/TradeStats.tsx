// ===================================================
// FILE: src/components/features/trades/TradeStats.tsx
// ===================================================

import { Card } from '@/components/common/Card/Card';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  BarChart3,
  TrendingDown,
  Award
} from 'lucide-react';
import { formatCurrency } from '@/utils/format.util';

interface TradeStatsProps {
  stats: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalProfit: number;
    totalLoss: number;
    netProfit: number;
    averageWin: number;
    averageLoss: number;
    profitFactor: number;
    largestWin: number;
    largestLoss: number;
  };
}

export function TradeStats({ stats }: TradeStatsProps) {
  const statCards = [
    {
      label: 'Win Rate',
      value: `${stats.winRate?.toFixed(1) || '0'}%`,
      icon: Target,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      label: 'Profit Factor',
      value: stats.profitFactor?.toFixed(2) || '0.00',
      icon: Award,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      label: 'Net Profit',
      value: formatCurrency(stats.netProfit || 0),
      icon: DollarSign,
      color: stats.netProfit >= 0 
        ? 'text-green-600 dark:text-green-400' 
        : 'text-red-600 dark:text-red-400',
      bgColor: stats.netProfit >= 0 
        ? 'bg-green-100 dark:bg-green-900/30' 
        : 'bg-red-100 dark:bg-red-900/30',
    },
    {
      label: 'Total Trades',
      value: stats.totalTrades || 0,
      icon: BarChart3,
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-900/30',
    },
    {
      label: 'Average Win',
      value: formatCurrency(stats.averageWin || 0),
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      label: 'Average Loss',
      value: formatCurrency(stats.averageLoss || 0),
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      label: 'Largest Win',
      value: formatCurrency(stats.largestWin || 0),
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      label: 'Largest Loss',
      value: formatCurrency(stats.largestLoss || 0),
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          </div>
        </Card>
      ))}

      {/* Win/Loss Breakdown */}
      <Card className="md:col-span-2 lg:col-span-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Trade Breakdown
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {/* Winning Trades */}
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.winningTrades || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Winning Trades
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-600 dark:bg-green-400 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      stats.totalTrades > 0
                        ? (stats.winningTrades / stats.totalTrades) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Total Trades */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalTrades || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Total Trades
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {stats.winningTrades || 0}W / {stats.losingTrades || 0}L
              </div>
            </div>

            {/* Losing Trades */}
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.losingTrades || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Losing Trades
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-600 dark:bg-red-400 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      stats.totalTrades > 0
                        ? (stats.losingTrades / stats.totalTrades) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
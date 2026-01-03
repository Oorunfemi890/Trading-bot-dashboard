// ===================================================
// FILE: src/components/features/dashboard/StatsCard.tsx
// ===================================================

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = 'neutral' 
}: StatsCardProps) {
  const trendColors = {
    up: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
    down: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
    neutral: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${trendColors[trend]}`}>
          <Icon className="h-6 w-6" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === 'up' 
              ? 'text-green-600 dark:text-green-400' 
              : trend === 'down' 
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            <TrendIcon className="h-4 w-4" />
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
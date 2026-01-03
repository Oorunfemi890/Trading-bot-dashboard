/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/components/features/trades/TradeFilters.tsx
// ===================================================

import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';
import { X, Filter } from 'lucide-react';

interface TradeFiltersProps {
  filters: {
    status: string;
    dateFrom: string;
    dateTo: string;
    symbol: string;
  };
  onChange: (filters: any) => void;
  onClose: () => void;
}

export function TradeFilters({ filters, onChange, onClose }: TradeFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const statusOptions = [
    { value: 'all', label: 'All Trades' },
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
    { value: 'pending', label: 'Pending' },
  ];

  const symbolOptions = [
    { value: '', label: 'All Symbols' },
    { value: 'XAUUSD', label: 'Gold (XAUUSD)' },
    { value: 'EURUSD', label: 'EUR/USD' },
    { value: 'GBPUSD', label: 'GBP/USD' },
    { value: 'USDJPY', label: 'USD/JPY' },
    { value: 'BTCUSD', label: 'Bitcoin' },
  ];

  const handleApply = () => {
    onChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      status: 'all',
      dateFrom: '',
      dateTo: '',
      symbol: '',
    };
    setLocalFilters(resetFilters);
    onChange(resetFilters);
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filter Trades
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Filter Form */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <Select
            value={localFilters.status}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, status: e.target.value })
            }
            options={statusOptions}
          />
        </div>

        {/* Symbol Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Symbol
          </label>
          <Select
            value={localFilters.symbol}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, symbol: e.target.value })
            }
            options={symbolOptions}
          />
        </div>

        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From Date
          </label>
          <Input
            type="date"
            value={localFilters.dateFrom}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, dateFrom: e.target.value })
            }
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            To Date
          </label>
          <Input
            type="date"
            value={localFilters.dateTo}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, dateTo: e.target.value })
            }
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="primary" onClick={handleApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
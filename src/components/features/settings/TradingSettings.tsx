/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/components/features/settings/TradingSettings.tsx
// ===================================================

import { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { toast } from 'sonner';
import { Clock, Globe, Target, Save, Plus, X } from 'lucide-react';

export function TradingSettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    allowedSymbols: ['XAUUSD', 'EURUSD', 'GBPUSD'],
    tradingHoursStart: '08:00',
    tradingHoursEnd: '17:00',
    timezone: 'UTC',
    tradingEnabled: true,
    takeProfitDistribution: [
      { level: 1, positions: 2, pips: 40 },
      { level: 2, positions: 2, pips: 70 },
      { level: 3, positions: 1, pips: 100 },
    ],
  });

  const [newSymbol, setNewSymbol] = useState('');

  const availableSymbols = [
    'XAUUSD', 'XAGUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 
    'USDCHF', 'AUDUSD', 'USDCAD', 'NZDUSD', 'BTCUSD',
    'ETHUSD', 'US30', 'NAS100', 'SPX500'
  ];

  const timezones = [
    { value: 'UTC', label: 'UTC (GMT+0)' },
    { value: 'America/New_York', label: 'New York (EST)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST)' },
    { value: 'Europe/London', label: 'London (GMT)' },
    { value: 'Europe/Paris', label: 'Paris (CET)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  ];

  const handleAddSymbol = () => {
    if (!newSymbol) return;
    if (settings.allowedSymbols.includes(newSymbol)) {
      toast.error('Symbol already added');
      return;
    }
    setSettings({
      ...settings,
      allowedSymbols: [...settings.allowedSymbols, newSymbol],
    });
    setNewSymbol('');
  };

  const handleRemoveSymbol = (symbol: string) => {
    setSettings({
      ...settings,
      allowedSymbols: settings.allowedSymbols.filter(s => s !== symbol),
    });
  };

  const handleUpdateTPLevel = (index: number, field: string, value: number) => {
    const updated = [...settings.takeProfitDistribution];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, takeProfitDistribution: updated });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call
      toast.success('Trading settings updated');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Trading Status */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center gap-3">
          <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              Automated Trading
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enable or disable automatic trade execution
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.tradingEnabled}
            onChange={(e) =>
              setSettings({ ...settings, tradingEnabled: e.target.checked })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Allowed Symbols */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Allowed Trading Symbols
          </h3>
          
          {/* Symbol Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {settings.allowedSymbols.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No symbols selected. Trading will be disabled.
              </p>
            ) : (
              settings.allowedSymbols.map((symbol) => (
                <Badge
                  key={symbol}
                  variant="blue"
                  className="flex items-center gap-2 px-3 py-1"
                >
                  {symbol}
                  <button
                    onClick={() => handleRemoveSymbol(symbol)}
                    className="hover:text-red-600 dark:hover:text-red-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            )}
          </div>

          {/* Add Symbol */}
          <div className="flex gap-2">
            <Select
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              options={[
                { value: '', label: 'Select a symbol to add' },
                ...availableSymbols
                  .filter(s => !settings.allowedSymbols.includes(s))
                  .map(s => ({ value: s, label: s }))
              ]}
            />
            <Button
              variant="outline"
              onClick={handleAddSymbol}
              leftIcon={<Plus className="h-4 w-4" />}
              disabled={!newSymbol}
            >
              Add
            </Button>
          </div>
        </div>
      </Card>

      {/* Trading Hours */}
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Trading Hours
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Time
              </label>
              <Input
                type="time"
                value={settings.tradingHoursStart}
                onChange={(e) =>
                  setSettings({ ...settings, tradingHoursStart: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Time
              </label>
              <Input
                type="time"
                value={settings.tradingHoursEnd}
                onChange={(e) =>
                  setSettings({ ...settings, tradingHoursEnd: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Timezone
                </div>
              </label>
              <Select
                value={settings.timezone}
                onChange={(e) =>
                  setSettings({ ...settings, timezone: e.target.value })
                }
                options={timezones}
              />
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Trades will only be executed during these hours in your selected timezone
          </p>
        </div>
      </Card>

      {/* Take Profit Distribution */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Take Profit Distribution
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Configure how positions are closed at each take profit level
          </p>

          <div className="space-y-4">
            {settings.takeProfitDistribution.map((tp, index) => (
              <div
                key={tp.level}
                className="grid grid-cols-3 gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    TP Level {tp.level}
                  </label>
                  <Input
                    type="number"
                    value={tp.level}
                    disabled
                    className="bg-gray-100 dark:bg-gray-900/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Positions
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={tp.positions}
                    onChange={(e) =>
                      handleUpdateTPLevel(index, 'positions', parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pips
                  </label>
                  <Input
                    type="number"
                    min="10"
                    step="5"
                    value={tp.pips}
                    onChange={(e) =>
                      handleUpdateTPLevel(index, 'pips', parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="primary"
          onClick={handleSave}
          loading={loading}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save Trading Settings
        </Button>
      </div>
    </div>
  );
}
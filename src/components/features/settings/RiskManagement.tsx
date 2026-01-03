/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/components/features/settings/RiskManagement.tsx
// ===================================================

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Card } from '@/components/common/Card/Card';
import { toast } from 'sonner';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Save, 
  Info,
  Shield,
  Target,
  TrendingUp
} from 'lucide-react';

export function RiskManagement() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    balanceUsagePercentage: 10,
    positionsPerTrade: 5,
    maxConcurrentTrades: 3,
    breakevenActivationPips: 25,
    breakevenEnabled: true,
  });

  useEffect(() => {
    // Fetch user's current risk settings
    fetchRiskSettings();
  }, []);

  const fetchRiskSettings = async () => {
    try {
      // API call to get settings
      // const response = await api.getUserSettings();
      // setSettings(response.data);
    } catch (error) {
      console.error('Failed to fetch risk settings:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call to update settings
      // await api.updateUserSettings(settings);
      toast.success('Risk settings updated successfully');
    } catch (error) {
      toast.error('Failed to update risk settings');
    } finally {
      setLoading(false);
    }
  };

  const calculateRisk = () => {
    const accountBalance = 10000; // Get from actual account
    const riskAmount = (accountBalance * settings.balanceUsagePercentage) / 100;
    return riskAmount;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Warning Banner */}
      <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-100">
              Important: Risk Management
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              These settings control how much you risk per trade. Make sure you understand
              the implications before making changes. Never risk more than you can afford to lose.
            </p>
          </div>
        </div>
      </div>

      {/* Risk Calculator Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Risk Calculator
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Account Balance
              </span>
              <span className="text-lg font-bold text-blue-900 dark:text-blue-100">
                $10,000.00
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Risk per Trade
              </span>
              <span className="text-lg font-bold text-blue-900 dark:text-blue-100">
                ${calculateRisk().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Risk Percentage
              </span>
              <span className="text-lg font-bold text-blue-900 dark:text-blue-100">
                {settings.balanceUsagePercentage}%
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings Form */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Balance Usage */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Balance Usage Per Trade (%)
            </div>
          </label>
          <Input
            type="number"
            min="1"
            max="100"
            step="0.5"
            value={settings.balanceUsagePercentage}
            onChange={(e) =>
              setSettings({
                ...settings,
                balanceUsagePercentage: parseFloat(e.target.value),
              })
            }
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Recommended: 1-5% for conservative, 5-10% for moderate risk
          </p>
        </div>

        {/* Positions Per Trade */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Positions Per Trade
            </div>
          </label>
          <Input
            type="number"
            min="1"
            max="20"
            value={settings.positionsPerTrade}
            onChange={(e) =>
              setSettings({
                ...settings,
                positionsPerTrade: parseInt(e.target.value),
              })
            }
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Number of positions to open for each signal (3-10 recommended)
          </p>
        </div>

        {/* Max Concurrent Trades */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Max Concurrent Trades
            </div>
          </label>
          <Input
            type="number"
            min="1"
            max="10"
            value={settings.maxConcurrentTrades}
            onChange={(e) =>
              setSettings({
                ...settings,
                maxConcurrentTrades: parseInt(e.target.value),
              })
            }
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Maximum number of trades that can be open at the same time
          </p>
        </div>

        {/* Breakeven Activation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Breakeven Activation (Pips)
            </div>
          </label>
          <Input
            type="number"
            min="10"
            max="100"
            step="5"
            value={settings.breakevenActivationPips}
            onChange={(e) =>
              setSettings({
                ...settings,
                breakevenActivationPips: parseFloat(e.target.value),
              })
            }
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Number of pips in profit before moving stop loss to breakeven
          </p>
        </div>
      </div>

      {/* Breakeven Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              Enable Breakeven Protection
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatically move stop loss to entry when trade is in profit
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.breakevenEnabled}
            onChange={(e) =>
              setSettings({ ...settings, breakevenEnabled: e.target.checked })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="primary"
          onClick={handleSave}
          loading={loading}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save Risk Settings
        </Button>
      </div>
    </div>
  );
}
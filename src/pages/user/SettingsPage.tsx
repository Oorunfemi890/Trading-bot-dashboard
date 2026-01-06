/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Tabs } from '@/components/common/Tabs/Tabs';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { 
  User, ShieldAlert, Bell, Wallet, Cog, Save, Plus, X, 
  AlertTriangle, Target, Clock, Globe, Shield, Info
} from 'lucide-react';

// Mock API calls - replace with real API
const api = {
  getSettings: async () => {
    const response = await fetch('/api/v1/users/settings', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response.json();
  },
  updateSettings: async (data: any) => {
    const response = await fetch('/api/v1/users/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  getTradingAccount: async () => {
    const response = await fetch('/api/v1/users/trading-account', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response.json();
  }
};

// Profile Settings Component
function ProfileSettings() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await api.getSettings();
      setProfile(data.profile || profile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.updateSettings({ profile });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
              {profile.fullName?.charAt(0) || 'U'}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                {profile.fullName || 'User'}
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {profile.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              value={profile.fullName}
              onChange={(e) => setProfile({...profile, fullName: e.target.value})}
              placeholder="John Doe"
            />
            
            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              disabled
              className="bg-gray-100 dark:bg-gray-900/50 cursor-not-allowed"
            />
            
            <Input
              label="Phone Number"
              type="tel"
              value={profile.phoneNumber}
              onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
            
            <Input
              label="Country"
              value={profile.country}
              onChange={(e) => setProfile({...profile, country: e.target.value})}
              placeholder="United States"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-4 border-t">
        <Button variant="primary" onClick={handleSave} loading={loading} leftIcon={<Save className="h-4 w-4" />}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

// Risk Management Component
function RiskManagement() {
  const [settings, setSettings] = useState({
    balanceUsagePercentage: 10,
    positionsPerTrade: 5,
    maxConcurrentTrades: 3,
    breakevenActivationPips: 25,
    breakevenEnabled: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await api.getSettings();
      setSettings(data.riskSettings || settings);
    } catch (error) {
      console.error('Failed to load risk settings:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.updateSettings({ riskSettings: settings });
      alert('Risk settings updated successfully!');
    } catch (error) {
      alert('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const calculateRisk = () => {
    const accountBalance = 10000; // Should come from real account data
    return (accountBalance * settings.balanceUsagePercentage) / 100;
  };

  return (
    <div className="space-y-6 p-6">
      <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-100">
              Important: Risk Management
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              These settings control how much you risk per trade. Never risk more than you can afford to lose.
            </p>
          </div>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="p-6 space-y-3">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Risk Calculator
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-blue-700 dark:text-blue-300">Account Balance</span>
              <span className="font-bold text-blue-900 dark:text-blue-100">$10,000.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-700 dark:text-blue-300">Risk per Trade</span>
              <span className="font-bold text-blue-900 dark:text-blue-100">${calculateRisk().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-blue-700 dark:text-blue-300">Risk Percentage</span>
              <span className="font-bold text-blue-900 dark:text-blue-100">{settings.balanceUsagePercentage}%</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Balance Usage Per Trade (%)
          </label>
          <Input
            type="number"
            min="1"
            max="100"
            step="0.5"
            value={settings.balanceUsagePercentage}
            onChange={(e) => setSettings({...settings, balanceUsagePercentage: parseFloat(e.target.value)})}
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended: 1-5% conservative, 5-10% moderate
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Positions Per Trade</label>
          <Input
            type="number"
            min="1"
            max="20"
            value={settings.positionsPerTrade}
            onChange={(e) => setSettings({...settings, positionsPerTrade: parseInt(e.target.value)})}
          />
          <p className="text-xs text-gray-500 mt-1">
            Number of positions per signal (3-10 recommended)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Max Concurrent Trades
          </label>
          <Input
            type="number"
            min="1"
            max="10"
            value={settings.maxConcurrentTrades}
            onChange={(e) => setSettings({...settings, maxConcurrentTrades: parseInt(e.target.value)})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Info className="h-4 w-4" />
            Breakeven Activation (Pips)
          </label>
          <Input
            type="number"
            min="10"
            max="100"
            step="5"
            value={settings.breakevenActivationPips}
            onChange={(e) => setSettings({...settings, breakevenActivationPips: parseFloat(e.target.value)})}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <div className="font-medium">Enable Breakeven Protection</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatically move stop loss to entry when in profit
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.breakevenEnabled}
            onChange={(e) => setSettings({...settings, breakevenEnabled: e.target.checked})}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button variant="primary" onClick={handleSave} loading={loading} leftIcon={<Save className="h-4 w-4" />}>
          Save Risk Settings
        </Button>
      </div>
    </div>
  );
}

// Trading Preferences Component
function TradingPreferences() {
  const [settings, setSettings] = useState({
    allowedSymbols: ['XAUUSD', 'EURUSD'],
    tradingHoursStart: '08:00',
    tradingHoursEnd: '17:00',
    timezone: 'UTC',
    tradingEnabled: true,
    takeProfitDistribution: [
      { level: 1, positions: 2, pips: 40 },
      { level: 2, positions: 2, pips: 70 },
      { level: 3, positions: 1, pips: 100 }
    ]
  });
  const [newSymbol, setNewSymbol] = useState('');
  const [loading, setLoading] = useState(false);

  const availableSymbols = [
    'XAUUSD', 'XAGUSD', 'EURUSD', 'GBPUSD', 'USDJPY', 
    'USDCHF', 'AUDUSD', 'USDCAD', 'BTCUSD', 'ETHUSD'
  ];

  const handleAddSymbol = () => {
    if (newSymbol && !settings.allowedSymbols.includes(newSymbol)) {
      setSettings({
        ...settings,
        allowedSymbols: [...settings.allowedSymbols, newSymbol]
      });
      setNewSymbol('');
    }
  };

  const handleRemoveSymbol = (symbol: string) => {
    setSettings({
      ...settings,
      allowedSymbols: settings.allowedSymbols.filter(s => s !== symbol)
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.updateSettings({ tradingSettings: settings });
      alert('Trading settings updated!');
    } catch (error) {
      alert('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center gap-3">
          <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <div className="font-medium">Automated Trading</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Enable or disable automatic trade execution
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.tradingEnabled}
            onChange={(e) => setSettings({...settings, tradingEnabled: e.target.checked})}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <h3 className="font-semibold mb-4">Allowed Trading Symbols</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {settings.allowedSymbols.map((symbol) => (
              <Badge key={symbol} variant="blue" className="flex items-center gap-2 px-3 py-1">
                {symbol}
                <button onClick={() => handleRemoveSymbol(symbol)} className="hover:text-red-600">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Select
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              options={[
                { value: '', label: 'Select symbol to add' },
                ...availableSymbols
                  .filter(s => !settings.allowedSymbols.includes(s))
                  .map(s => ({ value: s, label: s }))
              ]}
            />
            <Button variant="outline" onClick={handleAddSymbol} disabled={!newSymbol}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5" />
            Trading Hours
          </h3>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="Start Time"
              type="time"
              value={settings.tradingHoursStart}
              onChange={(e) => setSettings({...settings, tradingHoursStart: e.target.value})}
            />
            
            <Input
              label="End Time"
              type="time"
              value={settings.tradingHoursEnd}
              onChange={(e) => setSettings({...settings, tradingHoursEnd: e.target.value})}
            />
            
            <Select
              label="Timezone"
              value={settings.timezone}
              onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              options={[
                { value: 'UTC', label: 'UTC (GMT+0)' },
                { value: 'America/New_York', label: 'New York (EST)' },
                { value: 'Europe/London', label: 'London (GMT)' },
                { value: 'Asia/Tokyo', label: 'Tokyo (JST)' }
              ]}
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end pt-4 border-t">
        <Button variant="primary" onClick={handleSave} loading={loading} leftIcon={<Save className="h-4 w-4" />}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}

// Main Settings Page Component
export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      value: 'profile',
      label: 'Profile',
      icon: <User className="h-4 w-4" />,
      content: <ProfileSettings />
    },
    {
      id: 'risk',
      value: 'risk',
      label: 'Risk Management',
      icon: <ShieldAlert className="h-4 w-4" />,
      content: <RiskManagement />
    },
    {
      id: 'trading',
      value: 'trading',
      label: 'Trading Preferences',
      icon: <Cog className="h-4 w-4" />,
      content: <TradingPreferences />
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and trading preferences
        </p>
      </div>

      <div className="rounded-lg border bg-white dark:bg-gray-800">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
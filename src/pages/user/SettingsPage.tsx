// ===================================================
// FILE: src/pages/user/SettingsPage.tsx
// ===================================================

import { useState } from 'react';
import { Tabs } from '@/components/common/Tabs/Tabs';
import { ProfileSettings } from '@/components/features/settings/ProfileSettings';
import { RiskManagement } from '@/components/features/settings/RiskManagement';
import { TradingSettings } from '@/components/features/settings/TradingSettings';
import { NotificationSettings } from '@/components/features/settings/NotificationSettings';
import { TradingAccountForm } from '@/components/features/settings/TradingAccountForm';
import { 
  User, 
  ShieldAlert, 
  Bell, 
  Wallet,
  Cog
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="h-4 w-4" />,
      content: <ProfileSettings />,
    },
    {
      id: 'risk',
      label: 'Risk Management',
      icon: <ShieldAlert className="h-4 w-4" />,
      content: <RiskManagement />,
    },
    {
      id: 'trading',
      label: 'Trading Preferences',
      icon: <Cog className="h-4 w-4" />,
      content: <TradingSettings />,
    },
    {
      id: 'account',
      label: 'Trading Account',
      icon: <Wallet className="h-4 w-4" />,
      content: <TradingAccountForm />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="h-4 w-4" />,
      content: <NotificationSettings />,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and trading preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>
    </div>
  );
}
/* eslint-disable react-hooks/immutability */
// ===================================================
// FILE: src/components/features/dashboard/QuickActions.tsx
// ===================================================

import { Card } from '@/components/common/Card/Card';
import { 
  Settings, 
  TrendingUp, 
  Target, 
  Download,
  Bell,
  Wallet,
  BarChart3,
  HelpCircle
} from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      icon: Settings,
      label: 'Manage Settings',
      description: 'Configure trading preferences',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      href: '/settings',
    },
    {
      icon: TrendingUp,
      label: 'View All Trades',
      description: 'Complete trading history',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      href: '/trades',
    },
    {
      icon: Target,
      label: 'Channel Subscriptions',
      description: 'Manage signal sources',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      href: '/channels',
    },
    {
      icon: BarChart3,
      label: 'Performance Analytics',
      description: 'View detailed reports',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      href: '/performance',
    },
    {
      icon: Wallet,
      label: 'Trading Account',
      description: 'Manage MetaTrader connection',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
      href: '/settings?tab=account',
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Configure alerts',
      color: 'text-pink-600 dark:text-pink-400',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      href: '/settings?tab=notifications',
    },
    {
      icon: Download,
      label: 'Export Reports',
      description: 'Download trading data',
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-100 dark:bg-teal-900/30',
      onClick: () => {
        console.log('Export reports');
        // Handle export
      },
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get assistance',
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-900/30',
      href: '/help',
    },
  ];

  const handleActionClick = (action: typeof actions[0]) => {
    if (action.onClick) {
      action.onClick();
    } else if (action.href) {
      window.location.href = action.href;
    }
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h3>
        </div>

        <div className="space-y-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action)}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all text-left group"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${action.bgColor} flex-shrink-0`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {action.label}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {action.description}
                </div>
              </div>
              <svg
                className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
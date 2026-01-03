import React, { useState } from 'react';
import { Bell, Mail, Smartphone, MessageSquare, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: {
      tradeAlerts: true,
      priceAlerts: true,
      accountUpdates: true,
      weeklyReports: true,
      promotions: false
    },
    push: {
      tradeAlerts: true,
      priceAlerts: true,
      accountUpdates: false,
      weeklyReports: false,
      promotions: false
    },
    sms: {
      tradeAlerts: false,
      priceAlerts: true,
      accountUpdates: false,
      weeklyReports: false,
      promotions: false
    },
    inApp: {
      tradeAlerts: true,
      priceAlerts: true,
      accountUpdates: true,
      weeklyReports: true,
      promotions: true
    }
  });

  const [preferences, setPreferences] = useState({
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '08:00',
    tradingHoursOnly: false,
    groupNotifications: true,
    soundEnabled: true
  });

  const handleToggle = (channel, type) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type]
      }
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const notificationTypes = [
    { key: 'tradeAlerts', label: 'Trade Alerts', icon: TrendingUp, description: 'Order fills, trade executions' },
    { key: 'priceAlerts', label: 'Price Alerts', icon: DollarSign, description: 'Target price reached notifications' },
    { key: 'accountUpdates', label: 'Account Updates', icon: AlertTriangle, description: 'Balance changes, margin calls' },
    { key: 'weeklyReports', label: 'Weekly Reports', icon: CheckCircle, description: 'Performance summaries' },
    { key: 'promotions', label: 'Promotions', icon: Bell, description: 'News and updates' }
  ];

  const channels = [
    { key: 'email', label: 'Email', icon: Mail },
    { key: 'push', label: 'Push', icon: Smartphone },
    { key: 'sms', label: 'SMS', icon: MessageSquare },
    { key: 'inApp', label: 'In-App', icon: Bell }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
            <p className="text-sm text-gray-500">Manage how you receive notifications</p>
          </div>
        </div>
      </div>

      {/* Notification Matrix */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Notification Channels</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Type</th>
                {channels.map(channel => (
                  <th key={channel.key} className="text-center py-3 px-4">
                    <div className="flex flex-col items-center gap-1">
                      <channel.icon className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-500">{channel.label}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notificationTypes.map((type, idx) => (
                <tr key={type.key} className={idx !== notificationTypes.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <type.icon className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{type.label}</div>
                        <div className="text-xs text-gray-500">{type.description}</div>
                      </div>
                    </div>
                  </td>
                  {channels.map(channel => (
                    <td key={channel.key} className="text-center py-4 px-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[channel.key][type.key]}
                          onChange={() => handleToggle(channel.key, type.key)}
                          className="sr-only peer"
                        />
                        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preferences */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Preferences</h3>
        
        <div className="space-y-4">
          {/* Quiet Hours */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Quiet Hours</div>
              <div className="text-xs text-gray-500 mt-1">Pause notifications during specific hours</div>
              
              {preferences.quietHours && (
                <div className="flex items-center gap-3 mt-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Start</label>
                    <input
                      type="time"
                      value={preferences.quietStart}
                      onChange={(e) => handlePreferenceChange('quietStart', e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">End</label>
                    <input
                      type="time"
                      value={preferences.quietEnd}
                      onChange={(e) => handlePreferenceChange('quietEnd', e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.quietHours}
                onChange={(e) => handlePreferenceChange('quietHours', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Trading Hours Only */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Trading Hours Only</div>
              <div className="text-xs text-gray-500 mt-1">Only receive notifications during market hours</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.tradingHoursOnly}
                onChange={(e) => handlePreferenceChange('tradingHoursOnly', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Group Notifications */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Group Notifications</div>
              <div className="text-xs text-gray-500 mt-1">Combine similar notifications into a single alert</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.groupNotifications}
                onChange={(e) => handlePreferenceChange('groupNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Sound */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Notification Sound</div>
              <div className="text-xs text-gray-500 mt-1">Play sound for important notifications</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.soundEnabled}
                onChange={(e) => handlePreferenceChange('soundEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 flex items-center justify-between">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
          Reset to Default
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/components/features/admin/UserDetailModal.tsx (FIXED STYLING)
// PURPOSE: Shows complete user details with stats and channels
// ===================================================

import { X, User, Mail, Shield, Calendar, Activity, CheckCircle, XCircle, Radio, Hash } from 'lucide-react';

interface UserDetailModalProps {
  user: any;
  userStats: any;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailModal({ user, userStats, isOpen, onClose }: UserDetailModalProps) {
  if (!isOpen || !user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'expired': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Helper function to safely format price
  const formatPrice = (price: any): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return !isNaN(numPrice) ? numPrice.toFixed(2) : '0.00';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Profile */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.fullName}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(user.status)}`}>
                  {user.status?.toUpperCase()}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 capitalize">
                  {user.role?.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Account Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-600 dark:text-gray-400">Subscription Tier</label>
                <p className="text-sm font-medium capitalize text-gray-900 dark:text-white">{user.tier}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600 dark:text-gray-400">Member Since</label>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600 dark:text-gray-400">Last Login</label>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-gray-600 dark:text-gray-400">Email Verified</label>
                <p className="text-sm font-medium">
                  {user.emailVerified ? (
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" /> Yes
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                      <XCircle className="h-4 w-4" /> No
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Trading Statistics */}
          {userStats?.trading && (
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Trading Statistics</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total Trades</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.trading.totalTrades || 0}</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Win Rate</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {userStats.trading.winRate?.toFixed(1) || '0.0'}%
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Net Profit</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    ${userStats.trading.netProfit?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Subscribed Channels */}
          {userStats?.channels && userStats.channels.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
                Subscribed Channels ({userStats.channels.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {userStats.channels.map((channel: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Radio className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{channel.title}</p>
                      {channel.username && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">@{channel.username}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {channel.signalsReceived || 0} signals
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invitation Code Used */}
          {user.invitationCode && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Registered Using</h4>
              <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Hash className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <code className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">
                  {user.invitationCode.code}
                </code>
                <span className="text-xs text-gray-600 dark:text-gray-400 ml-auto">
                  {user.invitationCode.tier} - ${formatPrice(user.invitationCode.price)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
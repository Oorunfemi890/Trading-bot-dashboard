/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/components/features/admin/UserDetailModal.tsx
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
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-card rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Profile */}
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {user.fullName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{user.fullName}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
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
            <h4 className="text-sm font-semibold mb-3">Account Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Subscription Tier</label>
                <p className="text-sm font-medium capitalize">{user.tier}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Member Since</label>
                <p className="text-sm font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Last Login</label>
                <p className="text-sm font-medium">
                  {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">Email Verified</label>
                <p className="text-sm font-medium">
                  {user.emailVerified ? (
                    <span className="flex items-center gap-1 text-success">
                      <CheckCircle className="h-4 w-4" /> Yes
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-warning">
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
              <h4 className="text-sm font-semibold mb-3">Trading Statistics</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Total Trades</p>
                  <p className="text-2xl font-bold">{userStats.trading.totalTrades}</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold text-success">
                    {userStats.trading.winRate?.toFixed(1)}%
                  </p>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold text-info">
                    ${userStats.trading.netProfit?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Subscribed Channels */}
          {userStats?.channels && userStats.channels.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-3">
                Subscribed Channels ({userStats.channels.length})
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {userStats.channels.map((channel: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Radio className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{channel.title}</p>
                      {channel.username && (
                        <p className="text-xs text-muted-foreground">@{channel.username}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {channel.signalsReceived || 0} signals
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invitation Code Used */}
          {user.invitationCode && (
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Registered Using</h4>
              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                <Hash className="h-4 w-4 text-primary" />
                <code className="text-sm font-mono font-semibold text-primary">
                  {user.invitationCode.code}
                </code>
                <span className="text-xs text-muted-foreground ml-auto">
                  {user.invitationCode.tier} - ${user.invitationCode.price}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
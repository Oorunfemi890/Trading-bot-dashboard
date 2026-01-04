/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/components/features/admin/InvitationDetailModal.tsx (FIXED)
// ===================================================

import { X, Hash, DollarSign, Shield, Activity, Mail, Calendar, Clock, CheckCircle } from 'lucide-react';

interface InvitationDetailModalProps {
  invitation: any;
  isOpen: boolean;
  onClose: () => void;
}

export function InvitationDetailModal({ invitation, isOpen, onClose }: InvitationDetailModalProps) {
  if (!isOpen || !invitation) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'used': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'expired': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'revoked': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to safely format price
  const formatPrice = (price: any): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return !isNaN(numPrice) ? numPrice.toFixed(2) : '0.00';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Invitation Code Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Code and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Invitation Code
              </label>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <code className="text-lg font-mono font-semibold text-gray-900 dark:text-white">
                  {invitation.code}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Status
              </label>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invitation.status)}`}>
                {invitation.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Tier and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Subscription Tier
              </label>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="capitalize text-gray-900 dark:text-white">{invitation.tier}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Price
              </label>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-gray-900 dark:text-white">${formatPrice(invitation.price)}</span>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Usage
              </label>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-900 dark:text-white">{invitation.currentUses || 0} / {invitation.maxUses || 0}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                  style={{ width: `${invitation.maxUses > 0 ? ((invitation.currentUses || 0) / invitation.maxUses) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Remaining Uses
              </label>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="font-semibold text-gray-900 dark:text-white">{(invitation.maxUses || 0) - (invitation.currentUses || 0)}</span>
              </div>
            </div>
          </div>

          {/* Customer Email */}
          {invitation.customerEmail && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Customer Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-900 dark:text-white">{invitation.customerEmail}</span>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Created At
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-900 dark:text-white">
                  {invitation.createdAt ? new Date(invitation.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>

            {invitation.expiresAt && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Expires At
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm text-gray-900 dark:text-white">
                    {new Date(invitation.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Used By Users */}
          {invitation.usedByUsers && invitation.usedByUsers.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Activated By ({invitation.usedByUsers.length})
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {invitation.usedByUsers.map((user: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                      {user.fullName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName || 'Unknown User'}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.email || 'No email'}</p>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {invitation.notes && (
            <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Notes
              </label>
              <p className="text-sm whitespace-pre-wrap text-gray-900 dark:text-white">{invitation.notes}</p>
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
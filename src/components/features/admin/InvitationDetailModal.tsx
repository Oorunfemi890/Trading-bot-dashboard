/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/components/features/admin/InvitationDetailModal.tsx
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Invitation Code Details</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Code and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Invitation Code
              </label>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <code className="text-lg font-mono font-semibold">
                  {invitation.code}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
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
              <label className="text-sm font-medium text-muted-foreground">
                Subscription Tier
              </label>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="capitalize">{invitation.tier}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Price
              </label>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-success" />
                <span className="font-semibold">${invitation.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Usage
              </label>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-info" />
                <span>{invitation.currentUses} / {invitation.maxUses}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${(invitation.currentUses / invitation.maxUses) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Remaining Uses
              </label>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="font-semibold">{invitation.maxUses - invitation.currentUses}</span>
              </div>
            </div>
          </div>

          {/* Customer Email */}
          {invitation.customerEmail && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Customer Email
              </label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-info" />
                <span>{invitation.customerEmail}</span>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Created At
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {new Date(invitation.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {invitation.expiresAt && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Expires At
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="text-sm">
                    {new Date(invitation.expiresAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Used By Users */}
          {invitation.usedByUsers && invitation.usedByUsers.length > 0 && (
            <div className="space-y-3 pt-4 border-t">
              <label className="text-sm font-medium text-muted-foreground">
                Activated By ({invitation.usedByUsers.length})
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {invitation.usedByUsers.map((user: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {user.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {invitation.notes && (
            <div className="space-y-2 pt-4 border-t">
              <label className="text-sm font-medium text-muted-foreground">
                Notes
              </label>
              <p className="text-sm whitespace-pre-wrap">{invitation.notes}</p>
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
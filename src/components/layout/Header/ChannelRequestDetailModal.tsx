/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/components/layout/Header/ChannelRequestDetailModal.tsx (NEW FILE)
// Complete modal component for viewing and managing channel requests
// ===================================================

import { useState, useEffect } from 'react';
import { Modal } from '@/components/common/Modal/Modal';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Badge } from '@/components/common/Badge/Badge';
import { Radio, Calendar, Check, X, Edit2 } from 'lucide-react';

interface ChannelRequest {
  id: string;
  channelTitle: string;
  channelUsername?: string;
  channelDescription?: string;
  channelId: string;
  reason: string;
  user: {
    fullName: string;
    email: string;
  };
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string;
  reviewedBy?: {
    fullName: string;
  };
  rejectionReason?: string;
  telegramLink?: string;
}

interface Props {
  request: ChannelRequest;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (requestId: string, editedData?: any) => Promise<void>;
  onReject: (requestId: string, reason: string) => Promise<void>;
}

export default function ChannelRequestDetailModal({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [editedData, setEditedData] = useState({
    channelTitle: '',
    channelUsername: '',
    channelDescription: '',
    channelId: '',
  });

  // Initialize edited data when request changes
  useEffect(() => {
    if (request) {
      setEditedData({
        channelTitle: request.channelTitle || '',
        channelUsername: request.channelUsername || '',
        channelDescription: request.channelDescription || '',
        channelId: request.channelId || '',
      });
    }
  }, [request]);

  const handleApprove = async () => {
    if (processing) return;
    
    setProcessing(true);
    try {
      await onApprove(request.id, isEditing ? editedData : undefined);
      onClose();
    } catch (error) {
      console.error('Approval failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (processing) return;
    
    const reason = prompt('Rejection reason (optional):');
    if (reason === null) return;
    
    setProcessing(true);
    try {
      await onReject(request.id, reason || 'Not approved by admin');
      onClose();
    } catch (error) {
      console.error('Rejection failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = () => {
    switch (request.status) {
      case 'pending':
        return <Badge variant="warning">Pending Review</Badge>;
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Channel Request Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Status Header */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Radio className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-gray-900 dark:text-white">
              Channel Request
            </span>
          </div>
          {getStatusBadge()}
        </div>

        {/* Channel Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Channel Information
            </h3>
            {request.status === 'pending' && !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                leftIcon={<Edit2 className="h-4 w-4" />}
              >
                Edit Details
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4 p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Input
                label="Channel Title"
                value={editedData.channelTitle}
                onChange={(e) => setEditedData({ ...editedData, channelTitle: e.target.value })}
                required
              />
              <Input
                label="Channel Username (optional)"
                placeholder="@channelname"
                value={editedData.channelUsername}
                onChange={(e) => setEditedData({ ...editedData, channelUsername: e.target.value })}
              />
              <Input
                label="Channel ID"
                value={editedData.channelId}
                onChange={(e) => setEditedData({ ...editedData, channelId: e.target.value })}
                required
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                  value={editedData.channelDescription}
                  onChange={(e) => setEditedData({ ...editedData, channelDescription: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedData({
                      channelTitle: request.channelTitle,
                      channelUsername: request.channelUsername || '',
                      channelDescription: request.channelDescription || '',
                      channelId: request.channelId,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 dark:text-gray-400">Title</label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {request.channelTitle}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 dark:text-gray-400">Username</label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {request.channelUsername || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-600 dark:text-gray-400">Channel ID</label>
                <code className="text-sm font-mono font-medium text-gray-900 dark:text-white block p-2 bg-gray-100 dark:bg-gray-900/50 rounded">
                  {request.channelId}
                </code>
              </div>

              {request.channelDescription && (
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 dark:text-gray-400">Description</label>
                  <p className="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-900/50 rounded">
                    {request.channelDescription}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Request Details */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Request Details
          </h3>

          <div className="space-y-3">
            {/* Requester Info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {request.user.fullName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {request.user.fullName}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {request.user.email}
                </p>
              </div>
            </div>

            {/* Reason */}
            <div className="space-y-1">
              <label className="text-xs text-gray-600 dark:text-gray-400">Reason for Request</label>
              <p className="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-900/50 rounded">
                {request.reason}
              </p>
            </div>

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Submitted
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {new Date(request.createdAt).toLocaleTimeString()}
                </p>
              </div>

              {request.reviewedAt && (
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Reviewed
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(request.reviewedAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    By: {request.reviewedBy?.fullName || 'Admin'}
                  </p>
                </div>
              )}
            </div>

            {/* Rejection Reason */}
            {request.status === 'rejected' && request.rejectionReason && (
              <div className="space-y-1 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <label className="text-xs text-red-600 dark:text-red-400 font-medium">
                  Rejection Reason
                </label>
                <p className="text-sm text-gray-900 dark:text-white">
                  {request.rejectionReason}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        {request.status === 'pending' && (
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={processing}
              leftIcon={<X className="h-4 w-4" />}
            >
              Reject
            </Button>
            <Button
              variant="primary"
              onClick={handleApprove}
              loading={processing}
              leftIcon={<Check className="h-4 w-4" />}
            >
              {isEditing ? 'Approve with Edits' : 'Approve'}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
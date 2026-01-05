/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/pages/user/ChannelsPage.tsx - FIXED SUBMISSION
// ===================================================

import { useState, useEffect } from 'react';
import { useChannels, useWebSocket } from '@/hooks';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Modal } from '@/components/common/Modal/Modal';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { EmptyState } from '@/components/common/EmptyState/EmptyState';
import { toast } from 'sonner';
import {
  Radio,
  TrendingUp,
  Users,
  CheckCircle,
  Search,
  Plus,
  Activity,
  AlertCircle,
} from 'lucide-react';

interface ChannelRequestForm {
  channelId: string;
  channelUsername: string;
  channelTitle: string;
  channelDescription: string;
  reason: string;
}

export default function UserChannelsPage() {
  const { channels, subscriptions, loading, subscribe, unsubscribe, fetchChannels } = useChannels();
  const { socket, isConnected } = useWebSocket();
  const [searchQuery, setSearchQuery] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState<ChannelRequestForm>({
    channelId: '',
    channelUsername: '',
    channelTitle: '',
    channelDescription: '',
    reason: '',
  });
  const [submittingRequest, setSubmittingRequest] = useState(false);

  // Real-time updates
  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on('channel:added', () => {
      fetchChannels();
      toast.info('A new channel has been added');
    });

    socket.on('channel:updated', () => {
      fetchChannels();
    });

    // ✅ LISTEN FOR APPROVAL/REJECTION
    socket.on('channel:request:approved', (data: any) => {
      toast.success(`Your request for "${data.channelTitle}" was approved! 🎉`);
      fetchChannels(); // Refresh to show new channel
    });

    socket.on('channel:request:rejected', (data: any) => {
      toast.error(`Your request for "${data.channelTitle}" was rejected. Reason: ${data.rejectionReason || 'N/A'}`);
    });

    return () => {
      socket.off('channel:added');
      socket.off('channel:updated');
      socket.off('channel:request:approved');
      socket.off('channel:request:rejected');
    };
  }, [socket, isConnected]);

  // Filter channels by search
  const filteredChannels = channels.filter(
    (channel) =>
      channel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if user is subscribed
  const isSubscribed = (channelId: string) => {
    return subscriptions.some((sub) => sub.channel_id === channelId && sub.isActive);
  };

  // Handle subscription toggle
  const handleSubscriptionToggle = async (channelId: string) => {
    if (isSubscribed(channelId)) {
      await unsubscribe(channelId);
    } else {
      await subscribe(channelId);
    }
  };

  // ✅ FIXED: Submit channel request
  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!requestForm.channelId.trim()) {
      toast.error('Channel ID is required');
      return;
    }

    if (!requestForm.channelTitle.trim()) {
      toast.error('Channel title is required');
      return;
    }

    if (!requestForm.reason.trim()) {
      toast.error('Please provide a reason for this request');
      return;
    }

    setSubmittingRequest(true);

    try {
      // ✅ CORRECTED API CALL
      const response = await fetch('/api/v1/channel-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          channelId: requestForm.channelId.trim(),
          channelUsername: requestForm.channelUsername.trim() || undefined,
          channelTitle: requestForm.channelTitle.trim(),
          channelDescription: requestForm.channelDescription.trim() || undefined,
          reason: requestForm.reason.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Channel request submitted successfully! Admins will review it.');
        setShowRequestModal(false);
        setRequestForm({
          channelId: '',
          channelUsername: '',
          channelTitle: '',
          channelDescription: '',
          reason: '',
        });
      } else {
        toast.error(data.message || 'Failed to submit request');
      }
    } catch (error: any) {
      console.error('Request submission error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSubmittingRequest(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Signal Channels
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Subscribe to Telegram channels to receive trading signals
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isConnected && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </div>
          )}
          <Button
            variant="primary"
            onClick={() => setShowRequestModal(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Request Channel
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Channels
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {channels.length}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <Radio className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your Subscriptions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {subscriptions.length}
                </p>
              </div>
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Active Signals
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {channels.reduce((sum, ch) => sum + (ch.totalSignals || 0), 0)}
                </p>
              </div>
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search channels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Channels Grid */}
      {filteredChannels.length === 0 ? (
        <EmptyState
          icon={Radio}
          title="No channels found"
          description={
            searchQuery
              ? 'Try a different search term'
              : 'No channels available yet'
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChannels.map((channel) => {
            const subscribed = isSubscribed(channel.id);

            return (
              <Card
                key={channel.id}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="p-6 space-y-4">
                  {/* Channel Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                        <Radio className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {channel.title}
                        </h3>
                        {channel.username && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            @{channel.username}
                          </p>
                        )}
                      </div>
                    </div>
                    {subscribed && (
                      <Badge variant="green" size="sm">
                        <CheckCircle className="h-3 w-3" />
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  {channel.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {channel.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <TrendingUp className="h-4 w-4" />
                      <span>{channel.totalSignals || 0} signals</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{channel.successfulSignals || 0} success</span>
                    </div>
                  </div>

                  {/* Performance Badge */}
                  {channel.totalSignals > 0 && (
                    <div>
                      <Badge
                        variant={
                          (channel.successfulSignals / channel.totalSignals) * 100 >= 60
                            ? 'green'
                            : 'yellow'
                        }
                        className="w-full justify-center"
                      >
                        {((channel.successfulSignals / channel.totalSignals) * 100).toFixed(0)}% Win Rate
                      </Badge>
                    </div>
                  )}

                  {/* Subscribe Button */}
                  <Button
                    variant={subscribed ? 'outline' : 'primary'}
                    fullWidth
                    onClick={() => handleSubscriptionToggle(channel.id)}
                  >
                    {subscribed ? 'Unsubscribe' : 'Subscribe'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Request Channel Modal */}
      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title="Request a New Channel"
        size="md"
      >
        <form onSubmit={handleSubmitRequest} className="space-y-4">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-semibold mb-1">How to get Channel ID:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Forward a message from the channel to @userinfobot</li>
                  <li>Copy the channel ID (starts with -100)</li>
                  <li>Paste it in the field below</li>
                </ol>
              </div>
            </div>
          </div>

          <Input
            label="Channel ID"
            placeholder="-1001234567890"
            value={requestForm.channelId}
            onChange={(e) =>
              setRequestForm({ ...requestForm, channelId: e.target.value })
            }
            required
          />

          <Input
            label="Channel Username (optional)"
            placeholder="@channelname"
            value={requestForm.channelUsername}
            onChange={(e) =>
              setRequestForm({ ...requestForm, channelUsername: e.target.value })
            }
          />

          <Input
            label="Channel Title"
            placeholder="Premium Trading Signals"
            value={requestForm.channelTitle}
            onChange={(e) =>
              setRequestForm({ ...requestForm, channelTitle: e.target.value })
            }
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={3}
              placeholder="Brief description of the channel..."
              value={requestForm.channelDescription}
              onChange={(e) =>
                setRequestForm({
                  ...requestForm,
                  channelDescription: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Why should we add this channel? <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              rows={3}
              placeholder="Explain why this channel would be valuable..."
              value={requestForm.reason}
              onChange={(e) =>
                setRequestForm({ ...requestForm, reason: e.target.value })
              }
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowRequestModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" loading={submittingRequest}>
              Submit Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/hooks/useChannels.ts
// ===================================================

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { channelService } from '@/services/api';
import type { TelegramChannel, UserChannelSubscription } from '@/types';

export function useChannels() {
  const [channels, setChannels] = useState<TelegramChannel[]>([]);
  const [subscriptions, setSubscriptions] = useState<UserChannelSubscription[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChannels();
    fetchSubscriptions();
  }, []);

  async function fetchChannels() {
    try {
      setLoading(true);
      const data = await channelService.getChannels();
      setChannels(data);
    } catch (error) {
      toast.error('Failed to load channels');
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubscriptions() {
    try {
      const data = await channelService.getMySubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Failed to load subscriptions:', error);
    }
  }

  async function subscribe(channelId: string) {
    try {
      await channelService.subscribe(channelId);
      toast.success('Subscribed successfully');
      fetchSubscriptions();
    } catch (error) {
      toast.error('Failed to subscribe');
    }
  }

  async function unsubscribe(channelId: string) {
    try {
      await channelService.unsubscribe(channelId);
      toast.success('Unsubscribed successfully');
      fetchSubscriptions();
    } catch (error) {
      toast.error('Failed to unsubscribe');
    }
  }

  return {
    channels,
    subscriptions,
    loading,
    fetchChannels,
    fetchSubscriptions,
    subscribe,
    unsubscribe,
  };
}
// FILE: src/services/api/channel.service.ts
import BaseService from './base.service';
import { API_CONFIG } from '@/config/api.config';
import type {
  TelegramChannel,
  ChannelPerformance,
  UserChannelSubscription,
} from '@/types';

class ChannelService extends BaseService {
  async getChannels(): Promise<TelegramChannel[]> {
    const response = await this.get<TelegramChannel[]>(API_CONFIG.ENDPOINTS.CHANNELS.LIST);
    return response.data!;
  }

  async getChannelById(id: string): Promise<TelegramChannel> {
    const response = await this.get<TelegramChannel>(
      API_CONFIG.ENDPOINTS.CHANNELS.DETAIL(id)
    );
    return response.data!;
  }

  async getMySubscriptions(): Promise<UserChannelSubscription[]> {
    const response = await this.get<UserChannelSubscription[]>(
      API_CONFIG.ENDPOINTS.CHANNELS.MY_SUBSCRIPTIONS
    );
    return response.data!;
  }

  async subscribe(channelId: string): Promise<void> {
    await this.post(API_CONFIG.ENDPOINTS.CHANNELS.SUBSCRIBE(channelId));
  }

  async unsubscribe(channelId: string): Promise<void> {
    await this.post(API_CONFIG.ENDPOINTS.CHANNELS.UNSUBSCRIBE(channelId));
  }

  async getChannelPerformance(channelId: string): Promise<ChannelPerformance> {
    const response = await this.get<ChannelPerformance>(
      API_CONFIG.ENDPOINTS.CHANNELS.PERFORMANCE(channelId)
    );
    return response.data!;
  }

  async addChannel(data: { channelId: string }): Promise<TelegramChannel> {
    const response = await this.post<TelegramChannel>(
      API_CONFIG.ENDPOINTS.CHANNELS.ADD,
      data
    );
    return response.data!;
  }

  async updateChannel(id: string, data: Partial<TelegramChannel>): Promise<TelegramChannel> {
    const response = await this.put<TelegramChannel>(
      API_CONFIG.ENDPOINTS.CHANNELS.UPDATE(id),
      data
    );
    return response.data!;
  }

  async deleteChannel(id: string): Promise<void> {
    await this.delete(API_CONFIG.ENDPOINTS.CHANNELS.DELETE(id));
  }
}

export const channelService = new ChannelService();
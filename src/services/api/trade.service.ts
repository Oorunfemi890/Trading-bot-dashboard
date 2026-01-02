// FILE: src/services/api/trade.service.ts
import BaseService from './base.service';
import { API_CONFIG } from '@/config/api.config';
import type {
  Trade,
  TradeWithPositions,
  TradeFilters,
  TradeStatistics,
  PaginatedResponse,
  QueryParams,
} from '@/types';

class TradeService extends BaseService {
  async getTrades(filters?: TradeFilters & QueryParams): Promise<PaginatedResponse<Trade>> {
    return this.getPaginated<Trade>(API_CONFIG.ENDPOINTS.TRADES.LIST, filters);
  }

  async getTradeById(id: string): Promise<TradeWithPositions> {
    const response = await this.get<TradeWithPositions>(
      API_CONFIG.ENDPOINTS.TRADES.DETAIL(id)
    );
    return response.data!;
  }

  async getActiveTrades(): Promise<Trade[]> {
    const response = await this.get<Trade[]>(API_CONFIG.ENDPOINTS.TRADES.ACTIVE);
    return response.data!;
  }

  async getTradeHistory(params?: QueryParams): Promise<PaginatedResponse<Trade>> {
    return this.getPaginated<Trade>(API_CONFIG.ENDPOINTS.TRADES.HISTORY, params);
  }

  async getTodayTrades(): Promise<Trade[]> {
    const response = await this.get<Trade[]>(API_CONFIG.ENDPOINTS.TRADES.TODAY);
    return response.data!;
  }

  async getRecentTrades(limit?: number): Promise<Trade[]> {
    const response = await this.get<Trade[]>(API_CONFIG.ENDPOINTS.TRADES.RECENT, { limit });
    return response.data!;
  }

  async getTradeStats(): Promise<TradeStatistics> {
    const response = await this.get<TradeStatistics>(API_CONFIG.ENDPOINTS.TRADES.STATS);
    return response.data!;
  }

  async closeTrade(id: string): Promise<void> {
    await this.post(API_CONFIG.ENDPOINTS.TRADES.CLOSE(id));
  }
}

export const tradeService = new TradeService();
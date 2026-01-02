// FILE: src/services/api/signal.service.ts
import BaseService from './base.service';
import { API_CONFIG } from '@/config/api.config';
import type {
  Signal,
  SignalWithChannel,
  SignalFilters,
  PaginatedResponse,
} from '@/types';

class SignalService extends BaseService {
  async getSignals(filters?: SignalFilters): Promise<PaginatedResponse<Signal>> {
    return this.getPaginated<Signal>(API_CONFIG.ENDPOINTS.SIGNALS.LIST, filters);
  }

  async getSignalById(id: string): Promise<SignalWithChannel> {
    const response = await this.get<SignalWithChannel>(
      API_CONFIG.ENDPOINTS.SIGNALS.DETAIL(id)
    );
    return response.data!;
  }
}

export const signalService = new SignalService();
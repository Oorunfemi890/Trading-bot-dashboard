// FILE: src/services/api/ea.api.ts
// =============================================
// EA API Client - FIXED
// =============================================

import axios from '@/lib/axios';
import type { ApiResponse } from '@/types';

export interface GenerateTokenResponse {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    deviceName: string;
    platform: string | null;
    createdAt: Date;
    expiresAt: Date | null;
  };
}

export interface EAToken {
  id: string;
  deviceName: string;
  platform: string | null;
  status: 'active' | 'revoked' | 'expired';
  lastUsedAt: Date | null;
  createdAt: Date;
  requestCount: number;
}

export interface TokensResponse {
  success: boolean;
  data?: EAToken[];
}

export interface StatusResponse {
  success: boolean;
  data?: {
    connected: boolean;
    lastPing: Date | null;
    accountInfo: {
      accountNumber: string | null;
      broker: string | null;
      balance: number;
      equity: number;
      freeMargin: number;
      openPositions: number;
    } | null;
  };
}

export const eaAPI = {
  /**
   * Generate new EA token
   */
  async generateToken(
    deviceName: string, 
    platform: 'MT4' | 'MT5' = 'MT5'
  ): Promise<GenerateTokenResponse> {
    const response = await axios.post<ApiResponse<GenerateTokenResponse['data']>>(
      '/api/v1/ea/generate-token',
      { deviceName, platform }
    );
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data
    };
  },

  /**
   * Get all user tokens
   */
  async getTokens(): Promise<TokensResponse> {
    const response = await axios.get<ApiResponse<EAToken[]>>('/api/v1/ea/tokens');
    return {
      success: response.data.success,
      data: response.data.data
    };
  },

  /**
   * Revoke a token
   */
  async revokeToken(tokenId: string): Promise<{ success: boolean; message?: string }> {
    const response = await axios.delete<ApiResponse<void>>(`/api/v1/ea/tokens/${tokenId}`);
    return {
      success: response.data.success,
      message: response.data.message
    };
  },

  /**
   * Get EA connection status
   */
  async getStatus(): Promise<StatusResponse> {
    const response = await axios.get<ApiResponse<StatusResponse['data']>>('/api/v1/ea/status');
    return {
      success: response.data.success,
      data: response.data.data
    };
  },
};
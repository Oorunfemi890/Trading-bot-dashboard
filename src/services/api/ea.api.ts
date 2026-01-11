// FILE: src/api/ea.api.ts
// =============================================
// EA API Client
// =============================================

import { apiClient } from './client';

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

export interface TokensResponse {
  success: boolean;
  data?: Array<{
    id: string;
    deviceName: string;
    platform: string | null;
    status: 'active' | 'revoked' | 'expired';
    lastUsedAt: Date | null;
    createdAt: Date;
    requestCount: number;
  }>;
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
    const response = await apiClient.post('/ea/generate-token', {
      deviceName,
      platform,
    });
    return response.data;
  },

  /**
   * Get all user tokens
   */
  async getTokens(): Promise<TokensResponse> {
    const response = await apiClient.get('/ea/tokens');
    return response.data;
  },

  /**
   * Revoke a token
   */
  async revokeToken(tokenId: string): Promise<{ success: boolean; message?: string }> {
    const response = await apiClient.delete(`/ea/tokens/${tokenId}`);
    return response.data;
  },

  /**
   * Get EA connection status
   */
  async getStatus(): Promise<StatusResponse> {
    const response = await apiClient.get('/ea/status');
    return response.data;
  },
};
// FILE: src/hooks/useEA.ts
// =============================================
// Custom hook for EA management
// =============================================

import { useState, useEffect, useCallback } from 'react';
import { eaAPI } from '@/services/api/ea.api';

export interface EAToken {
  id: string;
  deviceName: string;
  platform: string | null;
  status: 'active' | 'revoked' | 'expired';
  lastUsedAt: Date | null;
  createdAt: Date;
  requestCount: number;
  isConnected: boolean; 

}

export interface EAStatus {
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
}

export function useEA() {
  const [tokens, setTokens] = useState<EAToken[]>([]);
  const [status, setStatus] = useState<EAStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all tokens
  const fetchTokens = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await eaAPI.getTokens();
      if (response.success && response.data) {
        setTokens(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tokens');
      console.error('Error fetching EA tokens:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch EA connection status
  const fetchStatus = useCallback(async () => {
    try {
      const response = await eaAPI.getStatus();
      if (response.success && response.data) {
        setStatus(response.data);
      }
    } catch (err: any) {
      console.error('Error fetching EA status:', err);
      // Don't set error for status checks - fail silently
    }
  }, []);

  // Generate new token
  const generateToken = useCallback(async (
    deviceName: string, 
    platform: 'MT4' | 'MT5' = 'MT5'
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await eaAPI.generateToken(deviceName, platform);
      if (response.success && response.data) {
        await fetchTokens(); // Refresh token list
        return response.data;
      }
      throw new Error(response.message || 'Failed to generate token');
    } catch (err: any) {
      setError(err.message || 'Failed to generate token');
      console.error('Error generating token:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchTokens]);

  // Revoke token
  const revokeToken = useCallback(async (tokenId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await eaAPI.revokeToken(tokenId);
      if (response.success) {
        await fetchTokens(); // Refresh token list
        return true;
      }
      throw new Error(response.message || 'Failed to revoke token');
    } catch (err: any) {
      setError(err.message || 'Failed to revoke token');
      console.error('Error revoking token:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchTokens]);

  // Refresh status manually
  const refreshStatus = useCallback(async () => {
    await fetchStatus();
  }, [fetchStatus]);

  // Initial load
  useEffect(() => {
    fetchTokens();
    fetchStatus();
  }, [fetchTokens, fetchStatus]);

  // Auto-refresh status every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchStatus]);

  return {
    tokens,
    status,
    isLoading,
    error,
    generateToken,
    revokeToken,
    refreshStatus,
    refetchTokens: fetchTokens,
  };
}
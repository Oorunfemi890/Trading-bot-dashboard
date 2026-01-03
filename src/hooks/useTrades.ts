/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/hooks/useTrades.ts
// ===================================================

import { useState, useCallback } from 'react';
import { tradeService } from '@/services/api';
import { toast } from 'sonner';

export function useTrades() {
  const [trades, setTrades] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTrades = useCallback(async (filters?: any) => {
    setIsLoading(true);
    try {
      const response = await tradeService.getTrades(filters);
      setTrades(response.data || []);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch trades');
      setTrades([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await tradeService.getTradeStats();
      setStats(response);
    } catch (error: any) {
      console.error('Failed to fetch stats:', error);
      setStats(null);
    }
  }, []);

  return {
    trades,
    stats,
    isLoading,
    fetchTrades,
    fetchStats,
  };
}
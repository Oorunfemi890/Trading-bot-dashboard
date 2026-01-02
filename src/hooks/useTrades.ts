// ===================================================
// FILE: src/hooks/useTrades.ts
// ===================================================

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { tradeService } from '@/services/api';
import type { Trade, TradeFilters } from '@/types';
import { usePagination } from './usePagination';

export function useTrades(initialFilters?: TradeFilters) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { page, limit, setPage } = usePagination();
  const [filters, setFilters] = useState<TradeFilters>(initialFilters || {});

  useEffect(() => {
    fetchTrades();
  }, [page, limit, filters]);

  async function fetchTrades() {
    try {
      setLoading(true);
      const response = await tradeService.getTrades({ ...filters, page, limit });

      setTrades(response.data);
      setTotal(response.meta.total);
    } catch (error) {
      toast.error('Failed to load trades');
    } finally {
      setLoading(false);
    }
  }

  async function closeTrade(id: string) {
    try {
      await tradeService.closeTrade(id);
      toast.success('Trade closed successfully');
      fetchTrades();
    } catch (error) {
      toast.error('Failed to close trade');
    }
  }

  return {
    trades,
    loading,
    total,
    page,
    limit,
    setPage,
    filters,
    setFilters,
    fetchTrades,
    closeTrade,
  };
}
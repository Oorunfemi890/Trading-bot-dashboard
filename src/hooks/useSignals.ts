/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// FILE: src/hooks/useSignals.ts
// ===================================================

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { signalService } from '@/services/api';
import type { Signal, SignalFilters } from '@/types';
import { usePagination } from './usePagination';

export function useSignals(initialFilters?: SignalFilters) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { page, limit, setPage } = usePagination();
  const [filters, setFilters] = useState<SignalFilters>(initialFilters || {});

  useEffect(() => {
    fetchSignals();
  }, [page, limit, filters]);

  async function fetchSignals() {
    try {
      setLoading(true);
      const response = await signalService.getSignals({ ...filters, page, limit } as any);

      setSignals(response.data);
      setTotal(response.meta.total);
    } catch (error) {
      toast.error('Failed to load signals');
    } finally {
      setLoading(false);
    }
  }

  return {
    signals,
    loading,
    total,
    page,
    limit,
    setPage,
    filters,
    setFilters,
    fetchSignals,
  };
}
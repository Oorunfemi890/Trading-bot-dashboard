/* eslint-disable @typescript-eslint/no-unused-vars */
// FILE: src/hooks/useAnalytics.ts
// ===================================================

import { useState } from 'react';
import { toast } from 'sonner';
import { adminService } from '@/services/api';
import type { SystemAnalytics, PerformanceTrend } from '@/types';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<SystemAnalytics | null>(null);
  const [trends, setTrends] = useState<PerformanceTrend[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchAnalytics(dateRange?: { dateFrom: Date; dateTo: Date }) {
    try {
      setLoading(true);
      const data = await adminService.getSystemAnalytics(dateRange);
      setAnalytics(data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }

  async function fetchTrends(days?: number) {
    try {
      setLoading(true);
      const data = await adminService.getPerformanceTrends(days);
      setTrends(data);
    } catch (error) {
      toast.error('Failed to load trends');
    } finally {
      setLoading(false);
    }
  }

  return {
    analytics,
    trends,
    loading,
    fetchAnalytics,
    fetchTrends,
  };
}

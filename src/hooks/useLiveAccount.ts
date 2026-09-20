// FILE: src/hooks/useLiveAccount.ts
// =============================================
// Live MT5 account figures, as reported by the user's EA.
//
// Rule: the dashboard NEVER shows a default or assumed balance. If the EA is
// offline (or has never reported), `available` is false and callers must show
// "unavailable" instead of a number.
// =============================================

import { useState, useEffect, useCallback } from 'react';
import { eaAPI } from '@/services/api/ea.api';

const REFRESH_MS = 30000;

export interface LiveAccount {
  /** True only when the EA is online AND reported figures. */
  available: boolean;
  balance: number | null;
  equity: number | null;
  freeMargin: number | null;
  lastPing: Date | null;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

export function useLiveAccount(): LiveAccount {
  const [state, setState] = useState<Omit<LiveAccount, 'refresh' | 'isLoading'>>({
    available: false,
    balance: null,
    equity: null,
    freeMargin: null,
    lastPing: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await eaAPI.getStatus();
      const info = response.success ? response.data?.accountInfo : null;
      const balance = info ? Number(info.balance) : NaN;

      if (response.data?.connected && info && Number.isFinite(balance) && balance > 0) {
        setState({
          available: true,
          balance,
          equity: Number.isFinite(Number(info.equity)) ? Number(info.equity) : null,
          freeMargin: Number.isFinite(Number(info.freeMargin)) ? Number(info.freeMargin) : null,
          lastPing: response.data.lastPing ? new Date(response.data.lastPing) : null,
        });
      } else {
        setState({
          available: false,
          balance: null,
          equity: null,
          freeMargin: null,
          lastPing: response.data?.lastPing ? new Date(response.data.lastPing) : null,
        });
      }
    } catch (err) {
      // On any failure, show "unavailable" - never keep or invent a number.
      console.error('Error fetching live account:', err);
      setState({ available: false, balance: null, equity: null, freeMargin: null, lastPing: null });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(interval);
  }, [refresh]);

  return { ...state, isLoading, refresh };
}

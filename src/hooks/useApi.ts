/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/hooks/useApi.ts
// ===================================================

import { useState } from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils';

export function useApi<T = any>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function execute(
    apiCall: () => Promise<T>,
    options?: {
      successMessage?: string;
      errorMessage?: string;
      onSuccess?: (data: T) => void;
      onError?: (error: any) => void;
    }
  ) {
    try {
      setLoading(true);
      setError(null);

      const result = await apiCall();
      setData(result);

      if (options?.successMessage) {
        toast.success(options.successMessage);
      }

      options?.onSuccess?.(result);

      return result;
    } catch (err: any) {
      const errorMsg = getErrorMessage(err);
      setError(errorMsg);

      const displayError = options?.errorMessage || errorMsg;
      toast.error(displayError);

      options?.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setData(null);
    setError(null);
    setLoading(false);
  }

  return { data, loading, error, execute, reset };
}
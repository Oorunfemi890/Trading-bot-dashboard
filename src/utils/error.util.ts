// FILE: src/utils/error.util.ts
import { ApiError } from '@/types';

export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  
  if (error && typeof error === 'object') {
    if ('message' in error) return (error as Error).message;
    if ('error' in error) return (error as ApiError).error || 'Unknown error';
  }
  
  return 'An unexpected error occurred';
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'success' in error &&
    (error as ApiError).success === false
  );
}
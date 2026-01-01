/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/types/api.types.ts
// ===================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  meta: PaginationMeta;
  message?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
  statusCode?: number;
}

export interface DateRangeFilter {
  dateFrom?: Date | string;
  dateTo?: Date | string;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  search?: string;
}

export type QueryParams = PaginationParams & 
  DateRangeFilter & 
  SortParams & 
  SearchParams & 
  Record<string, any>;
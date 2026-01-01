/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/services/api/base.service.ts
// ===================================================

import axios from '@/lib/axios';
import type { ApiResponse, PaginatedResponse, QueryParams } from '@/types';

class BaseService {
  /**
   * GET request
   */
  protected async get<T>(
    url: string,
    params?: QueryParams
  ): Promise<ApiResponse<T>> {
    const response = await axios.get<ApiResponse<T>>(url, { params });
    return response.data;
  }

  /**
   * GET request for paginated data
   */
  protected async getPaginated<T>(
    url: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<T>> {
    const response = await axios.get<PaginatedResponse<T>>(url, { params });
    return response.data;
  }

  /**
   * POST request
   */
  protected async post<T>(
    url: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    const response = await axios.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  /**
   * PUT request
   */
  protected async put<T>(
    url: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    const response = await axios.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  /**
   * PATCH request
   */
  protected async patch<T>(
    url: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    const response = await axios.patch<ApiResponse<T>>(url, data);
    return response.data;
  }

  /**
   * DELETE request
   */
  protected async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await axios.delete<ApiResponse<T>>(url);
    return response.data;
  }

  /**
   * Build query string from params
   */
  protected buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          searchParams.append(key, value.toISOString());
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    return searchParams.toString();
  }
}

export default BaseService;
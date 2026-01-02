/* eslint-disable @typescript-eslint/no-explicit-any */
// FILE: src/services/api/admin.service.ts
import BaseService from './base.service';
import { API_CONFIG } from '@/config/api.config';
import type {
  User,
  UserFilters,
  UserStatistics,
  UpdateUserData,
  PaginatedResponse,
  SystemMetrics,
  QueueStatistics,
  SystemAnalytics,
  PerformanceTrend,
  RealTimeDashboard,
} from '@/types';

class AdminService extends BaseService {
  // User Management
  async getUsers(filters?: UserFilters): Promise<PaginatedResponse<User>> {
    return this.getPaginated<User>(API_CONFIG.ENDPOINTS.ADMIN_USERS.LIST, filters);
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.get<User>(API_CONFIG.ENDPOINTS.ADMIN_USERS.DETAIL(id));
    return response.data!;
  }

  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const response = await this.put<User>(
      API_CONFIG.ENDPOINTS.ADMIN_USERS.UPDATE(id),
      data
    );
    return response.data!;
  }

  async suspendUser(id: string, reason?: string): Promise<User> {
    const response = await this.post<User>(
      API_CONFIG.ENDPOINTS.ADMIN_USERS.SUSPEND(id),
      { reason }
    );
    return response.data!;
  }

  async activateUser(id: string): Promise<User> {
    const response = await this.post<User>(
      API_CONFIG.ENDPOINTS.ADMIN_USERS.ACTIVATE(id)
    );
    return response.data!;
  }

  async deleteUser(id: string): Promise<void> {
    await this.delete(API_CONFIG.ENDPOINTS.ADMIN_USERS.DELETE(id));
  }

  async extendSubscription(id: string, days: number): Promise<User> {
    const response = await this.post<User>(
      API_CONFIG.ENDPOINTS.ADMIN_USERS.EXTEND_SUBSCRIPTION(id),
      { days }
    );
    return response.data!;
  }

  async changeUserTier(id: string, tier: string): Promise<User> {
    const response = await this.post<User>(
      API_CONFIG.ENDPOINTS.ADMIN_USERS.CHANGE_TIER(id),
      { tier }
    );
    return response.data!;
  }

  async getUserStatistics(id: string): Promise<UserStatistics> {
    const response = await this.get<UserStatistics>(
      API_CONFIG.ENDPOINTS.ADMIN_USERS.STATISTICS(id)
    );
    return response.data!;
  }

  async getSystemStatistics(): Promise<any> {
    const response = await this.get(API_CONFIG.ENDPOINTS.ADMIN_USERS.SYSTEM_STATISTICS);
    return response.data!;
  }

  async promoteToAdmin(id: string): Promise<User> {
    const response = await this.post<User>(API_CONFIG.ENDPOINTS.ADMIN_USERS.PROMOTE(id));
    return response.data!;
  }

  async demoteToUser(id: string): Promise<User> {
    const response = await this.post<User>(API_CONFIG.ENDPOINTS.ADMIN_USERS.DEMOTE(id));
    return response.data!;
  }

  // Analytics
  async getSystemAnalytics(dateRange?: {
    dateFrom: Date;
    dateTo: Date;
  }): Promise<SystemAnalytics> {
    const response = await this.get<SystemAnalytics>(
      API_CONFIG.ENDPOINTS.ADMIN_ANALYTICS.SYSTEM,
      dateRange
    );
    return response.data!;
  }

  async getPerformanceTrends(days?: number): Promise<PerformanceTrend[]> {
    const response = await this.get<PerformanceTrend[]>(
      API_CONFIG.ENDPOINTS.ADMIN_ANALYTICS.TRENDS,
      { days }
    );
    return response.data!;
  }

  async getRealTimeDashboard(): Promise<RealTimeDashboard> {
    const response = await this.get<RealTimeDashboard>(
      API_CONFIG.ENDPOINTS.ADMIN_ANALYTICS.DASHBOARD
    );
    return response.data!;
  }

  // System Metrics
  async getSystemMetrics(): Promise<SystemMetrics> {
    const response = await this.get<SystemMetrics>(
      API_CONFIG.ENDPOINTS.ADMIN_SYSTEM.METRICS
    );
    return response.data!;
  }

  async getQueueStatistics(): Promise<QueueStatistics> {
    const response = await this.get<QueueStatistics>(
      API_CONFIG.ENDPOINTS.ADMIN_SYSTEM.QUEUES
    );
    return response.data!;
  }

  async getSystemHealth(): Promise<any> {
    const response = await this.get(API_CONFIG.ENDPOINTS.ADMIN_SYSTEM.HEALTH);
    return response.data!;
  }
}

export const adminService = new AdminService();
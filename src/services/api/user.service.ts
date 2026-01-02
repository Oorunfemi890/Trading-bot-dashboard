// FILE: src/services/api/user.service.ts
import BaseService from './base.service';
import { API_CONFIG } from '@/config/api.config';
import type {
  UserProfile,
  UserSettings,
  UpdateUserSettingsData,
} from '@/types';

class UserService extends BaseService {
  async getProfile(): Promise<UserProfile> {
    const response = await this.get<UserProfile>(API_CONFIG.ENDPOINTS.USER.PROFILE);
    return response.data!;
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await this.put<UserProfile>(API_CONFIG.ENDPOINTS.USER.UPDATE, data);
    return response.data!;
  }

  async getSettings(): Promise<UserSettings> {
    const response = await this.get<UserSettings>(API_CONFIG.ENDPOINTS.USER.SETTINGS);
    return response.data!;
  }

  async updateSettings(data: UpdateUserSettingsData): Promise<UserSettings> {
    const response = await this.put<UserSettings>(API_CONFIG.ENDPOINTS.USER.SETTINGS, data);
    return response.data!;
  }
}

export const userService = new UserService();

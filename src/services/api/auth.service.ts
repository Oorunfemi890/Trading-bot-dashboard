// FILE: src/services/api/auth.service.ts
import BaseService from './base.service';
import { API_CONFIG } from '@/config/api.config';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
  ForgotPasswordData,
  ResetPasswordData,
  ValidateInvitationResponse,
} from '@/types';

class AuthService extends BaseService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.post<AuthResponse['data']>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.post<AuthResponse['data']>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, data);
  }

  async logout(): Promise<void> {
    await this.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
  }

  async getProfile(): Promise<User> {
    const response = await this.get<User>(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
    return response.data!;
  }

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    await this.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    await this.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, data);
  }

  async validateInvitation(code: string): Promise<ValidateInvitationResponse> {
    return this.post<ValidateInvitationResponse['data']>(
      API_CONFIG.ENDPOINTS.AUTH.VALIDATE_INVITATION,
      { code }
    );
  }
}

export const authService = new AuthService();
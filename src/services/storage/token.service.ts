// FILE: src/services/storage/token.service.ts
import { localStorageService } from './local-storage';

class TokenService {
  getAccessToken(): string | null {
    return localStorageService.getAccessToken();
  }
  
  setAccessToken(token: string): void {
    localStorageService.setAccessToken(token);
  }
  
  getRefreshToken(): string | null {
    return localStorageService.getRefreshToken();
  }
  
  setRefreshToken(token: string): void {
    localStorageService.setRefreshToken(token);
  }
  
  clearTokens(): void {
    localStorageService.clear();
  }
}

export const tokenService = new TokenService();
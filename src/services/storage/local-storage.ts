/* eslint-disable @typescript-eslint/no-explicit-any */
// FILE: src/services/storage/local-storage.ts
import { STORAGE_KEYS } from '@/config/constants';

class LocalStorageService {
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }
  
  setAccessToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }
  
  getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
  
  setRefreshToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }
  
  getUser<T = any>(): T | null {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }
  
  setUser(user: unknown): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }
  
  getTheme(): string | null {
    return localStorage.getItem(STORAGE_KEYS.THEME);
  }
  
  setTheme(theme: string): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
  
  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

export const localStorageService = new LocalStorageService();
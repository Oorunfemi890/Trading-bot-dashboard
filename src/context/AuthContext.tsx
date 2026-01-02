/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/context/AuthContext.tsx
// ===================================================

import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '@/services/api';
import { localStorageService } from '@/services/storage/local-storage';
import type { User, LoginCredentials, RegisterData } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const savedUser = localStorageService.getUser<User>();
      
      if (savedUser) {
        // Verify token is still valid by fetching profile
        const profile = await authService.getProfile();
        setUser(profile);
        localStorageService.setUser(profile);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorageService.clear();
    } finally {
      setIsLoading(false);
    }
  }

  async function login(credentials: LoginCredentials) {
    try {
      const response = await authService.login(credentials);
      const { user, accessToken, refreshToken } = response.data;

      // Save tokens
      localStorageService.setAccessToken(accessToken);
      if (refreshToken) {
        localStorageService.setRefreshToken(refreshToken);
      }

      // Save user
      setUser(user);
      localStorageService.setUser(user);

      toast.success('Welcome back!');

      // Navigate based on role
      if (user.role === 'admin' || user.role === 'super_admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  }

  async function register(data: RegisterData) {
    try {
      const response = await authService.register(data);
      const { user, accessToken, refreshToken } = response.data;

      // Save tokens
      localStorageService.setAccessToken(accessToken);
      if (refreshToken) {
        localStorageService.setRefreshToken(refreshToken);
      }

      // Save user
      setUser(user);
      localStorageService.setUser(user);

      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    }
  }

  function logout() {
    authService.logout().catch(console.error);
    
    // Clear local state
    setUser(null);
    localStorageService.clear();
    
    toast.info('Logged out successfully');
    navigate('/login');
  }

  async function refreshUser() {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
      localStorageService.setUser(profile);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
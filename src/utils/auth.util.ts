// FILE: src/utils/auth.util.ts
import { User, UserRole } from '@/types';

export function isAdmin(user: User | null): boolean {
  return user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN;
}

export function isSuperAdmin(user: User | null): boolean {
  return user?.role === UserRole.SUPER_ADMIN;
}

export function hasRole(user: User | null, roles: UserRole[]): boolean {
  return user ? roles.includes(user.role) : false;
}

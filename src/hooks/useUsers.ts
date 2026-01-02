/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/hooks/useUsers.ts
// ===================================================

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { adminService } from '@/services/api';
import type { User, UserFilters } from '@/types';
import { usePagination } from './usePagination';

export function useUsers(initialFilters?: UserFilters) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { page, limit, setPage } = usePagination();
  const [filters, setFilters] = useState<UserFilters>(initialFilters || {});

  useEffect(() => {
    fetchUsers();
  }, [page, limit, filters]);

  async function fetchUsers() {
  if (loading) return; // Prevent multiple simultaneous calls
  
  try {
    setLoading(true);
    const response = await adminService.getUsers({ ...(filters as any), page, limit });
    setUsers(response.data);
    setTotal(response.meta.total);
  } catch (error) {
    console.error('Failed to load users:', error);
    toast.error('Failed to load users');
    setUsers([]); // Clear users on error
    setTotal(0);
  } finally {
    setLoading(false);
  }
}

  async function suspendUser(id: string, reason?: string) {
    try {
      await adminService.suspendUser(id, reason);
      toast.success('User suspended');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to suspend user');
    }
  }

  async function activateUser(id: string) {
    try {
      await adminService.activateUser(id);
      toast.success('User activated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to activate user');
    }
  }

  return {
    users,
    loading,
    total,
    page,
    limit,
    setPage,
    filters,
    setFilters,
    fetchUsers,
    suspendUser,
    activateUser,
  };
}
/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/hooks/useInvitations.ts
// ===================================================

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { invitationService } from '@/services/api';
import type { InvitationCode, InvitationFilters, CreateInvitationData } from '@/types';
import { usePagination } from './usePagination';

export function useInvitations(initialFilters?: InvitationFilters) {
  const [invitations, setInvitations] = useState<InvitationCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { page, limit, setPage } = usePagination();
  const [filters, setFilters] = useState<InvitationFilters>(initialFilters || {});

  useEffect(() => {
    fetchInvitations();
  }, [page, limit, filters]);

  async function fetchInvitations() {
    try {
      setLoading(true);
      const response = await invitationService.getInvitations(filters, page, limit);

      setInvitations(response.data);
      setTotal(response.meta.total);
    } catch (error) {
      toast.error('Failed to load invitations');
    } finally {
      setLoading(false);
    }
  }

  async function createInvitation(data: CreateInvitationData) {
    try {
      await invitationService.createInvitation(data);
      toast.success('Invitation created successfully');
      fetchInvitations();
    } catch (error) {
      toast.error('Failed to create invitation');
      throw error;
    }
  }

  async function revokeInvitation(id: string) {
    try {
      await invitationService.revokeInvitation(id);
      toast.success('Invitation revoked');
      fetchInvitations();
    } catch (error) {
      toast.error('Failed to revoke invitation');
    }
  }

  async function deleteInvitation(id: string) {
    try {
      await invitationService.deleteInvitation(id);
      toast.success('Invitation deleted');
      fetchInvitations();
    } catch (error) {
      toast.error('Failed to delete invitation');
    }
  }

  return {
    invitations,
    loading,
    total,
    page,
    limit,
    setPage,
    filters,
    setFilters,
    fetchInvitations,
    createInvitation,
    revokeInvitation,
    deleteInvitation,
  };
}
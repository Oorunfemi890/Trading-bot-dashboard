// FILE: src/services/api/invitation.service.ts
import BaseService from './base.service';
import { API_CONFIG } from '@/config/api.config';
import type {
  InvitationCode,
  CreateInvitationData,
  BulkCreateInvitationData,
  UpdateInvitationData,
  InvitationFilters,
  InvitationStatistics,
  PaginatedResponse,
} from '@/types';

class InvitationService extends BaseService {
  async getInvitations(
    filters?: InvitationFilters
  ): Promise<PaginatedResponse<InvitationCode>> {
    return this.getPaginated<InvitationCode>(
      API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.LIST,
      filters
    );
  }

  async getInvitationById(id: string): Promise<InvitationCode> {
    const response = await this.get<InvitationCode>(
      API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.DETAIL(id)
    );
    return response.data!;
  }

  async createInvitation(data: CreateInvitationData): Promise<InvitationCode> {
    const response = await this.post<InvitationCode>(
      API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.CREATE,
      data
    );
    return response.data!;
  }

  async bulkCreateInvitations(
    data: BulkCreateInvitationData
  ): Promise<InvitationCode[]> {
    const response = await this.post<InvitationCode[]>(
      API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.BULK_CREATE,
      data
    );
    return response.data!;
  }

  async updateInvitation(
    id: string,
    data: UpdateInvitationData
  ): Promise<InvitationCode> {
    const response = await this.put<InvitationCode>(
      API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.UPDATE(id),
      data
    );
    return response.data!;
  }

  async revokeInvitation(id: string): Promise<InvitationCode> {
    const response = await this.post<InvitationCode>(
      API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.REVOKE(id)
    );
    return response.data!;
  }

  async deleteInvitation(id: string): Promise<void> {
    await this.delete(API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.DELETE(id));
  }

  async getStatistics(): Promise<InvitationStatistics> {
    const response = await this.get<InvitationStatistics>(
      API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.STATISTICS
    );
    return response.data!;
  }

  async resendEmail(id: string): Promise<void> {
    await this.post(API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.RESEND(id));
  }

  async exportCSV(filters?: InvitationFilters): Promise<Blob> {
    const response = await this.get<Blob>(
      API_CONFIG.ENDPOINTS.ADMIN_INVITATIONS.EXPORT,
      filters
    );
    return response.data!;
  }
}

export const invitationService = new InvitationService();
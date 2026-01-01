// ===================================================
// FILE: src/types/invitation.types.ts
// ===================================================

import { SubscriptionTier } from './auth.types';

export enum InvitationCodeStatus {
  ACTIVE = 'active',
  USED = 'used',
  EXPIRED = 'expired',
  REVOKED = 'revoked',
}

export interface InvitationCode {
  id: string;
  code: string;
  tier: SubscriptionTier;
  price: number;
  maxUses: number;
  currentUses: number;
  expiresAt: Date | null;
  status: InvitationCodeStatus;
  customerEmail: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  usedAt: Date | null;
  generated_by_id: string | null;
  remainingUses?: number;
  daysUntilExpiry?: number | null;
  isValid?: boolean;
}

export interface CreateInvitationData {
  tier: SubscriptionTier;
  price: number;
  maxUses: number;
  expiryDays: number;
  customerEmail?: string;
  notes?: string;
}

export interface BulkCreateInvitationData {
  tier: SubscriptionTier;
  price: number;
  count: number;
  maxUses: number;
  expiryDays: number;
}

export interface UpdateInvitationData {
  maxUses?: number;
  expiresAt?: Date | null;
  customerEmail?: string | null;
  notes?: string | null;
  price?: number;
}

export interface InvitationFilters {
  status?: InvitationCodeStatus;
  tier?: SubscriptionTier;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  hasEmail?: boolean;
}

export interface InvitationStatistics {
  overview: {
    total: number;
    active: number;
    used: number;
    expired: number;
    revoked: number;
    conversionRate: number;
  };
  revenue: {
    total: number;
    byTier: TierRevenue[];
  };
  recentActivity: InvitationCode[];
  trends: RegistrationTrend[];
}

export interface TierRevenue {
  tier: SubscriptionTier;
  revenue: number;
  count: number;
}

export interface RegistrationTrend {
  date: string;
  registrations: number;
}
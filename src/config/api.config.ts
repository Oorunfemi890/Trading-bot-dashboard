// ===================================================
// FILE: src/config/api.config.ts
// ===================================================
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  WS_URL: import.meta.env.VITE_WS_URL || 'http://localhost:3000',
  TIMEOUT: 30000,
  
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: '/api/v1/auth/login',
      REGISTER: '/api/v1/auth/register',
      LOGOUT: '/api/v1/auth/logout',
      PROFILE: '/api/v1/auth/profile',
      FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
      RESET_PASSWORD: '/api/v1/auth/reset-password',
      VALIDATE_INVITATION: '/api/v1/auth/validate-invitation',
    },
    
    // User endpoints
    USER: {
      PROFILE: '/api/v1/users/profile',
      UPDATE: '/api/v1/users/profile',
      SETTINGS: '/api/v1/users/settings',
    },
    
    // Trade endpoints
    TRADES: {
      LIST: '/api/v1/trades',
      DETAIL: (id: string) => `/api/v1/trades/${id}`,
      ACTIVE: '/api/v1/trades/active',
      HISTORY: '/api/v1/trades/history',
      TODAY: '/api/v1/trades/today',
      RECENT: '/api/v1/trades/recent',
      STATS: '/api/v1/trades/stats',
      POSITIONS: (id: string) => `/api/v1/trades/${id}/positions`,
      CLOSE: (id: string) => `/api/v1/trades/${id}/close`,
    },
    
    // Signal endpoints
    SIGNALS: {
      LIST: '/api/v1/signals',
      DETAIL: (id: string) => `/api/v1/signals/${id}`,
    },
    
    // Channel endpoints
    CHANNELS: {
      LIST: '/api/v1/channels',
      DETAIL: (id: string) => `/api/v1/channels/${id}`,
      MY_SUBSCRIPTIONS: '/api/v1/channels/my-subscriptions',
      SUBSCRIBE: (id: string) => `/api/v1/channels/${id}/subscribe`,
      UNSUBSCRIBE: (id: string) => `/api/v1/channels/${id}/unsubscribe`,
      PERFORMANCE: (id: string) => `/api/v1/channels/${id}/performance`,
      ADD: '/api/v1/channels',
      UPDATE: (id: string) => `/api/v1/channels/${id}`,
      DELETE: (id: string) => `/api/v1/channels/${id}`,
    },
    
    // Admin - Invitations
    ADMIN_INVITATIONS: {
      LIST: '/api/v1/admin/invitations',
      DETAIL: (id: string) => `/api/v1/admin/invitations/${id}`,
      CREATE: '/api/v1/admin/invitations',
      BULK_CREATE: '/api/v1/admin/invitations/bulk',
      UPDATE: (id: string) => `/api/v1/admin/invitations/${id}`,
      REVOKE: (id: string) => `/api/v1/admin/invitations/${id}/revoke`,
      DELETE: (id: string) => `/api/v1/admin/invitations/${id}`,
      STATISTICS: '/api/v1/admin/invitations/statistics',
      RESEND: (id: string) => `/api/v1/admin/invitations/${id}/resend`,
      EXPORT: '/api/v1/admin/invitations/export',
    },
    
    // Admin - Users
    ADMIN_USERS: {
      LIST: '/api/v1/admin/users',
      DETAIL: (id: string) => `/api/v1/admin/users/${id}`,
      UPDATE: (id: string) => `/api/v1/admin/users/${id}`,
      SUSPEND: (id: string) => `/api/v1/admin/users/${id}/suspend`,
      ACTIVATE: (id: string) => `/api/v1/admin/users/${id}/activate`,
      DELETE: (id: string) => `/api/v1/admin/users/${id}`,
      EXTEND_SUBSCRIPTION: (id: string) => `/api/v1/admin/users/${id}/extend-subscription`,
      CHANGE_TIER: (id: string) => `/api/v1/admin/users/${id}/change-tier`,
      STATISTICS: (id: string) => `/api/v1/admin/users/${id}/statistics`,
      SYSTEM_STATISTICS: '/api/v1/admin/users/statistics',
      PROMOTE: (id: string) => `/api/v1/admin/users/${id}/promote`,
      DEMOTE: (id: string) => `/api/v1/admin/users/${id}/demote`,
    },
    
    // Admin - Analytics
    ADMIN_ANALYTICS: {
      SYSTEM: '/api/v1/admin/analytics/system',
      TRENDS: '/api/v1/admin/analytics/trends',
      DASHBOARD: '/api/v1/admin/analytics/dashboard',
    },
    
    // Admin - System
    ADMIN_SYSTEM: {
      METRICS: '/api/v1/admin/system/metrics',
      QUEUES: '/api/v1/admin/system/queues',
      HEALTH: '/api/v1/admin/system/health',
    },
  },
} as const;
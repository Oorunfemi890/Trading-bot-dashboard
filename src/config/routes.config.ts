// ===================================================
// FILE: src/config/routes.config.ts
// ===================================================
export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // User routes
  USER: {
    DASHBOARD: '/dashboard',
    TRADES: '/trades',
    TRADE_DETAIL: (id: string) => `/trades/${id}`,
    SIGNALS: '/signals',
    CHANNELS: '/channels',
    PERFORMANCE: '/performance',
    SETTINGS: '/settings',
    NOTIFICATIONS: '/notifications',
  },
  
  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    
    // Invitations
    INVITATIONS: '/admin/invitations',
    INVITATION_DETAIL: (id: string) => `/admin/invitations/${id}`,
    CREATE_INVITATION: '/admin/invitations/create',
    
    // Users
    USERS: '/admin/users',
    USER_DETAIL: (id: string) => `/admin/users/${id}`,
    
    // Analytics
    ANALYTICS: '/admin/analytics',
    PERFORMANCE: '/admin/analytics/performance',
    REVENUE: '/admin/analytics/revenue',
    
    // System
    SYSTEM_HEALTH: '/admin/system/health',
    QUEUES: '/admin/system/queues',
    METRICS: '/admin/system/metrics',
    
    // Channels
    CHANNELS: '/admin/channels',
    ADD_CHANNEL: '/admin/channels/add',
    
    // Audit
    AUDIT_LOGS: '/admin/audit',
  },
  
  // Other
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized',
} as const;
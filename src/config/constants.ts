// ===================================================
// FILE: src/config/constants.ts
// ===================================================
export const APP_NAME = 'Trading Bot';
export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
} as const;

export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired',
} as const;

export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  STARTER: 'starter',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const;

export const TRADE_DIRECTION = {
  BUY: 'buy',
  SELL: 'sell',
} as const;

export const TRADE_STATUS = {
  PENDING: 'pending',
  OPEN: 'open',
  CLOSED: 'closed',
  CANCELLED: 'cancelled',
} as const;

export const POSITION_STATUS = {
  PENDING: 'pending',
  OPEN: 'open',
  CLOSED: 'closed',
} as const;

export const SIGNAL_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  INVALIDATED: 'invalidated',
  COMPLETED: 'completed',
} as const;

export const INVITATION_STATUS = {
  ACTIVE: 'active',
  USED: 'used',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_TIME: 'MMM dd, yyyy HH:mm',
  ISO: 'yyyy-MM-dd',
} as const;

export const WEBSOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  CONNECTED: 'connected',
  ERROR: 'error',
  
  // Trade events
  TRADE_OPENED: 'trade:opened',
  TRADE_BREAKEVEN: 'trade:breakeven',
  TRADE_TAKEPROFIT: 'trade:takeprofit',
  TRADE_STOPLOSS: 'trade:stoploss',
  TRADE_COMPLETED: 'trade:completed',
  
  // Signal events
  SIGNAL_DETECTED: 'signal:detected',
  
  // Position events
  POSITION_UPDATED: 'position:updated',
  
  // Account events
  ACCOUNT_BALANCE: 'account:balance',
  
  // System events
  SYSTEM_NOTIFICATION: 'system:notification',
  
  // Admin events
  ADMIN_NOTIFICATION: 'admin:notification',
  ADMIN_NEW_USER: 'admin:newuser',
  ADMIN_METRICS: 'admin:metrics',
} as const;
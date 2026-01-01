// ===================================================
// FILE: src/config/theme.config.ts
// ===================================================
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  info: string;
  infoForeground: string;
}

export const THEME_CONFIG = {
  DEFAULT_THEME: 'system' as const,
  STORAGE_KEY: 'theme',
  THEME_OPTIONS: ['light', 'dark', 'system'] as const,
} as const;

export type Theme = 'light' | 'dark' | 'system';
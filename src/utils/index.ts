// ===================================================
// FILE: src/utils/index.ts (FIXED - NO CONFLICTS)
// ===================================================

// Export from format.util (using date.util's formatDate instead)
export {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber,
  truncateText,
  formatDuration,
  capitalize,
  camelToTitle,
  formatEnumValue,
  formatPips,
  formatLotSize,
} from './format.util';

// Export everything from date.util (including formatDate)
export * from './date.util';

// Export everything else normally
export * from './validation.util';
export * from './storage.util';
export * from './error.util';
export * from './auth.util';
export * from './trade.util';
export * from './chart.util';
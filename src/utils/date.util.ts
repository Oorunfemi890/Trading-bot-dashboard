// ===================================================
// FILE: src/utils/date.util.ts
// ===================================================

import { format, formatDistance, formatRelative, isValid, parseISO } from 'date-fns';

/**
 * Format date to display format
 */
export function formatDate(date: Date | string, formatStr: string = 'MMM dd, yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  
  return format(dateObj, formatStr);
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
}

/**
 * Format date to ISO string
 */
export function formatDateISO(date: Date | string): string {
  return formatDate(date, 'yyyy-MM-dd');
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  
  return formatDistance(dateObj, new Date(), { addSuffix: true });
}

/**
 * Format relative date (e.g., "yesterday at 3:00 PM")
 */
export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (!isValid(dateObj)) {
    return 'Invalid date';
  }
  
  return formatRelative(dateObj, new Date());
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Get date range for filter
 */
export function getDateRange(range: 'today' | 'week' | 'month' | 'year'): {
  start: Date;
  end: Date;
} {
  const end = new Date();
  const start = new Date();
  
  switch (range) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      start.setDate(start.getDate() - 7);
      break;
    case 'month':
      start.setMonth(start.getMonth() - 1);
      break;
    case 'year':
      start.setFullYear(start.getFullYear() - 1);
      break;
  }
  
  return { start, end };
}

/**
 * Parse date string safely
 */
export function parseDate(dateStr: string): Date | null {
  try {
    const date = parseISO(dateStr);
    return isValid(date) ? date : null;
  } catch {
    return null;
  }
}

/**
 * Get days until date
 */
export function getDaysUntil(date: Date | string): number {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const now = new Date();
  
  const diffTime = dateObj.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}
// ===================================================
// FILE: src/services/theme/theme.service.ts
// ===================================================

import { THEME_CONFIG } from '@/config/theme.config';
import { localStorageService } from '../storage/local-storage';

type Theme = 'light' | 'dark' | 'system';

class ThemeService {
  private currentTheme: Theme = THEME_CONFIG.DEFAULT_THEME;

  /**
   * Initialize theme
   */
  initialize(): void {
    const savedTheme = this.getTheme();
    this.applyTheme(savedTheme);
  }

  /**
   * Get current theme
   */
  getTheme(): Theme {
    const saved = localStorageService.getTheme();
    return (saved as Theme) || THEME_CONFIG.DEFAULT_THEME;
  }

  /**
   * Set theme
   */
  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    localStorageService.setTheme(theme);
    this.applyTheme(theme);
  }

  /**
   * Toggle theme
   */
  toggleTheme(): void {
    const current = this.getTheme();
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      // Use system preference
      const systemTheme = this.getSystemTheme();
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }

  /**
   * Get system theme preference
   */
  private getSystemTheme(): 'light' | 'dark' {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Watch for system theme changes
   */
  watchSystemTheme(callback: (theme: 'light' | 'dark') => void): void {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        const theme = e.matches ? 'dark' : 'light';
        callback(theme);
        
        // If current theme is system, update
        if (this.currentTheme === 'system') {
          this.applyTheme('system');
        }
      });
    }
  }
}

export const themeService = new ThemeService();
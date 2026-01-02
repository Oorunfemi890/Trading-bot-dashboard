/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/components/layout/Header/Header.tsx
// ===================================================

import { Bell, Moon, Sun, LogOut, User, Settings } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { useAuth, useTheme } from '@/hooks';
import { useState } from 'react';
import { cn } from '@/lib/cn';

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed left-64 right-0 top-0 z-30 h-16 border-b bg-card px-6">
      <div className="flex h-full items-center justify-between">
        {/* Search or breadcrumbs could go here */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-9 w-9 p-0"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="h-9 gap-2"
            >
              <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                {user?.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm">{user?.fullName}</span>
            </Button>

            {/* Dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-card shadow-lg z-50">
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium">{user?.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>

                  <div className="p-1">
                    <button
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <button
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                  </div>

                  <div className="border-t p-1">
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-accent"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

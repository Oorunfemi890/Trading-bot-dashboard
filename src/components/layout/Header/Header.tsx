// ===================================================
// FILE: src/components/layout/Header/Header.tsx (MOBILE-RESPONSIVE)
// ===================================================

import { Bell, Moon, Sun, LogOut, User, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { useAuth, useTheme } from '@/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import  {NotificationBell} from '@/components/layout/Header/NotificationBell';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b bg-card lg:left-64">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left side - Menu button and Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="h-9 w-9 p-0 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo - visible on mobile */}
          <Link to={isAdmin ? '/admin/dashboard' : '/dashboard'} className="lg:hidden">
            <h1 className="text-lg font-bold text-primary">Trading Bot</h1>
          </Link>
        </div>

        {/* Right side - Actions */}
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

          {/* Notifications - hidden on small mobile */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 w-9 p-0 relative hidden sm:flex"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="h-9 gap-2 px-2"
            >
              <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                {user?.fullName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm hidden md:inline">{user?.fullName}</span>
            </Button>

            {/* User Dropdown */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-card shadow-lg z-50">
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium truncate">{user?.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>

                  <div className="p-1">
                    <Link
                      to={isAdmin ? '/admin/profile' : '/profile'}
                      onClick={() => setShowUserMenu(false)}
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to={isAdmin ? '/admin/settings' : '/settings'}
                      onClick={() => setShowUserMenu(false)}
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t p-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
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
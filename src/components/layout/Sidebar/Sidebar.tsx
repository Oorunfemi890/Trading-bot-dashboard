// ===================================================
// FILE: src/components/layout/Sidebar/Sidebar.tsx (COMPLETE UPDATE)
// ===================================================

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Ticket, 
  BarChart3, 
  Settings,
  Activity,
  TrendingUp,
  Database,
  User,
  LogOut,
  Radio,
  X,
  Monitor,
  Target,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useAuth } from '@/hooks';
import { Button } from '@/components/common/Button/Button';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const adminNavItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Invitations', href: '/admin/invitations', icon: <Ticket className="h-5 w-5" /> },
    { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
    { label: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { label: 'Channels', href: '/admin/channels', icon: <Radio className="h-5 w-5" /> },
    { label: 'System Health', href: '/admin/system', icon: <Activity className="h-5 w-5" /> },
  ];

  const userNavItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Trades', href: '/trades', icon: <TrendingUp className="h-5 w-5" /> },
    { label: 'Signals', href: '/signals', icon: <Database className="h-5 w-5" /> },
    { label: 'Channels', href: '/channels', icon: <Radio className="h-5 w-5" /> },
    { label: 'Performance', href: '/performance', icon: <Target className="h-5 w-5" /> },
    { label: 'EA Setup', href: '/ea-setup', icon: <Monitor className="h-5 w-5" /> },
    { label: 'Help', href: '/help', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card flex flex-col transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo & Close Button */}
        <div className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-xl font-bold text-primary">Trading Bot</h1>
          
          {/* Close Button (Mobile only) */}
          {isOpen && (
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={handleNavClick}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t p-4 space-y-1">
          <NavLink
            to={isAdmin ? '/admin/profile' : '/profile'}
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <User className="h-5 w-5" />
            Profile
          </NavLink>

          <NavLink
            to={isAdmin ? '/admin/settings' : '/settings'}
            onClick={handleNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <Settings className="h-5 w-5" />
            Settings
          </NavLink>

          <Button
            variant="ghost"
            onClick={() => {
              handleNavClick();
              logout();
            }}
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
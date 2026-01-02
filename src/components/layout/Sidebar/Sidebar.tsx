// ===================================================
// FILE: src/components/layout/Sidebar/Sidebar.tsx
// ===================================================

import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Ticket, 
  BarChart3, 
  Settings,
  Activity,
  TrendingUp,
  Database
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useAuth } from '@/hooks';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  const adminNavItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: 'Invitations',
      href: '/admin/invitations',
      icon: <Ticket className="h-5 w-5" />,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: 'Analytics',
      href: '/admin/analytics',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      label: 'System',
      href: '/admin/system/health',
      icon: <Activity className="h-5 w-5" />,
    },
  ];

  const userNavItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      label: 'Trades',
      href: '/trades',
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      label: 'Signals',
      href: '/signals',
      icon: <Database className="h-5 w-5" />,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-primary">Trading Bot</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
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
    </aside>
  );
}
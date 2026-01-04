/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/components/layout/Header/Header.tsx (COMPLETE REWRITE)
// ===================================================

import { useState, useEffect } from 'react';
import { Bell, Moon, Sun, LogOut, User, Settings, Menu, X, Radio, Check, X as XIcon, ChevronDown } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { useAuth, useTheme } from '@/hooks';
import { toast } from 'sonner';

interface HeaderProps {
  onMenuClick: () => void;
}

interface ChannelRequest {
  id: string;
  channelTitle: string;
  channelUsername?: string;
  channelDescription?: string;
  reason: string;
  user: {
    fullName: string;
    email: string;
  };
  createdAt: string;
  status: string;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<ChannelRequest[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  // Fetch notifications on mount and poll every 30 seconds
  useEffect(() => {
    if (isAdmin) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  // WebSocket connection for real-time updates
  useEffect(() => {
    if (!isAdmin) return;

    const token = localStorage.getItem('access_token');
    if (!token) return;

    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${wsProtocol}//${window.location.host}/socket.io`;

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('✅ WebSocket connected');
        // Send authentication
        ws.send(JSON.stringify({ type: 'auth', token }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'channel_request_submitted') {
            fetchNotifications();
            toast.info(`New channel request: ${data.request?.channelTitle || 'Unknown'}`);
          }

          if (data.type === 'channel_request_processed') {
            fetchNotifications();
          }
        } catch (error) {
          console.error('WebSocket message parse error:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('❌ WebSocket disconnected');
      };

      return () => {
        ws.close();
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  }, [isAdmin]);

  async function fetchNotifications() {
    try {
      const response = await fetch('/api/v1/channel-requests/admin/all?status=pending', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setNotifications(data.data);
        setPendingCount(data.data.length);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }

  async function handleApprove(requestId: string) {
    try {
      const response = await fetch(`/api/v1/channel-requests/admin/${requestId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        toast.success('Channel approved successfully!');
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to approve channel');
    }
  }

  async function handleReject(requestId: string) {
    const reason = prompt('Rejection reason (optional):');
    
    try {
      const response = await fetch(`/api/v1/channel-requests/admin/${requestId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ rejectionReason: reason || 'Not approved' })
      });
      
      if (response.ok) {
        toast.success('Channel rejected');
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to reject channel');
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b bg-card lg:left-64">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left side - Single Menu button */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="h-9 w-9 p-0 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo - visible on mobile */}
          <h1 className="lg:hidden text-lg font-bold text-primary">Trading Bot</h1>
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
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Notifications - Admin only */}
          {isAdmin && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="h-9 w-9 p-0 relative"
              >
                <Bell className="h-4 w-4" />
                {pendingCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold animate-pulse">
                    {pendingCount > 9 ? '9+' : pendingCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  
                  <div className="absolute right-0 top-full mt-2 w-96 max-w-[calc(100vw-2rem)] max-h-[500px] overflow-y-auto rounded-lg border bg-card shadow-xl z-50">
                    <div className="sticky top-0 bg-card border-b p-4 z-10">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Channel Requests</h3>
                        {pendingCount > 0 && (
                          <Badge variant="destructive">
                            {pendingCount} pending
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-2">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                          <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No pending requests</p>
                        </div>
                      ) : (
                        notifications.map((request) => (
                          <div key={request.id} className="p-3 mb-2 rounded-lg border bg-card hover:bg-accent transition-colors">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                                <Radio className="h-5 w-5 text-primary" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold truncate">
                                  {request.channelTitle}
                                </div>
                                {request.channelUsername && (
                                  <div className="text-xs text-muted-foreground">
                                    @{request.channelUsername}
                                  </div>
                                )}
                                <div className="text-sm text-muted-foreground mt-1">
                                  By: {request.user?.fullName || 'Unknown'}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {request.reason}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {new Date(request.createdAt).toLocaleDateString()}
                                </div>

                                <div className="flex gap-2 mt-3">
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(request.id)}
                                    className="flex-1"
                                  >
                                    <Check className="h-3 w-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleReject(request.id)}
                                    className="flex-1"
                                  >
                                    <XIcon className="h-3 w-3 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="border-t p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            window.location.href = '/admin/channels';
                            setShowNotifications(false);
                          }}
                          fullWidth
                        >
                          View All Requests
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="h-9 gap-2 px-2"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-primary-foreground text-xs font-bold">
                {getInitials(user?.fullName)}
              </div>
              <span className="text-sm hidden md:inline">{user?.fullName}</span>
              <ChevronDown className="h-4 w-4 hidden md:block" />
            </Button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-card shadow-lg z-50">
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium truncate">{user?.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>

                  <div className="p-1">
                    <button
                      onClick={() => window.location.href = isAdmin ? '/admin/profile' : '/profile'}
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => window.location.href = isAdmin ? '/admin/settings' : '/settings'}
                      className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
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
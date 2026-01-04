/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Bell, Check, X, Radio } from 'lucide-react';
import { Badge } from '@/components/common/Badge/Badge';
import { Button } from '@/components/common/Button/Button';

interface ChannelRequest {
  id: string;
  channelTitle: string;
  channelUsername?: string;
  reason: string;
  user: {
    fullName: string;
    email: string;
  };
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface NotificationBellProps {
  userId?: string;
  userRole?: string;
}

export default function NotificationBell({ userId, userRole }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState<ChannelRequest[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const isAdmin = userRole === 'admin' || userRole === 'super_admin';

  // Fetch pending requests count
  const fetchPendingCount = async () => {
    if (!isAdmin) return;
    
    try {
      const response = await fetch('/api/v1/channel-requests/pending-count', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setPendingCount(data.data.count);
      }
    } catch (error) {
      console.error('Failed to fetch pending count:', error);
    }
  };

  // Fetch full list of pending requests
  const fetchRequests = async () => {
    if (!isAdmin) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/v1/channel-requests?status=pending', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle approval
  const handleApprove = async (requestId: string) => {
    try {
      const response = await fetch(`/api/v1/channel-requests/${requestId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        // Remove from list and update count
        setRequests(prev => prev.filter(r => r.id !== requestId));
        setPendingCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  // Handle rejection
  const handleReject = async (requestId: string) => {
    const reason = prompt('Rejection reason (optional):');
    
    try {
      const response = await fetch(`/api/v1/channel-requests/${requestId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ rejectionReason: reason || 'Not approved' })
      });
      
      if (response.ok) {
        setRequests(prev => prev.filter(r => r.id !== requestId));
        setPendingCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  // Poll for new requests every 30 seconds
  useEffect(() => {
    if (isAdmin) {
      fetchPendingCount();
      const interval = setInterval(fetchPendingCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isAdmin]);

  // Load requests when dropdown opens
  useEffect(() => {
    if (isOpen && isAdmin) {
      fetchRequests();
    }
  }, [isOpen, isAdmin]);

  if (!isAdmin) return null;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9 p-0 relative"
      >
        <Bell className="h-4 w-4" />
        {pendingCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-bold">
            {pendingCount > 9 ? '9+' : pendingCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute right-0 top-full mt-2 w-96 max-h-[500px] overflow-y-auto rounded-lg border bg-card shadow-lg z-50">
            <div className="sticky top-0 bg-card border-b p-4 z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Channel Requests</h3>
                {pendingCount > 0 && (
                  <Badge variant="warning">{pendingCount} pending</Badge>
                )}
              </div>
            </div>

            <div className="p-2">
              {loading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Loading...
                </div>
              ) : requests.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No pending requests</p>
                </div>
              ) : (
                requests.map((request) => (
                  <div
                    key={request.id}
                    className="p-3 mb-2 rounded-lg border bg-card hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 flex-shrink-0">
                        <Radio className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                          By: {request.user.fullName}
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
                            variant="default"
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
                            <X className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {requests.length > 0 && (
              <div className="border-t p-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    window.location.href = '/admin/channels';
                    setIsOpen(false);
                  }}
                  className="w-full"
                >
                  View All Requests
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
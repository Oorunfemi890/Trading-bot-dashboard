/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/components/layout/Header/Header.tsx
// COMPLETE UPDATE: Integrated channel request modal with click-to-view
// ===================================================

import { useState, useEffect } from "react";
import {
  Bell,
  Moon,
  Sun,
  LogOut,
  User,
  Settings,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/common/Button/Button";
import { Badge } from "@/components/common/Badge/Badge";
import { useAuth, useTheme } from "@/hooks";
import { toast } from "sonner";
import React from "react";

// ✅ IMPORT THE NEW MODAL COMPONENT
const ChannelRequestDetailModal = React.lazy(
  () => import("./ChannelRequestDetailModal")
);

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [pendingCount, setPendingCount] = useState(0);

  // ✅ NEW: Modal state
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const isAdmin = user?.role === "admin" || user?.role === "super_admin";

  // Fetch notifications on mount
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

    const token = localStorage.getItem("access_token");
    if (!token) return;

    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsHost = window.location.host;
    const wsUrl = `${wsProtocol}//${wsHost}`;

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("✅ WebSocket connected");
        ws.send(JSON.stringify({ type: "auth", token }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (
            data.type === "channel_request_submitted" ||
            data.event === "channel:request:new"
          ) {
            fetchNotifications();
            toast.info(
              `New channel request: ${data.request?.channelTitle || "Unknown"}`,
              {
                duration: 5000,
              }
            );
          }

          if (
            data.type === "channel_request_processed" ||
            data.event === "channel:request:processed"
          ) {
            fetchNotifications();
          }
        } catch (error) {
          console.error("WebSocket message parse error:", error);
        }
      };

      return () => ws.close();
    } catch (error) {
      console.error("❌ WebSocket connection error:", error);
    }
  }, [isAdmin]);

  async function fetchNotifications() {
    try {
      const response = await fetch("/api/v1/channel-requests/admin/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!response.ok) return;

      const data = await response.json();

      if (data.success) {
        const allRequests = data.data || [];
        setNotifications(allRequests);

        const pending = allRequests.filter(
          (req: any) => req.status === "pending"
        );
        setPendingCount(pending.length);
      }
    } catch (error) {
      console.error("❌ Failed to fetch notifications:", error);
    }
  }

  // ✅ NEW: Handle clicking on a notification to view details
  function handleNotificationClick(request: any) {
    setSelectedRequest(request);
    setShowDetailModal(true);
    setShowNotifications(false); // Close notifications dropdown
  }

  // ✅ NEW: Handle approve with edited data
  async function handleApprove(requestId: string, editedData?: any) {
    try {
      const response = await fetch(
        `/api/v1/channel-requests/admin/${requestId}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ editedData }), // ✅ Send edited data
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(`✅ Channel "${data.data.channel.title}" approved!`);
        await fetchNotifications();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to approve channel");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  }

  // ✅ NEW: Handle reject
  async function handleReject(requestId: string, reason: string) {
    try {
      const response = await fetch(
        `/api/v1/channel-requests/admin/${requestId}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ rejectionReason: reason }),
        }
      );

      if (response.ok) {
        toast.success("Channel request rejected");
        await fetchNotifications();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to reject channel");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="warning" size="sm">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="success" size="sm">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" size="sm">
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b bg-card lg:left-64">
        <div className="flex h-full items-center justify-between px-4 md:px-6">
          {/* Left side - Menu button */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="h-9 w-9 p-0 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <h1 className="lg:hidden text-lg font-bold text-primary">
              Trading Bot
            </h1>
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
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
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
                      {pendingCount > 9 ? "9+" : pendingCount}
                    </span>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowNotifications(false)}
                    />

                    <div className="absolute right-0 top-full mt-2 w-[420px] max-w-[calc(100vw-2rem)] max-h-[600px] overflow-y-auto rounded-lg border bg-card shadow-xl z-50">
                      {/* Header */}
                      <div className="sticky top-0 bg-card border-b p-4 z-10">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">
                            Channel Requests
                          </h3>
                          <div className="flex items-center gap-2">
                            {pendingCount > 0 && (
                              <Badge variant="warning">
                                {pendingCount} pending
                              </Badge>
                            )}
                            <Badge variant="default">
                              {notifications.length} total
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Notifications List */}
                      <div className="p-2">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-muted-foreground">
                            <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No channel requests</p>
                          </div>
                        ) : (
                          notifications.map((request) => (
                            <button
                              key={request.id}
                              onClick={() => handleNotificationClick(request)} // ✅ CLICK TO VIEW DETAILS
                              className="w-full p-4 mb-2 rounded-lg border transition-colors hover:bg-accent text-left"
                            >
                              <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <div className="font-semibold truncate">
                                      {request.channelTitle}
                                    </div>
                                    {getStatusBadge(request.status)}
                                  </div>

                                  {request.channelUsername && (
                                    <div className="text-xs text-muted-foreground">
                                      @{request.channelUsername}
                                    </div>
                                  )}

                                  <div className="text-sm text-muted-foreground mt-2">
                                    By: {request.user?.fullName || "Unknown"}
                                  </div>

                                  <div className="text-xs text-muted-foreground mt-1">
                                    {new Date(
                                      request.createdAt
                                    ).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))
                        )}
                      </div>

                      {/* Footer */}
                      {notifications.length > 0 && (
                        <div className="border-t p-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              window.location.href = "/admin/channels";
                              setShowNotifications(false);
                            }}
                            fullWidth
                          >
                            View All in Channels Page
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
                <span className="text-sm hidden md:inline">
                  {user?.fullName}
                </span>
                <ChevronDown className="h-4 w-4 hidden md:block" />
              </Button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-card shadow-lg z-50">
                    <div className="p-3 border-b">
                      <p className="text-sm font-medium truncate">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                    </div>

                    <div className="p-1">
                      <button
                        onClick={() =>
                          (window.location.href = isAdmin
                            ? "/admin/profile"
                            : "/profile")
                        }
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                      <button
                        onClick={() =>
                          (window.location.href = isAdmin
                            ? "/admin/settings"
                            : "/settings")
                        }
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

      {/* ✅ NEW: Channel Request Detail Modal */}
      {showDetailModal && selectedRequest && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ChannelRequestDetailModal
            request={selectedRequest}
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setSelectedRequest(null);
            }}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </React.Suspense>
      )}
    </>
  );
}

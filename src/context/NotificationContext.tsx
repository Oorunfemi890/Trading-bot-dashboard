// ===================================================
// FILE: src/context/NotificationContext.tsx
// ===================================================

import { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'trade' | 'signal' | 'system' | 'admin';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      read: false,
      createdAt: new Date(),
    };

    setNotifications((prev) => [newNotification, ...prev]);

    // Show toast based on type
    switch (notification.type) {
      case 'trade':
        toast.success(notification.title, { description: notification.message });
        break;
      case 'signal':
        toast.info(notification.title, { description: notification.message });
        break;
      case 'system':
        toast.warning(notification.title, { description: notification.message });
        break;
      case 'admin':
        toast.info(notification.title, { description: notification.message });
        break;
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}
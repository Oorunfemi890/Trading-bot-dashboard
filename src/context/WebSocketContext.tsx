/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/immutability */
// ===================================================
// FILE: src/context/WebSocketContext.tsx
// ===================================================

import { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { toast } from 'sonner';
import { webSocketService } from '@/services/websocket/socket.service';
import { useAuth } from './AuthContext';

interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !socket) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [isAuthenticated]);

  function connect() {
    try {
      const newSocket = webSocketService.connect({
        onConnect: () => {
          setIsConnected(true);
          console.log('WebSocket connected');
        },
        onDisconnect: () => {
          setIsConnected(false);
          console.log('WebSocket disconnected');
        },
        onError: (error) => {
          console.error('WebSocket error:', error);
        },
        onTradeOpened: (data) => {
          toast.success(`Trade opened: ${data.trade.symbol}`);
        },
        onTradeBreakeven: (data) => {
          toast.info(`Breakeven activated: ${data.trade.symbol}`);
        },
        onTradeTakeProfit: (data) => {
          toast.success(`Take profit hit: ${data.trade.symbol}`);
        },
        onTradeStopLoss: (data) => {
          toast.error(`Stop loss hit: ${data.trade.symbol}`);
        },
        onTradeCompleted: (data) => {
          const profit = data.trade.netProfit;
          const message = profit > 0 ? 'Trade closed with profit!' : 'Trade closed';
          toast.success(message);
        },
        onSignalDetected: (data) => {
          toast.info(`New signal: ${data.signal.symbol}`);
        },
      });

      setSocket(newSocket);
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
    }
  }

  function disconnect() {
    if (socket) {
      webSocketService.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, connect, disconnect }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocket must be used within WebSocketProvider');
  return context;
}
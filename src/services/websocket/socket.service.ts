/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/services/websocket/socket.service.ts
// ===================================================

import { io, Socket } from 'socket.io-client';
import { API_CONFIG } from '@/config/api.config';
import { WEBSOCKET_EVENTS } from '@/config/constants';
import { tokenService } from '../storage/token.service';

export interface WebSocketEventHandlers {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
  onTradeOpened?: (data: any) => void;
  onTradeBreakeven?: (data: any) => void;
  onTradeTakeProfit?: (data: any) => void;
  onTradeStopLoss?: (data: any) => void;
  onTradeCompleted?: (data: any) => void;
  onSignalDetected?: (data: any) => void;
  onPositionUpdated?: (data: any) => void;
  onBalanceUpdate?: (data: any) => void;
  onSystemNotification?: (data: any) => void;
  onAdminNotification?: (data: any) => void;
  onAdminNewUser?: (data: any) => void;
  onAdminMetrics?: (data: any) => void;
}

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  /**
   * Connect to WebSocket server
   */
  connect(handlers?: WebSocketEventHandlers): Socket {
    const token = tokenService.getAccessToken();

    if (!token) {
      throw new Error('No authentication token found');
    }

    this.socket = io(API_CONFIG.WS_URL, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
    });

    this.setupEventHandlers(handlers);

    return this.socket;
  }

  /**
   * Setup event handlers
   */
  private setupEventHandlers(handlers?: WebSocketEventHandlers) {
    if (!this.socket) return;

    // Connection events
    this.socket.on(WEBSOCKET_EVENTS.CONNECT, () => {
      console.log('✅ WebSocket connected');
      this.reconnectAttempts = 0;
      handlers?.onConnect?.();
    });

    this.socket.on(WEBSOCKET_EVENTS.DISCONNECT, () => {
      console.log('❌ WebSocket disconnected');
      handlers?.onDisconnect?.();
    });

    this.socket.on(WEBSOCKET_EVENTS.ERROR, (error: Error) => {
      console.error('WebSocket error:', error);
      handlers?.onError?.(error);
    });

    this.socket.on(WEBSOCKET_EVENTS.CONNECTED, (data: any) => {
      console.log('WebSocket connected:', data);
    });

    // Trade events
    this.socket.on(WEBSOCKET_EVENTS.TRADE_OPENED, (data: any) => {
      handlers?.onTradeOpened?.(data);
    });

    this.socket.on(WEBSOCKET_EVENTS.TRADE_BREAKEVEN, (data: any) => {
      handlers?.onTradeBreakeven?.(data);
    });

    this.socket.on(WEBSOCKET_EVENTS.TRADE_TAKEPROFIT, (data: any) => {
      handlers?.onTradeTakeProfit?.(data);
    });

    this.socket.on(WEBSOCKET_EVENTS.TRADE_STOPLOSS, (data: any) => {
      handlers?.onTradeStopLoss?.(data);
    });

    this.socket.on(WEBSOCKET_EVENTS.TRADE_COMPLETED, (data: any) => {
      handlers?.onTradeCompleted?.(data);
    });

    // Signal events
    this.socket.on(WEBSOCKET_EVENTS.SIGNAL_DETECTED, (data: any) => {
      handlers?.onSignalDetected?.(data);
    });

    // Position events
    this.socket.on(WEBSOCKET_EVENTS.POSITION_UPDATED, (data: any) => {
      handlers?.onPositionUpdated?.(data);
    });

    // Account events
    this.socket.on(WEBSOCKET_EVENTS.ACCOUNT_BALANCE, (data: any) => {
      handlers?.onBalanceUpdate?.(data);
    });

    // System events
    this.socket.on(WEBSOCKET_EVENTS.SYSTEM_NOTIFICATION, (data: any) => {
      handlers?.onSystemNotification?.(data);
    });

    // Admin events
    this.socket.on(WEBSOCKET_EVENTS.ADMIN_NOTIFICATION, (data: any) => {
      handlers?.onAdminNotification?.(data);
    });

    this.socket.on(WEBSOCKET_EVENTS.ADMIN_NEW_USER, (data: any) => {
      handlers?.onAdminNewUser?.(data);
    });

    this.socket.on(WEBSOCKET_EVENTS.ADMIN_METRICS, (data: any) => {
      handlers?.onAdminMetrics?.(data);
    });
  }

  /**
   * Subscribe to a channel
   */
  subscribe(channel: string): void {
    if (!this.socket) return;
    this.socket.emit('subscribe', channel);
  }

  /**
   * Unsubscribe from a channel
   */
  unsubscribe(channel: string): void {
    if (!this.socket) return;
    this.socket.emit('unsubscribe', channel);
  }

  /**
   * Send ping
   */
  ping(): void {
    if (!this.socket) return;
    this.socket.emit('ping');
  }

  /**
   * Disconnect
   */
  disconnect(): void {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
  }

  /**
   * Get socket instance
   */
  getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const webSocketService = new WebSocketService();
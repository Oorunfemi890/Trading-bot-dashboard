/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/services/websocket/socket.handlers.ts
// ===================================================

import type { WebSocketEventHandlers } from './socket.service';

/**
 * Create default WebSocket event handlers
 */
export function createDefaultHandlers(): WebSocketEventHandlers {
  return {
    onConnect: () => {
      console.log('WebSocket connected');
    },

    onDisconnect: () => {
      console.log('WebSocket disconnected');
    },

    onError: (error: Error) => {
      console.error('WebSocket error:', error);
    },

    onTradeOpened: (data: any) => {
      console.log('Trade opened:', data);
      // Show notification
    },

    onTradeBreakeven: (data: any) => {
      console.log('Breakeven activated:', data);
      // Show notification
    },

    onTradeTakeProfit: (data: any) => {
      console.log('Take profit hit:', data);
      // Show notification
    },

    onTradeStopLoss: (data: any) => {
      console.log('Stop loss hit:', data);
      // Show notification
    },

    onTradeCompleted: (data: any) => {
      console.log('Trade completed:', data);
      // Show notification
    },

    onSignalDetected: (data: any) => {
      console.log('Signal detected:', data);
      // Show notification
    },

    onPositionUpdated: (data: any) => {
      console.log('Position updated:', data);
    },

    onBalanceUpdate: (data: any) => {
      console.log('Balance updated:', data);
    },

    onSystemNotification: (data: any) => {
      console.log('System notification:', data);
      // Show notification
    },

    onAdminNotification: (data: any) => {
      console.log('Admin notification:', data);
      // Show admin notification
    },

    onAdminNewUser: (data: any) => {
      console.log('New user registered:', data);
      // Show admin notification
    },

    onAdminMetrics: (data: any) => {
      console.log('System metrics:', data);
      // Update admin dashboard
    },
  };
}
import { useEffect, useRef } from 'react';
import { useWebSocket } from '@/context/WebSocketContext';

export const TRADE_EVENTS = [
  'trade:opened', 'trade:breakeven', 'trade:takeprofit',
  'trade:stoploss', 'trade:completed', 'position:updated',
] as const;

export type TradeEventName = (typeof TRADE_EVENTS)[number];

export interface TradeEventPayload {
  type?: string;
  trade?: { id?: string; symbol?: string; netProfit?: number } & Record<string, unknown>;
  position?: Record<string, unknown>;
  tpLevel?: number;
  timestamp?: string;
}

// Cleanup removes ONLY our handlers. socket.off('event') with no handler would
// also remove the app-wide toast handlers registered in WebSocketContext.
export function useTradeEvents(
  onEvent: (event: TradeEventName, payload: TradeEventPayload) => void
): void {
  const { socket, isConnected } = useWebSocket();
  const callbackRef = useRef(onEvent);
  useEffect(() => { callbackRef.current = onEvent; });

  useEffect(() => {
    if (!socket || !isConnected) return;
    const registered = TRADE_EVENTS.map((name) => {
      const handler = (payload: TradeEventPayload) => callbackRef.current(name, payload ?? {});
      socket.on(name, handler);
      return { name, handler };
    });
    return () => { registered.forEach(({ name, handler }) => socket.off(name, handler)); };
  }, [socket, isConnected]);
}
// FILE: src/utils/trade.util.ts
import { Trade, Position, TradeDirection } from '@/types';

export function calculateAverageEntry(trade: Trade): number {
  if (!trade.entryPrices.length) return 0;
  
  const sum = trade.entryPrices.reduce((acc, entry) => acc + entry.price, 0);
  return sum / trade.entryPrices.length;
}

export function calculateProfitPips(
  direction: TradeDirection,
  entry: number,
  exit: number
): number {
  const diff = direction === TradeDirection.BUY ? exit - entry : entry - exit;
  return Math.round(diff / 0.0001); // For forex pairs
}

export function getPositionProfit(position: Position): number {
  if (!position.closedPrice || position.status !== 'closed') return 0;
  return position.profit;
}
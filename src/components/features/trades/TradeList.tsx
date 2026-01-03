/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/components/features/trades/TradeList.tsx
// ===================================================

import { useState } from 'react';
import { TradeCard } from './TradeCard';
import { TradeDetails } from './TradeDetails';
import { EmptyState } from '@/components/common/EmptyState/EmptyState';
import { Modal } from '@/components/common/Modal/Modal';
import { TrendingUp, Filter } from 'lucide-react';

interface Trade {
  id: string;
  symbol: string;
  direction: 'buy' | 'sell';
  status: string;
  totalPositions: number;
  positionsFilled: number;
  netProfit: number;
  grossProfit: number;
  stopLoss: number;
  breakevenActivated: boolean;
  openedAt: string;
  closedAt?: string;
  signal: {
    channel: {
      title: string;
    };
  };
  positions: Array<{
    id: string;
    positionNumber: number;
    entryPrice: number;
    closedPrice?: number;
    profit: number;
    status: string;
    closeReason?: string;
  }>;
}

interface TradeListProps {
  trades: Trade[];
  onRefresh: () => void;
}

export function TradeList({ trades, onRefresh }: TradeListProps) {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleTradeClick = (trade: Trade) => {
    setSelectedTrade(trade);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrade(null);
  };

  if (!trades || trades.length === 0) {
    return (
      <EmptyState
        icon={TrendingUp}
        title="No trades yet"
        description="Your trading history will appear here once you start trading"
      />
    );
  }

  return (
    <>
      {/* Trades Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trades.map((trade) => (
          <TradeCard
            key={trade.id}
            trade={trade}
            onClick={() => handleTradeClick(trade)}
          />
        ))}
      </div>

      {/* Trade Details Modal */}
      {selectedTrade && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title="Trade Details"
          size="large"
        >
          <TradeDetails
            trade={selectedTrade}
            onClose={handleCloseModal}
            onRefresh={onRefresh}
          />
        </Modal>
      )}
    </>
  );
}
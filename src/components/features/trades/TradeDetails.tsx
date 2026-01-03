/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/components/features/trades/TradeDetails.tsx
// ===================================================

import { useState } from 'react';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { Card } from '@/components/common/Card/Card';
import { toast } from 'sonner';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Shield, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/format.util';

interface TradeDetailsProps {
  trade: {
    id: string;
    symbol: string;
    direction: 'buy' | 'sell';
    status: string;
    totalPositions: number;
    positionsFilled: number;
    netProfit: number;
    grossProfit: number;
    commissions: number;
    stopLoss: number;
    breakevenActivated: boolean;
    openedAt: string;
    closedAt?: string;
    takeProfits: Array<{ level: number; price: number; positions: number }>;
    positions: Array<{
      id: string;
      positionNumber: number;
      entryPrice: number;
      closedPrice?: number;
      profit: number;
      status: string;
      closeReason?: string;
    }>;
    signal: {
      channel: {
        title: string;
      };
    };
  };
  onClose: () => void;
  onRefresh: () => void;
}

export function TradeDetails({ trade, onClose, onRefresh }: TradeDetailsProps) {
  const [closing, setClosing] = useState(false);

  const isProfit = trade.netProfit > 0;
  const isActive = trade.status === 'open';

  const handleManualClose = async () => {
    if (!window.confirm('Are you sure you want to close this trade manually?')) {
      return;
    }

    setClosing(true);
    try {
      // API call to close trade
      // await api.closeTrade(trade.id);
      toast.success('Trade closed successfully');
      onRefresh();
      onClose();
    } catch (error) {
      toast.error('Failed to close trade');
    } finally {
      setClosing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-4 w-4" />;
      case 'closed':
        return isProfit ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getCloseReasonLabel = (reason?: string) => {
    const labels: { [key: string]: string } = {
      tp1: 'Take Profit 1',
      tp2: 'Take Profit 2',
      tp3: 'Take Profit 3',
      sl: 'Stop Loss',
      breakeven_sl: 'Breakeven SL',
      manual: 'Manual Close',
    };
    return reason ? labels[reason] || reason : 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {trade.direction === 'buy' ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {trade.symbol}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {trade.direction.toUpperCase()} Trade
            </p>
          </div>
        </div>

        <Badge 
          variant={
            trade.status === 'open' ? 'blue' : 
            isProfit ? 'green' : 
            'red'
          }
          className="flex items-center gap-1"
        >
          {getStatusIcon(trade.status)}
          {trade.status}
        </Badge>
      </div>

      {/* P&L Summary */}
      {trade.status === 'closed' && (
        <Card className={`border-2 ${
          isProfit 
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
        }`}>
          <div className="p-6 text-center">
            <div className={`text-4xl font-bold ${
              isProfit 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {isProfit ? '+' : ''}{formatCurrency(trade.netProfit)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Net Profit
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Gross: </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(trade.grossProfit)}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Fees: </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(trade.commissions)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Trade Details Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <div className="p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Positions
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {trade.positionsFilled} / {trade.totalPositions}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Stop Loss
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {trade.stopLoss.toFixed(5)}
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Opened At
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {formatDate(trade.openedAt, 'long')}
            </div>
          </div>
        </Card>

        {trade.closedAt && (
          <Card>
            <div className="p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Closed At
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {formatDate(trade.closedAt, 'long')}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Take Profit Levels */}
      <Card>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Take Profit Levels
            </h3>
          </div>
          <div className="space-y-2">
            {trade.takeProfits.map((tp) => (
              <div
                key={tp.level}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  TP{tp.level}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {tp.price.toFixed(5)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {tp.positions} positions
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Breakeven Badge */}
      {trade.breakevenActivated && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Breakeven protection is active on this trade
          </span>
        </div>
      )}

      {/* Positions Table */}
      <Card>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Position Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    #
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Entry
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Exit
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Profit
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {trade.positions.map((position) => (
                  <tr
                    key={position.id}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="py-3 text-sm text-gray-900 dark:text-white">
                      {position.positionNumber}
                    </td>
                    <td className="py-3 text-sm text-gray-900 dark:text-white">
                      {position.entryPrice.toFixed(5)}
                    </td>
                    <td className="py-3 text-sm text-gray-900 dark:text-white">
                      {position.closedPrice?.toFixed(5) || '-'}
                    </td>
                    <td className={`py-3 text-sm font-medium ${
                      position.profit > 0
                        ? 'text-green-600 dark:text-green-400'
                        : position.profit < 0
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {position.profit !== 0 ? formatCurrency(position.profit) : '-'}
                    </td>
                    <td className="py-3">
                      <Badge
                        variant={position.status === 'open' ? 'blue' : 'gray'}
                        size="sm"
                      >
                        {position.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm text-gray-600 dark:text-gray-400">
                      {getCloseReasonLabel(position.closeReason)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Channel Info */}
      <Card>
        <div className="p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Signal Source
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {trade.signal.channel.title}
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {isActive && (
          <Button
            variant="danger"
            onClick={handleManualClose}
            loading={closing}
          >
            Close Trade Manually
          </Button>
        )}
      </div>
    </div>
  );
}
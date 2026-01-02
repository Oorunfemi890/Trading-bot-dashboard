/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/pages/user/TradesPage.tsx
// ===================================================

import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { Pagination } from '@/components/common/Pagination/Pagination';
import { useTrades } from '@/hooks';
import { formatDate, formatCurrency } from '@/utils';

export default function TradesPage() {
  const { trades, loading, total, page, setPage } = useTrades();

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trades</h1>
        <p className="text-muted-foreground mt-2">View your trading history</p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Direction</TableHead>
              <TableHead>Positions</TableHead>
              <TableHead>Net Profit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Opened</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="font-medium">{trade.symbol}</TableCell>
                <TableCell>
                  <Badge variant={trade.direction === 'buy' ? 'success' : 'destructive'}>
                    {trade.direction.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {trade.positionsFilled} / {trade.totalPositions}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      trade.netProfit > 0
                        ? 'text-success'
                        : trade.netProfit < 0
                        ? 'text-destructive'
                        : ''
                    }
                  >
                    {formatCurrency(trade.netProfit)}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      trade.status === 'open'
                        ? 'info'
                        : trade.status === 'closed'
                        ? 'default'
                        : 'warning'
                    }
                  >
                    {trade.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {trade.openedAt ? formatDate(trade.openedAt) : 'Pending'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
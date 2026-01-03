// ===================================================
// FILE: src/components/features/settings/TradingAccountForm.tsx
// ===================================================

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';
import { toast } from 'sonner';
import { Wallet, Save, Plus } from 'lucide-react';

export function TradingAccountForm() {
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState({
    broker: 'MetaTrader 5',
    accountNumber: '',
    balance: 0,
    leverage: 100,
  });

  const brokerOptions = [
    { value: 'MetaTrader 5', label: 'MetaTrader 5' },
    { value: 'MetaTrader 4', label: 'MetaTrader 4' },
    { value: 'cTrader', label: 'cTrader' },
  ];

  const leverageOptions = [
    { value: '50', label: '1:50' },
    { value: '100', label: '1:100' },
    { value: '200', label: '1:200' },
    { value: '500', label: '1:500' },
  ];

  async function handleSave() {
    setLoading(true);
    try {
      // API call to save trading account
      toast.success('Trading account updated successfully');
    } catch (error) {
      toast.error('Failed to update trading account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Trading Account Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Broker Platform"
              value={accountData.broker}
              onChange={(e) =>
                setAccountData({ ...accountData, broker: e.target.value })
              }
              options={brokerOptions}
            />

            <Input
              label="Account Number"
              placeholder="12345678"
              value={accountData.accountNumber}
              onChange={(e) =>
                setAccountData({ ...accountData, accountNumber: e.target.value })
              }
            />

            <Input
              label="Account Balance"
              type="number"
              placeholder="10000"
              value={accountData.balance}
              onChange={(e) =>
                setAccountData({
                  ...accountData,
                  balance: Number(e.target.value),
                })
              }
            />

            <Select
              label="Leverage"
              value={accountData.leverage.toString()}
              onChange={(e) =>
                setAccountData({
                  ...accountData,
                  leverage: Number(e.target.value),
                })
              }
              options={leverageOptions}
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Connection Status</p>
                <p className="text-sm text-muted-foreground">
                  Configure your MetaTrader account details
                </p>
              </div>
              <Button
                variant="outline"
                leftIcon={<Plus className="h-4 w-4" />}
              >
                Test Connection
              </Button>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button
              variant="primary"
              onClick={handleSave}
              loading={loading}
              leftIcon={<Save className="h-4 w-4" />}
            >
              Save Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connection Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>To connect your trading account:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Open your MetaTrader platform</li>
              <li>Go to Tools → Options → Expert Advisors</li>
              <li>Enable "Allow automated trading"</li>
              <li>Restart MetaTrader</li>
              <li>Enter your account credentials above</li>
            </ol>
            <div className="mt-4 p-3 bg-warning/10 border border-warning rounded-lg">
              <p className="text-xs text-warning-foreground">
                ⚠️ Never share your MetaTrader login credentials with anyone.
                We only need your account number for verification.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
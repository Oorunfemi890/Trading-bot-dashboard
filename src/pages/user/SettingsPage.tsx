/* eslint-disable @typescript-eslint/no-unused-vars */


// ===================================================
// FILE: src/pages/user/SettingsPage.tsx
// ===================================================

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Tabs } from '@/components/common/Tabs/Tabs';
import { userService } from '@/services/api';
import { toast } from 'sonner';
import type { UserSettings } from '@/types';

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const data = await userService.getSettings();
      setSettings(data);
    } catch (error) {
      toast.error('Failed to load settings');
    }
  }

  async function handleSave() {
    if (!settings) return;

    try {
      setLoading(true);
      await userService.updateSettings(settings);
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  }

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your trading preferences</p>
      </div>

      <Tabs
        tabs={[
          {
            label: 'Risk Management',
            value: 'risk',
            content: (
              <Card>
                <div className="space-y-4">
                  <Input
                    label="Balance Usage (%)"
                    type="number"
                    value={settings.balanceUsagePercentage}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        balanceUsagePercentage: Number(e.target.value),
                      })
                    }
                  />

                  <Input
                    label="Positions Per Trade"
                    type="number"
                    value={settings.positionsPerTrade}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        positionsPerTrade: Number(e.target.value),
                      })
                    }
                  />

                  <Input
                    label="Max Concurrent Trades"
                    type="number"
                    value={settings.maxConcurrentTrades}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maxConcurrentTrades: Number(e.target.value),
                      })
                    }
                  />

                  <Button onClick={handleSave} loading={loading}>
                    Save Changes
                  </Button>
                </div>
              </Card>
            ),
          },
          {
            label: 'Notifications',
            value: 'notifications',
            content: (
              <Card>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive email alerts for trades
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailNotificationsEnabled}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          emailNotificationsEnabled: e.target.checked,
                        })
                      }
                      className="h-4 w-4"
                    />
                  </div>

                  <Button onClick={handleSave} loading={loading}>
                    Save Changes
                  </Button>
                </div>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}
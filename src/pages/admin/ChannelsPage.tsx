/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/pages/admin/ChannelsPage.tsx
// ===================================================

import { useState, useEffect } from 'react';
import { Plus, Radio, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { Modal } from '@/components/common/Modal/Modal';
import { Input } from '@/components/common/Input/Input';
import { channelService } from '@/services/api';
import { toast } from 'sonner';
import type { TelegramChannel } from '@/types';

export default function AdminChannelsPage() {
  const [channels, setChannels] = useState<TelegramChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    channelId: '',
    username: '',
    title: '',
    description: '',
    telegramLink: '',
    telegramName: '',
  });

  useEffect(() => {
    fetchChannels();
  }, []);

  async function fetchChannels() {
    try {
      const data = await channelService.getChannels();
      setChannels(data);
    } catch (error) {
      toast.error('Failed to load channels');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddChannel() {
    try {
      if (!formData.channelId.trim()) {
        toast.error('Channel ID is required');
        return;
      }

      if (!formData.title.trim()) {
        toast.error('Channel title is required');
        return;
      }

      await channelService.addChannel({
        channelId: formData.channelId.trim(),
        username: formData.username.trim() || undefined,
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        telegramLink: formData.telegramLink.trim() || undefined,
        telegramName: formData.telegramName.trim() || undefined,
      });

      toast.success('Channel added successfully');
      setShowAddModal(false);
      setFormData({
        channelId: '',
        username: '',
        title: '',
        description: '',
        telegramLink: '',
        telegramName: '',
      });
      fetchChannels();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add channel');
    }
  }

  async function toggleChannelStatus(id: string, currentStatus: boolean) {
    try {
      await channelService.updateChannel(id, { isActive: !currentStatus });
      toast.success(`Channel ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchChannels();
    } catch (error) {
      toast.error('Failed to update channel');
    }
  }

  async function deleteChannel(id: string) {
    if (!confirm('Are you sure you want to delete this channel?')) return;

    try {
      await channelService.deleteChannel(id);
      toast.success('Channel deleted successfully');
      fetchChannels();
    } catch (error) {
      toast.error('Failed to delete channel');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Telegram Channels</h1>
          <p className="text-muted-foreground mt-2">
            Manage signal channels for your trading bot
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Channel
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Signals</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channels.map((channel) => {
                const successRate = channel.totalSignals > 0
                  ? ((channel.successfulSignals / channel.totalSignals) * 100).toFixed(1)
                  : '0.0';

                return (
                  <TableRow key={channel.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Radio className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{channel.title}</p>
                          {channel.description && (
                            <p className="text-xs text-muted-foreground">
                              {channel.description.substring(0, 50)}...
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {channel.username ? (
                        <span className="font-mono text-sm">@{channel.username}</span>
                      ) : (
                        <span className="text-muted-foreground text-sm">Private</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-semibold">{channel.totalSignals}</p>
                        <p className="text-muted-foreground">total</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="bg-success h-2 rounded-full"
                            style={{ width: `${successRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{successRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={channel.isActive ? 'success' : 'destructive'}>
                        {channel.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleChannelStatus(channel.id, channel.isActive)}
                          className="h-8 w-8 p-0"
                          title={channel.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {channel.isActive ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteChannel(channel.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Channel Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Telegram Channel"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddChannel}>Add Channel</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Channel ID"
            placeholder="-1001234567890"
            value={formData.channelId}
            onChange={(e) => setFormData({ ...formData, channelId: e.target.value })}
            helperText="The numeric ID of the Telegram channel (required)"
            required
          />

          <Input
            label="Channel Title"
            placeholder="Premium Forex Signals"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            helperText="Display name for the channel (required)"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Username"
              placeholder="premium_signals"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              helperText="Channel handle (optional)"
            />

            <Input
              label="Telegram Name"
              placeholder="@PremiumSignals"
              value={formData.telegramName}
              onChange={(e) => setFormData({ ...formData, telegramName: e.target.value })}
              helperText="Display name with @ (optional)"
            />
          </div>

          <Input
            label="Telegram Link"
            placeholder="https://t.me/premium_signals"
            value={formData.telegramLink}
            onChange={(e) => setFormData({ ...formData, telegramLink: e.target.value })}
            helperText="Full t.me link (optional)"
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Description (optional)
            </label>
            <textarea
              placeholder="Channel description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            The bot will automatically fetch additional channel details if available.
          </p>
        </div>
      </Modal>
    </div>
  );
}
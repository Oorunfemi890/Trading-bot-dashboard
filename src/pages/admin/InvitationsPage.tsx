/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/pages/admin/InvitationsPage.tsx
// UPDATE: Added eye icon to view invitation details
// ===================================================

import { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/common/Table/Table';
import { useInvitations } from '@/hooks';
import { formatDate, formatCurrency } from '@/utils';
import { Modal } from '@/components/common/Modal/Modal';
import { Input } from '@/components/common/Input/Input';
import { InvitationDetailModal } from '@/components/features/admin/InvitationDetailModal';

export default function InvitationsPage() {
  const { invitations, loading, createInvitation } = useInvitations();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const [formData, setFormData] = useState({
    tier: 'starter',
    price: 29,
    maxUses: 1,
    expiryDays: 30,
    customerEmail: '',
  });

  async function handleCreate() {
    try {
      await createInvitation(formData as any);
      setShowCreateModal(false);
    } catch (error) {
      // Error handled by hook with toast
    }
  }

  function handleViewDetails(invitation: any) {
    setSelectedInvitation(invitation);
    setShowDetailModal(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invitations</h1>
          <p className="text-muted-foreground mt-2">Manage invitation codes</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Invitation
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Uses</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitations.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-mono">{inv.code}</TableCell>
                <TableCell className="capitalize">{inv.tier}</TableCell>
                <TableCell>{formatCurrency(inv.price)}</TableCell>
                <TableCell>{inv.currentUses} / {inv.maxUses}</TableCell>
                <TableCell>
                  <Badge variant={inv.status === 'active' ? 'success' : 'default'}>
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(inv.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(inv)}
                    className="h-8 w-8 p-0"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Invitation"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Price ($)"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          />
          <Input
            label="Max Uses"
            type="number"
            value={formData.maxUses}
            onChange={(e) => setFormData({ ...formData, maxUses: Number(e.target.value) })}
          />
          <Input
            label="Expiry Days"
            type="number"
            value={formData.expiryDays}
            onChange={(e) => setFormData({ ...formData, expiryDays: Number(e.target.value) })}
          />
          <Input
            label="Customer Email (optional)"
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
          />
        </div>
      </Modal>

      {/* Detail Modal */}
      <InvitationDetailModal
        invitation={selectedInvitation}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  );
}
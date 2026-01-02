// ===================================================
// FILE: src/components/features/admin/SuperAdminControls.tsx (NEW)
// ===================================================
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Badge } from '@/components/common/Badge/Badge';
import { Modal } from '@/components/common/Modal/Modal';
import { Shield, UserPlus, ChevronDown, ChevronUp } from 'lucide-react';
import { adminService } from '@/services/api';
import { toast } from 'sonner';
import type { User } from '@/types';

interface SuperAdminControlsProps {
  user: User;
  onUpdate: () => void;
}

export function SuperAdminControls({ user, onUpdate }: SuperAdminControlsProps) {
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showDemoteModal, setShowDemoteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAdmin = user.role === 'admin' || user.role === 'super_admin';
  const canPromote = user.role === 'user';
  const canDemote = user.role === 'admin';

  async function handlePromote() {
    try {
      setLoading(true);
      await adminService.promoteToAdmin(user.id);
      toast.success(`${user.fullName} promoted to Admin`);
      setShowPromoteModal(false);
      onUpdate();
    } catch (error) {
      toast.error('Failed to promote user');
    } finally {
      setLoading(false);
    }
  }

  async function handleDemote() {
    try {
      setLoading(true);
      await adminService.demoteToUser(user.id);
      toast.success(`${user.fullName} demoted to User`);
      setShowDemoteModal(false);
      onUpdate();
    } catch (error) {
      toast.error('Failed to demote admin');
    } finally {
      setLoading(false);
    }
  }

  if (user.role === 'super_admin') {
    return (
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Super Admin accounts cannot be modified</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Controls
            <Badge variant="warning" className="ml-auto">
              Super Admin Only
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current Role</p>
              <p className="text-sm text-muted-foreground capitalize">
                {user.role.replace('_', ' ')}
              </p>
            </div>
            <Badge variant={isAdmin ? 'info' : 'default'} className="capitalize">
              {user.role.replace('_', ' ')}
            </Badge>
          </div>

          <div className="flex gap-2 pt-2">
            {canPromote && (
              <Button
                onClick={() => setShowPromoteModal(true)}
                variant="default"
                className="flex-1"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Promote to Admin
              </Button>
            )}

            {canDemote && (
              <Button
                onClick={() => setShowDemoteModal(true)}
                variant="outline"
                className="flex-1"
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Demote to User
              </Button>
            )}
          </div>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Only Super Admins can promote users to Admin or demote Admins to Users.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Promote Modal */}
      <Modal
        isOpen={showPromoteModal}
        onClose={() => setShowPromoteModal(false)}
        title="Promote to Admin"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowPromoteModal(false)}>
              Cancel
            </Button>
            <Button onClick={handlePromote} loading={loading}>
              Confirm Promotion
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-warning/10 border border-warning rounded-lg">
            <p className="text-sm font-medium">⚠️ Important</p>
            <p className="text-sm text-muted-foreground mt-1">
              You are about to promote <strong>{user.fullName}</strong> to Admin. This will grant them access to:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4 list-disc">
              <li>User management</li>
              <li>Invitation management</li>
              <li>System analytics</li>
              <li>Channel management</li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to proceed with this action?
          </p>
        </div>
      </Modal>

      {/* Demote Modal */}
      <Modal
        isOpen={showDemoteModal}
        onClose={() => setShowDemoteModal(false)}
        title="Demote to User"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowDemoteModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleDemote} loading={loading} variant="destructive">
              Confirm Demotion
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-sm font-medium">⚠️ Warning</p>
            <p className="text-sm text-muted-foreground mt-1">
              You are about to demote <strong>{user.fullName}</strong> from Admin to User. They will lose access to:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4 list-disc">
              <li>Admin dashboard</li>
              <li>User management</li>
              <li>Invitation management</li>
              <li>System analytics</li>
              <li>All admin privileges</li>
            </ul>
          </div>

          <p className="text-sm text-muted-foreground">
            This action cannot be undone without Super Admin approval.
          </p>
        </div>
      </Modal>
    </>
  );
}
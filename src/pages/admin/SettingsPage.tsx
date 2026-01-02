// ===================================================
// FILE: src/pages/admin/SettingsPage.tsx (NEW)
// ===================================================
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Tabs } from '@/components/common/Tabs/Tabs';
import { useAuth, useTheme } from '@/hooks';
import { toast } from 'sonner';
import { User, Lock, Moon, Sun, Monitor, Bell } from 'lucide-react';

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  async function handlePasswordChange() {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement password change API
      // await authService.changePassword(passwordData);
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings</p>
      </div>

      <Tabs
        tabs={[
          {
            label: 'Profile',
            value: 'profile',
            content: (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Full Name"
                      value={user?.fullName || ''}
                      disabled
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Role"
                      value={user?.role || ''}
                      disabled
                    />
                    <Input
                      label="Status"
                      value={user?.status || ''}
                      disabled
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      To update your profile information, please contact a Super Admin.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ),
          },
          {
            label: 'Security',
            value: 'security',
            content: (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                  />

                  <Input
                    label="New Password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    helperText="Must be at least 8 characters with uppercase, lowercase, number and special character"
                  />

                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                  />

                  <Button onClick={handlePasswordChange} loading={loading}>
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            ),
          },
          {
            label: 'Appearance',
            value: 'appearance',
            content: (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Theme Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-3">Choose your theme</p>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          theme === 'light'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Sun className="h-6 w-6" />
                        <span className="text-sm font-medium">Light</span>
                      </button>

                      <button
                        onClick={() => setTheme('dark')}
                        className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          theme === 'dark'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Moon className="h-6 w-6" />
                        <span className="text-sm font-medium">Dark</span>
                      </button>

                      <button
                        onClick={() => setTheme('system')}
                        className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                          theme === 'system'
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Monitor className="h-6 w-6" />
                        <span className="text-sm font-medium">System</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ),
          },
          {
            label: 'Notifications',
            value: 'notifications',
            content: (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about system updates
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New User Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new users register
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Trade Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Notifications for trade activities
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Critical system notifications
                        </p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-4 w-4" />
                    </div>
                  </div>

                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
}
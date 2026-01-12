// FILE: src/pages/user/ProfilePage.tsx
// =============================================
// User Profile Management Page
// =============================================

import { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Badge } from '@/components/common/Badge/Badge';
import { Spinner } from '@/components/common/Spinner/Spinner';
import { useAuth } from '@/context/AuthContext';
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, 
  Award, Save, Lock, CheckCircle 
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        country: user.country || '',
        city: user.city || '',
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // API call to update profile
      const response = await fetch('/api/v1/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/v1/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (response.ok) {
        alert('Password changed successfully!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordChange(false);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your personal information and account security
        </p>
      </div>

      {/* Profile Summary Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="p-6">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-white text-4xl font-bold">
              {user.fullName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {user.fullName}
              </h2>
              <p className="text-blue-700 dark:text-blue-300 mt-1">
                {user.email}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge variant={user.tier === 'free' ? 'gray' : 'blue'}>
                  {user.tier?.toUpperCase()}
                </Badge>
                <Badge variant={user.emailVerified ? 'success' : 'warning'}>
                  {user.emailVerified ? 'Verified' : 'Unverified'}
                </Badge>
                <Badge variant={user.status === 'active' ? 'success' : 'gray'}>
                  {user.status?.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Account Information */}
      <Card>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Account Information
            </h3>
            {user.emailVerified && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Verified Account</span>
              </div>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </label>
              <Input
                value={profile.email}
                disabled
                className="bg-gray-100 dark:bg-gray-900/50 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </label>
              <Input
                value={profile.fullName}
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </label>
              <Input
                type="tel"
                value={profile.phoneNumber}
                onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Country
              </label>
              <Input
                value={profile.country}
                onChange={(e) => setProfile({...profile, country: e.target.value})}
                placeholder="United States"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                City
              </label>
              <Input
                value={profile.city}
                onChange={(e) => setProfile({...profile, city: e.target.value})}
                placeholder="New York"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Member Since
              </label>
              <Input
                value={new Date(user.createdAt).toLocaleDateString()}
                disabled
                className="bg-gray-100 dark:bg-gray-900/50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button
              variant="primary"
              onClick={handleSaveProfile}
              loading={isSaving}
              leftIcon={<Save className="h-4 w-4" />}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Card>

      {/* Account Security */}
      <Card>
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Security
          </h3>

          {!showPasswordChange ? (
            <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last changed on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowPasswordChange(true)}
              >
                Change Password
              </Button>
            </div>
          ) : (
            <div className="space-y-4 p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
              <Input
                type="password"
                label="Current Password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                placeholder="Enter current password"
              />
              <Input
                type="password"
                label="New Password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                placeholder="Enter new password (min 8 characters)"
              />
              <Input
                type="password"
                label="Confirm New Password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
              />
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPasswordChange(false);
                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleChangePassword}
                  loading={isSaving}
                  leftIcon={<Lock className="h-4 w-4" />}
                >
                  Update Password
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Subscription Information */}
      <Card>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-5 w-5" />
            Subscription Details
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Plan</p>
              <p className="text-xl font-bold mt-1">{user.tier?.toUpperCase()}</p>
            </div>
            <div className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
              <p className="text-xl font-bold mt-1">
                {user.status === 'active' ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">Expires</p>
              <p className="text-xl font-bold mt-1">
                {user.subscriptionExpiresAt 
                  ? new Date(user.subscriptionExpiresAt).toLocaleDateString()
                  : 'Never'
                }
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
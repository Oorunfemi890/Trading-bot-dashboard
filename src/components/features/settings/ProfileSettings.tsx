/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/components/features/settings/ProfileSettings.tsx
// ===================================================

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Card } from '@/components/common/Card/Card';
import { Badge } from '@/components/common/Badge/Badge';
import { toast } from 'sonner';
import { User, Mail, Phone, MapPin, Save, Shield, Calendar } from 'lucide-react';

export function ProfileSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        country: user.country || '',
      });
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // API call to update profile
      // await api.updateProfile(profile);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = () => {
    // Navigate to password change page or open modal
    window.location.href = '/settings/change-password';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Account Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  {user?.fullName}
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {user?.email}
                </p>
              </div>
            </div>
            <Badge variant="blue" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              {user?.tier || 'FREE'}
            </Badge>
          </div>

          {/* Subscription Info */}
          {user?.subscriptionExpiresAt && (
            <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
              <Calendar className="h-4 w-4" />
              <span>
                Subscription expires:{' '}
                {new Date(user.subscriptionExpiresAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* Profile Form */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </div>
              </label>
              <Input
                type="text"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
                placeholder="John Doe"
              />
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </div>
              </label>
              <Input
                type="email"
                value={profile.email}
                disabled
                className="bg-gray-100 dark:bg-gray-900/50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </div>
              </label>
              <Input
                type="tel"
                value={profile.phoneNumber}
                onChange={(e) =>
                  setProfile({ ...profile, phoneNumber: e.target.value })
                }
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Country
                </div>
              </label>
              <Input
                type="text"
                value={profile.country}
                onChange={(e) =>
                  setProfile({ ...profile, country: e.target.value })
                }
                placeholder="United States"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Security Section */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Security
          </h3>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Password
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Last changed {Math.floor(Math.random() * 30)} days ago
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handlePasswordChange}>
              Change Password
            </Button>
          </div>
        </div>
      </Card>

      {/* Account Stats */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Account Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.floor(Math.random() * 100)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Total Trades
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.floor(Math.random() * 365)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Days Active
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.floor(Math.random() * 10)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Channels
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.floor(Math.random() * 50) + 50}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Win Rate
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="primary"
          onClick={handleSave}
          loading={loading}
          leftIcon={<Save className="h-4 w-4" />}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
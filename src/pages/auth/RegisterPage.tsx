// ===================================================
// FILE: src/pages/auth/RegisterPage.tsx (COMPLETE FIX)
// ===================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { Select } from '@/components/common/Select/Select';

const countryCodes = [
  { value: '+234', label: '🇳🇬 Nigeria (+234)' },
  { value: '+1', label: '🇺🇸 USA (+1)' },
  { value: '+44', label: '🇬🇧 UK (+44)' },
  { value: '+91', label: '🇮🇳 India (+91)' },
  { value: '+86', label: '🇨🇳 China (+86)' },
  { value: '+81', label: '🇯🇵 Japan (+81)' },
  { value: '+49', label: '🇩🇪 Germany (+49)' },
  { value: '+33', label: '🇫🇷 France (+33)' },
  { value: '+39', label: '🇮🇹 Italy (+39)' },
  { value: '+27', label: '🇿🇦 South Africa (+27)' },
  { value: '+254', label: '🇰🇪 Kenya (+254)' },
  { value: '+233', label: '🇬🇭 Ghana (+233)' },
];

const countries = [
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'USA', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'India', label: 'India' },
  { value: 'China', label: 'China' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Italy', label: 'Italy' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Ghana', label: 'Ghana' },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    invitationCode: '',
    countryCode: '+234',
    phoneNumber: '',
    country: 'Nigeria',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine country code and phone number
      const fullPhoneNumber = formData.phoneNumber 
        ? `${formData.countryCode}${formData.phoneNumber}`
        : undefined;

      await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        invitationCode: formData.invitationCode,
        phoneNumber: fullPhoneNumber,
        country: formData.country,
      });
    } catch (error) {
      // Error handled by AuthContext with toast
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 md:p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Trading Bot</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />

          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Password <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              At least 8 characters with uppercase, lowercase, number and special character
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Select
              label="Code"
              value={formData.countryCode}
              onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
              options={countryCodes}
              className="col-span-1"
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="8012345678"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '') })}
              className="col-span-2"
              helperText="Optional"
            />
          </div>

          <Select
            label="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            options={countries}
          />

          <Input
            label="Invitation Code"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            value={formData.invitationCode}
            onChange={(e) => setFormData({ ...formData, invitationCode: e.target.value.toUpperCase() })}
            required
          />

          <Button type="submit" fullWidth loading={loading}>
            Create Account
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/pages/auth/RegisterPage.tsx
// ===================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    invitationCode: '',
    phoneNumber: '', // full number including country code
    country: '',     // automatically set from phone input
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Real-time phone validation with auto-formatting
  const handlePhoneChange = (
    phone: string,
    country: any,
    e: any,
    formattedValue: string
  ) => {
    setFormData({
      ...formData,
      phoneNumber: formattedValue, // formatted number like +234 801 234 5678
      country: country.name,
    });

    // Validate as user types
    const phoneNumber = parsePhoneNumberFromString(`+${phone}`);
    if (phoneNumber && phoneNumber.isValid()) {
      setPhoneError('');
    } else {
      setPhoneError('Invalid phone number');
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // Final validation before submit
      const phoneNumber = parsePhoneNumberFromString(formData.phoneNumber || '');
      if (!phoneNumber || !phoneNumber.isValid()) {
        setPhoneError('Please enter a valid phone number.');
        setLoading(false);
        return;
      }

      await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        invitationCode: formData.invitationCode,
        phoneNumber: phoneNumber.formatInternational(), // final standardized format
        country: formData.country,
      });
    } catch (error) {
      // handled by AuthContext
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-6 md:p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Trading Bot</h1>
          <p className="mt-2 text-sm text-muted-foreground">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />

          {/* Email */}
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          {/* Password */}
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

          {/* Phone Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <PhoneInput
              country={'ng'}
              value={formData.phoneNumber}
              enableSearch
              placeholder="Enter phone number"
              inputClass="w-full"
              dropdownClass="z-50"
              onChange={handlePhoneChange}
              isValid={(value, country) => {
                const phoneNumber = parsePhoneNumberFromString(`+${value}`);
                return phoneNumber ? phoneNumber.isValid() : false;
              }}
            />
            {phoneError && <p className="text-xs text-destructive mt-1">{phoneError}</p>}
          </div>

          {/* Invitation Code */}
          <Input
            label="Invitation Code"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            value={formData.invitationCode}
            onChange={(e) =>
              setFormData({ ...formData, invitationCode: e.target.value.toUpperCase() })
            }
            required
          />

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            loading={loading}
            disabled={!!phoneError} // prevent submit if phone invalid
          >
            Create Account
          </Button>
        </form>

        {/* Sign in link */}
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

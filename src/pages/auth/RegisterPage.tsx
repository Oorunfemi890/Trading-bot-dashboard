/* eslint-disable @typescript-eslint/no-unused-vars */
// ===================================================
// FILE: src/pages/auth/RegisterPage.tsx
// ===================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    invitationCode: '',
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await register(formData);
    } catch (error) {
      // Error handled by AuthContext with toast
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Trading Bot</h1>
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

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Input
            label="Invitation Code"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            value={formData.invitationCode}
            onChange={(e) => setFormData({ ...formData, invitationCode: e.target.value })}
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
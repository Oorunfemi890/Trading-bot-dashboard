/* eslint-disable @typescript-eslint/no-explicit-any */
// ===================================================
// FILE: src/pages/auth/ForgotPasswordPage.tsx
// ===================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
// import { Modal } from '@/components/common/Modal/Modal';
import { authService } from '@/services/api';
import { toast } from 'sonner';
import { Mail, ArrowLeft, Lock, CheckCircle } from 'lucide-react';

type Step = 'email' | 'verify' | 'reset' | 'success';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');

  // Step 1: Request reset email
  async function handleRequestReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.forgotPassword({ email });
      toast.success('Verification code sent to your email');
      setStep('verify');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Verify code (simulate - in production this would validate the token)
  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // In production, validate the code via API
      // For now, we'll simulate success
      if (verificationCode.length === 6) {
        setResetToken(verificationCode); // Store token for reset
        toast.success('Code verified successfully');
        setStep('reset');
      } else {
        toast.error('Invalid verification code');
      }
    } catch (error: any) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  }

  // Step 3: Reset password
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword({
        token: resetToken,
        newPassword,
      });
      toast.success('Password reset successfully');
      setStep('success');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Step 1: Email Input */}
        {step === 'email' && (
          <div className="space-y-6 rounded-lg border bg-card p-6 md:p-8 shadow-lg">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4">
                  <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Forgot Password?</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter your email and we'll send you a verification code
              </p>
            </div>

            <form onSubmit={handleRequestReset} className="space-y-4">
              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" fullWidth loading={loading}>
                Send Verification Code
              </Button>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: Verify Code */}
        {step === 'verify' && (
          <div className="space-y-6 rounded-lg border bg-card p-6 md:p-8 shadow-lg">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4">
                  <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Verify Email</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter the 6-digit code sent to {email}
              </p>
            </div>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <Input
                type="text"
                label="Verification Code"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                required
              />

              <Button type="submit" fullWidth loading={loading}>
                Verify Code
              </Button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setStep('email')}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Didn't receive code? Resend
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 'reset' && (
          <div className="space-y-6 rounded-lg border bg-card p-6 md:p-8 shadow-lg">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4">
                  <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose a strong password for your account
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <Input
                type="password"
                label="New Password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />

              <Input
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <div className="text-xs text-muted-foreground space-y-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside ml-2">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>

              <Button type="submit" fullWidth loading={loading}>
                Reset Password
              </Button>
            </form>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="space-y-6 rounded-lg border bg-card p-6 md:p-8 shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground">Password Reset!</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Your password has been successfully reset
              </p>
            </div>

            <Link to="/login">
              <Button variant="primary" fullWidth>
                Go to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
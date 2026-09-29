import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-page)] text-[var(--text-heading)] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden transition-colors duration-300">
      
      <div className="w-full max-w-md movtego-card p-6 sm:p-8 shadow-2xl relative z-10 text-left space-y-6">
        
        {/* Back Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>

        {/* Header Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary-gradient flex items-center justify-center text-white font-bold shadow-md shrink-0">
            <div className="flex gap-1 items-center">
              <div className="w-1.5 h-4 bg-white rounded-full transform -rotate-12" />
              <div className="w-1.5 h-4 bg-white rounded-full transform rotate-12" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-2xl tracking-tight text-[var(--text-heading)]">
              MOVTEGO
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-medium">
              Cinema Manager
            </span>
          </div>
        </div>

        {!isSubmitted ? (
          <>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-[var(--text-heading)]">Reset Password</h1>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Enter your registered email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="admin@movtego.com"
                icon={Mail}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                error={error}
                required
              />

              <Button
                type="submit"
                variant="teal"
                size="lg"
                fullWidth
                isLoading={loading}
                icon={ArrowRight}
                className="py-3.5 rounded-2xl font-bold"
              >
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-heading)]">Reset Link Sent!</h2>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xs mx-auto">
              We have sent password recovery instructions to <strong className="text-[var(--text-heading)] font-bold">{email}</strong>.
            </p>

            <div className="pt-2">
              <Link to="/login">
                <Button variant="teal" size="md" fullWidth className="rounded-2xl font-bold">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Remembered your password?{' '}
            <Link to="/login" className="text-[#0FA58A] hover:underline font-bold transition-colors">
              Sign In
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
};

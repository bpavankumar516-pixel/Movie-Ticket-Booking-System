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
    <div className="min-h-screen w-full bg-[#060A08] text-white flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-[#00D690] selection:text-black">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00D690]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#0E1411] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-left space-y-6">
        
        {/* Back Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00D690] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>

        {/* Header Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00D690] flex items-center justify-center text-[#060A08] font-black shadow-lg shadow-emerald-500/30">
            M
          </div>
          <span className="font-outfit font-black text-2xl tracking-wider text-white">
            MOVIE<span className="text-[#00D690]">GO</span>
          </span>
        </div>

        {!isSubmitted ? (
          <>
            <div className="space-y-1">
              <h1 className="text-2xl font-black font-outfit text-white">Reset Password</h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your registered email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="martin@moviego.com"
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
                variant="emerald"
                size="lg"
                fullWidth
                isLoading={loading}
                icon={ArrowRight}
                className="py-3.5 rounded-2xl font-black text-[#060A08] shadow-lg shadow-emerald-500/30"
              >
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-4 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#00D690]/20 border border-[#00D690]/40 flex items-center justify-center text-[#00D690] mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black font-outfit text-white">Reset Link Sent!</h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
              We have sent password recovery instructions to <strong className="text-white font-bold">{email}</strong>.
            </p>

            <div className="pt-2">
              <Link to="/login">
                <Button variant="emerald" size="md" fullWidth className="rounded-2xl">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-slate-400">
            Remembered your password?{' '}
            <Link to="/login" className="text-[#00D690] hover:text-[#00EF9F] font-bold transition-colors">
              Sign In
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
};

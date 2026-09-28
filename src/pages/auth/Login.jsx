import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Mail, Lock, Sparkles, ChevronLeft, ChevronRight, UserCheck, ArrowRight, 
  Star, Flame, User, Phone, CheckCircle2, ArrowLeft, ShieldCheck, Play
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

// High-Impact Present Generation Movie Showcase Slider
const SLIDES = [
  {
    id: 1,
    title: 'Dune: Part Two (沙丘2)',
    tagline: 'Long live the fighters.',
    likes: '4,956',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=2400&auto=format&fit=crop&q=95',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1000&auto=format&fit=crop&q=95',
    tag: '🔥 #1 BOX OFFICE',
    rating: '9.6',
    genres: ['Sci-Fi', 'Drama', 'IMAX 3D'],
  },
  {
    id: 2,
    title: 'Ready Player One',
    tagline: 'Welcome to the OASIS.',
    likes: '8,920',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=2400&auto=format&fit=crop&q=95',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1000&auto=format&fit=crop&q=95',
    tag: '⚡ VR BLOCKBUSTER',
    rating: '9.2',
    genres: ['Sci-Fi', 'Action', '4DX'],
  },
  {
    id: 3,
    title: 'Avengers: Endgame',
    tagline: 'A part of the journey is the end.',
    likes: '9,980',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=2400&auto=format&fit=crop&q=95',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=95',
    tag: '⭐ ALL TIME TOP RATED',
    rating: '9.8',
    genres: ['Action', 'Sci-Fi', 'Dolby Atmos'],
  }
];

export const Login = () => {
  const { login, loginAsDemo, register, forgotPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Active Tab: 'login' | 'register' | 'forgot'
  const [activeTab, setActiveTab] = useState('login');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginErrors, setLoginErrors] = useState({});

  // Register Form State
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true,
  });
  const [registerErrors, setRegisterErrors] = useState({});

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Login Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!loginEmail) errors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(loginEmail)) errors.email = 'Enter a valid email address';
    if (!loginPassword) errors.password = 'Password is required';
    else if (loginPassword.length < 6) errors.password = 'Password must be at least 6 characters';

    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const res = await login(loginEmail, loginPassword, rememberMe);
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  // Demo Login Handler
  const handleDemoAccess = async () => {
    const res = await loginAsDemo('user');
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  // Register Handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!registerData.name.trim()) errors.name = 'Full name is required';
    if (!registerData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) errors.email = 'Enter a valid email';
    if (!registerData.phone) errors.phone = 'Phone number is required';
    if (!registerData.password) errors.password = 'Password is required';
    else if (registerData.password.length < 6) errors.password = 'Min 6 characters required';
    if (registerData.confirmPassword !== registerData.password) errors.confirmPassword = 'Passwords do not match';
    if (!registerData.acceptTerms) errors.acceptTerms = 'Must accept terms';

    setRegisterErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const res = await register(
      registerData.name,
      registerData.email,
      registerData.password,
      registerData.phone
    );
    if (res.success) {
      navigate('/dashboard', { replace: true });
    }
  };

  // Forgot Password Handler
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotError('Please enter a valid email address');
      return;
    }
    setForgotError('');
    await forgotPassword(forgotEmail);
    setForgotSubmitted(true);
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="w-screen min-h-screen lg:h-screen bg-[#060A08] text-white flex flex-col lg:flex-row overflow-hidden selection:bg-[#00D690] selection:text-black relative">
      
      {/* LEFT COLUMN: Modern 2026 Cinematic Hero Slider */}
      <div className="w-full lg:w-7/12 xl:w-7.5/12 h-[420px] sm:h-[500px] lg:h-full relative flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden group select-none">
        
        {/* Crisp Animated Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={slide.backdrop}
            alt={slide.title}
            className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105 filter brightness-[0.7] contrast-[1.15]"
          />
          {/* Emerald Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060A08] via-[#060A08]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060A08]/90 via-transparent to-[#060A08]" />
          <div className="absolute inset-0 bg-[#00D690]/10 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 group/logo">
            <div className="w-11 h-11 rounded-2xl bg-[#00D690] flex items-center justify-center text-[#060A08] font-black shadow-xl shadow-emerald-500/40 group-hover/logo:scale-105 transition-transform">
              <div className="flex gap-1 items-center">
                <div className="w-1.5 h-4.5 bg-[#060A08] rounded-full transform -rotate-12" />
                <div className="w-1.5 h-4.5 bg-[#060A08] rounded-full transform rotate-12" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-outfit font-black text-2xl md:text-3xl tracking-wider text-white">
                MOVIE<span className="text-[#00D690]">GO</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#00D690] font-extrabold -mt-1">
                Next-Gen Cinema Booking
              </span>
            </div>
          </Link>

          {/* Tag Pill */}
          <span className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 bg-[#0E1411]/90 backdrop-blur-xl border border-[#00D690]/40 rounded-full text-xs font-black text-[#00D690] uppercase tracking-wider shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-[#00D690]" /> {slide.tag}
          </span>
        </div>

        {/* Movie Showcase Box */}
        <div className="relative z-10 mt-auto flex items-end gap-6 pt-6">
          {/* Floating Poster Card */}
          <div className="relative shrink-0 w-32 h-48 sm:w-44 sm:h-60 rounded-3xl overflow-hidden border-2 border-[#00D690]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] transform -rotate-1 group-hover:rotate-0 transition-all duration-500">
            <img
              src={slide.poster}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2.5">
              <span className="flex items-center gap-1 text-[11px] font-black text-[#060A08] bg-[#00D690] px-2.5 py-0.5 rounded-full shadow-lg">
                <Star className="w-3 h-3 fill-[#060A08]" /> {slide.rating}
              </span>
            </div>
          </div>

          {/* Details & Controls */}
          <div className="flex-1 space-y-2 text-left">
            <div className="flex flex-wrap items-center gap-1.5">
              {slide.genres.map((g, i) => (
                <span key={i} className="px-3 py-1 bg-[#00D690]/20 border border-[#00D690]/40 text-[#00D690] text-xs font-bold rounded-full">
                  {g}
                </span>
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-white leading-tight flex items-center gap-3 drop-shadow-xl">
              {slide.title} 
              <span className="text-xs text-[#FF6B6B] font-bold flex items-center gap-1">
                <Flame className="w-4 h-4 fill-[#FF6B6B]" /> {slide.likes}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 italic max-w-md hidden sm:block">
              "{slide.tagline}"
            </p>

            {/* Carousel Dots & Controls */}
            <div className="flex items-center justify-between pt-3 max-w-md">
              <div className="flex items-center gap-1.5">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx 
                        ? 'w-9 bg-[#00D690] shadow-[0_0_12px_#00D690]' 
                        : 'w-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
                  className="p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-transform active:scale-90"
                  title="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
                  className="p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-transform active:scale-90"
                  title="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Curved Divider */}
        <div className="hidden lg:block absolute top-0 bottom-0 -right-1 z-20 w-14 pointer-events-none text-[#0E1411]">
          <svg className="h-full w-full fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 C 65 30, 65 70, 0 100 L 100 100 L 100 0 Z" />
          </svg>
        </div>
      </div>

      {/* RIGHT COLUMN: Ultra Modern Present-Gen Auth Card */}
      <div className="w-full lg:w-5/12 xl:w-4.5/12 h-full bg-[#0E1411] p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative overflow-y-auto z-10 border-l border-white/5">
        
        {/* Glow Blob */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#00D690]/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Segmented Tab Switcher (Sign In vs Create Account) */}
        {activeTab !== 'forgot' && (
          <div className="w-full bg-[#141F1A] p-1.5 rounded-2xl border border-white/10 flex items-center mb-6 shadow-inner">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-[#00D690] text-[#060A08] shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${
                activeTab === 'register'
                  ? 'bg-[#00D690] text-[#060A08] shadow-lg shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* 1-CLICK INSTANT DEMO LOGIN BUTTON */}
        {activeTab !== 'forgot' && (
          <button
            type="button"
            onClick={handleDemoAccess}
            className="w-full mb-6 flex items-center justify-center gap-2.5 py-3.5 px-4 bg-gradient-to-r from-[#00D690]/20 via-[#00D690]/10 to-[#00D690]/20 hover:from-[#00D690]/30 hover:to-[#00D690]/30 border border-[#00D690]/50 text-[#00D690] rounded-2xl text-xs font-black transition-all active:scale-98 shadow-xl shadow-emerald-950/40 group"
          >
            <UserCheck className="w-4 h-4 text-[#00D690] group-hover:scale-110 transition-transform" />
            <span>⚡ 1-Click Instant Demo Entrance</span>
          </button>
        )}

        {/* TAB 1: SIGN IN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left animate-fade-in">
            <Input
              label="Email Address"
              type="email"
              placeholder="martin@moviego.com"
              icon={Mail}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              error={loginErrors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              error={loginErrors.password}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-md border-slate-700 bg-gray-900 text-[#00D690] focus:ring-[#00D690]"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('forgot');
                  setForgotSubmitted(false);
                }}
                className="text-[#00D690] hover:text-[#00EF9F] font-extrabold transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              variant="emerald"
              size="lg"
              fullWidth
              isLoading={loading}
              icon={ArrowRight}
              className="mt-3 py-4 rounded-2xl font-black text-[#060A08] shadow-xl shadow-emerald-500/30"
            >
              Sign In to Account
            </Button>
          </form>
        )}

        {/* TAB 2: CREATE ACCOUNT FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-left animate-fade-in">
            <Input
              label="Full Name"
              type="text"
              placeholder="Martin Gu"
              icon={User}
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              error={registerErrors.name}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Email"
                type="email"
                placeholder="martin@moviego.com"
                icon={Mail}
                value={registerData.email}
                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                error={registerErrors.email}
                required
              />

              <Input
                label="Phone"
                type="tel"
                placeholder="+1 555-345-6789"
                icon={Phone}
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                error={registerErrors.phone}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                error={registerErrors.password}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                error={registerErrors.confirmPassword}
                required
              />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 pt-1">
              <input
                type="checkbox"
                checked={registerData.acceptTerms}
                onChange={(e) => setRegisterData({ ...registerData, acceptTerms: e.target.checked })}
                className="mt-0.5 rounded border-slate-700 bg-gray-900 text-[#00D690] focus:ring-[#00D690]"
              />
              <span>I accept the MOVIEGO Terms of Service & Privacy Policy</span>
            </label>

            <Button
              type="submit"
              variant="emerald"
              size="lg"
              fullWidth
              isLoading={loading}
              icon={ArrowRight}
              className="mt-2 py-4 rounded-2xl font-black text-[#060A08] shadow-xl shadow-emerald-500/30"
            >
              Complete Registration
            </Button>
          </form>
        )}

        {/* TAB 3: INLINE FORGOT PASSWORD VIEW (NO POPUP MODALS) */}
        {activeTab === 'forgot' && (
          <div className="space-y-6 text-left animate-fade-in">
            <button
              onClick={() => setActiveTab('login')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#00D690] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </button>

            {!forgotSubmitted ? (
              <>
                <div className="space-y-1">
                  <h1 className="text-3xl font-black font-outfit text-white tracking-tight">
                    Reset Password
                  </h1>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Enter your registered email address to receive password reset instructions.
                  </p>
                </div>

                <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="martin@moviego.com"
                    icon={Mail}
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    error={forgotError}
                    required
                  />

                  <Button
                    type="submit"
                    variant="emerald"
                    size="lg"
                    fullWidth
                    isLoading={loading}
                    icon={ArrowRight}
                    className="py-4 rounded-2xl font-black text-[#060A08] shadow-xl shadow-emerald-500/30"
                  >
                    Send Recovery Instructions
                  </Button>
                </form>
              </>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[#00D690]/20 border border-[#00D690]/40 flex items-center justify-center text-[#00D690] mx-auto shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black font-outfit text-white">Reset Link Sent!</h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We have sent instructions to <strong className="text-white">{forgotEmail}</strong>.
                </p>

                <div className="pt-2">
                  <Button
                    variant="emerald"
                    size="md"
                    fullWidth
                    onClick={() => setActiveTab('login')}
                    className="rounded-2xl font-bold text-[#060A08]"
                  >
                    Return to Sign In
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};

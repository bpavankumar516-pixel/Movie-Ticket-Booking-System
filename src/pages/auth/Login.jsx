import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Mail, Lock, ChevronLeft, ChevronRight, UserCheck, ArrowRight, 
  Star, User, Phone, CheckCircle2, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

// Multi-Color Official Google Icon
const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
    />
  </svg>
);

// 100% Authentic Movie Asset Matching with Dedicated Dual-Source URLs
const SLIDES = [
  {
    id: 1,
    title: 'Avatar: The Way of Water',
    tagline: 'Return to Pandora in IMAX 3D.',
    backdrop: 'https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
    fallbackBackdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&auto=format&fit=crop&q=90',
    poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=90',
    rating: '9.6',
    genres: ['Sci-Fi', 'IMAX 3D'],
  },
  {
    id: 2,
    title: 'Dune: Part Two',
    tagline: 'Beyond fear, destiny awaits across the desert sands.',
    backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    fallbackBackdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=90',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjxh2CZjjYroq.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&auto=format&fit=crop&q=90',
    rating: '9.2',
    genres: ['Sci-Fi', '4DX'],
  },
  {
    id: 3,
    title: 'Interstellar',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    backdrop: 'https://image.tmdb.org/t/p/original/pbrkL8a4c8yF4vBwFToKC7vg2x.jpg',
    fallbackBackdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=90',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    fallbackPoster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop&q=90',
    rating: '9.5',
    genres: ['Sci-Fi', 'Dolby Cinema'],
  }
];

export const Login = () => {
  const { login, loginAsDemo, register, forgotPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Active View Mode: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState('login');

  // Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginErrors, setLoginErrors] = useState({});

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true,
  });
  const [registerErrors, setRegisterErrors] = useState({});

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Slider State & Auto-Play Management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth Auto-Play Slider with Pause-on-Hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Preload image assets into browser cache
  useEffect(() => {
    SLIDES.forEach((item) => {
      const imgBackdrop = new Image();
      imgBackdrop.src = item.backdrop;
      const imgPoster = new Image();
      imgPoster.src = item.poster;
    });
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

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

  // Demo Auto-Fill State
  const [demoFilledNotice, setDemoFilledNotice] = useState(false);

  // Demo Fill Handler - Auto-fills Pavan's credentials for user-friendly 1-click access
  const handleDemoAccess = () => {
    setLoginEmail('pavan@movtego.com');
    setLoginPassword('pavandemo123');
    setLoginErrors({});
    setDemoFilledNotice(true);
    setTimeout(() => setDemoFilledNotice(false), 4000);
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    const res = await loginAsDemo('google');
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

  const activeMovie = SLIDES[currentSlide];

  return (
    <div className="w-full min-h-screen lg:h-screen bg-[var(--bg-page)] text-[var(--text-heading)] flex flex-col lg:flex-row overflow-x-hidden font-['Poppins',sans-serif] relative transition-colors duration-300 select-none">
      
      {/* LEFT COLUMN: 70% Width - Smooth Preloaded Hero Carousel Showcase */}
      <div 
        className="w-full lg:w-[70%] xl:w-[70%] shrink-0 h-[460px] sm:h-[560px] lg:h-full relative flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden bg-slate-950 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* PRE-RENDERED HIGH-CLARITY BACKDROP CAROUSEL - SYNCHRONIZED WITH ACTIVE MOVIE */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.backdrop}
                onError={(e) => { e.target.src = slide.fallbackBackdrop; }}
                alt={slide.title}
                className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1] saturate-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/15 to-slate-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Brand Header */}
        <div className="relative z-20 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary-gradient flex items-center justify-center text-white font-bold shadow-lg shadow-[#14B8A0]/35 shrink-0">
              <div className="flex gap-1 items-center">
                <div className="w-1.5 h-4 bg-white rounded-full transform -rotate-12" />
                <div className="w-1.5 h-4 bg-white rounded-full transform rotate-12" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-2xl tracking-tight text-white drop-shadow-sm">
                MOVTEGO
              </span>
              <span className="text-[10px] text-teal-300 font-semibold tracking-wider uppercase">
                Cinema Manager
              </span>
            </div>
          </Link>
        </div>

        {/* MOVIE SHOWCASE AT BOTTOM: Vertical Poster Card + Synchronized Movie Details */}
        <div className="relative z-20 mt-auto flex items-end gap-6 pt-6">
          
          {/* VERTICAL MOVIE POSTER CARD - SYNCHRONIZED WITH ACTIVE MOVIE */}
          <div className="relative shrink-0 w-32 h-48 sm:w-40 sm:h-56 rounded-2xl overflow-hidden border-2 border-white/25 shadow-2xl bg-slate-900 cursor-pointer group/card">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                onClick={handleNextSlide}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.poster}
                  onError={(e) => { e.target.src = slide.fallbackPoster; }}
                  alt={slide.title}
                  className="w-full h-full object-cover filter brightness-[1.02] contrast-[1.08] group-hover/card:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-2.5 flex items-center justify-start">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-primary-gradient px-2.5 py-0.5 rounded-full shadow-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {slide.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Synchronized Movie Details Beside Poster Card */}
          <div className="flex-1 space-y-3 text-left">
            <div className="flex flex-wrap items-center gap-2">
              {activeMovie.genres.map((g, i) => (
                <span key={i} className="px-3 py-1 bg-slate-900/80 border border-white/15 text-teal-300 text-xs font-semibold rounded-full backdrop-blur-md">
                  {g}
                </span>
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md transition-all duration-300">
              {activeMovie.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 italic max-w-lg hidden sm:block font-normal transition-all duration-300">
              "{activeMovie.tagline}"
            </p>

            {/* Slide Pagination Dots & Navigation Controls */}
            <div className="flex items-center justify-between pt-2 max-w-md">
              <div className="flex items-center gap-2">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx 
                        ? 'w-8 bg-primary-gradient' 
                        : 'w-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevSlide}
                  aria-label="Previous slide"
                  className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/20 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  aria-label="Next slide"
                  className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/20 transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: 30% Width - Clean Minimal Auth Form Panel */}
      <div className="w-full lg:w-[30%] xl:w-[30%] h-full bg-[var(--bg-card)] px-6 sm:px-8 py-8 lg:py-10 flex flex-col overflow-y-auto relative z-20 border-l border-[var(--border)] transition-colors duration-300">
        
        {/* Centered Form Wrapper */}
        <div className="w-full max-w-sm mx-auto my-auto flex flex-col py-2">
        
        {/* Header Title */}
        <div className="mb-6 space-y-1.5 text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-heading)] tracking-tight">
            {mode === 'login' ? 'Sign In to MOVTEGO' : mode === 'register' ? 'Create Account' : 'Reset Password'}
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-normal">
            {mode === 'login' ? 'Manage multiplex shows, box office bookings & reports.' : mode === 'register' ? 'Register to manage cinema screens and timings.' : 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* AUTHENTICATION BUTTONS */}
        {mode !== 'forgot' && (
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-[var(--input-bg)] hover:bg-[var(--primary-light)] border border-[var(--border)] text-[var(--text-heading)] text-xs font-semibold transition-all duration-200 cursor-pointer shadow-sm"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[var(--primary-light)] hover:opacity-90 text-[var(--primary)] border border-[var(--primary)]/30 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm group hover:scale-[1.01]"
            >
              <UserCheck className="w-4 h-4 text-[var(--primary)] group-hover:scale-110 transition-transform" />
              <span>⚡ 1-Click Pavan Demo Auto-Fill</span>
            </button>

            {/* OR DIVIDER */}
            <div className="relative flex items-center justify-center pt-2">
              <div className="w-full border-t border-[var(--border)]" />
              <span className="absolute px-3 bg-[var(--bg-card)] text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-widest">
                OR
              </span>
            </div>
          </div>
        )}

        {/* DEMO FILLED SUCCESS NOTIFICATION BANNER */}
        {demoFilledNotice && (
          <div className="mb-4 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2.5 animate-fade-in shadow-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>Filled <strong>pavan@movtego.com</strong>! Click "Sign In" below.</span>
          </div>
        )}

        {/* MODE 1: SIGN IN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left animate-fade-in">
            <Input
              label="Email Address"
              type="email"
              placeholder="pavan@movtego.com"
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
              <label className="flex items-center gap-2 cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-heading)] font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[var(--border)] text-[#14B8A0] focus:ring-[#14B8A0]"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setMode('forgot');
                  setForgotSubmitted(false);
                }}
                className="text-[#14B8A0] font-semibold hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              variant="teal"
              size="lg"
              fullWidth
              isLoading={loading}
              icon={ArrowRight}
              className="mt-3 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#14B8A0]/25"
            >
              Sign In to Account
            </Button>

            {/* Switch to Register */}
            <p className="text-center text-xs text-[var(--text-muted)] pt-3 font-medium">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-[#14B8A0] font-bold hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          </form>
        )}

        {/* MODE 2: CREATE ACCOUNT FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-left animate-fade-in">
            <Input
              label="Full Name"
              type="text"
              placeholder="Admin User"
              icon={User}
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              error={registerErrors.name}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="admin@movtego.com"
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

            <label className="flex items-start gap-2 cursor-pointer text-xs text-[var(--text-muted)] pt-1">
              <input
                type="checkbox"
                checked={registerData.acceptTerms}
                onChange={(e) => setRegisterData({ ...registerData, acceptTerms: e.target.checked })}
                className="mt-0.5 rounded border-[var(--border)] text-[#14B8A0] focus:ring-[#14B8A0]"
              />
              <span>I accept the Terms & Conditions</span>
            </label>

            <Button
              type="submit"
              variant="teal"
              size="lg"
              fullWidth
              isLoading={loading}
              icon={ArrowRight}
              className="mt-3 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#14B8A0]/25"
            >
              Complete Registration
            </Button>

            {/* Switch to Login */}
            <p className="text-center text-xs text-[var(--text-muted)] pt-3 font-medium">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#14B8A0] font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </form>
        )}

        {/* MODE 3: FORGOT PASSWORD */}
        {mode === 'forgot' && (
          <div className="space-y-4 text-left animate-fade-in">
            <button
              onClick={() => setMode('login')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[#14B8A0] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </button>

            {!forgotSubmitted ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4 pt-1">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="admin@movtego.com"
                  icon={Mail}
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  error={forgotError}
                  required
                />

                <Button
                  type="submit"
                  variant="teal"
                  size="lg"
                  fullWidth
                  isLoading={loading}
                  icon={ArrowRight}
                  className="py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#14B8A0]/25"
                >
                  Send Recovery Instructions
                </Button>
              </form>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary)] mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="text-lg font-bold text-[var(--text-heading)]">Reset Link Sent!</h2>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Instructions sent to <strong className="text-[var(--text-heading)]">{forgotEmail}</strong>.
                </p>

                <div className="pt-2">
                  <Button
                    variant="teal"
                    size="md"
                    fullWidth
                    onClick={() => setMode('login')}
                    className="rounded-2xl font-semibold"
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

    </div>
  );
};

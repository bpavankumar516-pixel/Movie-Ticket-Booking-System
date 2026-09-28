import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Mail, Lock, Sparkles, ChevronLeft, ChevronRight, UserCheck, ArrowRight, 
  Star, Flame, User, Phone, CheckCircle2, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

// High-Impact Present Generation Movie Showcase Slider
const SLIDES = [
  {
    id: 1,
    title: 'Avatar: The Way of Water',
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
    title: 'Dune: Part Two',
    tagline: 'Long live the fighters.',
    likes: '8,920',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=2400&auto=format&fit=crop&q=95',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1000&auto=format&fit=crop&q=95',
    tag: '⚡ BLOCKBUSTER',
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
    tag: '⭐ TOP RATED',
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
    <div className="w-screen min-h-screen lg:h-screen bg-[#F3F8F8] text-[#0F1F2E] flex flex-col lg:flex-row overflow-hidden font-['Poppins',sans-serif] relative">
      
      {/* LEFT COLUMN: Modern Cinematic Hero Slider */}
      <div className="w-full lg:w-7/12 xl:w-7.5/12 h-[400px] sm:h-[480px] lg:h-full relative flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden group select-none">
        
        {/* Crisp Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={slide.backdrop}
            alt={slide.title}
            className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105 filter brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0FA58A] flex items-center justify-center text-white font-bold shadow-md shadow-[#0FA58A]/30 shrink-0">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M6 4h3a1 1 0 011 1v14a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1zm9 0h3a1 1 0 011 1v14a1 1 0 01-1 1h-3a1 1 0 01-1-1V5a1 1 0 011-1z" transform="rotate(25 12 12)" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-2xl tracking-tight text-white">
                MOVTEGO
              </span>
              <span className="text-[10px] text-[#DFF5F0] font-medium">
                Cinema Manager
              </span>
            </div>
          </Link>

          {/* Tag Pill */}
          <span className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 bg-[#0FA58A] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> {slide.tag}
          </span>
        </div>

        {/* Movie Showcase Box */}
        <div className="relative z-10 mt-auto flex items-end gap-6 pt-6">
          <div className="relative shrink-0 w-28 h-40 sm:w-40 sm:h-56 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
            <img
              src={slide.poster}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-2">
              <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#0FA58A] px-2 py-0.5 rounded-full shadow-md">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {slide.rating}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-2 text-left">
            <div className="flex flex-wrap items-center gap-1.5">
              {slide.genres.map((g, i) => (
                <span key={i} className="px-2.5 py-0.5 bg-[#0FA58A]/30 border border-[#0FA58A]/50 text-white text-xs font-semibold rounded-full">
                  {g}
                </span>
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight flex items-center gap-2">
              {slide.title} 
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-400" /> {slide.likes}
              </span>
            </h2>

            <p className="text-xs text-slate-300 italic max-w-md hidden sm:block font-normal">
              "{slide.tagline}"
            </p>

            {/* Carousel Dots & Controls */}
            <div className="flex items-center justify-between pt-2 max-w-md">
              <div className="flex items-center gap-1.5">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx 
                        ? 'w-8 bg-[#0FA58A]' 
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
                  className="p-2 rounded-full bg-black/50 hover:bg-black text-white transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
                  className="p-2 rounded-full bg-black/50 hover:bg-black text-white transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Auth Card */}
      <div className="w-full lg:w-5/12 xl:w-4.5/12 h-full bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative overflow-y-auto z-10 border-l border-[#E8F0F0]">
        
        {/* Segmented Tab Switcher */}
        {activeTab !== 'forgot' && (
          <div className="w-full bg-[#F3F8F8] p-1.5 rounded-2xl border border-[#E8F0F0] flex items-center mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-[#0FA58A] text-white shadow-md shadow-[#0FA58A]/25'
                  : 'text-[#8A97A6] hover:text-[#0F1F2E]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-[#0FA58A] text-white shadow-md shadow-[#0FA58A]/25'
                  : 'text-[#8A97A6] hover:text-[#0F1F2E]'
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
            className="w-full mb-6 flex items-center justify-center gap-2 py-3 px-4 bg-[#DFF5F0] hover:bg-[#C8EFE7] text-[#0FA58A] border border-[#C4EFE6] rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm group"
          >
            <UserCheck className="w-4 h-4 text-[#0FA58A] group-hover:scale-110 transition-transform" />
            <span>⚡ 1-Click Instant Demo Entrance</span>
          </button>
        )}

        {/* TAB 1: SIGN IN FORM */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left animate-fade-in">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@movtego.com"
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
              <label className="flex items-center gap-2 cursor-pointer text-[#8A97A6] hover:text-[#0F1F2E] font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E8F0F0] text-[#0FA58A] focus:ring-[#0FA58A]"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('forgot');
                  setForgotSubmitted(false);
                }}
                className="text-[#0FA58A] font-bold hover:underline cursor-pointer"
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
              className="mt-3 py-3.5 rounded-2xl font-bold"
            >
              Sign In to Account
            </Button>
          </form>
        )}

        {/* TAB 2: CREATE ACCOUNT FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-left animate-fade-in">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <label className="flex items-start gap-2 cursor-pointer text-xs text-[#8A97A6] pt-1">
              <input
                type="checkbox"
                checked={registerData.acceptTerms}
                onChange={(e) => setRegisterData({ ...registerData, acceptTerms: e.target.checked })}
                className="mt-0.5 rounded border-[#E8F0F0] text-[#0FA58A] focus:ring-[#0FA58A]"
              />
              <span>I accept the MOVTEGO Terms of Service & Privacy Policy</span>
            </label>

            <Button
              type="submit"
              variant="teal"
              size="lg"
              fullWidth
              isLoading={loading}
              icon={ArrowRight}
              className="mt-2 py-3.5 rounded-2xl font-bold"
            >
              Complete Registration
            </Button>
          </form>
        )}

        {/* TAB 3: INLINE FORGOT PASSWORD VIEW */}
        {activeTab === 'forgot' && (
          <div className="space-y-5 text-left animate-fade-in">
            <button
              onClick={() => setActiveTab('login')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A97A6] hover:text-[#0FA58A] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </button>

            {!forgotSubmitted ? (
              <>
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-[#0F1F2E] tracking-tight">
                    Reset Password
                  </h1>
                  <p className="text-xs text-[#8A97A6] leading-relaxed">
                    Enter your registered email address to receive password reset instructions.
                  </p>
                </div>

                <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
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
                    className="py-3.5 rounded-2xl font-bold"
                  >
                    Send Recovery Instructions
                  </Button>
                </form>
              </>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-[#DFF5F0] flex items-center justify-center text-[#0FA58A] mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="text-lg font-bold text-[#0F1F2E]">Reset Link Sent!</h2>
                <p className="text-xs text-[#8A97A6] leading-relaxed">
                  We have sent instructions to <strong className="text-[#0F1F2E]">{forgotEmail}</strong>.
                </p>

                <div className="pt-2">
                  <Button
                    variant="teal"
                    size="md"
                    fullWidth
                    onClick={() => setActiveTab('login')}
                    className="rounded-2xl font-bold"
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

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Sparkles, ChevronLeft, ChevronRight, ArrowRight, Star, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

// Clean Movie Carousel Data (Same as Login Page)
const SLIDES = [
  {
    id: 1,
    title: 'Dune 2 (沙丘2)',
    likes: '4956',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=2400&auto=format&fit=crop&q=95',
    poster: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1000&auto=format&fit=crop&q=95',
    tag: 'NOW SHOWING',
    rating: '9.6',
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
  },
  {
    id: 2,
    title: 'Ready Player One',
    likes: '8920',
    backdrop: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=2400&auto=format&fit=crop&q=95',
    poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1000&auto=format&fit=crop&q=95',
    tag: 'VR SCI-FI',
    rating: '9.2',
    genres: ['Sci-Fi', 'Action'],
  },
  {
    id: 3,
    title: 'Avengers: Endgame',
    likes: '9980',
    backdrop: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=2400&auto=format&fit=crop&q=95',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=95',
    tag: 'IMAX 3D',
    rating: '9.8',
    genres: ['Action', 'Sci-Fi'],
  }
];

export const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true,
  });

  const [errors, setErrors] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone
    );

    if (res.success) {
      navigate('/dashboard', { replace: true });
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <div className="w-screen min-h-screen lg:h-screen bg-[var(--bg-page)] text-[var(--text-heading)] flex flex-col lg:flex-row overflow-hidden relative transition-colors duration-300">
      
      {/* LEFT COLUMN: Cinematic Movie Hero Banner */}
      <div className="w-full lg:w-7/12 xl:w-7.5/12 h-[420px] sm:h-[500px] lg:h-full relative flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden group select-none">
        
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.backdrop}
            alt={slide.title}
            className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105 filter brightness-[0.75] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-gradient flex items-center justify-center text-white font-bold shadow-md shrink-0">
              <div className="flex gap-1 items-center">
                <div className="w-1.5 h-4 bg-white rounded-full transform -rotate-12" />
                <div className="w-1.5 h-4 bg-white rounded-full transform rotate-12" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-2xl tracking-tight text-white">
                MOVTEGO
              </span>
              <span className="text-[10px] text-slate-200 font-medium">
                Cinema Manager
              </span>
            </div>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 bg-primary-gradient text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> {slide.tag}
          </span>
        </div>

        {/* Movie Details Box */}
        <div className="relative z-10 mt-auto flex items-center gap-6 pt-6">
          <div className="relative shrink-0 w-32 h-48 sm:w-40 sm:h-56 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
            <img
              src={slide.poster}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
              <span className="flex items-center gap-1 text-[11px] font-bold text-white bg-primary-gradient px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {slide.rating}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-2 text-left">
            <div className="flex flex-wrap items-center gap-1.5">
              {slide.genres.map((g, i) => (
                <span key={i} className="px-2.5 py-0.5 bg-[#14B8A0]/30 border border-[#14B8A0]/50 text-white text-xs font-semibold rounded-full">
                  {g}
                </span>
              ))}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              {slide.title} <span className="text-xs text-amber-400 font-bold flex items-center gap-1"><Flame className="w-3.5 h-3.5 fill-amber-400" /> {slide.likes}</span>
            </h2>

            {/* Slider Navigation */}
            <div className="flex items-center gap-4 pt-3">
              <div className="flex items-center gap-1.5">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-8 bg-primary-gradient' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
                  className="p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/10"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
                  className="p-2 rounded-full bg-black/60 hover:bg-black text-white border border-white/10"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Clean Sleek Signup Panel */}
      <div className="w-full lg:w-5/12 xl:w-4.5/12 h-full bg-[var(--bg-card)] p-6 sm:p-10 lg:p-14 flex flex-col justify-center relative overflow-y-auto z-10 border-l border-[var(--border)] transition-colors duration-300">
        
        {/* Header Title */}
        <div className="mb-6 space-y-1 text-left">
          <h1 className="text-3xl font-extrabold text-[var(--text-heading)] tracking-tight">
            Create Account
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Sign up to book seats and get digital cinema passes.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          <Input
            label="Full Name"
            name="name"
            type="text"
            placeholder="Admin User"
            icon={User}
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="admin@movtego.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 (555) 345-6789"
              icon={Phone}
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[var(--text-muted)]">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-0.5 rounded border-[var(--border)] text-[#0FA58A] focus:ring-[#0FA58A]"
              />
              <span>
                I agree to the <span className="text-[var(--text-heading)] font-semibold underline">Terms of Service</span> and{' '}
                <span className="text-[var(--text-heading)] font-semibold underline">Privacy Policy</span>.
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-xs text-red-400 mt-1">{errors.acceptTerms}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="teal"
            size="lg"
            fullWidth
            isLoading={loading}
            className="mt-3 py-3.5 rounded-2xl font-bold"
            icon={ArrowRight}
          >
            Create Account
          </Button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 pt-4 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0FA58A] hover:underline font-bold transition-colors">
              Sign In
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';
import { Loader2, Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, CheckCircle, Sparkles } from 'lucide-react';

const RegisterForm = ({ onToggleForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateForm = () => {
    if (!name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await registerUser(name, password, email);
      dispatch(login(data.user))
      navigate({ to: "/dashboard" });
      console.log("Registration successful");
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && name && email && password && confirmPassword && !loading) {
      handleSubmit(e);
    }
  };

  const passwordStrength = password.length < 6 ? 'Weak' : password.length < 10 ? 'Good' : 'Strong';

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-r from-gray-700/5 to-gray-900/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-r from-black/10 via-transparent to-black/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-8">
        {/* Left Panel - Brand/Info (Visible on desktop/laptop) */}
        <div className="hidden lg:flex flex-col flex-1 max-w-2xl">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Join LinkZipp
                </h1>
                <p className="text-gray-400 mt-2">Start Shortening URLs Today</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Create Your Account &<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Unlock Premium Features
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
              Sign up today and get access to advanced analytics, custom domains, 
              team collaboration, and priority support.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Free Forever Plan</h3>
                <p className="text-gray-400 text-sm">Up to 1000 links/month included</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Advanced Security</h3>
                <p className="text-gray-400 text-sm">HTTPS & password protection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">7-Day Premium Trial</h3>
                <p className="text-gray-400 text-sm">All features unlocked for 7 days</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <p className="text-gray-500 text-sm">
              <span className="text-green-400">✓</span> Already trusted by 50,000+ businesses worldwide
            </p>
          </div>
        </div>

        {/* Divider Line (Desktop only) */}
        <div className="hidden lg:block w-px h-[650px] bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

        {/* Right Panel - Register Form */}
        <div className="w-full max-w-md lg:max-w-xl xl:max-w-lg">
          {/* Register Card */}
          <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/30 overflow-hidden">
            <div className="p-8 sm:p-10 lg:p-12">
              {/* Mobile/Tablet Header */}
              <div className="lg:hidden mb-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">LinkZipp</h1>
                </div>
                <h2 className="text-2xl font-bold text-white text-center mb-4">
                  Create Account
                </h2>
                <p className="text-gray-400 text-center">
                  Start shortening URLs in seconds
                </p>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block mb-10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                  Create Your Account
                </h2>
                <p className="text-gray-400">
                  Join thousands of users shortening links with LinkZipp
                </p>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-700/30 rounded-xl animate-fadeIn">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <p className="text-red-300 text-sm flex-1">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name Input */}
                <div>
                  <label className="block text-gray-300 text-base font-medium mb-3 ml-1" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      className="w-full pl-12 pr-6 py-4 text-base bg-gray-900/40 border-2 border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 transition-all duration-300 hover:border-gray-600/50"
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-gray-300 text-base font-medium mb-3 ml-1" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      className="w-full pl-12 pr-6 py-4 text-base bg-gray-900/40 border-2 border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 transition-all duration-300 hover:border-gray-600/50"
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-gray-300 text-base font-medium mb-3 ml-1" htmlFor="password">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      className="w-full pl-12 pr-12 py-4 text-base bg-gray-900/40 border-2 border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 transition-all duration-300 hover:border-gray-600/50"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      required
                      disabled={loading}
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 hover:text-blue-400 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 hover:text-blue-400 transition-colors" />
                      )}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Password strength:</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength === 'Weak' ? 'text-red-400' :
                          passwordStrength === 'Good' ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {passwordStrength}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            passwordStrength === 'Weak' ? 'bg-red-500 w-1/3' :
                            passwordStrength === 'Good' ? 'bg-yellow-500 w-2/3' : 'bg-green-500 w-full'
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-gray-300 text-base font-medium mb-3 ml-1" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    </div>
                    <input
                      className={`w-full pl-12 pr-12 py-4 text-base bg-gray-900/40 border-2 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        confirmPassword && password !== confirmPassword
                          ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/50'
                          : 'border-gray-700/50 hover:border-gray-600/50 focus:ring-blue-500/50 focus:border-blue-500/70'
                      }`}
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500 hover:text-blue-400 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500 hover:text-blue-400 transition-colors" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && password === confirmPassword && (
                    <p className="mt-2 text-xs text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Passwords match
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <div className="relative mt-1">
                    <input
                      type="checkbox"
                      className="sr-only"
                      id="terms"
                      required
                      disabled={loading}
                    />
                    <label htmlFor="terms" className="flex items-center cursor-pointer">
                      <div className="w-5 h-5 bg-gray-900/60 border-2 border-gray-600 rounded-md flex items-center justify-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-sm opacity-0 transition-opacity"></div>
                      </div>
                    </label>
                  </div>
                  <label htmlFor="terms" className="text-gray-400 text-sm cursor-pointer select-none">
                    I agree to the{' '}
                    <button type="button" className="text-blue-400 hover:text-blue-300 hover:underline">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-blue-400 hover:text-blue-300 hover:underline">
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 group mt-8 ${
                    loading || !name || !email || !password || !confirmPassword
                      ? 'bg-gray-800 cursor-not-allowed text-gray-400'
                      : 'bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 border-2 border-gray-700 hover:border-blue-500/50 hover:scale-[1.02]'
                  }`}
                  type="submit"
                  disabled={loading || !name || !email || !password || !confirmPassword}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700/50"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-6 bg-gray-900/80 text-gray-500 text-sm">Or sign up with</span>
                </div>
              </div>

              {/* Social Sign Up */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <button
                  className="py-3.5 px-4 bg-gray-900/40 hover:bg-gray-800/60 rounded-xl border-2 border-gray-700/50 transition-all duration-200 group hover:scale-[1.02]"
                  disabled={loading}
                  type="button"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded"></div>
                    <span className="text-gray-300 font-medium">Google</span>
                  </div>
                </button>
                <button
                  className="py-3.5 px-4 bg-gray-900/40 hover:bg-gray-800/60 rounded-xl border-2 border-gray-700/50 transition-all duration-200 group hover:scale-[1.02]"
                  disabled={loading}
                  type="button"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-300 rounded"></div>
                    <span className="text-gray-300 font-medium">GitHub</span>
                  </div>
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <button
                    onClick={() => onToggleForm()}
                    className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors"
                    disabled={loading}
                    type="button"
                  >
                    Sign in instead
                  </button>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-black/30 border-t border-gray-800/50">
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  By signing up, you agree to our 7-day premium trial. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
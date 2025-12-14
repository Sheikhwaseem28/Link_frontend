import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight, Link as LinkIcon, Zap, BarChart3, Shield } from 'lucide-react';

const LoginForm = ({ onToggleForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user));
            navigate({ to: "/dashboard" });
            console.log("Sign in success");
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && email && password && !loading) {
            handleSubmit(e);
        }
    };

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
                                <LinkIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    LinkZipp
                                </h1>
                                <p className="text-gray-400 mt-2">Professional URL Shortener</p>
                            </div>
                        </div>
                        
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Shorten Links,<br />
                            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                Amplify Results
                            </span>
                        </h2>
                        
                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
                            Transform long URLs into short, memorable links with powerful analytics, 
                            custom branding, and enterprise-grade security.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Lightning Fast</h3>
                                <p className="text-gray-400 text-sm">Instant URL shortening & redirection</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Advanced Analytics</h3>
                                <p className="text-gray-400 text-sm">Track clicks, locations, and devices</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
                                <Shield className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">Secure & Reliable</h3>
                                <p className="text-gray-400 text-sm">HTTPS encryption & 99.9% uptime</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12 flex items-center gap-6 text-gray-500">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm">Trusted by 50K+ users</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">10M+ links shortened</span>
                        </div>
                    </div>
                </div>

                {/* Divider Line (Desktop only) */}
                <div className="hidden lg:block w-px h-[600px] bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

                {/* Right Panel - Login Form */}
                <div className="w-full max-w-md lg:max-w-xl xl:max-w-lg">
                    {/* Login Card - Increased size for desktop */}
                    <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/30 overflow-hidden">
                        <div className="p-8 sm:p-10 lg:p-12">
                            {/* Mobile/Tablet Header */}
                            <div className="lg:hidden mb-8">
                                <div className="flex items-center justify-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                                        <LinkIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-white">LinkZipp</h1>
                                </div>
                                <h2 className="text-2xl font-bold text-white text-center mb-4">
                                    Welcome Back
                                </h2>
                                <p className="text-gray-400 text-center">
                                    Sign in to access your dashboard
                                </p>
                            </div>

                            {/* Desktop Header */}
                            <div className="hidden lg:block mb-10">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
                                    Sign In to LinkZipp
                                </h2>
                                <p className="text-gray-400">
                                    Access your dashboard and manage your links
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

                            <form onSubmit={handleSubmit} className="space-y-8">
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
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="block text-gray-300 text-base font-medium ml-1" htmlFor="password">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                                        </div>
                                        <input
                                            className="w-full pl-12 pr-12 py-4 text-base bg-gray-900/40 border-2 border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 transition-all duration-300 hover:border-gray-600/50"
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            required
                                            disabled={loading}
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
                                </div>

                                {/* Remember Me & Submit */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                disabled={loading}
                                            />
                                            <div className="w-5 h-5 bg-gray-900/60 border-2 border-gray-600 rounded-md flex items-center justify-center">
                                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-sm opacity-0 transition-opacity"></div>
                                            </div>
                                        </div>
                                        <span className="text-gray-300 text-sm select-none">Remember me</span>
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 group ${
                                        loading || !email || !password
                                            ? 'bg-gray-800 cursor-not-allowed text-gray-400'
                                            : 'bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 border-2 border-gray-700 hover:border-blue-500/50 hover:scale-[1.02]'
                                    }`}
                                    type="submit"
                                    disabled={loading || !email || !password}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                            <span>Signing In...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
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
                                    <span className="px-6 bg-gray-900/80 text-gray-500 text-sm">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <button
                                    className="py-3.5 px-4 bg-gray-900/40 hover:bg-gray-800/60 rounded-xl border-2 border-gray-700/50 transition-all duration-200 group hover:scale-[1.02]"
                                    disabled={loading}
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded"></div>
                                        <span className="text-gray-300 font-medium">Google</span>
                                    </div>
                                </button>
                                <button
                                    className="py-3.5 px-4 bg-gray-900/40 hover:bg-gray-800/60 rounded-xl border-2 border-gray-700/50 transition-all duration-200 group hover:scale-[1.02]"
                                    disabled={loading}
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="w-6 h-6 bg-gradient-to-br from-gray-100 to-gray-300 rounded"></div>
                                        <span className="text-gray-300 font-medium">GitHub</span>
                                    </div>
                                </button>
                            </div>

                            {/* Register Link */}
                            <div className="text-center">
                                <p className="text-gray-400">
                                    Don't have an account?{' '}
                                    <button
                                        onClick={() => onToggleForm()}
                                        className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-colors"
                                        disabled={loading}
                                        type="button"
                                    >
                                        Sign up now
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
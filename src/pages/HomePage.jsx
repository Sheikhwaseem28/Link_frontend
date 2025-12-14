import React from 'react';
import UrlForm from '../components/UrlForm';
import { Link as LinkIcon, Zap, BarChart3, Shield, Globe, Sparkles, Clock, Users } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-gray-700/5 to-gray-900/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-black/10 via-transparent to-black/10 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-2xl shadow-blue-500/30">
            <LinkIcon className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Shorten Links,
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Amplify Reach
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Transform long URLs into short, powerful links with advanced analytics, 
            custom branding, and enterprise-grade security.
          </p>
        </div>

        {/* Main URL Form Container */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/30 p-6 sm:p-8 md:p-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Start Shortening Now
              </h2>
              <p className="text-gray-400">
                Paste your long URL below and get a short link instantly
              </p>
            </div>
            
            <UrlForm />
            
            {/* Stats Bar */}
            <div className="mt-10 pt-8 border-t border-gray-700/50">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">50K+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">10M+</div>
                  <div className="text-gray-400 text-sm">Links Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">99.9%</div>
                  <div className="text-gray-400 text-sm">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-gray-400 text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
            Why Choose <span className="text-cyan-400">LinkZipp</span>?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">
                Instant URL shortening with sub-second response times. No waiting, just results.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Advanced Analytics</h3>
              <p className="text-gray-400 leading-relaxed">
                Track clicks, locations, devices, and referral sources with detailed insights.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure & Reliable</h3>
              <p className="text-gray-400 leading-relaxed">
                HTTPS encryption, password protection, and 99.9% uptime guarantee.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Custom Domains</h3>
              <p className="text-gray-400 leading-relaxed">
                Use your own domain for branded short links that match your business.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-yellow-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Link Expiration</h3>
              <p className="text-gray-400 leading-relaxed">
                Set expiration dates for temporary links and maintain control over your content.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/30 hover:border-pink-500/30 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Team Collaboration</h3>
              <p className="text-gray-400 leading-relaxed">
                Share links with team members, set permissions, and collaborate effectively.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 mb-10 text-center">
          <div className="bg-gradient-to-r from-gray-800/30 via-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/30 max-w-4xl mx-auto">
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Links?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of businesses and individuals who trust LinkZipp for their URL shortening needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105">
                Get Started Free
              </button>
              <button className="px-8 py-3.5 rounded-xl bg-gray-800/50 text-gray-300 font-semibold hover:bg-gray-800 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 hover:scale-105">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-gray-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">LinkZipp</h3>
                <p className="text-gray-500 text-sm">Professional URL Shortener</p>
              </div>
            </div>
            
            <div className="text-gray-500 text-sm text-center md:text-right">
              <p>© {new Date().getFullYear()} LinkZipp. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ for the community</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
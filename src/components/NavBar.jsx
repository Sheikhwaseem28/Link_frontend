import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, Link as LinkIcon, User, ChevronDown, LogIn, UserPlus, Home } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isAuthenticated = false; // Change this based on your auth state

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 to-black shadow-2xl shadow-blue-900/10 backdrop-blur-sm border-b border-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-300">
                  <LinkIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-300 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  LinkZipp
                </h1>
                <p className="text-xs text-gray-400 hidden lg:block">
                  URL Shortener
                </p>
              </div>
            </Link>
          </div>

          {/* Auth Buttons & User Menu */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-200 text-sm font-medium">John Doe</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 z-10">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <div className="border-t border-gray-800 my-2"></div>
                      <button
                        className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
                        onClick={() => {
                          // Handle logout
                          setIsUserMenuOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile User Icon */}
                <div className="md:hidden">
                  <Link
                    to="/dashboard"
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-300" />
                  </Link>
                </div>
              </>
            ) : (
              <>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Simplified */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 animate-slideDown">
          <div className="px-4 py-3 space-y-1">
            

            {/* Mobile User Menu (if logged in) */}
            {isAuthenticated && (
              <>
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-gray-400 text-sm">Pro Plan</p>
                    </div>
                  </div>
                  
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="block px-4 py-3.5 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  
                  <button
                    className="block w-full text-left px-4 py-3.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 transition-all duration-200 font-medium"
                    onClick={() => {
                      // Handle logout
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
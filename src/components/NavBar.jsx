import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from '@tanstack/react-router';
import { Menu, X, Link as LinkIcon, User, ChevronDown, LogIn, UserPlus, Home, LogOut } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, logoutUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login } from '../store/slice/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const reduxUser = useSelector((state) => state.auth.user);

  const isAuthPage = location.pathname.startsWith('/auth');

  const { data: userData } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });

  // Sync server state with Redux
  React.useEffect(() => {
    if (userData?.user && JSON.stringify(userData.user) !== JSON.stringify(reduxUser)) {
      dispatch(login(userData.user));
    }
  }, [userData, dispatch, reduxUser]);

  const user = reduxUser || userData?.user;
  const isAuthenticated = !!user;

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      localStorage.removeItem("token"); // Clear token
      queryClient.clear(); // Clear all RQ cache
      dispatch(logout());
      navigate({ to: '/' });
      setIsUserMenuOpen(false);
      setIsMenuOpen(false);
    }
  };

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
          {!isAuthPage && (
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
                        <div className="p-4 border-b border-gray-800">
                          <p className="text-sm font-medium text-white">{user?.name}</p>
                          <p className="text-xs text-gray-400 mt-1 truncate">{user?.email}</p>
                        </div>
                        <button
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors text-left"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Mobile User Icon */}
                  <div className="md:hidden relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      <User className="w-5 h-5 text-gray-300" />
                    </button>

                    {/* Dropdown Menu (Mobile) */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl py-2 z-10">
                        <div className="p-4 border-b border-gray-800">
                          <p className="text-sm font-medium text-white">{user?.name}</p>
                          <p className="text-xs text-gray-400 mt-1 truncate">{user?.email}</p>
                        </div>
                        <button
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors text-left"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/auth"
                    className="px-4 py-2 text-sm text-gray-300 hover:text-white font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                  >
                    Get Started
                  </Link>
                </div>
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
          )}
        </div>
      </div>

      {/* Mobile Menu - Simplified */}
      {!isAuthPage && isMenuOpen && (
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
                      <p className="text-white font-medium">{user?.name || 'User'}</p>
                      <p className="text-gray-400 text-sm bg-transparent">Logged In</p>
                    </div>
                  </div>

                  <button
                    className="block w-full text-left px-4 py-3.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-gray-800 transition-all duration-200 font-medium flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
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
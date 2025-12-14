import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';
import { Link as LinkIcon, BarChart3, Zap, Clock, Users, Shield, Copy, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  // Mock data for dashboard stats
  const dashboardStats = [
    { label: 'Total Links', value: '1,247', icon: LinkIcon, color: 'from-blue-500 to-cyan-400', change: '+12.5%' },
    { label: 'Clicks Today', value: '3,845', icon: TrendingUp, color: 'from-green-500 to-emerald-400', change: '+8.2%' },
    { label: 'Active Links', value: '892', icon: Zap, color: 'from-amber-500 to-orange-400', change: '+5.7%' },
    { label: 'Avg. CTR', value: '4.8%', icon: BarChart3, color: 'from-purple-500 to-pink-400', change: '+1.3%' },
  ];

  const recentActivities = [
    { url: 'https://example.com/long-url-1', shortUrl: 'linkzipp.co/abc123', clicks: 234, time: '2 hours ago' },
    { url: 'https://example.com/long-url-2', shortUrl: 'linkzipp.co/xyz789', clicks: 156, time: '5 hours ago' },
    { url: 'https://example.com/long-url-3', shortUrl: 'linkzipp.co/def456', clicks: 89, time: '1 day ago' },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-4 sm:p-6 lg:p-8">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-gray-700/5 to-gray-900/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Welcome back! Here's your link analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-all duration-200 border border-gray-700/50 flex items-center gap-2">
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Export Data</span>
              </button>
              <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-lg text-white transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                <span className="hidden sm:inline">New Link</span>
                <span className="sm:hidden">+</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
            {dashboardStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-green-400 text-sm font-medium bg-green-900/20 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - URL Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/30 overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                    <LinkIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Create New Short Link</h2>
                    <p className="text-gray-400 text-sm">Generate a shortened URL instantly</p>
                  </div>
                </div>
                
                <UrlForm />
              </div>
            </div>

            {/* User URLs Section */}
            <div className="mt-6 lg:mt-8">
              <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/30 overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">Your Links</h2>
                      <p className="text-gray-400 text-sm">Manage and track your shortened URLs</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Updated just now</span>
                    </div>
                  </div>
                  
                  <UserUrl />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Analytics & Recent Activity */}
          <div className="space-y-6 lg:space-y-8">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/30 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Performance Overview</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Unique Visitors</p>
                      <p className="text-white font-semibold">1,842</p>
                    </div>
                  </div>
                  <span className="text-green-400 text-sm">+15%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Secure Links</p>
                      <p className="text-white font-semibold">324</p>
                    </div>
                  </div>
                  <span className="text-green-400 text-sm">+8%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Clicks</p>
                      <p className="text-white font-semibold">8,427</p>
                    </div>
                  </div>
                  <span className="text-green-400 text-sm">+22%</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/30 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Recent Activity</h3>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{activity.url}</p>
                        <p className="text-cyan-400 text-sm truncate">{activity.shortUrl}</p>
                      </div>
                      <div className="ml-2 flex items-center gap-2">
                        <span className="text-green-400 text-sm font-medium">{activity.clicks}</span>
                        <span className="text-gray-400 text-xs">clicks</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">{activity.time}</span>
                      <button className="text-blue-400 hover:text-blue-300 text-xs transition-colors">
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2.5 text-center text-gray-400 hover:text-white bg-gray-900/30 hover:bg-gray-800/50 rounded-lg border border-gray-700/30 transition-all duration-200">
                View All Activity
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/30 p-6 sm:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-gray-900/30 hover:bg-gray-800/50 rounded-lg border border-gray-700/30 transition-all duration-200 hover:scale-[1.02] group">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Copy className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-300 text-sm">Bulk Create</p>
                  </div>
                </button>

                <button className="p-3 bg-gray-900/30 hover:bg-gray-800/50 rounded-lg border border-gray-700/30 transition-all duration-200 hover:scale-[1.02] group">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-300 text-sm">Analytics</p>
                  </div>
                </button>

                <button className="p-3 bg-gray-900/30 hover:bg-gray-800/50 rounded-lg border border-gray-700/30 transition-all duration-200 hover:scale-[1.02] group">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-300 text-sm">Security</p>
                  </div>
                </button>

                <button className="p-3 bg-gray-900/30 hover:bg-gray-800/50 rounded-lg border border-gray-700/30 transition-all duration-200 hover:scale-[1.02] group">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-300 text-sm">Settings</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 lg:mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Need help? Check out our <a href="#" className="text-blue-400 hover:text-blue-300">documentation</a> or <a href="#" className="text-blue-400 hover:text-blue-300">contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
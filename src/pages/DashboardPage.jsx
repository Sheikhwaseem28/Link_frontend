import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrls } from '../api/user.api';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';
import { Link as LinkIcon, BarChart3, Zap, TrendingUp, ExternalLink, Clock } from 'lucide-react';

const DashboardPage = () => {
  const { data: urls } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    staleTime: 0,
  });

  const userUrls = urls?.urls || [];

  // Calculate real stats
  const totalLinks = userUrls.length;
  const totalClicks = userUrls.reduce((sum, url) => sum + (url.clicks || 0), 0);
  const avgClicks = totalLinks > 0 ? Math.round(totalClicks / totalLinks) : 0;

  // Stats array
  const dashboardStats = [
    { label: 'Total Links', value: totalLinks.toLocaleString(), icon: LinkIcon, color: 'from-blue-500 to-cyan-400' },
    { label: 'Total Clicks', value: totalClicks.toLocaleString(), icon: TrendingUp, color: 'from-green-500 to-emerald-400' },
    { label: 'Active Links', value: totalLinks.toLocaleString(), icon: Zap, color: 'from-amber-500 to-orange-400' }, // Assuming all are active
    { label: 'Avg. Clicks', value: avgClicks.toLocaleString(), icon: BarChart3, color: 'from-purple-500 to-pink-400' },
  ];

  // Get recent activities (top 5 sorted by date)
  // Assuming the API returns them sorted, or we sort them here if needed. 
  // The API `getUrlsByUserId` usually sorts by createdAt -1.
  const recentActivities = userUrls.slice(0, 5);
  const BACKEND_URL = "https://link-backend-phi.vercel.app"; // Consistent with UserUrl.jsx

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
          <div className="col-span-1 lg:col-span-3">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
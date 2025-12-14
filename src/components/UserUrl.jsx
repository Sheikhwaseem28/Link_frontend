import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'
import { Copy, Link as LinkIcon, ExternalLink, BarChart3, Calendar, Clock, Users, Eye, Trash2, Edit3, QrCode, Shield, Filter, Search, ChevronUp, ChevronDown } from 'lucide-react'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  })

  const [copiedId, setCopiedId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [expandedId, setExpandedId] = useState(null)

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (urlId) => {
    // Implement delete functionality
    console.log('Delete URL:', urlId)
  }

  const handleEdit = (urlId) => {
    // Implement edit functionality
    console.log('Edit URL:', urlId)
  }

  const handleGenerateQR = (urlId) => {
    // Implement QR code generation
    console.log('Generate QR for:', urlId)
  }

  // Filter and sort URLs
  const filteredUrls = urls?.urls
    ?.filter(url => 
      url.full_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.short_url.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      switch (sortBy) {
        case 'clicks':
          return b.clicks - a.clicks
        case 'alphabetical':
          return a.full_url.localeCompare(b.full_url)
        case 'recent':
        default:
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }
    }) || []

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <LinkIcon className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <p className="text-gray-400 text-lg">Loading your links...</p>
        <p className="text-gray-500 text-sm">Fetching your shortened URLs</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-6 bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-700/30 rounded-2xl animate-fadeIn">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-red-300">Error Loading URLs</h3>
        </div>
        <p className="text-red-200 mb-4">{error.message || 'Failed to load your shortened URLs'}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded-lg border border-red-700/30 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    )
  }

  if (!urls?.urls || urls.urls.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/30">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-6">
          <LinkIcon className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">No URLs Created Yet</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          You haven't created any shortened URLs. Start by entering a long URL above to create your first short link.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 inline-flex items-center gap-2">
          <LinkIcon className="w-5 h-5" />
          Create Your First Link
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Your Links</h2>
          <p className="text-gray-400">
            {filteredUrls.length} {filteredUrls.length === 1 ? 'link' : 'links'} • Total clicks: {filteredUrls.reduce((sum, url) => sum + (url.clicks || 0), 0)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900/40 border border-gray-700/50 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 transition-all duration-300"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full sm:w-auto px-4 py-2.5 bg-gray-900/40 border border-gray-700/50 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 transition-all duration-300 pr-10"
            >
              <option value="recent">Most Recent</option>
              <option value="clicks">Most Clicks</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* URLs Grid/List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredUrls.map((url) => (
          <div 
            key={url._id}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 overflow-hidden hover:border-gray-600/50 transition-all duration-300"
          >
            {/* URL Summary Row */}
            <div className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* URL Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                      <LinkIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 truncate mb-1">Original URL</p>
                      <p className="text-gray-300 truncate">{url.full_url}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ml-13">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-500 mb-1">Short URL</p>
                      <div className="flex items-center gap-2">
                        <a
                          href={`http://localhost:3000/${url.short_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 hover:underline truncate"
                        >
                          localhost:3000/{url.short_url}
                        </a>
                        <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Eye className="w-4 h-4 text-blue-400" />
                          <span className="text-xl font-bold text-white">{url.clicks || 0}</span>
                        </div>
                        <span className="text-xs text-gray-500">Clicks</span>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-300">{formatDate(url.createdAt)}</span>
                        </div>
                        <span className="text-xs text-gray-500">Created</span>
                      </div>

                      <div className="text-center hidden sm:block">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Shield className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-300">Active</span>
                        </div>
                        <span className="text-xs text-gray-500">Status</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      copiedId === url._id
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                    title={copiedId === url._id ? 'Copied!' : 'Copy URL'}
                  >
                    {copiedId === url._id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    onClick={() => setExpandedId(expandedId === url._id ? null : url._id)}
                    className="p-2.5 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                    title={expandedId === url._id ? 'Show less' : 'Show more'}
                  >
                    {expandedId === url._id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedId === url._id && (
              <div className="border-t border-gray-700/30 bg-gray-900/30 p-5 animate-slideDown">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Analytics */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total Clicks</span>
                        <span className="text-white font-semibold">{url.clicks || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Last Click</span>
                        <span className="text-gray-300 text-sm">{url.lastClick ? formatDate(url.lastClick) : 'Never'}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Created</span>
                        <span className="text-gray-300 text-sm">{formatDate(url.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleEdit(url._id)}
                        className="p-2.5 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span className="text-xs">Edit</span>
                      </button>
                      <button
                        onClick={() => handleGenerateQR(url._id)}
                        className="p-2.5 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1"
                      >
                        <QrCode className="w-4 h-4" />
                        <span className="text-xs">QR Code</span>
                      </button>
                      <button
                        onClick={() => window.open(`http://localhost:3000/${url.short_url}`, '_blank')}
                        className="p-2.5 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-xs">Visit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(url._id)}
                        className="p-2.5 bg-red-900/20 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-xs">Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Share Options */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Share</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCopy(`http://localhost:3000/${url.short_url}`, url._id)}
                        className="w-full p-2.5 bg-blue-900/20 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all duration-200 text-sm"
                      >
                        Copy Link to Clipboard
                      </button>
                      <button
                        onClick={() => {
                          const text = `Check out this link: http://localhost:3000/${url.short_url}`;
                          navigator.clipboard.writeText(text);
                        }}
                        className="w-full p-2.5 bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 text-sm"
                      >
                        Copy with Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredUrls.length === 0 && searchTerm && (
        <div className="text-center py-12 px-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/30">
          <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Links Found</h3>
          <p className="text-gray-400">
            No URLs match "{searchTerm}". Try a different search term.
          </p>
        </div>
      )}

      {/* Footer Stats */}
      <div className="pt-6 border-t border-gray-700/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
            <div className="text-2xl font-bold text-white mb-1">
              {filteredUrls.length}
            </div>
            <div className="text-gray-400 text-sm">Total Links</div>
          </div>
          <div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
            <div className="text-2xl font-bold text-white mb-1">
              {filteredUrls.reduce((sum, url) => sum + (url.clicks || 0), 0)}
            </div>
            <div className="text-gray-400 text-sm">Total Clicks</div>
          </div>
          <div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
            <div className="text-2xl font-bold text-white mb-1">
              {Math.round(filteredUrls.reduce((sum, url) => sum + (url.clicks || 0), 0) / filteredUrls.length) || 0}
            </div>
            <div className="text-gray-400 text-sm">Avg. Clicks</div>
          </div>
          <div className="text-center p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
            <div className="text-2xl font-bold text-white mb-1">
              {new Set(filteredUrls.map(url => new Date(url.createdAt).toDateString())).size}
            </div>
            <div className="text-gray-400 text-sm">Active Days</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserUrl;
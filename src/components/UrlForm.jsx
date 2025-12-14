import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { QueryClient } from '@tanstack/react-query'
import { queryClient } from '../main'
import { Copy, Link as LinkIcon, Zap, Shield, Lock, Sparkles, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react'

const UrlForm = () => {
  
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState()
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const [customSlug, setCustomSlug] = useState("")
  const [isSecure, setIsSecure] = useState(false)
  const [loading, setLoading] = useState(false)
  const {isAuthenticated} = useSelector((state) => state.auth)

  const handleSubmit = async () => {
    if (!url) {
      setError("Please enter a URL to shorten");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (err) {
      setError("Please enter a valid URL (include http:// or https://)");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await createShortUrl(url, customSlug);
      setShortUrl(response.shortUrl || response);
      queryClient.invalidateQueries({queryKey: ['userUrls']});
    } catch (err) {
      setError(err.message || "Failed to create short URL. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = () => {
    if (!shortUrl) return;
    
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const handleClear = () => {
    setUrl("");
    setShortUrl(null);
    setCustomSlug("");
    setError(null);
  }

  const handleVisit = () => {
    if (shortUrl) {
      window.open(shortUrl, '_blank', 'noopener,noreferrer');
    }
  }

  // Auto-detect if URL starts with https
  const handleUrlChange = (value) => {
    setUrl(value);
    if (value.startsWith('https://')) {
      setIsSecure(true);
    } else if (value.startsWith('http://')) {
      setIsSecure(false);
    }
  }

  // Check if URL is valid for submission
  const isValidUrl = url && (url.startsWith('http://') || url.startsWith('https://'));

  return (
    <div className="space-y-6">
      {/* URL Input Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="url" className="block text-sm font-medium text-gray-300">
            Enter Long URL
          </label>
          {isSecure && (
            <div className="flex items-center gap-1 text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded-full">
              <Shield className="w-3 h-3" />
              <span>Secure (HTTPS)</span>
            </div>
          )}
        </div>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LinkIcon className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com/very-long-url-path"
            required
            className="w-full pl-10 pr-4 py-3.5 bg-gray-900/40 border-2 border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 transition-all duration-300 hover:border-gray-600/50"
          />
        </div>

        {/* URL Preview */}
        {isValidUrl && (
          <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
            <p className="text-xs text-gray-400 mb-1">URL Preview</p>
            <p className="text-sm text-gray-300 truncate">{url}</p>
          </div>
        )}
      </div>

      {/* Custom Slug - Only for authenticated users */}
      {isAuthenticated && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="customSlug" className="block text-sm font-medium text-gray-300">
              Custom Short Link
            </label>
            <span className="text-xs text-gray-500">Optional</span>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">linkzipp.co/</span>
                </div>
                <input
                  type="text"
                  id="customSlug"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  placeholder="my-custom-link"
                  className="w-full pl-28 pr-4 py-3.5 bg-gray-900/40 border-2 border-gray-700/50 rounded-xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/70 transition-all duration-300 hover:border-gray-600/50"
                />
              </div>
            </div>
            <button
              onClick={() => setCustomSlug("")}
              className="px-4 py-3.5 bg-gray-800/50 hover:bg-gray-800 rounded-xl border border-gray-700/50 text-gray-400 hover:text-white transition-colors duration-200"
              type="button"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-xs text-gray-500">
            Only letters, numbers, and hyphens allowed. Max 20 characters.
          </p>
        </div>
      )}

      {/* Security Option */}
      {isAuthenticated && (
        <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={isSecure}
                onChange={(e) => setIsSecure(e.target.checked)}
                className="sr-only"
              />
              <div className="w-5 h-5 bg-gray-900/60 border-2 border-gray-600 rounded-md flex items-center justify-center">
                {isSecure && (
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-sm"></div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 font-medium">Enable Password Protection</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Require a password to access this shortened link
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-700/30 rounded-xl animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-red-300 text-sm flex-1">{error}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={handleClear}
          type="button"
          className="py-3.5 px-4 bg-gray-800/50 hover:bg-gray-800 rounded-xl text-gray-300 hover:text-white transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50 flex items-center justify-center gap-2"
          disabled={loading && !url && !shortUrl}
        >
          <RefreshCw className="w-5 h-5" />
          <span>Clear</span>
        </button>
        
        <button
          onClick={handleSubmit}
          type="submit"
          disabled={loading || !isValidUrl}
          className={`py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
            loading || !isValidUrl
              ? 'bg-gray-800 cursor-not-allowed text-gray-400'
              : 'bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 border-2 border-gray-700 hover:border-blue-500/50 hover:scale-[1.02]'
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Shortening...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Shorten URL</span>
            </>
          )}
        </button>
      </div>

      {/* Shortened URL Result */}
      {shortUrl && (
        <div className="mt-6 p-5 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 animate-slideDown">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Your Short Link is Ready!</h3>
              <p className="text-gray-400 text-sm">Copy and share anywhere</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Short URL Display */}
            <div className="bg-gray-900/40 rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Successfully Generated</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-cyan-400 font-medium truncate text-lg">{shortUrl}</p>
                    <p className="text-gray-500 text-xs mt-1 truncate">Redirects to: {url}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={handleVisit}
                      className="p-2 bg-gray-800/50 hover:bg-gray-800 rounded-lg text-gray-300 hover:text-white transition-colors border border-gray-700/50"
                      title="Visit URL"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 border-t border-gray-700/50">
                <button
                  onClick={handleCopy}
                  className={`p-3.5 transition-all duration-200 flex items-center justify-center gap-2 ${
                    copied 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-gray-800/30 text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span className="font-medium">Copy Link</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    const text = `Check out this link: ${shortUrl}`;
                    navigator.clipboard.writeText(text);
                  }}
                  className="p-3.5 bg-gray-800/30 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors border-l border-gray-700/50 flex items-center justify-center gap-2"
                >
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Preview */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <div className="text-xl font-bold text-white mb-1">0</div>
                <div className="text-gray-500 text-xs">Clicks</div>
              </div>
              <div className="text-center p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <div className="text-xl font-bold text-white mb-1">New</div>
                <div className="text-gray-500 text-xs">Status</div>
              </div>
              <div className="text-center p-3 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <div className="text-xl font-bold text-white mb-1">∞</div>
                <div className="text-gray-500 text-xs">Expires</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Hint */}
      {isAuthenticated && (
        <div className="mt-6 p-4 bg-gray-900/20 rounded-xl border border-dashed border-gray-700/50">
          <p className="text-gray-400 text-sm text-center">
            <span className="text-cyan-400 font-medium">Pro Tip:</span> Upgrade to Premium for advanced features like custom domains, QR codes, and detailed analytics.
          </p>
        </div>
      )}
    </div>
  )
}

export default UrlForm
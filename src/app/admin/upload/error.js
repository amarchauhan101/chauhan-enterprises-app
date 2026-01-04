'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home, Upload, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Upload Error:', error)
  }, [error])

  const getErrorMessage = () => {
    if (error?.message?.includes('file size')) {
      return {
        title: 'File Too Large',
        description: 'The file you\'re trying to upload exceeds the maximum size limit. Please choose a smaller file or compress your image.',
        suggestion: 'Maximum file size: 5MB'
      }
    }
    if (error?.message?.includes('file type') || error?.message?.includes('format')) {
      return {
        title: 'Invalid File Format',
        description: 'The file format you\'re trying to upload is not supported. Please use JPG, PNG, or WebP files.',
        suggestion: 'Supported formats: .jpg, .png, .webp'
      }
    }
    if (error?.message?.includes('network') || error?.message?.includes('connection')) {
      return {
        title: 'Network Error',
        description: 'There was a problem connecting to the server. Please check your internet connection and try again.',
        suggestion: 'Check your internet connection'
      }
    }
    if (error?.message?.includes('storage') || error?.message?.includes('space')) {
      return {
        title: 'Storage Full',
        description: 'The server storage is full. Please contact the administrator or try again later.',
        suggestion: 'Contact system administrator'
      }
    }
    
    return {
      title: 'Upload Failed',
      description: 'Something went wrong during the upload process. Please try again or contact support if the problem persists.',
      suggestion: 'Try refreshing the page'
    }
  }

  const errorInfo = getErrorMessage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto"></div>
        </div>

        {/* Error Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {errorInfo.title}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {errorInfo.description}
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">
                  {errorInfo.suggestion}
                </p>
                {error?.message && (
                  <p className="text-xs text-red-600 mt-1 font-mono">
                    Error: {error.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={reset}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            
            <Link 
              href="/admin/upload"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              <Upload className="w-5 h-5" />
              Back to Upload
            </Link>

            <Link 
              href="/admin"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Admin Dashboard
            </Link>

            <Link 
              href="/"
              className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If this error continues to occur, please contact support with the error details above.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a 
                href="mailto:support@yoursite.com" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                Email Support
              </a>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <a 
                href="/help" 
                className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
              >
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

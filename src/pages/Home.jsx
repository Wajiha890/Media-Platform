import React from 'react'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Media Platform 🎬
      </h1>
      <p className="text-gray-600 mb-8">
        Your video sharing platform is being built...
      </p>
      <div className="space-x-4">
        <a 
          href="/login" 
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Get Started
        </a>
        <a 
          href="/explore" 
          className="inline-block px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Explore
        </a>
      </div>
    </div>
  )
}

export default Home
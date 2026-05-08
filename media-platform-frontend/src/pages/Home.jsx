import React from 'react'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Media Platform 🎬
      </h1>
      <p className="text-gray-600 mb-8">
        Your video sharing platform is being built...
      </p>
      <div className="space-x-4">
        <a href="/login" className="btn btn-primary">
          Get Started
        </a>
        <a href="/explore" className="btn btn-secondary">
          Explore
        </a>
      </div>
    </div>
  )
}

export default Home
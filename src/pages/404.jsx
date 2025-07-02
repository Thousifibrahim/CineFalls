import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Modern404Page = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 lg:px-8 max-w-4xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-8xl lg:text-9xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift leading-none">
              404
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full" />
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Oops! Page Not Found
            </h2>
            <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              It seems like you've wandered into uncharted territory. 
              The page you're looking for doesn't exist in our cinematic universe.
            </p>
          </div>

          {/* Illustration */}
          <div className="mb-12">
            <div className="w-48 h-48 lg:w-64 lg:h-64 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full backdrop-blur-sm border border-white/10" />
              <div className="absolute inset-8 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-full" />
              <div className="absolute inset-16 bg-gradient-to-br from-purple-700/40 to-blue-700/40 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 lg:w-20 lg:h-20 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/"
              className="group px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-2xl"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                Back to Home
              </span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="px-10 py-5 border-2 border-white/30 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:border-white hover:bg-white/10 backdrop-blur-sm"
            >
              Go Back
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-16 text-center">
            <p className="text-white/60 text-lg mb-4">
              Need help finding what you're looking for?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Link to="/" className="text-purple-300 hover:text-purple-200 transition-colors underline">
                Browse Movies
              </Link>
              <span className="hidden sm:inline text-white/40">•</span>
              <Link to="/admin" className="text-blue-300 hover:text-blue-200 transition-colors underline">
                Admin Panel
              </Link>
              <span className="hidden sm:inline text-white/40">•</span>
              <button className="text-pink-300 hover:text-pink-200 transition-colors underline bg-transparent border-none cursor-pointer">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default Modern404Page;

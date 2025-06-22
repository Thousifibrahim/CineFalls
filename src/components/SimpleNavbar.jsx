import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const SimpleNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
        : 'bg-white/10 backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6.5c0-.83.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-13c-.83 0-1.5-.67-1.5-1.5v-11zM6 8v8l5-4-5-4z"/>
                </svg>
              </div>
              <span className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                Cinefalls
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                location.pathname === '/' 
                  ? 'bg-white text-black shadow-lg' 
                  : scrolled 
                    ? 'text-gray-700 hover:text-black hover:bg-gray-100/50' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/admin"
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    location.pathname === '/admin'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  Admin Studio
                </Link>
                <button
                  onClick={handleLogout}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    scrolled 
                      ? 'text-gray-700 hover:text-black hover:bg-gray-100/50' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-sm font-medium transition-all duration-300 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 rounded-full transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100/50' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-6 bg-white/95 backdrop-blur-xl rounded-3xl mx-4 mb-4 shadow-xl border border-gray-200/50">
            <div className="space-y-2">
              <Link
                to="/"
                className={`block px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link
                    to="/admin"
                    className={`block px-6 py-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                      location.pathname === '/admin'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white hover:from-purple-600 hover:to-blue-600'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Studio
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-6 py-4 rounded-2xl text-base font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogin();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl text-base font-medium transition-all duration-300 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
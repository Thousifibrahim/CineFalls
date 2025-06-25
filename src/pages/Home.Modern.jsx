import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

const ModernHomePage = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionsRef = useRef([]);

  const sampleMovies = useMemo(() => [
    {
      id: 1,
      title: "Oppenheimer",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      year: 2023,
      genre: "Biography",
      rating: 8.3,
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1920&h=1080&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Spider-Man: Across the Spider-Verse",
      description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.",
      year: 2023,
      genre: "Animation",
      rating: 8.7,
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&h=1200&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&q=80"
    },
    {
      id: 3,
      title: "John Wick: Chapter 4",
      description: "John Wick uncovers a path to defeating The High Table, but before he can earn his freedom.",
      year: 2023,
      genre: "Action",
      rating: 7.7,
      image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1200&fit=crop&q=80",
      backdrop: "https://images.unsplash.com/photo-1489599112768-78e92246b86e?w=1920&h=1080&fit=crop&q=80"
    }
  ], []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "Premium Quality",
      description: "Experience cinema in stunning 4K HDR with Dolby Atmos sound"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7.5v-3L14 12l-3 1.5z"/>
        </svg>
      ),
      title: "Instant Streaming",
      description: "Watch anywhere, anytime with our advanced streaming technology"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: "Curated Collection",
      description: "Handpicked movies and shows from around the world"
    }
  ];

  useEffect(() => {
    setFeaturedMovies(sampleMovies);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sampleMovies.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [sampleMovies]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden mt-20">
        {featuredMovies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
            <img
              src={movie.backdrop}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            {/* Floating particles for current slide */}
            {index === currentSlide && (
              <div className="absolute inset-0 z-5">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${4 + Math.random() * 3}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <div className="animate-fade-in-up">
                <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  Experience
                  <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Cinema
                  </span>
                  In-depth
                </h1>
                <p className="text-xl lg:text-2xl text-white/80 mb-8 leading-relaxed">
                  Discover a new world of entertainment with premium streaming, 
                  curated collections, and cinematic experiences that redefine how you watch.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group px-8 py-4 bg-white text-black rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-2xl">
                    <span className="flex items-center justify-center gap-2">
                      Start Watching
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </span>
                  </button>
                  <button className="px-8 py-4 border-2 border-white/30 text-white rounded-full text-lg font-semibold transition-all duration-300 hover:border-white hover:bg-white/10 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex space-x-3">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={addToRefs}
        data-section="features"
        className="py-32 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${
            isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Why Choose
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Cinefalls
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Engineered for the future of entertainment with cutting-edge technology 
              and an obsession for quality.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group text-center transition-all duration-1000 delay-${index * 200} ${
                  isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl group-hover:scale-110 transition-transform duration-300 shadow-xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl group-hover:scale-105 transition-transform duration-300 delay-75"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  {/* Floating rings around icons */}
                  <div className="absolute -inset-4 border-2 border-purple-300/20 rounded-full animate-pulse"></div>
                  <div className="absolute -inset-8 border border-blue-300/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section 
        ref={addToRefs}
        data-section="movies"
        className="py-32 bg-gray-900 relative overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0),
                             radial-gradient(circle at 75px 75px, white 1px, transparent 0)`,
            backgroundSize: '100px 100px',
            animation: 'float 20s ease-in-out infinite'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className={`mb-20 transition-all duration-1000 ${
            isVisible.movies ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Featured
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Collection
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl">
              Handpicked masterpieces that define the art of storytelling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className={`group cursor-pointer transition-all duration-1000 delay-${index * 200} ${
                  isVisible.movies ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <div className="aspect-[2/3] overflow-hidden relative">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-white font-semibold">{movie.rating}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
                      <p className="text-white/80 text-sm mb-4 line-clamp-3">{movie.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                          {movie.genre}
                        </span>
                        <span className="text-white/70 text-sm">{movie.year}</span>
                      </div>
                      {/* Play button */}
                      <div className="mt-4 flex justify-center">
                        <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors group/play">
                          <svg className="w-6 h-6 text-white group-hover/play:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={addToRefs}
        data-section="cta"
        className="py-32 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-6 lg:px-8">
          <div className={`transition-all duration-1000 ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to Start
              <span className="block bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Your Journey?
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/80 mb-12 leading-relaxed">
              Join millions of viewers who want one streaming platform that brings you closer to the stories you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group px-10 py-5 bg-white text-black rounded-full text-lg font-bold transition-all duration-300 hover:bg-white/90 hover:scale-105 shadow-2xl">
                <span className="flex items-center justify-center gap-3">
                  Get Started Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </span>
              </button>
              <Link
                to="/admin"
                className="px-10 py-5 border-2 border-white/30 text-white rounded-full text-lg font-bold transition-all duration-300 hover:border-white hover:bg-white/10 backdrop-blur-sm"
              >
                Admin Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6.5c0-.83.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-13c-.83 0-1.5-.67-1.5-1.5v-11zM6 8v8l5-4-5-4z"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white">Cinefalls</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                Experience cinema reimagined with premium streaming, curated collections, and cinematic experiences.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: 'Twitter', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  )},
                  { name: 'Instagram', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.528l1.188-.918c.482.628 1.225 1.032 2.017 1.032.792 0 1.535-.404 2.017-1.032l1.188.918c-.757.932-1.908 1.528-3.205 1.528zm7.138 0c-1.297 0-2.448-.596-3.205-1.528l1.188-.918c.482.628 1.225 1.032 2.017 1.032.792 0 1.535-.404 2.017-1.032l1.188.918c-.757.932-1.908 1.528-3.205 1.528z"/>
                    </svg>
                  )},
                  { name: 'YouTube', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )},
                  { name: 'LinkedIn', icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                ].map((social, index) => (
                  <button
                    key={index}
                    onClick={() => {}}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 border-none cursor-pointer"
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-4">
                {['Browse Movies', 'New Releases', 'Top Rated', 'Trending Now', 'Coming Soon'].map((link, index) => (
                  <li key={index}>
                    <button onClick={() => {}} className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group border-none bg-transparent cursor-pointer text-left p-0">
                      <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Support</h3>
              <ul className="space-y-4">
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'DMCA'].map((link, index) => (
                  <li key={index}>
                    <button onClick={() => {}} className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group border-none bg-transparent cursor-pointer text-left p-0">
                      <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Stay Updated</h3>
              <p className="text-gray-400 mb-6">Subscribe to get notified about new releases and exclusive content.</p>
              <div className="space-y-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-r-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">24/7 Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">HD Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <p className="text-gray-400">© 2025 Cinefalls. All rights reserved.</p>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">•</span>
                  <span className="text-sm text-gray-400">Still in Development -</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">All systems operational</span>
                </div>
                <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300 text-sm">
                  🌐 English
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernHomePage;
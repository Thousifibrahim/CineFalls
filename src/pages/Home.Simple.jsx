import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample movies data - making it feel more human and real
  const sampleMovies = [
    {
      id: 1,
      title: "Oppenheimer",
      poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
      rating: 8.4,
      year: 2023,
      genre: "Biography, Drama, History",
      description: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II."
    },
    {
      id: 2,
      title: "Spider-Man: Across the Spider-Verse", 
      poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/nGxUxi3PfXDRm7Vg95VBNgNM8yc.jpg",
      rating: 8.7,
      year: 2023,
      genre: "Animation, Action, Adventure",
      description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People."
    },
    {
      id: 3,
      title: "John Wick: Chapter 4",
      poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      backdrop: "https://image.tmdb.org/t/p/original/h9YlRHAZWOWtGonllmj6JJg1FrE.jpg",
      rating: 7.8,
      year: 2023,
      genre: "Action, Crime, Thriller",
      description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy."
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setFeaturedMovies(sampleMovies);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading amazing movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      
      {/* Hero Section - Clean and Simple */}
      <section className="relative bg-gradient-to-r from-blue-800 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to CineFalls
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover amazing movies, create your watchlist, and enjoy the best cinema experience.
            </p>
            <div className="space-x-4">
              <Link 
                to="/movies" 
                className="bg-white text-blue-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Movies
              </Link>
              <Link 
                to="/search" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Movies</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMovies.map(movie => (
            <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.title}</h3>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="text-gray-600 ml-1">{movie.rating}/10</span>
                  <span className="text-gray-400 ml-4">{movie.year}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{movie.genre}</p>
                <p className="text-gray-700 mb-4">{movie.description}</p>
                <Link 
                  to={`/movie/${movie.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose CineFalls?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-2">Huge Movie Collection</h3>
              <p className="text-gray-600">Access thousands of movies from all genres and time periods.</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Personal Watchlist</h3>
              <p className="text-gray-600">Save movies you want to watch and track your viewing progress.</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-2">Favorites & Reviews</h3>
              <p className="text-gray-600">Mark your favorite movies and read reviews from other movie lovers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Movie Journey?</h2>
          <p className="text-xl mb-8">Join thousands of movie enthusiasts and discover your next favorite film.</p>
          <Link 
            to="/movies" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
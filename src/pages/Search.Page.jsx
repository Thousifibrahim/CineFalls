import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext';
import DefaultLayoutHoc from '../layout/Default.layout';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  Clock, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { BiHeart, BiPlay, BiShare } from 'react-icons/bi';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { movies: adminMovies } = useAdmin();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    genre: 'all',
    year: 'all',
    rating: 'all',
    sortBy: 'popularity'
  });
  const [showFilters, setShowFilters] = useState(false);

  const genres = [
    { id: 'all', name: 'All Genres' },
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' }
  ];

  const isApiConfigured = process.env.REACT_APP_API_KEY && 
    process.env.REACT_APP_API_KEY !== "your_tmdb_api_key_here";

  useEffect(() => {
    if (searchQuery) {
      performSearch();
    }
  }, [searchQuery, filters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      let results = [];
      
      // Search admin movies
      const adminResults = adminMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Search TMDB if API is configured
      if (isApiConfigured && searchQuery.trim()) {
        try {
          const response = await axios.get(`/search/movie?query=${encodeURIComponent(searchQuery)}`);
          results = [...adminResults, ...response.data.results];
        } catch (error) {
          console.error('TMDB search failed:', error);
          results = adminResults;
        }
      } else {
        results = adminResults;
      }

      // Apply filters
      results = applyFilters(results);
      
      // Remove duplicates
      const uniqueResults = results.filter((movie, index, self) => 
        index === self.findIndex(m => m.title === movie.title)
      );

      setSearchResults(uniqueResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (movies) => {
    let filtered = [...movies];

    // Genre filter
    if (filters.genre !== 'all') {
      filtered = filtered.filter(movie => 
        movie.genre_ids && movie.genre_ids.includes(parseInt(filters.genre))
      );
    }

    // Year filter
    if (filters.year !== 'all') {
      filtered = filtered.filter(movie => {
        const movieYear = new Date(movie.release_date).getFullYear();
        const filterYear = parseInt(filters.year);
        return movieYear === filterYear;
      });
    }

    // Rating filter
    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(movie => 
        parseFloat(movie.vote_average) >= minRating
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'release_date':
          return new Date(b.release_date) - new Date(a.release_date);
        case 'vote_average':
          return parseFloat(b.vote_average) - parseFloat(a.vote_average);
        default: // popularity
          return (b.popularity || 0) - (a.popularity || 0);
      }
    });

    return filtered;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch();
    }
  };

  const MovieCard = ({ movie }) => (
    <div className="card-glass overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={
            movie.poster_path?.startsWith('http') 
              ? movie.poster_path 
              : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          }
          alt={movie.title}
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750/334155/ffffff?text=No+Image';
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-medium">
                  {parseFloat(movie.vote_average).toFixed(1)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <BiHeart className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <BiShare className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <BiPlay className="w-5 h-5" />
              <span>View Details</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-bold text-lg line-clamp-1 mb-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {movie.overview}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          {movie.runtime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{movie.runtime} min</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Search Movies</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, actors, directors..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <div className="text-gray-400">
              {searchQuery && (
                <span>
                  {loading ? 'Searching...' : `${searchResults.length} results for "${searchQuery}"`}
                </span>
              )}
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 btn-secondary"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="card-glass p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                <select
                  value={filters.genre}
                  onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  {genres.map(genre => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                <select
                  value={filters.year}
                  onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Years</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Min Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">Any Rating</option>
                  <option value="7">7+ Stars</option>
                  <option value="8">8+ Stars</option>
                  <option value="9">9+ Stars</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="popularity">Popularity</option>
                  <option value="title">Title</option>
                  <option value="release_date">Release Date</option>
                  <option value="vote_average">Rating</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="loading-spinner w-8 h-8"></div>
          </div>
        )}

        {/* Search Results */}
        {!loading && searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {searchResults.map((movie) => (
              <MovieCard key={`${movie.id}-${movie.title}`} movie={movie} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && searchQuery && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400">Try adjusting your search terms or filters</p>
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Search for Movies</h3>
            <p className="text-gray-400">Enter a movie title, actor, or director to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultLayoutHoc(SearchPage);
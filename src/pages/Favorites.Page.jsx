import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import DefaultLayoutHoc from '../layout/Default.layout';
import { 
  Heart, 
  Star, 
  Calendar, 
  Filter,
  Grid3X3,
  List,
  Trash2,
  Download,
  Share2
} from 'lucide-react';
import { BiPlay, BiHeart, BiShare, BiTrash } from 'react-icons/bi';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { movies: adminMovies } = useAdmin();
  
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    loadFavorites();
  }, [adminMovies]);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (favoriteIds.length === 0) {
        setFavoriteMovies([]);
        setLoading(false);
        return;
      }

      // Get favorite movies from multiple sources
      let favorites = [];

      // Check admin movies first
      const adminFavorites = adminMovies.filter(movie => 
        favoriteIds.includes(movie.id)
      );
      favorites = [...adminFavorites];

      // Get TMDB movies if API is configured
      const isApiConfigured = process.env.REACT_APP_API_KEY && 
        process.env.REACT_APP_API_KEY !== "your_tmdb_api_key_here";

      if (isApiConfigured) {
        // In a real app, you'd fetch these from TMDB
        // For now, we'll use fallback data for missing movies
        const missingIds = favoriteIds.filter(id => 
          !adminMovies.find(movie => movie.id === id)
        );

        // Fallback movies for demo
        const fallbackMovies = [
          {
            id: 1,
            title: "Elemental",
            poster_path: "/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
            backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
            vote_average: 8.5,
            release_date: "2023-06-16",
            overview: "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental.",
            genre_ids: [16, 35, 10751],
            runtime: 103,
            dateAdded: new Date().toISOString()
          },
          {
            id: 2,
            title: "Spider-Man: Across the Spider-Verse",
            poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
            backdrop_path: "/nGxUxi3PfXDRm7Vg95VBNgNM8yc.jpg",
            vote_average: 8.8,
            release_date: "2023-05-31",
            overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse.",
            genre_ids: [16, 28, 12],
            runtime: 140,
            dateAdded: new Date(Date.now() - 86400000).toISOString() // Yesterday
          }
        ];

        missingIds.forEach(id => {
          const fallbackMovie = fallbackMovies.find(movie => movie.id === id);
          if (fallbackMovie) {
            favorites.push({
              ...fallbackMovie,
              dateAdded: new Date().toISOString()
            });
          }
        });
      }

      // Add dateAdded to admin movies if not present
      favorites = favorites.map(movie => ({
        ...movie,
        dateAdded: movie.dateAdded || new Date().toISOString()
      }));

      setFavoriteMovies(applySorting(favorites));
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavoriteMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const applySorting = (movies) => {
    const sorted = [...movies];
    
    switch (sortBy) {
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return sorted.sort((a, b) => parseFloat(b.vote_average) - parseFloat(a.vote_average));
      case 'releaseDate':
        return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'dateAdded':
      default:
        return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
  };

  const removeFromFavorites = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    setFavoriteMovies(prev => prev.filter(movie => movie.id !== movieId));
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      localStorage.setItem('favorites', JSON.stringify([]));
      setFavoriteMovies([]);
    }
  };

  const exportFavorites = () => {
    const data = {
      favorites: favoriteMovies.map(movie => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average,
        year: new Date(movie.release_date).getFullYear()
      })),
      exportDate: new Date().toISOString(),
      totalCount: favoriteMovies.length
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinefalls-favorites-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareMovie = (movie) => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: `Check out ${movie.title} on Cinefalls!`,
        url: `${window.location.origin}/movie/${movie.id}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/movie/${movie.id}`);
      alert('Movie link copied to clipboard!');
    }
  };

  const MovieCard = ({ movie, isListView = false }) => (
    <div className={`card-glass overflow-hidden group hover:scale-105 transition-all duration-300 ${
      isListView ? 'flex items-center space-x-4 p-4' : ''
    }`}>
      <div className={`relative ${isListView ? 'w-24 h-36 flex-shrink-0' : ''}`}>
        <img
          src={
            movie.poster_path?.startsWith('http') 
              ? movie.poster_path 
              : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          }
          alt={movie.title}
          className={`object-cover ${isListView ? 'w-full h-full rounded-lg' : 'w-full h-80'}`}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x750/334155/ffffff?text=No+Image';
          }}
        />
        
        {!isListView && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => removeFromFavorites(movie.id)}
                className="p-2 bg-red-500/80 backdrop-blur-sm rounded-full hover:bg-red-500 transition-colors"
              >
                <BiTrash className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm font-medium">
                    {parseFloat(movie.vote_average).toFixed(1)}
                  </span>
                </div>
                <button
                  onClick={() => shareMovie(movie)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <BiShare className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <button 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <BiPlay className="w-5 h-5" />
                <span>Watch Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className={`${isListView ? 'flex-1' : 'p-4'}`}>
        <h3 className="text-white font-bold text-lg line-clamp-1 mb-2">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {movie.overview}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{parseFloat(movie.vote_average).toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4 text-red-400" />
            <span className="text-xs">
              {new Date(movie.dateAdded).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {isListView && (
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="btn-primary flex items-center space-x-2 px-4 py-2"
            >
              <BiPlay className="w-4 h-4" />
              <span>Watch</span>
            </button>
            <button
              onClick={() => shareMovie(movie)}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <BiShare className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => removeFromFavorites(movie.id)}
              className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/40 transition-colors"
            >
              <BiTrash className="w-4 h-4 text-red-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-white">My Favorites</h1>
          </div>
          
          {favoriteMovies.length > 0 && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Controls */}
              <div className="flex flex-wrap gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setFavoriteMovies(applySorting(favoriteMovies));
                  }}
                  className="bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="dateAdded">Recently Added</option>
                  <option value="title">Title A-Z</option>
                  <option value="rating">Highest Rated</option>
                  <option value="releaseDate">Release Date</option>
                </select>

                <button
                  onClick={exportFavorites}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>

                <button
                  onClick={clearAllFavorites}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>

              {/* View Toggle & Stats */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">
                  {favoriteMovies.length} movie{favoriteMovies.length !== 1 ? 's' : ''}
                </span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="loading-spinner w-8 h-8"></div>
          </div>
        )}

        {/* Movies Grid/List */}
        {!loading && favoriteMovies.length > 0 && (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-4'
          }>
            {favoriteMovies.map((movie) => (
              <MovieCard 
                key={`favorite-${movie.id}`} 
                movie={movie} 
                isListView={viewMode === 'list'}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && favoriteMovies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No favorites yet</h3>
            <p className="text-gray-400 mb-6">Start adding movies to your favorites to see them here</p>
            <button
              onClick={() => navigate('/movies')}
              className="btn-primary"
            >
              Browse Movies
            </button>
          </div>
        )}

        {/* Stats Card */}
        {!loading && favoriteMovies.length > 0 && (
          <div className="mt-12 card-glass p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Your Favorites Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-red-400">{favoriteMovies.length}</div>
                <div className="text-sm text-gray-400">Total Movies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {favoriteMovies.length > 0 
                    ? (favoriteMovies.reduce((sum, movie) => sum + parseFloat(movie.vote_average), 0) / favoriteMovies.length).toFixed(1)
                    : '0.0'
                  }
                </div>
                <div className="text-sm text-gray-400">Avg Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {favoriteMovies.length > 0 
                    ? Math.max(...favoriteMovies.map(movie => new Date(movie.release_date).getFullYear()))
                    : new Date().getFullYear()
                  }
                </div>
                <div className="text-sm text-gray-400">Latest Year</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {favoriteMovies.filter(movie => parseFloat(movie.vote_average) >= 8.0).length}
                </div>
                <div className="text-sm text-gray-400">High Rated (8.0+)</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultLayoutHoc(FavoritesPage);
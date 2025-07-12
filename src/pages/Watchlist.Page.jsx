import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import DefaultLayoutHoc from '../layout/Default.layout';
import { 
  Bookmark, 
  Star, 
  Calendar, 
  Clock,
  Filter,
  Grid3X3,
  List,
  Trash2,
  Download,
  Share2,
  CheckCircle,
  PlayCircle
} from 'lucide-react';
import { BiPlay, BiBookmark, BiShare, BiTrash, BiCheck } from 'react-icons/bi';

const WatchlistPage = () => {
  const navigate = useNavigate();
  const { movies: adminMovies } = useAdmin();
  
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    loadWatchlist();
  }, [adminMovies]);

  const loadWatchlist = async () => {
    setLoading(true);
    try {
      const watchlistIds = JSON.parse(localStorage.getItem('watchlist') || '[]');
      const watchedIds = JSON.parse(localStorage.getItem('watched') || '[]');
      
      if (watchlistIds.length === 0) {
        setWatchlistMovies([]);
        setLoading(false);
        return;
      }

      // Get watchlist movies from multiple sources
      let watchlist = [];

      // Check admin movies first
      const adminWatchlist = adminMovies.filter(movie => 
        watchlistIds.includes(movie.id)
      );
      watchlist = [...adminWatchlist];

      // Get TMDB movies if API is configured
      const isApiConfigured = process.env.REACT_APP_API_KEY && 
        process.env.REACT_APP_API_KEY !== "your_tmdb_api_key_here";

      if (isApiConfigured) {
        // In a real app, you'd fetch these from TMDB
        // For now, we'll use fallback data for missing movies
        const missingIds = watchlistIds.filter(id => 
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
            dateAdded: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: 3,
            title: "Guardians of the Galaxy Vol. 3",
            poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
            backdrop_path: "/5YZbUmjbMa3ClvSW1Wj3Gdx803.jpg",
            vote_average: 8.2,
            release_date: "2023-05-03",
            overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe.",
            genre_ids: [28, 12, 35],
            runtime: 150,
            dateAdded: new Date(Date.now() - 172800000).toISOString()
          }
        ];

        missingIds.forEach(id => {
          const fallbackMovie = fallbackMovies.find(movie => movie.id === id);
          if (fallbackMovie) {
            watchlist.push({
              ...fallbackMovie,
              dateAdded: new Date().toISOString()
            });
          }
        });
      }

      // Add metadata
      watchlist = watchlist.map(movie => ({
        ...movie,
        dateAdded: movie.dateAdded || new Date().toISOString(),
        isWatched: watchedIds.includes(movie.id)
      }));

      setWatchlistMovies(applySorting(applyFilter(watchlist)));
    } catch (error) {
      console.error('Error loading watchlist:', error);
      setWatchlistMovies([]);
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
      case 'runtime':
        return sorted.sort((a, b) => (b.runtime || 0) - (a.runtime || 0));
      case 'dateAdded':
      default:
        return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }
  };

  const applyFilter = (movies) => {
    switch (filterBy) {
      case 'watched':
        return movies.filter(movie => movie.isWatched);
      case 'unwatched':
        return movies.filter(movie => !movie.isWatched);
      case 'all':
      default:
        return movies;
    }
  };

  const removeFromWatchlist = (movieId) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const updatedWatchlist = watchlist.filter(id => id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
    
    setWatchlistMovies(prev => prev.filter(movie => movie.id !== movieId));
  };

  const markAsWatched = (movieId) => {
    const watched = JSON.parse(localStorage.getItem('watched') || '[]');
    if (!watched.includes(movieId)) {
      watched.push(movieId);
      localStorage.setItem('watched', JSON.stringify(watched));
      
      setWatchlistMovies(prev => prev.map(movie => 
        movie.id === movieId ? { ...movie, isWatched: true } : movie
      ));
    }
  };

  const markAsUnwatched = (movieId) => {
    const watched = JSON.parse(localStorage.getItem('watched') || '[]');
    const updatedWatched = watched.filter(id => id !== movieId);
    localStorage.setItem('watched', JSON.stringify(updatedWatched));
    
    setWatchlistMovies(prev => prev.map(movie => 
      movie.id === movieId ? { ...movie, isWatched: false } : movie
    ));
  };

  const clearAllWatchlist = () => {
    if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
      localStorage.setItem('watchlist', JSON.stringify([]));
      setWatchlistMovies([]);
    }
  };

  const exportWatchlist = () => {
    const data = {
      watchlist: watchlistMovies.map(movie => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average,
        year: new Date(movie.release_date).getFullYear(),
        runtime: movie.runtime,
        isWatched: movie.isWatched,
        dateAdded: movie.dateAdded
      })),
      exportDate: new Date().toISOString(),
      totalCount: watchlistMovies.length,
      watchedCount: watchlistMovies.filter(m => m.isWatched).length,
      unwatchedCount: watchlistMovies.filter(m => !m.isWatched).length
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinefalls-watchlist-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
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
    } ${movie.isWatched ? 'ring-2 ring-green-500/50' : ''}`}>
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
        
        {movie.isWatched && (
          <div className="absolute top-2 left-2">
            <div className="p-1 bg-green-500 rounded-full">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
        
        {!isListView && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button
                onClick={() => movie.isWatched ? markAsUnwatched(movie.id) : markAsWatched(movie.id)}
                className={`p-2 backdrop-blur-sm rounded-full transition-colors ${
                  movie.isWatched 
                    ? 'bg-green-500/80 hover:bg-green-500' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <BiCheck className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => removeFromWatchlist(movie.id)}
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
                <span>{movie.isWatched ? 'Watch Again' : 'Watch Now'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className={`${isListView ? 'flex-1' : 'p-4'}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-bold text-lg line-clamp-1 flex-1">
            {movie.title}
          </h3>
          {movie.isWatched && isListView && (
            <CheckCircle className="w-5 h-5 text-green-400 ml-2 flex-shrink-0" />
          )}
        </div>
        
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
          {movie.runtime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{movie.runtime}m</span>
            </div>
          )}
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          Added {new Date(movie.dateAdded).toLocaleDateString()}
        </div>
        
        {isListView && (
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="btn-primary flex items-center space-x-2 px-4 py-2"
            >
              <BiPlay className="w-4 h-4" />
              <span>{movie.isWatched ? 'Rewatch' : 'Watch'}</span>
            </button>
            
            <button
              onClick={() => movie.isWatched ? markAsUnwatched(movie.id) : markAsWatched(movie.id)}
              className={`p-2 rounded-lg transition-colors ${
                movie.isWatched 
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              <BiCheck className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => shareMovie(movie)}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <BiShare className="w-4 h-4 text-gray-400" />
            </button>
            
            <button
              onClick={() => removeFromWatchlist(movie.id)}
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
            <Bookmark className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
          </div>
          
          {watchlistMovies.length > 0 && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Controls */}
              <div className="flex flex-wrap gap-4">
                <select
                  value={filterBy}
                  onChange={(e) => {
                    setFilterBy(e.target.value);
                    setWatchlistMovies(applySorting(applyFilter(watchlistMovies)));
                  }}
                  className="bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Movies</option>
                  <option value="unwatched">Not Watched</option>
                  <option value="watched">Watched</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setWatchlistMovies(applySorting(watchlistMovies));
                  }}
                  className="bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="dateAdded">Recently Added</option>
                  <option value="title">Title A-Z</option>
                  <option value="rating">Highest Rated</option>
                  <option value="releaseDate">Release Date</option>
                  <option value="runtime">Runtime</option>
                </select>

                <button
                  onClick={exportWatchlist}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>

                <button
                  onClick={clearAllWatchlist}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All</span>
                </button>
              </div>

              {/* View Toggle & Stats */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 text-sm">
                  {watchlistMovies.length} movie{watchlistMovies.length !== 1 ? 's' : ''}
                </span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'
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
        {!loading && watchlistMovies.length > 0 && (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-4'
          }>
            {watchlistMovies.map((movie) => (
              <MovieCard 
                key={`watchlist-${movie.id}`} 
                movie={movie} 
                isListView={viewMode === 'list'}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && watchlistMovies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Your watchlist is empty</h3>
            <p className="text-gray-400 mb-6">Add movies you want to watch later</p>
            <button
              onClick={() => navigate('/movies')}
              className="btn-primary"
            >
              Browse Movies
            </button>
          </div>
        )}

        {/* Stats Card */}
        {!loading && watchlistMovies.length > 0 && (
          <div className="mt-12 card-glass p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Watchlist Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{watchlistMovies.length}</div>
                <div className="text-sm text-gray-400">Total Movies</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {watchlistMovies.filter(m => m.isWatched).length}
                </div>
                <div className="text-sm text-gray-400">Watched</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  {watchlistMovies.filter(m => !m.isWatched).length}
                </div>
                <div className="text-sm text-gray-400">To Watch</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round((watchlistMovies.filter(m => m.isWatched).length / watchlistMovies.length) * 100)}%
                </div>
                <div className="text-sm text-gray-400">Completion</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(watchlistMovies.filter(m => m.isWatched).length / watchlistMovies.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultLayoutHoc(WatchlistPage);
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext';
import DefaultLayoutHoc from '../layout/Default.layout';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  Calendar, 
  Clock, 
  Filter,
  Grid3X3,
  List,
  ChevronDown
} from 'lucide-react';
import { BiHeart, BiPlay, BiShare } from 'react-icons/bi';

const MoviesPage = () => {
  const navigate = useNavigate();
  const { movies: adminMovies } = useAdmin();
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('popular');
  const [filters, setFilters] = useState({
    genre: 'all',
    year: 'all',
    rating: 'all',
    sortBy: 'popularity'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(1);

  const categories = [
    { id: 'popular', name: 'Popular Movies', endpoint: '/movie/popular' },
    { id: 'top_rated', name: 'Top Rated', endpoint: '/movie/top_rated' },
    { id: 'upcoming', name: 'Upcoming', endpoint: '/movie/upcoming' },
    { id: 'now_playing', name: 'Now Playing', endpoint: '/movie/now_playing' }
  ];

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
      runtime: 103
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
      runtime: 140
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
      runtime: 150
    }
  ];

  useEffect(() => {
    fetchMovies();
  }, [category, page]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let movieList = [];
      
      // Always include admin movies
      movieList = [...adminMovies];

      // Fetch from TMDB if configured
      if (isApiConfigured) {
        const selectedCategory = categories.find(cat => cat.id === category);
        try {
          const response = await axios.get(`${selectedCategory.endpoint}?page=${page}`);
          movieList = [...movieList, ...response.data.results];
        } catch (error) {
          console.error('Error fetching movies:', error);
          movieList = [...movieList, ...fallbackMovies];
        }
      } else {
        movieList = [...movieList, ...fallbackMovies];
      }

      // Remove duplicates and apply filters
      const uniqueMovies = movieList.filter((movie, index, self) => 
        index === self.findIndex(m => m.title === movie.title)
      );
      
      setMovies(applyFilters(uniqueMovies));
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies(applyFilters([...adminMovies, ...fallbackMovies]));
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (movieList) => {
    let filtered = [...movieList];

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
          {movie.runtime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{movie.runtime} min</span>
            </div>
          )}
        </div>
        
        {isListView && (
          <button 
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="btn-primary flex items-center space-x-2"
          >
            <BiPlay className="w-4 h-4" />
            <span>Watch Now</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-6">Discover Movies</h1>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  setPage(1);
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  category === cat.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filters.genre}
                onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
                className="bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>

              <select
                value={filters.year}
                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                className="bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Years</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="popularity">Most Popular</option>
                <option value="title">Title A-Z</option>
                <option value="release_date">Newest First</option>
                <option value="vote_average">Highest Rated</option>
              </select>
            </div>

            {/* View Toggle */}
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

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="loading-spinner w-8 h-8"></div>
          </div>
        )}

        {/* Movies Grid/List */}
        {!loading && (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-4'
          }>
            {movies.map((movie) => (
              <MovieCard 
                key={`${movie.id}-${movie.title}`} 
                movie={movie} 
                isListView={viewMode === 'list'}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}

        {/* Load More Button */}
        {!loading && movies.length > 0 && isApiConfigured && (
          <div className="text-center mt-12">
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="btn-outline px-8 py-3"
            >
              Load More Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultLayoutHoc(MoviesPage);
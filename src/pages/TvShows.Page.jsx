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
  Tv,
  Play
} from 'lucide-react';
import { BiHeart, BiPlay, BiShare } from 'react-icons/bi';

const TvShowsPage = () => {
  const navigate = useNavigate();
  const { movies: adminMovies } = useAdmin();
  
  const [tvShows, setTvShows] = useState([]);
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
    { id: 'popular', name: 'Popular TV Shows', endpoint: '/tv/popular' },
    { id: 'top_rated', name: 'Top Rated', endpoint: '/tv/top_rated' },
    { id: 'on_the_air', name: 'On The Air', endpoint: '/tv/on_the_air' },
    { id: 'airing_today', name: 'Airing Today', endpoint: '/tv/airing_today' }
  ];

  const genres = [
    { id: 'all', name: 'All Genres' },
    { id: 10759, name: 'Action & Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 10762, name: 'Kids' },
    { id: 9648, name: 'Mystery' },
    { id: 10765, name: 'Sci-Fi & Fantasy' },
    { id: 10766, name: 'Soap' },
    { id: 10767, name: 'Talk' },
    { id: 10768, name: 'War & Politics' }
  ];

  const isApiConfigured = process.env.REACT_APP_API_KEY && 
    process.env.REACT_APP_API_KEY !== "your_tmdb_api_key_here";

  const fallbackTvShows = [
    {
      id: 1,
      name: "The Bear",
      poster_path: "/sHFlbKS3WLqMnp9t2ghADIJFnuQ.jpg",
      backdrop_path: "/9f5sIJEgvUpFv0ozf0xEuJaNUIv.jpg",
      vote_average: 8.3,
      first_air_date: "2022-06-23",
      overview: "Carmen 'Carmy' Berzatto, a young chef from the fine dining world, comes home to Chicago to run his deceased brother's sandwich shop.",
      genre_ids: [18, 35],
      episode_run_time: [30],
      number_of_seasons: 2,
      number_of_episodes: 18
    },
    {
      id: 2,
      name: "Wednesday",
      poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
      backdrop_path: "/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
      vote_average: 8.5,
      first_air_date: "2022-11-23",
      overview: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.",
      genre_ids: [9648, 18, 35],
      episode_run_time: [50],
      number_of_seasons: 1,
      number_of_episodes: 8
    },
    {
      id: 3,
      name: "Stranger Things",
      poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
      vote_average: 8.7,
      first_air_date: "2016-07-15",
      overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      genre_ids: [18, 10765, 9648],
      episode_run_time: [50],
      number_of_seasons: 4,
      number_of_episodes: 34
    }
  ];

  useEffect(() => {
    fetchTvShows();
  }, [category, page]);

  const fetchTvShows = async () => {
    setLoading(true);
    try {
      let showList = [];
      
      // Filter admin movies for TV shows (if any are marked as TV shows)
      const adminTvShows = adminMovies.filter(movie => 
        movie.type === 'tv' || movie.name || movie.first_air_date
      );
      showList = [...adminTvShows];

      // Fetch from TMDB if configured
      if (isApiConfigured) {
        const selectedCategory = categories.find(cat => cat.id === category);
        try {
          const response = await axios.get(`${selectedCategory.endpoint}?page=${page}`);
          showList = [...showList, ...response.data.results];
        } catch (error) {
          console.error('Error fetching TV shows:', error);
          showList = [...showList, ...fallbackTvShows];
        }
      } else {
        showList = [...showList, ...fallbackTvShows];
      }

      // Remove duplicates and apply filters
      const uniqueShows = showList.filter((show, index, self) => 
        index === self.findIndex(s => (s.name || s.title) === (show.name || show.title))
      );
      
      setTvShows(applyFilters(uniqueShows));
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      setTvShows(applyFilters([...fallbackTvShows]));
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (showList) => {
    let filtered = [...showList];

    // Genre filter
    if (filters.genre !== 'all') {
      filtered = filtered.filter(show => 
        show.genre_ids && show.genre_ids.includes(parseInt(filters.genre))
      );
    }

    // Year filter
    if (filters.year !== 'all') {
      filtered = filtered.filter(show => {
        const showYear = new Date(show.first_air_date || show.release_date).getFullYear();
        const filterYear = parseInt(filters.year);
        return showYear === filterYear;
      });
    }

    // Rating filter
    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(show => 
        parseFloat(show.vote_average) >= minRating
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'title':
          return (a.name || a.title).localeCompare(b.name || b.title);
        case 'release_date':
          return new Date(b.first_air_date || b.release_date) - new Date(a.first_air_date || a.release_date);
        case 'vote_average':
          return parseFloat(b.vote_average) - parseFloat(a.vote_average);
        default: // popularity
          return (b.popularity || 0) - (a.popularity || 0);
      }
    });

    return filtered;
  };

  const TvShowCard = ({ show, isListView = false }) => (
    <div className={`card-glass overflow-hidden group hover:scale-105 transition-all duration-300 ${
      isListView ? 'flex items-center space-x-4 p-4' : ''
    }`}>
      <div className={`relative ${isListView ? 'w-24 h-36 flex-shrink-0' : ''}`}>
        <img
          src={
            show.poster_path?.startsWith('http') 
              ? show.poster_path 
              : `https://image.tmdb.org/t/p/w500${show.poster_path}`
          }
          alt={show.name || show.title}
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
                    {parseFloat(show.vote_average).toFixed(1)}
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
                onClick={() => navigate(`/tv/${show.id}`)}
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
          {show.name || show.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
          {show.overview}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(show.first_air_date || show.release_date).getFullYear()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{parseFloat(show.vote_average).toFixed(1)}</span>
          </div>
          {show.number_of_seasons && (
            <div className="flex items-center space-x-1">
              <Tv className="w-4 h-4" />
              <span>{show.number_of_seasons} Season{show.number_of_seasons > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
        
        {show.number_of_episodes && (
          <div className="text-xs text-gray-500 mb-3">
            {show.number_of_episodes} Episodes
          </div>
        )}
        
        {isListView && (
          <button 
            onClick={() => navigate(`/tv/${show.id}`)}
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
          <h1 className="text-3xl font-bold text-white mb-6">Discover TV Shows</h1>
          
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
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
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
                className="bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>

              <select
                value={filters.year}
                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                className="bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
              >
                <option value="all">All Years</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="bg-slate-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:outline-none"
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
                  viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-400'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-400'
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

        {/* TV Shows Grid/List */}
        {!loading && (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-4'
          }>
            {tvShows.map((show) => (
              <TvShowCard 
                key={`${show.id}-${show.name || show.title}`} 
                show={show} 
                isListView={viewMode === 'list'}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && tvShows.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Tv className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No TV shows found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}

        {/* Load More Button */}
        {!loading && tvShows.length > 0 && isApiConfigured && (
          <div className="text-center mt-12">
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="btn-outline px-8 py-3"
            >
              Load More TV Shows
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultLayoutHoc(TvShowsPage);
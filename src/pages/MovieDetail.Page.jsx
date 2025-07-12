import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../context/AdminContext';
import DefaultLayoutHoc from '../layout/Default.layout';
import { 
  Star, 
  Calendar, 
  Clock, 
  Play,
  Heart,
  Bookmark,
  Share2,
  ArrowLeft,
  Users,
  DollarSign,
  Globe,
  Tag
} from 'lucide-react';
import { BiPlay, BiHeart, BiBookmark, BiShare } from 'react-icons/bi';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies: adminMovies } = useAdmin();
  
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const isApiConfigured = process.env.REACT_APP_API_KEY && 
    process.env.REACT_APP_API_KEY !== "your_tmdb_api_key_here";

  const fallbackMovie = {
    id: parseInt(id),
    title: "Elemental",
    poster_path: "/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    vote_average: 8.5,
    release_date: "2023-06-16",
    overview: "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
    runtime: 103,
    genres: [
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 10751, name: "Family" }
    ],
    budget: 200000000,
    revenue: 496400000,
    production_companies: [
      { name: "Pixar Animation Studios" },
      { name: "Walt Disney Pictures" }
    ],
    production_countries: [
      { name: "United States" }
    ],
    spoken_languages: [
      { english_name: "English" }
    ],
    tagline: "Opposites react.",
    status: "Released"
  };

  const fallbackCast = [
    {
      id: 1,
      name: "Leah Lewis",
      character: "Ember Lumen (voice)",
      profile_path: "/example-profile.jpg"
    },
    {
      id: 2,
      name: "Mamoudou Athie",
      character: "Wade Ripple (voice)",
      profile_path: "/example-profile2.jpg"
    }
  ];

  useEffect(() => {
    fetchMovieDetails();
    
    // Load user preferences from localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsWishlisted(wishlist.includes(parseInt(id)));
    setIsFavorited(favorites.includes(parseInt(id)));
  }, [id]);

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      // First check admin movies
      const adminMovie = adminMovies.find(m => m.id === parseInt(id));
      if (adminMovie) {
        setMovie(adminMovie);
        setCast([]);
        setRecommendations([]);
        setLoading(false);
        return;
      }

      // Fetch from TMDB if configured
      if (isApiConfigured) {
        try {
          const [movieResponse, creditsResponse, recommendationsResponse] = await Promise.all([
            axios.get(`/movie/${id}`),
            axios.get(`/movie/${id}/credits`),
            axios.get(`/movie/${id}/recommendations`)
          ]);

          setMovie(movieResponse.data);
          setCast(creditsResponse.data.cast.slice(0, 10));
          setRecommendations(recommendationsResponse.data.results.slice(0, 6));
        } catch (error) {
          console.error('Error fetching movie details:', error);
          setMovie(fallbackMovie);
          setCast(fallbackCast);
          setRecommendations([]);
        }
      } else {
        setMovie(fallbackMovie);
        setCast(fallbackCast);
        setRecommendations([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMovie(fallbackMovie);
      setCast(fallbackCast);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const movieId = parseInt(id);
    
    if (isWishlisted) {
      const updatedWishlist = wishlist.filter(wId => wId !== movieId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    } else {
      wishlist.push(movieId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const movieId = parseInt(id);
    
    if (isFavorited) {
      const updatedFavorites = favorites.filter(fId => fId !== movieId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      favorites.push(movieId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorited(true);
    }
  };

  const shareMovie = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: movie.overview,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Movie link copied to clipboard!');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(amount);
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="loading-spinner w-12 h-12"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Movie not found</h2>
          <button
            onClick={() => navigate('/movies')}
            className="btn-primary"
          >
            Back to Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              movie.backdrop_path?.startsWith('http') 
                ? movie.backdrop_path 
                : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            })`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-4 z-10 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Movie Info */}
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 pb-12 w-full">
            <div className="flex flex-col lg:flex-row items-end space-y-6 lg:space-y-0 lg:space-x-8">
              
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={
                    movie.poster_path?.startsWith('http') 
                      ? movie.poster_path 
                      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  }
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-2xl shadow-2xl"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x750/334155/ffffff?text=No+Image';
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-4">"{movie.tagline}"</p>
                )}

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">{parseFloat(movie.vote_average).toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  
                  {movie.runtime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}

                  {movie.status && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      {movie.status}
                    </span>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-lg text-gray-300 mb-8 max-w-3xl leading-relaxed">
                  {movie.overview}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setShowTrailer(true)}
                    className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
                  >
                    <BiPlay className="w-6 h-6" />
                    <span>Watch Trailer</span>
                  </button>
                  
                  <button
                    onClick={toggleFavorite}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      isFavorited 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <BiHeart className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={toggleWishlist}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      isWishlisted 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <BiBookmark className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={shareMovie}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl text-gray-300 hover:bg-white/20 transition-all duration-300"
                  >
                    <BiShare className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        
        {/* Movie Stats */}
        {(movie.budget || movie.revenue || movie.production_companies) && (
          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Movie Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {movie.budget && (
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Budget</div>
                  <div className="text-lg font-semibold text-white">{formatCurrency(movie.budget)}</div>
                </div>
              )}
              
              {movie.revenue && (
                <div className="text-center">
                  <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Revenue</div>
                  <div className="text-lg font-semibold text-white">{formatCurrency(movie.revenue)}</div>
                </div>
              )}
              
              {movie.production_countries && movie.production_countries.length > 0 && (
                <div className="text-center">
                  <Globe className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Country</div>
                  <div className="text-lg font-semibold text-white">{movie.production_countries[0].name}</div>
                </div>
              )}
              
              {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                <div className="text-center">
                  <Globe className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Language</div>
                  <div className="text-lg font-semibold text-white">{movie.spoken_languages[0].english_name}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cast */}
        {cast && cast.length > 0 && (
          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {cast.map((person) => (
                <div key={person.id} className="text-center">
                  <img
                    src={
                      person.profile_path 
                        ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                        : 'https://via.placeholder.com/300x450/334155/ffffff?text=No+Photo'
                    }
                    alt={person.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-white font-semibold text-sm">{person.name}</h3>
                  <p className="text-gray-400 text-xs">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Production Companies */}
        {movie.production_companies && movie.production_companies.length > 0 && (
          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Production</h2>
            <div className="flex flex-wrap gap-4">
              {movie.production_companies.map((company, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-gray-300"
                >
                  {company.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="card-glass p-8">
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recommendations.map((recMovie) => (
                <div
                  key={recMovie.id}
                  onClick={() => navigate(`/movie/${recMovie.id}`)}
                  className="cursor-pointer group"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${recMovie.poster_path}`}
                    alt={recMovie.title}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450/334155/ffffff?text=No+Image';
                    }}
                  />
                  <h3 className="text-white text-sm font-semibold mt-2 line-clamp-2">
                    {recMovie.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Movie Trailer</h3>
              <button
                onClick={() => setShowTrailer(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Play className="w-16 h-16 mx-auto mb-4" />
                <p>Trailer coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultLayoutHoc(MovieDetailPage);
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BiPlay, BiHeart, BiShare, BiStar, BiCalendar, BiMapPin, BiTime } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

// HOC
import DefaultlayoutHoc from "../layout/Default.layout";

// Components
import EntertainmentCardSlider from "../components/Entertainment/EntertainmentCard.Component";
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";

// Enhanced Hero Section Component
const HeroSection = ({ movies = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredMovie = movies[currentSlide] || null;

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % movies.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [movies.length]);

  if (!featuredMovie) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="badge-primary">Featured Movie</span>
              <div className="flex items-center gap-2">
                <BiStar className="w-5 h-5 text-yellow-400" />
                <span className="body-large">{featuredMovie.vote_average?.toFixed(1)}</span>
              </div>
            </div>
            
            <h1 className="display-1 mb-6">{featuredMovie.original_title}</h1>
            <p className="body-large max-w-xl">{featuredMovie.overview}</p>
            
            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <BiCalendar className="w-5 h-5" />
                <span>{new Date(featuredMovie.release_date).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2">
                <BiTime className="w-5 h-5" />
                <span>2h 30m</span>
              </div>
              <div className="flex items-center gap-2">
                <BiMapPin className="w-5 h-5" />
                <span>IMAX • Dolby</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to={`/movie/${featuredMovie.id}`}
              className="btn-primary flex items-center gap-3"
            >
              <BiPlay className="w-6 h-6" />
              <span>Book Now</span>
            </Link>
            
            <button className="btn-secondary flex items-center gap-3">
              <BiHeart className="w-5 h-5" />
              <span>Add to Favorites</span>
            </button>
            
            <button className="glass-button p-4 rounded-xl">
              <BiShare className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="movie-card p-0 overflow-hidden max-w-md mx-auto">
            <img
              src={`https://image.tmdb.org/t/p/w500${featuredMovie.poster_path}`}
              alt={featuredMovie.original_title}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

// Stats Section Component
const StatsSection = () => {
  const stats = [
    { icon: BiPlay, number: "10M+", label: "Movies Watched" },
    { icon: BiHeart, number: "2M+", label: "Happy Customers" },
    { icon: BiStar, number: "500+", label: "Cinema Halls" },
    { icon: BiCalendar, number: "50K+", label: "Events Hosted" }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center glass-card p-8 hover-lift">
              <stat.icon className="w-12 h-12 text-gradient mx-auto mb-4" />
              <div className="display-2 text-3xl mb-2">{stat.number}</div>
              <div className="body-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      title: "Premium Theaters",
      description: "Experience movies in state-of-the-art theaters with Dolby Atmos and IMAX technology",
      icon: "🎭",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Easy Booking",
      description: "Book tickets in seconds with our intuitive interface and secure payment system",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Live Events",
      description: "Discover and book tickets for concerts, sports, and exclusive entertainment events",
      icon: "🎪",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Smart Recommendations",
      description: "Get personalized movie and event suggestions based on your preferences",
      icon: "🧠",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="display-2 mb-6">Why Choose Cinefalls?</h2>
          <p className="body-large max-w-2xl mx-auto">
            Experience the future of entertainment booking with premium features and unmatched convenience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card text-center hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto`}>
                {feature.icon}
              </div>
              <h3 className="heading-3 mb-4">{feature.title}</h3>
              <p className="body-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Fallback demo data
const fallbackMovies = [
  {
    id: 1,
    original_title: "Elemental",
    poster_path: "/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    vote_average: 8.5,
    release_date: "2023-06-16",
    overview: "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common."
  },
  {
    id: 2,
    original_title: "Spider-Man: Across the Spider-Verse", 
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/nGxUxi3PfXDRm7Vg95VBNgNM8yc.jpg",
    vote_average: 8.8,
    release_date: "2023-05-31",
    overview: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse."
  },
  {
    id: 3,
    original_title: "Guardians of the Galaxy Vol. 3",
    poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg", 
    backdrop_path: "/5YZbUmjbMa3ClvSW1Wj3Gdx803.jpg",
    vote_average: 8.2,
    release_date: "2023-05-03",
    overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own."
  },
  {
    id: 4,
    original_title: "Fast X",
    poster_path: "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    backdrop_path: "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
    vote_average: 7.2,
    release_date: "2023-05-17",
    overview: "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path."
  },
  {
    id: 5,
    original_title: "John Wick: Chapter 4",
    poster_path: "/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
    backdrop_path: "/h8gHn0OzBoaefsYseUByqsmEDMY.jpg",
    vote_average: 7.8,
    release_date: "2023-03-22",
    overview: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table."
  }
];

const HomePage = () => {
  const [recommendedMovies, setrecommendedMovies] = useState([]);
  const [premierMovies, setpremierMovies] = useState([]);
  const [onlineStreamEvents, setonlineStreamEvents] = useState([]);
  const { movies: adminMovies } = useAdmin();

  const isApiConfigured = process.env.REACT_APP_API_KEY && 
    process.env.REACT_APP_API_KEY !== "your_tmdb_api_key_here";

  // Function to merge admin movies with TMDB movies
  const mergeMoviesWithAdmin = useCallback((tmdbMovies) => {
    const combinedMovies = [...adminMovies, ...tmdbMovies];
    // Remove duplicates based on title
    const uniqueMovies = combinedMovies.filter((movie, index, self) => 
      index === self.findIndex(m => m.title === movie.title)
    );
    return uniqueMovies;
  }, [adminMovies]);

  useEffect(() => {
    const requestTopRatedMovies = async () => {
      if (!isApiConfigured) {
        const mergedMovies = mergeMoviesWithAdmin(fallbackMovies);
        setrecommendedMovies(mergedMovies);
        return;
      }
      
      try {
        const getTopRatedMovies = await axios.get("/movie/top_rated");
        const mergedMovies = mergeMoviesWithAdmin(getTopRatedMovies.data.results);
        setrecommendedMovies(mergedMovies);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
        const mergedMovies = mergeMoviesWithAdmin(fallbackMovies);
        setrecommendedMovies(mergedMovies);
      }
    };
    requestTopRatedMovies();
  }, [isApiConfigured, mergeMoviesWithAdmin]);

  useEffect(() => {
    const requestPopularMovies = async () => {
      if (!isApiConfigured) {
        const mergedMovies = mergeMoviesWithAdmin(fallbackMovies);
        setpremierMovies(mergedMovies);
        return;
      }
      
      try {
        const getPopularMovies = await axios.get("/movie/popular");
        const mergedMovies = mergeMoviesWithAdmin(getPopularMovies.data.results);
        setpremierMovies(mergedMovies);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        const mergedMovies = mergeMoviesWithAdmin(fallbackMovies);
        setpremierMovies(mergedMovies);
      }
    };
    requestPopularMovies();
  }, [isApiConfigured, mergeMoviesWithAdmin]);

  useEffect(() => {
    const requestUpcomingMovies = async () => {
      if (!isApiConfigured) {
        const mergedMovies = mergeMoviesWithAdmin(fallbackMovies);
        setonlineStreamEvents(mergedMovies);
        return;
      }
      
      try {
        const getUpcomingMovies = await axios.get("/movie/upcoming");
        const mergedMovies = mergeMoviesWithAdmin(getUpcomingMovies.data.results);
        setonlineStreamEvents(mergedMovies);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        const mergedMovies = mergeMoviesWithAdmin(fallbackMovies);
        setonlineStreamEvents(mergedMovies);
      }
    };
    requestUpcomingMovies();
  }, [isApiConfigured, mergeMoviesWithAdmin]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection movies={recommendedMovies.length > 0 ? recommendedMovies : fallbackMovies} />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Demo data notice */}
      {!isApiConfigured && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="glass-card border border-yellow-400/30 bg-yellow-400/10 p-6 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <p className="body-medium text-yellow-300">
                <strong>Demo Mode:</strong> Displaying sample data. Configure TMDB API key in .env for live movie data.
              </p>
            </div>
          </div>
        </section>
      )}
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Entertainment Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="display-2 mb-6">The Best of Entertainment</h2>
            <p className="body-large">Discover amazing content curated just for you</p>
          </div>
          <div className="glass-card p-8">
            <EntertainmentCardSlider />
          </div>
        </div>
      </section>

      {/* Recommended Movies Section */}
      <section className="py-20 bg-glass-ultra-light relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="heading-1 mb-4">Recommended Movies</h2>
            <p className="body-large text-gray-300">Handpicked selections based on trending preferences</p>
          </div>
          <PosterSlider
            title=""
            subtitle=""
            posters={recommendedMovies}
            isDark={false}
          />
        </div>
      </section>

      {/* Cinefalls Premier Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 animate-gradient"></div>
          <div className="absolute inset-0 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Premier Banner */}
          <div className="text-center mb-16">
            <div className="glass-card p-12 mb-12">
              <h2 className="display-1 mb-6">
                <span className="text-gradient">Cinefalls Premier</span>
              </h2>
              <p className="heading-2 mb-8">
                Brand new releases every Friday - Experience cinema like never before
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="badge-primary">Ultra HD Quality</span>
                <span className="badge-success">Dolby Atmos</span>
                <span className="badge-warning">Early Access</span>
                <span className="badge">IMAX Experience</span>
              </div>
            </div>
          </div>
          
          <PosterSlider
            title=""
            subtitle=""
            posters={premierMovies}
            isDark={true}
          />
        </div>
      </section>

      {/* Online Streaming Events Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="heading-1 mb-4">Online Streaming Events</h2>
            <p className="body-large text-gray-300">Live events and virtual experiences from around the world</p>
          </div>
          <div className="glass-card p-8">
            <PosterSlider
              title=""
              subtitle=""
              posters={onlineStreamEvents}
              isDark={false}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="glass-card p-16">
            <h2 className="display-2 mb-6">Ready for the Ultimate Cinema Experience?</h2>
            <p className="body-large mb-12 max-w-2xl mx-auto">
              Join millions of movie lovers and start your premium entertainment journey today
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn-primary text-lg px-12 py-4">
                Start Exploring
              </button>
              <button className="btn-outline text-lg px-12 py-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DefaultlayoutHoc(HomePage);
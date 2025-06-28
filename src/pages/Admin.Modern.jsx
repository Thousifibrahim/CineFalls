import React, { useState, useEffect, useRef } from "react";

const ModernAdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    genre: "",
    rating: "",
    director: "",
    duration: "",
    image: "",
    status: "published"
  });

  const genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Romance', 'Horror', 'Animation', 'Biography'];
  const statusOptions = ['published', 'draft', 'archived'];

  useEffect(() => {
    const savedMovies = localStorage.getItem("adminMovies");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
    setIsVisible(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("adminMovies", JSON.stringify(movies));
  }, [movies]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingMovie) {
      setMovies(prev => prev.map(movie => 
        movie.id === editingMovie.id 
          ? { ...formData, id: editingMovie.id, updatedAt: new Date().toISOString() }
          : movie
      ));
    } else {
      const newMovie = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setMovies(prev => [newMovie, ...prev]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      year: new Date().getFullYear(),
      genre: "",
      rating: "",
      director: "",
      duration: "",
      image: "",
      status: "published"
    });
    setEditingMovie(null);
    setShowForm(false);
  };

  const handleEdit = (movie) => {
    setFormData(movie);
    setEditingMovie(movie);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setMovies(prev => prev.filter(movie => movie.id !== id));
    }
  };

  const filteredAndSortedMovies = movies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = filterGenre === 'all' || movie.genre === filterGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
        default:
          return 0;
      }
    });

  const stats = {
    total: movies.length,
    published: movies.filter(m => m.status === 'published').length,
    drafts: movies.filter(m => m.status === 'draft').length,
    genres: [...new Set(movies.map(m => m.genre))].length
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'movies', name: 'Movies', icon: '🎬' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'content', name: 'Content', icon: '📝' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200/50 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Admin Studio
                </h1>
                <p className="text-gray-600 text-lg">
                  Manage your cinematic universe with precision and style
                </p>
              </div>
              <div className="mt-6 lg:mt-0">
                <button
                  onClick={() => setShowForm(true)}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                    </svg>
                    Add New Movie
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-2">
            <nav className="flex space-x-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Stats Overview */}
        {activeTab === 'overview' && (
          <div className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Total Movies', value: stats.total, icon: '🎬', color: 'from-blue-500 to-purple-600', change: '+12%' },
                { title: 'Published', value: stats.published, icon: '✅', color: 'from-green-500 to-emerald-600', change: '+8%' },
                { title: 'Drafts', value: stats.drafts, icon: '📝', color: 'from-yellow-500 to-orange-600', change: '+3%' },
                { title: 'Genres', value: stats.genres, icon: '🎭', color: 'from-pink-500 to-red-600', change: '+2%' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-green-600 font-semibold">{stat.change}</span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Add Movie', icon: '🎬', color: 'from-purple-500 to-blue-500' },
                    { name: 'Bulk Import', icon: '📥', color: 'from-green-500 to-emerald-500' },
                    { name: 'Export Data', icon: '📤', color: 'from-orange-500 to-red-500' },
                    { name: 'Backup', icon: '💾', color: 'from-blue-500 to-cyan-500' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className={`p-4 bg-gradient-to-r ${action.color} text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      <div className="text-2xl mb-2">{action.icon}</div>
                      <div className="text-sm font-semibold">{action.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-2xl">📊</span>
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {[
                    { action: 'Movie "Oppenheimer" published', time: '2 hours ago', icon: '✅' },
                    { action: 'New user registered', time: '4 hours ago', icon: '👤' },
                    { action: 'Database backup completed', time: '6 hours ago', icon: '💾' },
                    { action: 'System update installed', time: '1 day ago', icon: '🔄' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{activity.icon}</span>
                        <span className="text-sm text-gray-700">{activity.action}</span>
                      </div>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Movie Management */}
        {activeTab === 'movies' && (
          <>
            {/* Filters and Search */}
            <div className={`mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search movies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </div>
                  <select
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                  >
                    <option value="all">All Genres</option>
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Movies Grid */}
            <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {filteredAndSortedMovies.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-12 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Movies Found</h3>
                  <p className="text-gray-600 mb-6">Start building your collection by adding your first movie.</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Add Your First Movie
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedMovies.map((movie, index) => (
                    <div
                      key={movie.id}
                      className={`bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-500 delay-${index * 100}`}
                    >
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
                        {movie.image ? (
                          <img
                            src={movie.image}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-16 h-16 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4 6.5c0-.83.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-13c-.83 0-1.5-.67-1.5-1.5v-11zM6 8v8l5-4-5-4z"/>
                            </svg>
                          </div>
                        )}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                          movie.status === 'published' ? 'bg-green-100 text-green-800' :
                          movie.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {movie.status}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{movie.title}</h3>
                          {movie.rating && (
                            <div className="flex items-center gap-1 text-yellow-500">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                              <span className="text-sm font-semibold text-gray-700">{movie.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{movie.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                            {movie.genre}
                          </span>
                          <span>{movie.year}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(movie)}
                            className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(movie.id)}
                            className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Users Management Tab */}
        {activeTab === 'users' && (
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="text-3xl">👥</span>
                  User Management
                </h3>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                  Add New User
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { title: 'Total Users', count: '2,847', change: '+18%', color: 'from-blue-500 to-purple-600' },
                  { title: 'Active Users', count: '1,923', change: '+12%', color: 'from-green-500 to-emerald-600' },
                  { title: 'Premium Users', count: '456', change: '+23%', color: 'from-yellow-500 to-orange-600' }
                ].map((stat, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                    <h4 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">{stat.count}</span>
                      <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Recent Users</h4>
                {[
                  { name: 'John Doe', email: 'john@example.com', role: 'Premium', joined: '2 days ago', avatar: '👨‍💼' },
                  { name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Free', joined: '1 week ago', avatar: '👩‍💼' },
                  { name: 'Mike Johnson', email: 'mike@example.com', role: 'Premium', joined: '2 weeks ago', avatar: '👨‍🔬' },
                  { name: 'Emma Brown', email: 'emma@example.com', role: 'Free', joined: '3 weeks ago', avatar: '👩‍🎨' }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-2xl">
                        {user.avatar}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{user.name}</h5>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'Premium' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{user.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">📝</span>
                  Content Library
                </h3>
                <div className="space-y-6">
                  {[
                    { type: 'Movies', count: movies.length, color: 'from-blue-500 to-purple-600', icon: '🎬' },
                    { type: 'TV Shows', count: '0', color: 'from-green-500 to-emerald-600', icon: '📺' },
                    { type: 'Documentaries', count: '0', color: 'from-orange-500 to-red-600', icon: '🎥' },
                    { type: 'Short Films', count: '0', color: 'from-pink-500 to-purple-600', icon: '🎭' }
                  ].map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${content.color} rounded-xl flex items-center justify-center text-2xl`}>
                          {content.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{content.type}</h4>
                          <p className="text-sm text-gray-600">{content.count} items</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🔧</span>
                  Content Tools
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Bulk Upload', icon: '📤', color: 'from-blue-500 to-purple-500' },
                    { name: 'Auto-Sync', icon: '🔄', color: 'from-green-500 to-blue-500' },
                    { name: 'Quality Check', icon: '✅', color: 'from-orange-500 to-red-500' },
                    { name: 'Metadata Editor', icon: '📝', color: 'from-purple-500 to-pink-500' },
                    { name: 'Subtitle Manager', icon: '💬', color: 'from-cyan-500 to-blue-500' },
                    { name: 'Thumbnail Gen', icon: '🖼️', color: 'from-yellow-500 to-orange-500' }
                  ].map((tool, index) => (
                    <button
                      key={index}
                      className={`p-4 bg-gradient-to-r ${tool.color} text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      <div className="text-2xl mb-2">{tool.icon}</div>
                      <div className="text-sm font-semibold">{tool.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  Performance Metrics
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Views Today', value: '12.4K', change: '+15%', color: 'text-green-600' },
                    { label: 'Watch Time', value: '847h', change: '+23%', color: 'text-blue-600' },
                    { label: 'User Engagement', value: '89%', change: '+5%', color: 'text-purple-600' },
                    { label: 'Revenue', value: '$2,847', change: '+18%', color: 'text-green-600' }
                  ].map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-gray-600 text-sm">{metric.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <span className={`text-sm font-semibold ${metric.color}`}>{metric.change}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  Top Content
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Oppenheimer', views: '2.4K', rating: '8.9' },
                    { title: 'Spider-Verse', views: '1.8K', rating: '8.7' },
                    { title: 'John Wick 4', views: '1.5K', rating: '8.2' },
                    { title: 'The Batman', views: '1.2K', rating: '8.0' }
                  ].map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-900">{content.title}</h4>
                        <p className="text-sm text-gray-600">{content.views} views</p>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">{content.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h3>
              <p className="text-gray-600 mb-6">Configure platform settings, user preferences, and system configurations.</p>
              <div className="inline-flex px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-xl font-medium">
                ⚙️ Settings Panel Coming Soon
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Movie Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div 
              ref={formRef}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-200/50 px-8 py-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {editingMovie ? 'Edit Movie' : 'Add New Movie'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Movie Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      placeholder="Enter movie title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Director
                    </label>
                    <input
                      type="text"
                      name="director"
                      value={formData.director}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      placeholder="Director name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
                    placeholder="Brief description of the movie"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      min="1900"
                      max={new Date().getFullYear() + 5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Genre
                    </label>
                    <select
                      name="genre"
                      value={formData.genre}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    >
                      <option value="">Select Genre</option>
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      min="0"
                      max="10"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      placeholder="0.0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      placeholder="120"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    placeholder="https://example.com/movie-poster.jpg"
                  />
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {editingMovie ? 'Update Movie' : 'Add Movie'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernAdminPanel;
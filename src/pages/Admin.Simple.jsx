import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    year: '',
    genre: '',
    rating: '',
    description: '',
    poster: ''
  });

  // Load movies from localStorage
  useEffect(() => {
    const savedMovies = localStorage.getItem('admin_movies');
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  // Save movies to localStorage
  const saveMovies = (movieList) => {
    localStorage.setItem('admin_movies', JSON.stringify(movieList));
    setMovies(movieList);
  };

  // Add new movie
  const handleAddMovie = (e) => {
    e.preventDefault();
    const movie = {
      ...newMovie,
      id: Date.now(),
      dateAdded: new Date().toLocaleDateString()
    };
    const updatedMovies = [...movies, movie];
    saveMovies(updatedMovies);
    
    // Reset form
    setNewMovie({
      title: '',
      year: '',
      genre: '',
      rating: '',
      description: '',
      poster: ''
    });
    setShowAddForm(false);
  };

  // Delete movie
  const handleDeleteMovie = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      const updatedMovies = movies.filter(movie => movie.id !== id);
      saveMovies(updatedMovies);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🛡️ Admin Panel</h1>
          <p className="text-gray-600">Manage movies and content for CineFalls</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Movies</h3>
              <p className="text-2xl font-bold text-blue-600">{movies.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Published</h3>
              <p className="text-2xl font-bold text-green-600">{movies.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Categories</h3>
              <p className="text-2xl font-bold text-purple-600">{new Set(movies.map(m => m.genre)).size}</p>
            </div>
          </div>
        </div>

        {/* Add Movie Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {showAddForm ? '❌ Cancel' : '➕ Add New Movie'}
          </button>
        </div>

        {/* Add Movie Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Movie</h2>
            <form onSubmit={handleAddMovie} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Movie Title *</label>
                <input
                  type="text"
                  required
                  value={newMovie.title}
                  onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter movie title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  value={newMovie.year}
                  onChange={(e) => setNewMovie({...newMovie, year: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="2023"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                <select
                  value={newMovie.genre}
                  onChange={(e) => setNewMovie({...newMovie, genre: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Select genre</option>
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Drama">Drama</option>
                  <option value="Horror">Horror</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.1"
                  value={newMovie.rating}
                  onChange={(e) => setNewMovie({...newMovie, rating: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="8.5"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Poster URL</label>
                <input
                  type="url"
                  value={newMovie.poster}
                  onChange={(e) => setNewMovie({...newMovie, poster: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="https://example.com/poster.jpg"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newMovie.description}
                  onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                  rows="3"
                  placeholder="Enter movie description"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  ✅ Add Movie
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Movies List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Movies ({movies.length})</h2>
          
          {movies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No movies added yet.</p>
              <p className="text-gray-400">Click "Add New Movie" to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map(movie => (
                <div key={movie.id} className="border border-gray-200 rounded-lg p-4">
                  {movie.poster && (
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{movie.title}</h3>
                  {movie.year && <p className="text-gray-600 text-sm mb-1">Year: {movie.year}</p>}
                  {movie.genre && <p className="text-gray-600 text-sm mb-1">Genre: {movie.genre}</p>}
                  {movie.rating && <p className="text-gray-600 text-sm mb-1">Rating: ⭐ {movie.rating}/10</p>}
                  <p className="text-gray-600 text-sm mb-1">Added: {movie.dateAdded}</p>
                  {movie.description && <p className="text-gray-700 text-sm mb-3">{movie.description}</p>}
                  
                  <button
                    onClick={() => handleDeleteMovie(movie.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
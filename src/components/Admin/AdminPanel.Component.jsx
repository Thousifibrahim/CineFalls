import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { 
  Plus, 
  X, 
  Film, 
  Star, 
  Users, 
  Save,
  Edit,
  Trash2
} from 'lucide-react';

const AdminPanel = () => {
  const { isAdmin, movies, addMovie, updateMovie, deleteMovie } = useAdmin();
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [movieForm, setMovieForm] = useState({
    title: '',
    overview: '',
    release_date: '',
    runtime: '',
    genre_ids: [],
    vote_average: '',
    adult: false,
    original_language: 'en',
    popularity: '',
    vote_count: '',
    budget: '',
    revenue: '',
    poster_path: '',
    backdrop_path: '',
    tagline: '',
    production_companies: '',
    production_countries: '',
    spoken_languages: '',
    status: 'Released'
  });

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMovieForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGenreChange = (genreId) => {
    setMovieForm(prev => ({
      ...prev,
      genre_ids: prev.genre_ids.includes(genreId)
        ? prev.genre_ids.filter(id => id !== genreId)
        : [...prev.genre_ids, genreId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const movieData = {
      ...movieForm,
      runtime: parseInt(movieForm.runtime) || 0,
      vote_average: parseFloat(movieForm.vote_average) || 0,
      popularity: parseFloat(movieForm.popularity) || 0,
      vote_count: parseInt(movieForm.vote_count) || 0,
      budget: parseInt(movieForm.budget) || 0,
      revenue: parseInt(movieForm.revenue) || 0,
    };

    if (editingMovie) {
      updateMovie(editingMovie.id, movieData);
      setEditingMovie(null);
    } else {
      addMovie(movieData);
    }
    
    resetForm();
    setShowAddMovie(false);
  };

  const resetForm = () => {
    setMovieForm({
      title: '',
      overview: '',
      release_date: '',
      runtime: '',
      genre_ids: [],
      vote_average: '',
      adult: false,
      original_language: 'en',
      popularity: '',
      vote_count: '',
      budget: '',
      revenue: '',
      poster_path: '',
      backdrop_path: '',
      tagline: '',
      production_companies: '',
      production_countries: '',
      spoken_languages: '',
      status: 'Released'
    });
  };

  const handleEdit = (movie) => {
    setMovieForm(movie);
    setEditingMovie(movie);
    setShowAddMovie(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
              <Film className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-400">Manage movies and content</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddMovie(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Movie</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Movies</p>
                <p className="text-2xl font-bold text-white">{movies.length}</p>
              </div>
              <Film className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <div className="card-glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Admin Added</p>
                <p className="text-2xl font-bold text-white">
                  {movies.filter(m => m.admin_added).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="card-glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-white">
                  {movies.length > 0 
                    ? (movies.reduce((acc, m) => acc + (parseFloat(m.vote_average) || 0), 0) / movies.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Movies Table */}
        <div className="card-glass overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Movies Management</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-gray-400 font-medium">Movie</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Release Date</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Rating</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Runtime</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={movie.poster_path?.startsWith('http') 
                            ? movie.poster_path 
                            : `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                          }
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/92x138/334155/ffffff?text=No+Image';
                          }}
                        />
                        <div>
                          <h3 className="text-white font-medium">{movie.title}</h3>
                          <p className="text-gray-400 text-sm">{movie.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{movie.release_date}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white">{movie.vote_average}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{movie.runtime} min</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        movie.admin_added 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {movie.admin_added ? 'Admin Added' : 'TMDB'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(movie)}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(movie.id)}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {movies.length === 0 && (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No movies added yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Movie Modal */}
      {showAddMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingMovie ? 'Edit Movie' : 'Add New Movie'}
              </h2>
              <button
                onClick={() => {
                  setShowAddMovie(false);
                  setEditingMovie(null);
                  resetForm();
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={movieForm.title}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      value={movieForm.tagline}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Overview *
                    </label>
                    <textarea
                      name="overview"
                      value={movieForm.overview}
                      onChange={handleInputChange}
                      rows="4"
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Release Date
                      </label>
                      <input
                        type="date"
                        name="release_date"
                        value={movieForm.release_date}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Runtime (minutes)
                      </label>
                      <input
                        type="number"
                        name="runtime"
                        value={movieForm.runtime}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Additional Details</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Rating
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        name="vote_average"
                        value={movieForm.vote_average}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Vote Count
                      </label>
                      <input
                        type="number"
                        name="vote_count"
                        value={movieForm.vote_count}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Budget ($)
                      </label>
                      <input
                        type="number"
                        name="budget"
                        value={movieForm.budget}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Revenue ($)
                      </label>
                      <input
                        type="number"
                        name="revenue"
                        value={movieForm.revenue}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      name="original_language"
                      value={movieForm.original_language}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                      <option value="ja">Japanese</option>
                      <option value="ko">Korean</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={movieForm.status}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="Released">Released</option>
                      <option value="Rumored">Rumored</option>
                      <option value="Planned">Planned</option>
                      <option value="In Production">In Production</option>
                      <option value="Post Production">Post Production</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="adult"
                      checked={movieForm.adult}
                      onChange={handleInputChange}
                      className="rounded border-gray-600 bg-slate-700 text-primary-500"
                    />
                    <label className="text-sm text-gray-300">Adult Content</label>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Poster URL
                    </label>
                    <input
                      type="url"
                      name="poster_path"
                      value={movieForm.poster_path}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Backdrop URL
                    </label>
                    <input
                      type="url"
                      name="backdrop_path"
                      value={movieForm.backdrop_path}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Genres */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Genres</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {genres.map((genre) => (
                    <label key={genre.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={movieForm.genre_ids.includes(genre.id)}
                        onChange={() => handleGenreChange(genre.id)}
                        className="rounded border-gray-600 bg-slate-700 text-primary-500"
                      />
                      <span className="text-sm text-gray-300">{genre.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddMovie(false);
                    setEditingMovie(null);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>{editingMovie ? 'Update Movie' : 'Add Movie'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
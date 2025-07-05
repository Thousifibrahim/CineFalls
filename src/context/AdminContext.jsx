import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [movies, setMovies] = useState([]);
  const [adminUser, setAdminUser] = useState(null);

  // Admin email list - you can configure this
  const adminEmails = [
    'admin@cinefalls.com',
    'manager@cinefalls.com'
    // Add more admin emails here
  ];

  useEffect(() => {
    // Load movies from localStorage
    const savedMovies = localStorage.getItem('cinefalls_admin_movies');
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }

    // Check admin status
    const savedAdminUser = localStorage.getItem('cinefalls_admin_user');
    if (savedAdminUser) {
      const user = JSON.parse(savedAdminUser);
      setAdminUser(user);
      setIsAdmin(adminEmails.includes(user.email));
    }
  }, []);

  const checkAdminStatus = (user) => {
    if (user && user.authentication && user.authentication.email) {
      const isUserAdmin = adminEmails.includes(user.authentication.email);
      setIsAdmin(isUserAdmin);
      if (isUserAdmin) {
        const adminData = {
          email: user.authentication.email,
          name: user.authentication.name,
          photoUrl: user.authentication.photoUrl
        };
        setAdminUser(adminData);
        localStorage.setItem('cinefalls_admin_user', JSON.stringify(adminData));
      }
      return isUserAdmin;
    }
    return false;
  };

  const addMovie = (movie) => {
    const newMovie = {
      ...movie,
      id: Date.now(), // Simple ID generation
      created_at: new Date().toISOString(),
      admin_added: true
    };
    
    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    localStorage.setItem('cinefalls_admin_movies', JSON.stringify(updatedMovies));
    return newMovie;
  };

  const updateMovie = (id, updatedMovie) => {
    const updatedMovies = movies.map(movie => 
      movie.id === id ? { ...movie, ...updatedMovie } : movie
    );
    setMovies(updatedMovies);
    localStorage.setItem('cinefalls_admin_movies', JSON.stringify(updatedMovies));
  };

  const deleteMovie = (id) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem('cinefalls_admin_movies', JSON.stringify(updatedMovies));
  };

  const logout = () => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem('cinefalls_admin_user');
  };

  const value = {
    isAdmin,
    adminUser,
    movies,
    checkAdminStatus,
    addMovie,
    updateMovie,
    deleteMovie,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
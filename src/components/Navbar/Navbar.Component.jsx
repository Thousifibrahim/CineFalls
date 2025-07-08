import React, { useState } from "react";import React, { useState } from "react";import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState } from 'react';import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);import { Link } from 'react-router-dom';

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

const Navbar = () => {

  const handleLogin = () => {

    setIsLoggedIn(true);  const [isOpen, setIsOpen] = useState(false);import { Link } from 'react-router-dom';

    localStorage.setItem("isLoggedIn", "true");

  };  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");



  const handleLogout = () => {const Navbar = () => {

    setIsLoggedIn(false);

    localStorage.removeItem("isLoggedIn");  const handleLogin = () => {

  };

    setIsLoggedIn(true);  const [isOpen, setIsOpen] = useState(false);import { useAdmin } from '../../context/AdminContext';import { Link } from 'react-router-dom';import { Link, useNavigate } from 'react-router-dom';

  return (

    <nav className="bg-white shadow-lg sticky top-0 z-50">    localStorage.setItem("isLoggedIn", "true");

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16">  };  const [user, setUser] = useState(null);

          <div className="flex items-center">

            <Link to="/" className="flex-shrink-0 flex items-center">

              <span className="text-2xl font-bold text-red-600">Cinefalls</span>

            </Link>  const handleLogout = () => {

          </div>

    setIsLoggedIn(false);

          <div className="hidden md:flex items-center space-x-8">

            <Link    localStorage.removeItem("isLoggedIn");  const handleSignIn = () => {

              to="/"

              className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"  };

            >

              Home    setUser({export const Navbar = () => {import { useAdmin } from '../../context/AdminContext';import { useAdmin } from '../../context/AdminContext';

            </Link>

              return (

            {isLoggedIn ? (

              <>    <nav className="bg-white shadow-lg sticky top-0 z-50">      name: "Demo User",

                <Link

                  to="/admin"      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                  className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"

                >        <div className="flex justify-between h-16">      email: "demo@cinefalls.com",  const [isOpen, setIsOpen] = useState(false);

                  Admin Panel

                </Link>          <div className="flex items-center">

                <button

                  onClick={handleLogout}            <Link to="/" className="flex-shrink-0 flex items-center">      picture: "https://via.placeholder.com/40/3B82F6/ffffff?text=D"

                  className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"

                >              <span className="text-2xl font-bold text-red-600">Cinefalls</span>

                  Logout

                </button>            </Link>    });  const [user, setUser] = useState(null);

              </>

            ) : (          </div>

              <button

                onClick={handleLogin}  };

                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"

              >          <div className="hidden md:flex items-center space-x-8">

                Login

              </button>            <Link

            )}

          </div>              to="/"



          <div className="md:hidden flex items-center">              className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"  return (

            <button

              onClick={() => setIsOpen(!isOpen)}            >

              className="text-gray-500 hover:text-gray-700 focus:outline-none"

            >              Home    <nav className="bg-white shadow-lg fixed top-0 w-full z-50">  const handleSignIn = () => {export const Navbar = () => {export const Navbar = () => {

              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                {isOpen ? (            </Link>

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />

                ) : (                  <div className="max-w-7xl mx-auto px-4">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />

                )}            {isLoggedIn ? (

              </svg>

            </button>              <>        <div className="flex justify-between items-center h-16">    const demoUser = {

          </div>

        </div>                <Link



        {isOpen && (                  to="/admin"          

          <div className="md:hidden bg-white border-t border-gray-200">

            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">                  className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"

              <Link

                to="/"                >          <Link to="/" className="flex items-center space-x-2">      name: "Demo User",  const [isOpen, setIsOpen] = useState(false);  const [isOpen, setIsOpen] = useState(false);

                className="text-gray-900 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"

                onClick={() => setIsOpen(false)}                  Admin Panel

              >

                Home                </Link>            <span className="text-2xl">🎬</span>

              </Link>

                              <button

              {isLoggedIn ? (

                <>                  onClick={handleLogout}            <span className="text-xl font-bold text-gray-800">CineFalls</span>      email: "demo@cinefalls.com",

                  <Link

                    to="/admin"                  className="text-gray-900 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"

                    className="bg-red-600 text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium"

                    onClick={() => setIsOpen(false)}                >          </Link>

                  >

                    Admin Panel                  Logout

                  </Link>

                  <button                </button>      picture: "https://via.placeholder.com/40/3B82F6/ffffff?text=D"  const [user, setUser] = useState(null);  const [user, setUser] = useState(null);

                    onClick={() => {

                      handleLogout();              </>

                      setIsOpen(false);

                    }}            ) : (          <div className="hidden md:flex space-x-6">

                    className="text-gray-900 hover:text-red-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"

                  >              <button

                    Logout

                  </button>                onClick={handleLogin}            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>    };

                </>

              ) : (                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"

                <button

                  onClick={() => {              >            <Link to="/movies" className="text-gray-600 hover:text-blue-600 font-medium">Movies</Link>

                    handleLogin();

                    setIsOpen(false);                Login

                  }}

                  className="bg-red-600 text-white hover:bg-red-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium"              </button>            <Link to="/search" className="text-gray-600 hover:text-blue-600 font-medium">Search</Link>    setUser(demoUser);  const { isAdmin } = useAdmin();  const navigate = useNavigate();

                >

                  Login            )}

                </button>

              )}          </div>          </div>

            </div>

          </div>

        )}

      </div>          <div className="md:hidden flex items-center">  };

    </nav>

  );            <button

};

              onClick={() => setIsOpen(!isOpen)}          <div className="flex items-center space-x-4">

export default Navbar;
              className="text-gray-500 hover:text-gray-700 focus:outline-none"

            >            {user ? (  const { isAdmin, user: adminUser } = useAdmin();

              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                {isOpen ? (              <div className="relative group">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />

                ) : (                <button className="flex items-center space-x-2">  const handleSignOut = () => {

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />

                )}                  <img src={user.picture} alt="User" className="w-8 h-8 rounded-full" />

              </svg>

            </button>                  <span className="text-gray-700">{user.name}</span>    setUser(null);  // Simple demo login - we'll improve this to be more realistic

          </div>

        </div>                </button>



        {/* Mobile menu */}                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">  };

        {isOpen && (

          <div className="md:hidden bg-white border-t border-gray-200">                  <Link to="/admin" className="block px-4 py-2 text-blue-600 hover:bg-blue-50">🛡️ Admin Panel</Link>

            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

              <Link                  <button onClick={() => setUser(null)} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Sign Out</button>  const handleSignIn = () => {  // Simple Google Sign In (mock for now - easier to implement)

                to="/"

                className="text-gray-900 hover:text-red-600 block px-3 py-2 rounded-md text-base font-medium"                </div>

                onClick={() => setIsOpen(false)}

              >              </div>  return (

                Home

              </Link>            ) : (

              

              {isLoggedIn ? (              <button onClick={handleSignIn} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">    <nav className="bg-white shadow-md fixed top-0 w-full z-50">    const demoUser = {  const handleSignIn = () => {

                <>

                  <Link                Sign In

                    to="/admin"

                    className="bg-red-600 text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium"              </button>      <div className="max-w-7xl mx-auto px-4">

                    onClick={() => setIsOpen(false)}

                  >            )}

                    Admin Panel

                  </Link>          </div>        <div className="flex justify-between items-center h-16">      name: "Demo User",    // For demo purposes, let's create a simple user

                  <button

                    onClick={() => {        </div>

                      handleLogout();

                      setIsOpen(false);      </div>          

                    }}

                    className="text-gray-900 hover:text-red-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"    </nav>

                  >

                    Logout  );          {/* Simple Logo */}      email: "demo@cinefalls.com",    const demoUser = {

                  </button>

                </>};

              ) : (

                <button          <Link to="/" className="flex items-center space-x-2">

                  onClick={() => {

                    handleLogin();export default Navbar;

                    setIsOpen(false);            <span className="text-2xl">🎬</span>      picture: "https://via.placeholder.com/40x40/3B82F6/ffffff?text=DU"      name: "John Doe",

                  }}

                  className="bg-red-600 text-white hover:bg-red-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium"            <span className="text-xl font-bold text-gray-800">CineFalls</span>

                >

                  Login          </Link>    };      email: "john@example.com",

                </button>

              )}

            </div>

          </div>          {/* Desktop Navigation */}    setUser(demoUser);      picture: "https://via.placeholder.com/40x40/3B82F6/ffffff?text=JD"

        )}

      </div>          <div className="hidden md:flex space-x-6">

    </nav>

  );            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">  };    };

};

              Home

export default Navbar;
            </Link>    setUser(demoUser);

            <Link to="/movies" className="text-gray-600 hover:text-blue-600 font-medium">

              Movies  const handleSignOut = () => {  };

            </Link>

            <Link to="/tv-shows" className="text-gray-600 hover:text-blue-600 font-medium">    setUser(null);

              TV Shows

            </Link>  };  const handleSignOut = () => {

            <Link to="/search" className="text-gray-600 hover:text-blue-600 font-medium">

              Search    setUser(null);

            </Link>

          </div>  return (  };



          {/* User Section */}    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 w-full z-50">

          <div className="flex items-center space-x-4">

            {user ? (      <div className="max-w-7xl mx-auto px-4">  return (

              <div className="relative group">

                <button className="flex items-center space-x-2 text-gray-600">        <div className="flex justify-between items-center h-16">    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 w-full z-50">

                  <img src={user.picture} alt="User" className="w-8 h-8 rounded-full" />

                  <span className="hidden md:block">{user.name}</span>                <div className="max-w-7xl mx-auto px-4">

                </button>

                          {/* Logo - Simple and clean */}        <div className="flex justify-between items-center h-16">

                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  <div className="py-2">          <Link to="/" className="flex items-center space-x-3">          

                    <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">

                      ❤️ Favorites            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">          {/* Logo */}

                    </Link>

                    <Link to="/watchlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">              <span className="text-white font-bold text-lg">🎬</span>          <Link to="/" className="flex items-center space-x-3">

                      📝 Watchlist

                    </Link>            </div>            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">

                    <Link to="/admin" className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium">

                      🛡️ Admin Panel            <span className="text-xl font-bold text-gray-900">CineFalls</span>              <span className="text-white font-bold text-lg">🎬</span>

                    </Link>

                    <button           </Link>            </div>

                      onClick={handleSignOut}

                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"            <span className="text-xl font-bold text-gray-900">CineFalls</span>

                    >

                      Sign Out          {/* Navigation Links - Clean and obvious */}          </Link>

                    </button>

                  </div>          <div className="hidden md:flex items-center space-x-8">

                </div>

              </div>            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">          {/* Desktop Navigation */}

            ) : (

              <button               Home          <div className="hidden md:flex items-center space-x-8">

                onClick={handleSignIn}

                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"            </Link>            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">

              >

                Sign In            <Link to="/movies" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">              Home

              </button>

            )}              Movies            </Link>



            {/* Mobile Menu */}            </Link>            <Link to="/movies" className="text-gray-700 hover:text-blue-600 font-medium">

            <button 

              onClick={() => setIsOpen(!isOpen)}            <Link to="/tv-shows" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">              Movies

              className="md:hidden"

            >              TV Shows            </Link>

              {isOpen ? '✕' : '☰'}

            </button>            </Link>            <Link to="/tv-shows" className="text-gray-700 hover:text-blue-600 font-medium">

          </div>

        </div>            <Link to="/search" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">              TV Shows



        {/* Mobile Menu */}              Search            </Link>

        {isOpen && (

          <div className="md:hidden py-4 border-t">            </Link>            <Link to="/search" className="text-gray-700 hover:text-blue-600 font-medium">

            <Link to="/" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>

              Home          </div>              Search

            </Link>

            <Link to="/movies" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>            </Link>

              Movies

            </Link>          {/* User Section */}          </div>

            <Link to="/tv-shows" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>

              TV Shows          <div className="flex items-center space-x-4">

            </Link>

            <Link to="/search" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>            {user ? (          {/* User Section */}

              Search

            </Link>              <div className="relative group">          <div className="flex items-center space-x-4">

            {user && (

              <>                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">            {user ? (

                <Link to="/favorites" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>

                  ❤️ Favorites                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border-2 border-gray-200" />              <div className="flex items-center space-x-4">

                </Link>

                <Link to="/admin" className="block py-2 text-blue-600" onClick={() => setIsOpen(false)}>                  <span className="hidden md:block font-medium">{user.name}</span>                {/* User Menu */}

                  🛡️ Admin Panel

                </Link>                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">                <div className="relative group">

              </>

            )}                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">

          </div>

        )}                  </svg>                    <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />

      </div>

    </nav>                </button>                    <span className="hidden md:block">{user.name}</span>

  );

};                                  </button>



export default Navbar;                {/* User Dropdown */}                  

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">                  {/* Dropdown */}

                  <div className="py-2">                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">

                    <div className="px-4 py-2 border-b border-gray-100">                    <div className="py-1">

                      <p className="text-sm font-medium text-gray-900">{user.name}</p>                      <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">

                      <p className="text-xs text-gray-500">{user.email}</p>                        My Favorites

                    </div>                      </Link>

                                          <Link to="/watchlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">

                    <Link to="/favorites" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">                        Watchlist

                      <span className="mr-3">❤️</span>                      </Link>

                      My Favorites                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">

                    </Link>                        Settings

                    <Link to="/watchlist" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">                      </Link>

                      <span className="mr-3">📝</span>                      {isAdmin && (

                      Watchlist                        <Link to="/admin" className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium">

                    </Link>                          🛡️ Admin Panel

                    <Link to="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">                        </Link>

                      <span className="mr-3">⚙️</span>                      )}

                      Settings                      <hr className="my-1" />

                    </Link>                      <button 

                                            onClick={handleSignOut}

                    {/* Admin Panel - Only show for admins */}                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"

                    {isAdmin && (                      >

                      <>                        Sign Out

                        <hr className="my-1" />                      </button>

                        <Link to="/admin" className="flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium">                    </div>

                          <span className="mr-3">🛡️</span>                  </div>

                          Admin Panel                </div>

                        </Link>              </div>

                      </>            ) : (

                    )}              <button 

                                    onClick={handleSignIn}

                    <hr className="my-1" />                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"

                    <button               >

                      onClick={handleSignOut}                Sign In

                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"              </button>

                    >            )}

                      <span className="mr-3">🚪</span>

                      Sign Out            {/* Mobile Menu Button */}

                    </button>            <button 

                  </div>              onClick={() => setIsOpen(!isOpen)}

                </div>              className="md:hidden text-gray-700"

              </div>            >

            ) : (              {isOpen ? '✕' : '☰'}

              <button             </button>

                onClick={handleSignIn}          </div>

                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"        </div>

              >

                Sign In        {/* Mobile Menu */}

              </button>        {isOpen && (

            )}          <div className="md:hidden border-t border-gray-200 bg-white">

            <div className="py-4 space-y-2">

            {/* Mobile Menu Button */}              <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">

            <button                 Home

              onClick={() => setIsOpen(!isOpen)}              </Link>

              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"              <Link to="/movies" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">

            >                Movies

              {isOpen ? (              </Link>

                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">              <Link to="/tv-shows" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />                TV Shows

                </svg>              </Link>

              ) : (              <Link to="/search" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">

                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">                Search

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />              </Link>

                </svg>              

              )}              {user && (

            </button>                <>

          </div>                  <hr className="my-2" />

        </div>                  <Link to="/favorites" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">

                    My Favorites

        {/* Mobile Menu */}                  </Link>

        {isOpen && (                  <Link to="/watchlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">

          <div className="md:hidden border-t border-gray-200 bg-white">                    Watchlist

            <div className="py-4 space-y-1">                  </Link>

              <Link                   {isAdmin && (

                to="/"                     <Link to="/admin" className="block px-4 py-2 text-blue-600 hover:bg-blue-50 rounded font-medium">

                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"                      🛡️ Admin Panel

                onClick={() => setIsOpen(false)}                    </Link>

              >                  )}

                🏠 Home                </>

              </Link>              )}

              <Link             </div>

                to="/movies"           </div>

                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"        )}

                onClick={() => setIsOpen(false)}      </div>

              >    </nav>

                🎬 Movies  );

              </Link>};

              <Link     } catch (error) {

                to="/tv-shows"       console.error('Login failed:', error);

                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"    }

                onClick={() => setIsOpen(false)}  };

              >

                📺 TV Shows  const handleLogout = async () => {

              </Link>    try {

              <Link       await GoogleAuth.signOut();

                to="/search"       setUser(null);

                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"      setDropdownOpen(false);

                onClick={() => setIsOpen(false)}      adminLogout(); // Also logout from admin context

              >      closeMenu();

                🔍 Search      navigate('/');

              </Link>    } catch (error) {

                    console.error('Logout failed:', error);

              {user && (    }

                <>  };

                  <hr className="my-3" />

                  <Link   const NavLink = ({ to, children, icon: Icon, onClick }) => (

                    to="/favorites"     <Link

                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"      to={to}

                    onClick={() => setIsOpen(false)}      onClick={onClick || closeMenu}

                  >      className="nav-link group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-lg hover:scale-105 active:scale-95"

                    ❤️ My Favorites    >

                  </Link>      <Icon className="w-5 h-5 transition-colors group-hover:text-blue-300" />

                  <Link       <span className="font-medium tracking-wide">{children}</span>

                    to="/watchlist"     </Link>

                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"  );

                    onClick={() => setIsOpen(false)}

                  >  const MobileNavLink = ({ to, children, icon: Icon, onClick }) => (

                    📝 Watchlist    <Link

                  </Link>      to={to}

                  <Link       onClick={onClick || closeMenu}

                    to="/settings"       className="flex items-center space-x-4 px-6 py-4 text-white hover:bg-white/10 transition-all duration-300 active:bg-white/20 border-b border-white/5"

                    className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"    >

                    onClick={() => setIsOpen(false)}      <Icon className="w-6 h-6 text-blue-300" />

                  >      <span className="text-lg font-medium">{children}</span>

                    ⚙️ Settings    </Link>

                  </Link>  );

                  

                  {isAdmin && (  return (

                    <Link     <>

                      to="/admin"       {/* Desktop & Tablet Navbar */}

                      className="block px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${

                      onClick={() => setIsOpen(false)}        isScrolled 

                    >          ? 'backdrop-blur-xl bg-gradient-to-r from-slate-900/90 to-slate-800/90 shadow-2xl border-b border-white/10' 

                      🛡️ Admin Panel          : 'bg-transparent'

                    </Link>      }`}>

                  )}        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                </>          <div className="flex items-center justify-between h-16 lg:h-20">

              )}            

            </div>            {/* Logo */}

          </div>            <Link 

        )}              to="/" 

      </div>              className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"

    </nav>            >

  );              <div className="relative">

};                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">

                  <Film className="w-6 h-6 lg:w-7 lg:h-7 text-white" />

export default Navbar;                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  CineFalls
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Your Movie Universe</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <NavLink to="/" icon={Home}>Home</NavLink>
              <NavLink to="/search" icon={Search}>Search</NavLink>
              <NavLink to="/movies" icon={Film}>Movies</NavLink>
              <NavLink to="/tv-shows" icon={Tv}>TV Shows</NavLink>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <img
                      src={user.authentication.photoUrl}
                      alt={user.authentication.name}
                      className="w-8 h-8 rounded-full border-2 border-blue-400"
                    />
                    <span className="hidden sm:block text-sm font-medium text-white">
                      {user.authentication.name}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2 z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{user.authentication.name}</p>
                        <p className="text-xs text-gray-400">{user.authentication.email}</p>
                      </div>
                      <Link
                        to="/favorites"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-white">Favorites</span>
                      </Link>
                      <Link
                        to="/watchlist"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-white">Watchlist</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-white">Settings</span>
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Shield className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-white">Admin Panel</span>
                        </Link>
                      )}
                      <hr className="border-white/10 my-2" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-red-500/10 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400">Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  className="hidden sm:flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 touch-manipulation"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        ></div>

        {/* Mobile Menu */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">CineFalls</h2>
                <p className="text-xs text-gray-400">Your Movie Universe</p>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-xl hover:bg-white/10 transition-colors touch-manipulation"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* User Info (Mobile) */}
          {user && (
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <img
                  src={user.authentication.photoUrl}
                  alt={user.authentication.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-400"
                />
                <div>
                  <p className="text-white font-medium">{user.authentication.name}</p>
                  <p className="text-gray-400 text-sm">{user.authentication.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <div className="py-4">
            <MobileNavLink to="/" icon={Home}>Home</MobileNavLink>
            <MobileNavLink to="/search" icon={Search}>Search</MobileNavLink>
            <MobileNavLink to="/movies" icon={Film}>Movies</MobileNavLink>
            <MobileNavLink to="/tv-shows" icon={Tv}>TV Shows</MobileNavLink>
            
            {user && (
              <>
                <div className="h-px bg-white/10 mx-6 my-4"></div>
                <MobileNavLink to="/favorites" icon={Heart}>Favorites</MobileNavLink>
                <MobileNavLink to="/watchlist" icon={Star}>Watchlist</MobileNavLink>
                <MobileNavLink to="/settings" icon={Settings}>Settings</MobileNavLink>
                {isAdmin && (
                  <MobileNavLink to="/admin" icon={Shield}>Admin Panel</MobileNavLink>
                )}
              </>
            )}
          </div>

          {/* Mobile Auth Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-3 w-full px-6 py-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl font-medium transition-all duration-300 active:scale-95 touch-manipulation"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center space-x-3 w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 active:scale-95 touch-manipulation"
              >
                <User className="w-5 h-5" />
                <span>Sign In with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { BiSearch, BiX, BiTrendingUp, BiTime } from 'react-icons/bi';

const EnhancedSearch = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches] = useState([
    'Avengers: Endgame',
    'The Batman',
    'Spider-Man',
    'Inception'
  ]);

  const [trendingSearches] = useState([
    'Oppenheimer',
    'Barbie',
    'Fast X',
    'John Wick 4',
    'Guardians of the Galaxy'
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="glass-card w-full max-w-2xl mx-4 p-6 rounded-2xl animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Search Movies & Events</h2>
          <button
            onClick={onClose}
            className="glass-button p-2 rounded-full hover:scale-110 transition-all duration-300"
          >
            <BiX className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies, events, plays, sports..."
            className="w-full glass-card pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
            autoFocus
          />
        </div>

        {/* Search Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {['Movies', 'Events', 'Plays', 'Sports'].map((category) => (
            <button
              key={category}
              className="glass-button p-3 rounded-xl text-white font-medium hover:scale-105 transition-all duration-300"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recent Searches */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BiTime className="w-4 h-4 text-gray-400" />
            <h3 className="text-gray-300 font-medium">Recent Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                className="glass px-3 py-2 rounded-full text-sm text-gray-300 hover:text-white transition-colors duration-300"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Searches */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BiTrendingUp className="w-4 h-4 text-blue-400" />
            <h3 className="text-gray-300 font-medium">Trending Now</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                className="glass px-3 py-2 rounded-full text-sm text-gray-300 hover:text-white transition-colors duration-300"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearch;
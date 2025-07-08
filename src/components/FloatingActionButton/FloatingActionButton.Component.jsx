import React, { useState } from 'react';
import { BiSearch, BiUser, BiHeart, BiReceipt, BiCog } from 'react-icons/bi';

const FloatingActionButton = ({ onSearchClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const actionItems = [
    { icon: BiSearch, label: 'Search', color: 'text-blue-400', onClick: onSearchClick },
    { icon: BiHeart, label: 'Favorites', color: 'text-red-400', onClick: () => {} },
    { icon: BiReceipt, label: 'My Tickets', color: 'text-green-400', onClick: () => {} },
    { icon: BiUser, label: 'Profile', color: 'text-purple-400', onClick: () => {} },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action items */}
      <div className={`flex flex-col-reverse items-center gap-3 mb-4 transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {actionItems.map((item, index) => (
          <div
            key={index}
            className="group glass-card p-3 rounded-full cursor-pointer hover:scale-110 transition-all duration-300"
            onClick={item.onClick}
          >
            <item.icon className={`w-6 h-6 ${item.color} group-hover:text-white transition-colors duration-300`} />
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 glass-card px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <span className="text-white text-sm font-medium whitespace-nowrap">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={toggleMenu}
        className={`glass-card w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <BiCog className={`w-7 h-7 text-blue-400 transition-all duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
    </div>
  );
};

export default FloatingActionButton;
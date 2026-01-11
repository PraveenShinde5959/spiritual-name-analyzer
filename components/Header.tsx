
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-purple-800/80 to-pink-600/80 backdrop-blur-sm shadow-lg p-4 font-serif">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-white tracking-wider flex items-center">
          <span className="text-gold-300 mr-2 text-3xl">ॐ</span>
          Name & Brand Analyzer
        </NavLink>

        {/* Mobile menu button - only show if there are links to display */}
        {NAV_LINKS.length > 0 && (
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        )}

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-white text-lg hover:text-gold-300 transition duration-300 relative group
                ${isActive ? 'font-bold text-gold-300' : ''}`
              }
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gold-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && NAV_LINKS.length > 0 && (
        <nav className="md:hidden mt-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition duration-300
                ${isActive ? 'bg-purple-700 text-gold-300' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

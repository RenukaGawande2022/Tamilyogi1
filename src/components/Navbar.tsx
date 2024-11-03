import React, { useState } from 'react';
import { Menu, Search, Film, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GENRES } from '../types/movie';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <Film className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Tamilyogi Movie</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {GENRES.slice(0, 6).map(genre => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
                className="text-gray-900 hover:text-blue-600 font-medium"
              >
                {genre.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/search"
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Search className="w-6 h-6 text-gray-900" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2">
            {GENRES.map(genre => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
                className="block py-2 text-gray-900 hover:text-blue-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
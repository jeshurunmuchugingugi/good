import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-lg font-bold text-gray-900">
              LOGISTICS & STORAGE
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Services
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Storage
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              Resources
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
              More
            </a>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <a href="#" className="hidden sm:block text-gray-700 hover:text-gray-900 transition-colors">
              Book Transport
            </a>
            <button className="px-3 py-2 lg:px-4 lg:py-2 rounded-lg shadow-sm transition-colors text-sm lg:text-base" style={{backgroundColor: '#FC9E3B', color: '#1A2637'}}>
              Get A Unit
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
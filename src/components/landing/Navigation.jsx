import { useState, useEffect } from 'react';
import { Menu, X, Package, ChevronDown } from 'lucide-react';

export default function Navigation({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      setServicesOpen(false);
      setMoreOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor: '#F4A261'}}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-bold" style={{color: '#1E1E1E'}}>Logistics & Storage.</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('landing')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('about')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </button>
            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setServicesOpen(!servicesOpen); }}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Services
                <ChevronDown className="w-4 h-4" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-xl shadow-2xl border border-gray-200/60 py-4 z-50 backdrop-blur-sm">
                  <button onClick={() => { onNavigate('about-transport'); setServicesOpen(false); }} className="w-full text-left px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 font-semibold text-base">Transportation</button>
                  <div className="h-px bg-gray-200 mx-4 my-2"></div>
                  <button onClick={() => { onNavigate('about-storage'); setServicesOpen(false); }} className="w-full text-left px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 font-semibold text-base">Storage</button>
                </div>
              )}
            </div>
            <button 
              onClick={() => onNavigate('contact')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => onNavigate('transport')} 
              className="px-6 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Book Transport
            </button>
            <button 
              onClick={() => onNavigate('units')} 
              className="px-6 py-2 rounded-lg font-medium text-white transition-colors shadow-md hover:shadow-lg" 
              style={{backgroundColor: '#F4A261'}}
            >
              Rent A Unit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 space-y-4 border-t border-gray-100">
            <button onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }} className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">Home</button>
            <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">About</button>
            <button onClick={() => { onNavigate('about-transport'); setMobileMenuOpen(false); }} className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">About Transport</button>
            <button onClick={() => { onNavigate('about-storage'); setMobileMenuOpen(false); }} className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">About Storage</button>
            <button onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">Contact Us</button>
            <button onClick={() => { onNavigate('admin-auth'); setMobileMenuOpen(false); }} className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-500">Admin Portal</button>
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button onClick={() => { onNavigate('transport'); setMobileMenuOpen(false); }} className="w-full px-6 py-2 rounded-lg font-medium text-gray-700 border border-gray-300">Book Transport</button>
              <button onClick={() => { onNavigate('units'); setMobileMenuOpen(false); }} className="w-full px-6 py-2 rounded-lg font-medium text-white" style={{backgroundColor: '#F4A261'}}>Rent A Unit</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
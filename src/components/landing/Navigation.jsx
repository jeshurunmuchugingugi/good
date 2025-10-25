import { useState } from 'react';
import { Menu, X, Package, Truck, Calculator } from 'lucide-react';

export default function Navigation({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor: '#FC9E3B'}}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold" style={{color: '#1A2637'}}>JESH STORAGE</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('landing')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105"
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('units')} 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105"
            >
              <Package className="w-4 h-4" />
              Storage Units
            </button>
            <button 
              onClick={() => onNavigate('transport')} 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105"
            >
              <Truck className="w-4 h-4" />
              Transport
            </button>
            <button 
              onClick={() => onNavigate('space-calculator')} 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105"
            >
              <Calculator className="w-4 h-4" />
              Space Calculator
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => onNavigate('admin-auth')} 
              className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300"
            >
              Admin Portal
            </button>
            <button 
              onClick={() => onNavigate('units')} 
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg" 
              style={{backgroundColor: '#FC9E3B'}}
            >
              Get Started
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
            <button 
              onClick={() => { onNavigate('units'); setMobileMenuOpen(false); }} 
              className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Package className="w-5 h-5" style={{color: '#FC9E3B'}} />
              <span className="font-medium">Storage Units</span>
            </button>
            <button 
              onClick={() => { onNavigate('transport'); setMobileMenuOpen(false); }} 
              className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Truck className="w-5 h-5" style={{color: '#FC9E3B'}} />
              <span className="font-medium">Transport</span>
            </button>
            <button 
              onClick={() => { onNavigate('space-calculator'); setMobileMenuOpen(false); }} 
              className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calculator className="w-5 h-5" style={{color: '#FC9E3B'}} />
              <span className="font-medium">Space Calculator</span>
            </button>
            <div className="pt-4 border-t border-gray-100">
              <button 
                onClick={() => { onNavigate('units'); setMobileMenuOpen(false); }} 
                className="w-full px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300" 
                style={{backgroundColor: '#FC9E3B'}}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

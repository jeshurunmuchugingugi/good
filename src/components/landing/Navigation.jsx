import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';

export default function Navigation({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <div className="text-lg font-bold text-gray-900">LOGISTICS & STORAGE</div>
          </div>
          <div className="hidden md:flex" style={{gap: '2rem'}}>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">Home</button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">Services</button>
            <button onClick={() => onNavigate('units')} className="text-gray-700 hover:text-gray-900 transition-colors">Storage</button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">Resources</button>
            <button className="text-gray-700 hover:text-gray-900 transition-colors">More</button>
          </div>
          <div className="hidden md:flex items-center" style={{gap: '2rem'}}>
            <button onClick={() => onNavigate('transport')} className="text-gray-700 hover:text-gray-900 transition-colors">Book Transport</button>
            <button onClick={() => onNavigate('units')} className="px-4 py-2 rounded-lg shadow-sm transition-colors" style={{backgroundColor: '#FC9E3B', color: '#1A2637'}}>Rent A Unit</button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button onClick={() => { onNavigate('units'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600">Storage Units</button>
            <button onClick={() => { onNavigate('transport'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600">Transportation</button>
            <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600">About</button>
            <div className="space-y-2">
              <Button onClick={() => { onNavigate('auth'); setMobileMenuOpen(false); }} variant="outline" className="w-full">Login</Button>
              <button onClick={() => { onNavigate('units'); setMobileMenuOpen(false); }} className="w-full px-4 py-2 rounded-lg shadow-sm transition-colors" style={{backgroundColor: '#FC9E3B', color: '#1A2637'}}>Get A Unit</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

import { Bell, User, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export default function ModernLandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#E6DBDB'}}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div>
              <h1 className="text-xl font-bold" style={{color: '#0B1E36'}}>
                STORELINK
              </h1>
              <h2 className="text-lg font-semibold" style={{color: '#0B1E36'}}>
                LOGISTICS
              </h2>
            </div>
            
            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 cursor-pointer" style={{color: '#0B1E36'}} />
              <User className="w-5 h-5 cursor-pointer" style={{color: '#0B1E36'}} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <h1 className="text-5xl font-bold mb-6" style={{color: '#0B1E36'}}>
              Smart Storage & Logistics Management
            </h1>
            
            <p className="text-xl mb-8" style={{color: '#0B1E36', opacity: 0.8}}>
              Manage units, track reservations, and handle payments all in one place.
            </p>
            
            <Button 
              onClick={() => onNavigate('units')}
              className="px-8 py-4 text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity"
              style={{backgroundColor: '#7B2332', color: 'white'}}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: '#7B2332'}}>
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#0B1E36'}}>
                Unit Management
              </h3>
              <p style={{color: '#0B1E36', opacity: 0.7}}>
                Track and manage all storage units with real-time availability updates
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: '#7B2332'}}>
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#0B1E36'}}>
                Reservation System
              </h3>
              <p style={{color: '#0B1E36', opacity: 0.7}}>
                Streamlined booking process with automated confirmation and scheduling
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: '#7B2332'}}>
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
              <h3 className="text-xl font-bold mb-4" style={{color: '#0B1E36'}}>
                Payment Processing
              </h3>
              <p style={{color: '#0B1E36', opacity: 0.7}}>
                Secure payment handling with multiple methods and automated billing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#7B2332'}}>
                  500+
                </div>
                <div style={{color: '#0B1E36', opacity: 0.7}}>
                  Storage Units
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#7B2332'}}>
                  1,200+
                </div>
                <div style={{color: '#0B1E36', opacity: 0.7}}>
                  Active Customers
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#7B2332'}}>
                  98%
                </div>
                <div style={{color: '#0B1E36', opacity: 0.7}}>
                  Occupancy Rate
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#7B2332'}}>
                  24/7
                </div>
                <div style={{color: '#0B1E36', opacity: 0.7}}>
                  Support Available
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <h2 className="text-3xl font-bold mb-6" style={{color: '#0B1E36'}}>
              Ready to Streamline Your Storage Operations?
            </h2>
            
            <p className="text-lg mb-8" style={{color: '#0B1E36', opacity: 0.8}}>
              Join hundreds of storage facilities already using STORELINK LOGISTICS
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => onNavigate('admin-auth')}
                className="px-8 py-4 text-lg font-semibold rounded-xl hover:opacity-90 transition-opacity"
                style={{backgroundColor: '#7B2332', color: 'white'}}
              >
                Admin Login
              </Button>
              
              <Button 
                onClick={() => onNavigate('units')}
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-colors"
                style={{borderColor: '#7B2332', color: '#7B2332'}}
              >
                Browse Units
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
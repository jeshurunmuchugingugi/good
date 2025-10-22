import { useState } from 'react';
import { ArrowRight, Package, Truck, Shield, Clock, CheckCircle, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-2xl text-blue-600">JESH</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => onNavigate('units')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Storage Units
              </button>
              <button onClick={() => onNavigate('transport')} className="text-gray-700 hover:text-blue-600 transition-colors">
                Transportation
              </button>
              <button onClick={() => onNavigate('about')} className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </button>
              <Button onClick={() => onNavigate('auth')} variant="outline">
                Login
              </Button>
              <Button onClick={() => onNavigate('units')}>
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <button onClick={() => { onNavigate('units'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600">
                Storage Units
              </button>
              <button onClick={() => { onNavigate('transport'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600">
                Transportation
              </button>
              <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600">
                About
              </button>
              <div className="space-y-2">
                <Button onClick={() => { onNavigate('auth'); setMobileMenuOpen(false); }} variant="outline" className="w-full">
                  Login
                </Button>
                <Button onClick={() => { onNavigate('units'); setMobileMenuOpen(false); }} className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl text-gray-900 mb-6">
                Secure Storage Solutions for Your Peace of Mind
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Affordable, secure, and convenient self-storage units in Nairobi. 
                Book online, pay with M-PESA, and schedule transportation all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('units')}
                  className="text-lg px-8"
                >
                  Browse Storage Units
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => onNavigate('transport')}
                  className="text-lg px-8"
                >
                  Schedule Transport
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1694601618351-dbbbb2b8934f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yYWdlJTIwZmFjaWxpdHklMjB1bml0c3xlbnwxfHx8fDE3NjEwMjc2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Storage facility"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-1">24/7</div>
                <div>Secure Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Why Choose JESH Storage?</h2>
            <p className="text-xl text-gray-600">Everything you need for hassle-free storage</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Secure & Safe</h3>
              <p className="text-gray-600">
                24/7 CCTV surveillance, individual unit alarms, and controlled access
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Flexible Terms</h3>
              <p className="text-gray-600">
                Rent by the month with no long-term commitment required
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Transport Service</h3>
              <p className="text-gray-600">
                Schedule pickup and delivery of your items with our trusted partners
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Easy M-PESA Payment</h3>
              <p className="text-gray-600">
                Pay securely with M-PESA, PayPal, or card - no cash needed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Choose Your Unit</h3>
              <p className="text-gray-600">
                Browse our available storage units and select the size that fits your needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Book & Pay Online</h3>
              <p className="text-gray-600">
                Complete your booking and pay securely with M-PESA in minutes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl text-gray-900 mb-3">Move In</h3>
              <p className="text-gray-600">
                Schedule transportation or move in yourself with 24/7 access to your unit
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-white mb-6">Ready to Store with JESH?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of satisfied customers who trust us with their belongings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => onNavigate('units')}
              className="text-lg px-8"
            >
              View Available Units
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('auth')}
              className="text-lg px-8 bg-white text-blue-600 hover:bg-gray-100"
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-6 h-6" />
                <span className="text-xl">JESH</span>
              </div>
              <p className="text-gray-400">
                Secure self-storage solutions in Nairobi
              </p>
            </div>

            <div>
              <h4 className="mb-4">Services</h4>
              <div className="space-y-2 text-gray-400">
                <div>Self Storage</div>
                <div>Transportation</div>
                <div>Packing Supplies</div>
              </div>
            </div>

            <div>
              <h4 className="mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Contact</div>
                <div>Terms & Conditions</div>
              </div>
            </div>

            <div>
              <h4 className="mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div>+254 700 000 000</div>
                <div>info@jesh.co.ke</div>
                <div>Industrial Area, Nairobi</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 JESH Storage. All rights reserved.</p>
            <button 
              onClick={() => onNavigate('admin-auth')}
              className="text-xs text-gray-600 hover:text-gray-400 mt-2 transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

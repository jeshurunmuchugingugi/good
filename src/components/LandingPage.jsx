import { useState } from 'react';
import { ArrowRight, Package, Truck, Shield, Clock, CheckCircle, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Chatbot from './Chatbot';

export default function LandingPage({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <div className="text-lg font-bold text-gray-900">
                LOGISTICS & STORAGE
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex" style={{gap: '2rem'}}>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                Home
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                Services
              </button>
              <button onClick={() => onNavigate('units')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Storage
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                Resources
              </button>
              <button className="text-gray-700 hover:text-gray-900 transition-colors">
                More
              </button>
            </div>

            <div className="hidden md:flex items-center" style={{gap: '2rem'}}>
              <button onClick={() => onNavigate('transport')} className="text-gray-700 hover:text-gray-900 transition-colors">
                Book Transport
              </button>
              <button onClick={() => onNavigate('units')} className="px-4 py-2 rounded-lg shadow-sm transition-colors" style={{backgroundColor: '#FC9E3B', color: '#1A2637'}}>
                Rent A Unit
              </button>
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
                <button onClick={() => { onNavigate('units'); setMobileMenuOpen(false); }} className="w-full px-4 py-2 rounded-lg shadow-sm transition-colors" style={{backgroundColor: '#FC9E3B', color: '#1A2637'}}>
                  Get A Unit
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFF8ED'}}>
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
                <button 
                  onClick={() => onNavigate('units')}
                  className="text-lg px-8 py-3 rounded-lg transition-colors flex items-center"
                  style={{backgroundColor: '#FC9E3B', color: '#1A2637'}}
                >
                  Browse Storage Units
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
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
            <div className="inline-block px-6 py-2 rounded-full text-orange-600 text-sm font-medium mb-6" style={{border: '2px solid #FC9E3B'}}>
              HOW IT WORKS
            </div>
            <h2 className="text-4xl text-gray-900 mb-4">
              How Our <span style={{color: '#FB8B27'}}>Logistics</span> Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've made storage and transport effortless. From your doorstep to our secure units, here's how we take care of everything for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" style={{backgroundColor: '#FFFFFF', border: '2px solid #FEC373'}}>
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Pickup service" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl mb-2" style={{color: '#FB8B27'}}>Step 1</h3>
              <div className="flex items-center mb-3">
                <Truck className="w-5 h-5 text-gray-700 mr-2" />
                <h4 className="text-xl text-gray-900 font-semibold">Pick Up</h4>
              </div>
              <p className="text-gray-600">
                Enter your pickup location, select a convenient time, and confirm your booking.
              </p>
            </div>

            <div className="p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" style={{backgroundColor: '#FFFFFF', border: '2px solid #FEC373'}}>
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Transport service" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl mb-2" style={{color: '#FB8B27'}}>Step 2</h3>
              <div className="flex items-center mb-3">
                <Truck className="w-5 h-5 text-gray-700 mr-2" />
                <h4 className="text-xl text-gray-900 font-semibold">Transport</h4>
              </div>
              <p className="text-gray-600">
                Enter your pickup location, select a convenient time, and confirm your booking.
              </p>
            </div>

            <div className="p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow" style={{backgroundColor: '#FFFFFF', border: '2px solid #FEC373'}}>
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Storage facility" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl mb-2" style={{color: '#FB8B27'}}>Step 3</h3>
              <div className="flex items-center mb-3">
                <Package className="w-5 h-5 text-gray-700 mr-2" />
                <h4 className="text-xl text-gray-900 font-semibold">Store</h4>
              </div>
              <p className="text-gray-600">
                Enter your pickup location, select a convenient time, and confirm your booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              Our Tools
            </div>
            <h2 className="text-4xl text-gray-900 mb-4">
              Find The Perfect Unit In Minutes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our powerful tools to help you find the perfect storage unit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Space Calculator Card 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-center mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Sofa" 
                    className="w-24 h-20 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Kitchen" 
                    className="w-24 h-20 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Bedroom" 
                    className="w-24 h-20 object-cover rounded-lg"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Kitchen items" 
                    className="w-24 h-20 object-cover rounded-lg"
                  />
                </div>
                <div className="mx-8 text-4xl font-bold">→</div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">5M₂</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Space Calculator</h3>
              <p className="text-gray-600 mb-6">
                Use our quick space calculator to estimate the ideal storage size based on your items.
              </p>
              <button 
                onClick={() => onNavigate('space-calculator')}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Get My Quote
              </button>
            </div>

            {/* Space Calculator Card 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                    alt="Storage unit" 
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="font-semibold">10m2</div>
                    <div>Kes. 29,532/mo</div>
                    <div className="text-xs">Storage Central Mombasa Road</div>
                    <div className="text-xs">Ground Floor (Lower)</div>
                  </div>
                </div>
                <div className="mx-8 text-4xl font-bold">→</div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <Package className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="text-sm text-gray-600">Ksh 23,625/month</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">VAT Inclusive</div>
                  <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium mb-2">
                    Reserve & Pay Now
                  </button>
                  <div className="text-xs text-gray-500 mb-2">Select your move-in date. Pay for your reservation.</div>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm">
                    Book a site visit
                  </button>
                  <div className="text-xs text-gray-500 mt-1">Select a time and book a site visit</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Space Calculator</h3>
              <p className="text-gray-600 mb-6">
                Use our quick space calculator to estimate the ideal storage size based on your items.
              </p>
              <button 
                onClick={() => onNavigate('space-calculator')}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Get My Quote
              </button>
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
      
      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
}
import React from 'react';
import { Clock, Shield, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-orange-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              From Doorstep To Storage — Seamlessly
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Our Smart Quote System Instantly Calculates Transport Costs And Storage Size Once You Enter Your Pickup Location — No Calls, No Guesswork, Just Instant Pricing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg shadow-sm transition-colors font-medium">
                Rent A Unit
              </button>
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg transition-colors font-medium">
                Book Transport
              </button>
            </div>
          </div>

          {/* Right side - Image with floating cards */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Storage facility" 
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>

            {/* Floating info cards */}
            <div className="absolute -top-4 -left-4 lg:-left-6 bg-white rounded-lg shadow-lg border-2 border-orange-200 p-3 w-32 lg:w-36">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="font-bold text-xs lg:text-sm">24/7</div>
                  <div className="text-xs text-gray-600">Security</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-4 lg:-right-6 bg-white rounded-lg shadow-lg border-2 border-orange-200 p-3 w-32 lg:w-36">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="font-bold text-xs lg:text-sm">Insured</div>
                  <div className="text-xs text-gray-600">Storage</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 left-1/4 lg:left-1/3 bg-white rounded-lg shadow-lg border-2 border-orange-200 p-3 w-32 lg:w-36">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="font-bold text-xs lg:text-sm">Fast</div>
                  <div className="text-xs text-gray-600">Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
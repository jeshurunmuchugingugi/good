import { Lock, Shield, Zap } from 'lucide-react';

export default function HeroSection({ onNavigate }) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFF9F3'}}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="mb-6" style={{color: '#1E1E1E'}}>
              <div className="text-5xl md:text-6xl font-bold mb-2">From Doorstep To Storage</div>
              <div className="text-5xl md:text-6xl font-light italic">— Seamlessly</div>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
              Our Smart Quote System Instantly Calculates Transport Costs And Storage Size Once You Enter Your Pickup Location — No Calls, No Guesswork, Just Instant Pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('units')} 
                className="px-8 py-3 rounded-lg font-medium text-white transition-all shadow-md hover:shadow-lg" 
                style={{backgroundColor: '#F4A261'}}
              >
                Rent A Unit
              </button>
              <button 
                onClick={() => onNavigate('transport')} 
                className="px-8 py-3 rounded-lg font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
              >
                Book Transport
              </button>
            </div>
          </div>
          <div className="relative flex justify-center items-center min-h-[600px]">
            {/* Central Image */}
            <img 
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Person walking through modern storage facility" 
              className="rounded-3xl w-80 h-96 object-cover shadow-2xl z-10"
            />
            
            {/* 24/7 Security - Top Left */}
            <div className="absolute top-8 left-8 bg-white p-6 rounded-3xl shadow-lg border-2" style={{borderColor: '#F4A261'}}>
              <div className="flex flex-col items-center text-center gap-3">
                <Lock className="w-10 h-10" style={{color: '#F4A261'}} />
                <div>
                  <div className="font-bold text-lg" style={{color: '#1E1E1E'}}>24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Security</div>
                </div>
              </div>
            </div>
            
            {/* Insured Storage - Right Side */}
            <div className="absolute top-20 right-8 bg-white p-6 rounded-3xl shadow-lg border-2" style={{borderColor: '#F4A261'}}>
              <div className="flex flex-col items-center text-center gap-3">
                <Shield className="w-10 h-10" style={{color: '#F4A261'}} />
                <div>
                  <div className="font-bold text-lg" style={{color: '#1E1E1E'}}>Insured</div>
                  <div className="text-sm text-gray-600 font-medium">Storage</div>
                </div>
              </div>
            </div>
            
            {/* Fast Response - Bottom Left */}
            <div className="absolute bottom-8 left-12 bg-white p-6 rounded-3xl shadow-lg border-2" style={{borderColor: '#F4A261'}}>
              <div className="flex flex-col items-center text-center gap-3">
                <Zap className="w-10 h-10" style={{color: '#F4A261'}} />
                <div>
                  <div className="font-bold text-lg" style={{color: '#1E1E1E'}}>Fast</div>
                  <div className="text-sm text-gray-600 font-medium">Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

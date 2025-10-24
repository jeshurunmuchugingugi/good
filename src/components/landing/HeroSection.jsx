import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function HeroSection({ onNavigate }) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#FFF8ED'}}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl text-gray-900 mb-6">Secure Storage Solutions for Your Peace of Mind</h1>
            <p className="text-xl text-gray-600 mb-8">Affordable, secure, and convenient self-storage units in Nairobi. Book online, pay with M-PESA, and schedule transportation all in one place.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate('units')} className="text-lg px-8 py-3 rounded-lg transition-colors flex items-center" style={{backgroundColor: '#FC9E3B', color: '#1A2637'}}>
                Browse Storage Units
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('transport')} className="text-lg px-8">Schedule Transport</Button>
            </div>
          </div>
          <div className="relative">
            <ImageWithFallback src="https://images.unsplash.com/photo-1694601618351-dbbbb2b8934f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9yYWdlJTIwZmFjaWxpdHklMjB1bml0c3xlbnwxfHx8fDE3NjEwMjc2MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Storage facility" className="rounded-2xl shadow-2xl w-full h-[500px] object-cover" />
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-1">24/7</div>
              <div>Secure Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

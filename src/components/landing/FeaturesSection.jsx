import { Truck, Package } from 'lucide-react';
import StepCard from './StepCard';

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 rounded-full text-orange-600 text-sm font-medium mb-6" style={{border: '2px solid #FC9E3B'}}>HOW IT WORKS</div>
          <h2 className="text-4xl text-gray-900 mb-4">How Our <span style={{color: '#FB8B27'}}>Logistics</span> Work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">We've made storage and transport effortless. From your doorstep to our secure units, here's how we take care of everything for you.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard step={1} icon={Truck} title="Pick Up" description="Enter your pickup location, select a convenient time, and confirm your booking." image="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" />
          <StepCard step={2} icon={Truck} title="Transport" description="Enter your pickup location, select a convenient time, and confirm your booking." image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" />
          <StepCard step={3} icon={Package} title="Store" description="Enter your pickup location, select a convenient time, and confirm your booking." image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" />
        </div>
      </div>
    </section>
  );
}

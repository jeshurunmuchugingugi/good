import { Package } from 'lucide-react';

export default function ToolsSection({ onNavigate }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">Our Tools</div>
          <h2 className="text-4xl text-gray-900 mb-4">Find The Perfect Unit In Minutes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Explore our powerful tools to help you find the perfect storage unit.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-center mb-8">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sofa" className="w-24 h-20 object-cover rounded-lg" />
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Kitchen" className="w-24 h-20 object-cover rounded-lg" />
                <img src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Bedroom" className="w-24 h-20 object-cover rounded-lg" />
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Kitchen items" className="w-24 h-20 object-cover rounded-lg" />
              </div>
              <div className="mx-8 text-4xl font-bold">→</div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-3xl font-bold text-gray-900">5M₂</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Space Calculator</h3>
            <p className="text-gray-600 mb-6">Use our quick space calculator to estimate the ideal storage size based on your items.</p>
            <button onClick={() => onNavigate('space-calculator')} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">Get My Quote</button>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Storage unit" className="w-32 h-24 object-cover rounded-lg" />
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
                <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg text-sm font-medium mb-2">Reserve & Pay Now</button>
                <div className="text-xs text-gray-500 mb-2">Select your move-in date. Pay for your reservation.</div>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm">Book a site visit</button>
                <div className="text-xs text-gray-500 mt-1">Select a time and book a site visit</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Space Calculator</h3>
            <p className="text-gray-600 mb-6">Use our quick space calculator to estimate the ideal storage size based on your items.</p>
            <button onClick={() => onNavigate('space-calculator')} className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">Get My Quote</button>
          </div>
        </div>
      </div>
    </section>
  );
}

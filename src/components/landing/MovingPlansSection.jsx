export default function MovingPlansSection() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="text-sm text-gray-600 mb-2">Transport & Flexible pricing</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose the plan that fits your move</h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Need a custom quote?</h3>
              <p className="text-gray-600 text-sm mb-4">Contact us for a personalized plan based on your exact needs.</p>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">Request custom quote</button>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Basic move</h3>
            <p className="text-gray-600 text-sm mb-4">Perfect for short-distance relocations within the same city.</p>
            <div className="text-3xl font-bold text-gray-900 mb-4">$199</div>
            <button className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-medium mb-6 hover:bg-yellow-500 transition-colors">Get started now</button>
            <div className="text-sm text-gray-600 mb-3">Includes features:</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Local relocation (within city)</li>
              <li>• 2 Movers + Truck</li>
              <li>• Basic packing supplies</li>
              <li>• Loading & unloading</li>
              <li>• Furniture blankets & strapping</li>
              <li>• Dolly & Basic equipment provided</li>
            </ul>
          </div>
          <div className="bg-yellow-100 rounded-lg p-6 border border-yellow-300">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Full-Service move</h3>
            <p className="text-gray-600 text-sm mb-4">Ideal for intercity or cross-state moves with added convenience.</p>
            <div className="text-3xl font-bold text-gray-900 mb-4">$499</div>
            <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium mb-6 hover:bg-gray-800 transition-colors">Get started now</button>
            <div className="text-sm text-gray-600 mb-3">Includes features:</div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Long or short-distance moves</li>
              <li>• Professional packing & unpacking</li>
              <li>• Furniture disassembly & assembly</li>
              <li>• Loading & Unloading</li>
              <li>• 3 skilled movers + Moving truck</li>
              <li>• Appliance handling</li>
              <li>• Blankets, straps & Protective gear</li>
              <li>• Flexible scheduling</li>
              <li>• Insurance coverage</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

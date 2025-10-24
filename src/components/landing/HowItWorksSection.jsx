export default function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Get started in 3 simple steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">1</div>
            <h3 className="text-xl text-gray-900 mb-3">Choose Your Unit</h3>
            <p className="text-gray-600">Browse our available storage units and select the size that fits your needs</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">2</div>
            <h3 className="text-xl text-gray-900 mb-3">Book & Pay Online</h3>
            <p className="text-gray-600">Complete your booking and pay securely with M-PESA in minutes</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">3</div>
            <h3 className="text-xl text-gray-900 mb-3">Move In</h3>
            <p className="text-gray-600">Schedule transportation or move in yourself with 24/7 access to your unit</p>
          </div>
        </div>
      </div>
    </section>
  );
}

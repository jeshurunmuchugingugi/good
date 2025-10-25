import { ArrowLeft } from 'lucide-react';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FFF9F3'}}>
      {/* Back Button */}
      <button 
        onClick={() => onNavigate('landing')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2"
        style={{borderColor: '#F4A261'}}
      >
        <ArrowLeft className="w-4 h-4" style={{color: '#F4A261'}} />
        <span className="text-sm font-medium" style={{color: '#1E1E1E'}}>Back</span>
      </button>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="mb-6" style={{color: '#1E1E1E'}}>
            <div className="text-6xl md:text-7xl font-extrabold mb-2">About JESH Storage</div>
            <div className="text-6xl md:text-7xl font-medium italic">— Your Partner</div>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Delivering secure, convenient, and innovative storage solutions with unmatched reliability and customer service.
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block px-6 py-3 rounded-3xl text-white text-sm font-medium mb-8 shadow-lg border-2" style={{backgroundColor: '#F4A261', borderColor: '#F4A261'}}>
                About Us
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{color: '#1E1E1E'}}>
                Your Trusted Storage Partner
              </h2>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  We are committed to providing top-tier storage solutions that combine 
                  security, convenience, and innovation. Our state-of-the-art facility is 
                  designed to give you peace of mind while storing your valuable belongings.
                </p>
                
                <p>
                  With our comprehensive digital platform, managing your storage has 
                  never been easier. From real-time unit availability to seamless booking 
                  and payment, we've streamlined every step of the storage experience.
                </p>
                
                <p>
                  Whether you need short-term storage during a move or long-term 
                  solutions for your business, our flexible options and professional service 
                  ensure your items are always safe and accessible when you need them.
                </p>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center items-center">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern storage facility with multiple units"
                className="rounded-3xl w-full h-96 object-cover shadow-2xl border-2"
                style={{borderColor: '#F4A261'}}
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-3xl shadow-lg border-2" style={{borderColor: '#F4A261'}}>
                <div className="text-center">
                  <div className="font-bold text-lg" style={{color: '#1E1E1E'}}>24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Security</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-3xl shadow-lg border-2" style={{borderColor: '#F4A261'}}>
                <div className="text-center">
                  <div className="font-bold text-lg" style={{color: '#1E1E1E'}}>Insured</div>
                  <div className="text-sm text-gray-600 font-medium">Storage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}